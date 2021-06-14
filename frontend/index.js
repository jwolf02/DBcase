
function displayOperatingStationInformation(name, shortName, type) {
    document.getElementById("name").innerText = "Name: " + name;
    document.getElementById("kurzname").innerText = "Kurzname: " + shortName;
    document.getElementById("typ").innerText = "Typ: " + type;
}

function displayError(message) {
    document.getElementById("error").innerText = message;
}

function resetUI() {
    displayError("");
    displayOperatingStationInformation("", "", "");
}

function onSendClicked() {
    let abbreviation = document.getElementById("stationAbbrev").value;
    if (abbreviation == "") {
        return;
    }

    console.log("operating station abbreviation = " + abbreviation);

    let endpoint = `/betriebsstelle/${abbreviation}`;

    resetUI();
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let response = JSON.parse(xhttp.responseText);
            let name = response["Name"];
            let shortName = response["Kurzname"];
            let type = response["Typ"];
            displayOperatingStationInformation(name, shortName, type);
        } else if (this.status == 404) {
            displayError("Keine Daten zur Abkürzung gefunden");
        }
    };
    xhttp.open("GET", endpoint, true);
    xhttp.send();
}