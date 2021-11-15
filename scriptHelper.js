// Write your helper functions here!
require('isomorphic-fetch');

function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
   // Here is the HTML formatting for our mission target div.
   let div = document.getElementById("missionTarget");
   div.innerHTML = `
                <h2>Mission Destination</h2>
                <ol>
                    <li>Name: ${name} </li>
                    <li>Diameter: ${diameter}</li>
                    <li>Star: ${star}</li>
                    <li>Distance from Earth: ${distance}</li>
                    <li>Number of Moons: ${moons}</li>
                </ol>
                <img src="${imageUrl}">
`;
}

function validateInput(testInput) {
   let numberInput = Number(testInput);
   if (testInput === "") {
       return "Empty"
   } else if (isNaN(numberInput)) {
       return "Not A Number"
   } else if (isNaN(numberInput) === false) {
       return "Is A Number"
   }
}

function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel) {
    let pilotStatus = document.getElementById("pilotStatus");
    let copilotStatus = document.getElementById("copilotStatus");
    let fuelLevelStatus = document.getElementById("fuelStatus");
    let cargoLevelStatus = document.getElementById("cargoStatus");

    if (validateInput(pilot) === "Empty" || validateInput(copilot) === "Empty" || 
        validateInput(fuelLevel) === "Empty" || validateInput(cargoLevel) === "Empty") {
        alert("Empty fields please eneter information!")
    } else if (validateInput(pilot) === "Is A Number" || validateInput(copilot) === "Is A Number" ||
        validateInput(fuelLevel) === "Not A Number" || validateInput(cargoLevel) === "Not A Number") {
        alert("Please enter valid data!");  
    } else {
        list.style.visibility = "visible"
        pilotStatus.innerHTML =  `Pilot ${pilot} is a go for takeoff!`
        copilotStatus.innerHTML = `Copilot ${copilot} is a go for takeoff!`

        let launchStatus = document.getElementById("launchStatus");

        if(fuelLevel < 10000 && cargoLevel <= 10000) {
            fuelLevelStatus.innerHTML = "Fuel level too low!";
            cargoLevelStatus.innerHTML = "Cargo level low enough for takeoff!"
            launchStatus.innerHTML = "Shuttle not ready for takeoff!"
            launchStatus.style.color = "#94062a";

        } else if (fuelLevel >= 10000 && cargoLevel > 10000) {
            fuelLevelStatus.innerHTML = "Fuel level optimal for takeoff!"
            cargoLevelStatus.innerHTML = "Cargo level is too heavy for takeoff!"
            launchStatus.innerHTML = "Shuttle not ready for takeoff!"
            launchStatus.style.color = "#94062a";

        } else if (fuelLevel < 10000 && cargoLevel > 10000) {
            fuelLevelStatus.innerHTML = "Fuel level too low!";
            cargoLevelStatus.innerHTML = "Cargo level is too heavy for takeoff!";
            launchStatus.innerHTML = "Shuttle not ready for takeoff!";
            launchStatus.style.color = "#94062a";

        } else {
            fuelLevelStatus.innerHTML = "Fuel level optimal!";
            cargoLevelStatus.innerHTML = "Cargo level optimal for takeoff";
            launchStatus.innerHTML = "Shuttle ready for takeoff!";
            launchStatus.style.color = "#1f7301";
        }
    }   
}

async function myFetch() {
    let planetsReturned;

    planetsReturned = await fetch("https://handlers.education.launchcode.org/static/planets.json").then( function(response) {
        if(response.status >= 400) {
            throw new Error("Invalid Response");
        } else {
            return response.json();
        }
        });

    return planetsReturned;
}

function pickPlanet(planets) {
    let index = Math.floor(Math.random() * planets.length)
    return planets[index];
}

module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet; 
module.exports.myFetch = myFetch;
