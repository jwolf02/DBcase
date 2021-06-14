
// returns the information about the operation station
// as a json object
function getOperatingStationInformation(abbreviation) {
    let endpoint = `/betriebsstelle/${abbreviation}`;

    let xhttp = new XMLHttpRequest();
    /*xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            // Typical action to be performed when the document is ready:
            document.getElementById("demo").innerHTML = xhttp.responseText;
        }
    };*/
    xhttp.open("GET", endpoint, false);
    xhttp.send();
    return JSON.parse(xhttp.responseText);
}

function onSendClicked() {
    let abbrev = document.getElementById("stationAbbrev").value;
    console.log("operating station abbreviation = " + abbrev);

    let response = getOperatingStationInformation(abbrev);

    document.getElementById("name").innerText = "Name: " + response["Name"];
    document.getElementById("kurzname").innerText = "Kurzname: " + response["Kurzname"];
    document.getElementById("typ").innerText = "Typ: " + response["Typ"];
}