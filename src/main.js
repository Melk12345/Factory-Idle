"use strict";

const pointsTextElement = document.getElementById("points-text");
const pointsPerSecondTextElement = document.getElementById("pointsPerSecond-text");

function getPointsText() {
    pointsTextElement.textContent = format(data.points);
}

function getPointsPerSecondText() {
    pointsPerSecondTextElement.textContent = format(getPointsPerSecond());
}

function getPointsPerSecond() {
    let pointsPerSecond = 0;
    for (let id = 0; id < generators.length; id++) {
        const amountBonus = ((Math.floor(data.generatorLevels[id] / 25) * 0.25) + 1)
        pointsPerSecond += getGeneratorEffect(id) * amountBonus;
    }
    return pointsPerSecond;
}

function productionLoop(deltaTime) {
    data.points += getPointsPerSecond() * deltaTime;
    getPointsText();
    updateGeneratorBorderColor();
    getGeneratorMenuButtonGlow();
}

function calculateAFKGains() {
    if (data.firstTime) {
        data.firstTime = false;
        return;
    }

    if (!data.AFKGains) return;

    const now = Date.now();
    let delta = now - data.time;
    let timeAwayInSeconds = delta / 1000;
    let pointsGained = getPointsPerSecond() * timeAwayInSeconds;
    data.points += pointsGained;

    const seconds = Math.floor((delta / 1000) % 60);
    const minutes = Math.floor((delta / (1000 * 60)) % 60);
    const hours = Math.floor((delta / (1000 * 60 * 60)) % 24);
    const days = Math.floor(delta / (1000 * 60 * 60 * 24));

    console.log(`You were gone for ${days} days, ${hours} hours, ${minutes} minutes, and ${seconds} seconds`); 
    console.log(`pointsGained = ${getPointsPerSecond()} (points/s) * ${format(timeAwayInSeconds)} (time away in seconds)`);
    console.log(`You gained ${format(pointsGained)} points while you were away!`);
}

let lastUpdate = Date.now();

function mainLoop() {
    const now = Date.now();
    const deltaTime = (now - lastUpdate) / 1000;
    lastUpdate = now;
    productionLoop(deltaTime);
}

function load() {
    loadSavedData();
    calculateAFKGains();
    getPointsPerSecondText();
    loadGeneratorText();
    loadSettingsText();
}

window.onload = function() {
    load();
}

window.onbeforeunload = function() { 
    autoSaveData();
}

function autoSaveData() {
    data.time = Date.now();
    window.localStorage.setItem(saveName, JSON.stringify(data));
}

setInterval(mainLoop, 50);
setInterval(autoSaveData, 15000);