const express = require("express");
const fs = require('fs'); 
const parse = require('csv-parse');

const PORT = 3000;

const createDBFromCSVFile = function(filename) {
    let db = new Map();
    fs.createReadStream(filename)
        .pipe(parse({ delimiter: ';' }))
        .on('data', function(csvrow) {
            const data = {
                abbreviation: csvrow[0],
                name: csvrow[1], 
                shortName: csvrow[2], 
                type: csvrow[3],
                operationalState: csvrow[4],
                primaryLocationCode: csvrow[5],
                UIC: csvrow[6],
                RB: csvrow[7],
                validFrom: csvrow[8],
                validUntil: csvrow[9],
                gridKey: csvrow[10],
                fpl_rel: csvrow[11],
                fpl_gr: csvrow[12]
            };
            console.log(data);
            db.set(data.abbreviation.toLowerCase(), data);       
        })
        .on('end',function() {
            console.log(`parsed ${db.size} entries`);
        });
    return db;
}

const args = process.argv;
if (args.length < 3) {
    console.log("Usage: " + args[0] + "<csv file>");
    throw new Error();
}

let csvFilename = args[2];
const db = createDBFromCSVFile(csvFilename);

// create webserver
const app = express();

app.use(express.static('../frontend'));

app.get('/betriebsstelle/:abbreviation', async (req, res) => {
    let abbr = req.params.abbreviation.toLowerCase();
    console.log(`received request for abbreviation=${abbr}`);
    let entry = db.get(abbr);
    if (entry === undefined) {
        console.log("failed to retrieve data");
        res.status(404).send("failed to retrieve data");
    } else {
        res.json({ 
            Name: entry.name, 
            Kurzname: entry.shortName, 
            Typ: entry.type 
        });
    }
});
  
app.listen(PORT, () => {
    console.log(`app listening at http://127.0.0.1:${PORT}`);
});