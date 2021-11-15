// Write your JavaScript code here.

// const { formSubmission, myFetch, pickPlanet, addDestinationInfo } = require("./scriptHelper");

window.addEventListener("load", function() {

   let listedPlanets;
   // Set listedPlanetsResponse equal to the value returned by calling myFetch()
   let listedPlanetsResponse = myFetch();
   listedPlanetsResponse.then(function (result) {
       listedPlanets = result;
       console.log(listedPlanets);
   }).then(function () {
       console.log(listedPlanets);
       let selectedPlanet = pickPlanet(listedPlanets);
       addDestinationInfo(document, selectedPlanet.name, selectedPlanet.diameter, selectedPlanet.star, selectedPlanet.distance, selectedPlanet.moon, selectedPlanet.image)
       // Below this comment call the appropriate helper functions to pick a planet fom the list of planets and add that information to your destination.
   })
   
   let list = document.getElementById("faultyItems");
   list.style.visibility = "hidden";

   let form = document.querySelector("form");


   form.addEventListener("submit", function(event) {
       event.preventDefault();
       let pilotInput = document.querySelector("input[name=pilotName]");
       let pilot = pilotInput.value;
       let copilotInput = document.querySelector("input[name=copilotName]");
       let copilot = copilotInput.value;
       let fuelLevelInput = document.querySelector("input[name=fuelLevel]");
       let fuelLevel = Number(fuelLevelInput.value);
       let cargoMassInput = document.querySelector("input[name=cargoMass]");
       let cargoMass = Number(cargoMassInput.value);


       formSubmission(document, list, pilot, copilot, fuelLevel, cargoMass);
   })
});