"use strict";

const scrapsTextElement = document.getElementById("scraps-text");
const scrapsPerSecondTextElement = document.getElementById("scrapsPerSecond-text");

function getScrapsText() {
    scrapsTextElement.textContent = format(data.scraps, 2);
}

function getScrapsPerSecondText() {
    scrapsPerSecondTextElement.textContent = format(getScrapsPerSecond(), 2);
}

function getScrapsPerSecond() {
    let scrapsPerSecond = 0;
    for (let id = 0; id < robots.length; id++) {
        const amountBonus = ((Math.floor(data.robotAmounts[id] / 25) * 0.25) + 1);
        const gearBonus = data.gears * getGearBonus() === 0 ? 1 : data.gears * getGearBonus();
        scrapsPerSecond += getRobotEffect(id) * amountBonus * gearBonus;
    }
    return scrapsPerSecond;
}

function productionLoop(deltaTime) {
    data.scraps += getScrapsPerSecond() * deltaTime;
    data.scrapsThisRun += getScrapsPerSecond() * deltaTime;
    getScrapsText();
    updateRobotBorderColor();
    updatePrestigeInfo();
    updatePrestigeButtonColor();
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
    let scrapsGained = getScrapsPerSecond() * timeAwayInSeconds;
    data.scraps += scrapsGained;

    const seconds = Math.floor((delta / 1000) % 60);
    const minutes = Math.floor((delta / (1000 * 60)) % 60);
    const hours = Math.floor((delta / (1000 * 60 * 60)) % 24);
    const days = Math.floor(delta / (1000 * 60 * 60 * 24));

    console.log(`You were gone for ${days} days, ${hours} hours, ${minutes} minutes, and ${seconds} seconds`); 
    console.log(`scrapsGained = ${getScrapsPerSecond()} (scraps/s) * ${format(timeAwayInSeconds, 2)} (time away in seconds)`);
    console.log(`You gained ${format(scrapsGained, 2)} scraps while you were away!`);
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
    getScrapsPerSecondText();
    loadRobotText();
    loadPrestigeText()
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
setInterval(executeBuyMaxRobots, 250);