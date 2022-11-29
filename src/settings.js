"use strict";

const saveName = 'factoryIdleSave';

function saveData() {
    data.time = Date.now();
    window.localStorage.setItem(saveName, JSON.stringify(data));
    console.log("Game saved!");
}

function loadSavedData() {
    let savedGame = JSON.parse(localStorage.getItem(saveName));
    if (savedGame !== null) data = savedGame;
}

function resetData() {
    if (!confirm("Are you sure you want to reset your data? ALL of your progress will be lost and you will need to start over!")) return;

    data.time = Date.now();
    data.scraps = 10;
    data.scrapsThisRun = 10;
    data.gears = 0;
    data.buyRobotAmount = 1;
    data.robotAmounts = [0, 0, 0, 0, 0, 0, 0, 0];
    data.upgradeAmounts = [0, 0, 0, 0, 0, 0, 0, 0];
    location.reload();
}

function importData() {
    let importedData = prompt("Paste your save data here");
    if (importedData.length <= 0 || importedData === undefined) {
        alert('Error!');
        return;
    }
    data = JSON.parse((atob(importedData)));
    window.localStorage.setItem(saveName, JSON.stringify(data));

    location.reload();
}

function exportData() {
    window.localStorage.setItem(saveName, JSON.stringify(data));
    let exportedData = btoa(JSON.stringify(data));
    const exportedDataText = document.createElement("textarea");
    exportedDataText.value = exportedData;
    document.body.appendChild(exportedDataText);
    exportedDataText.select();
    exportedDataText.setSelectionRange(0, 99999);
    document.execCommand("copy");
    document.body.removeChild(exportedDataText);
    alert("Exported data copied to Clipboard! Paste your save data string to a safe place so if you lose your data you can get back to where you were!");
}

function loadSettingsText() {
    getAFKGainsButtonText();
    getTogglePrestigeConfirmationText();
}

const toggleAFKGainsButtonElement = document.getElementById("toggle-afk-gains-button");

function getAFKGainsButtonText() {
    toggleAFKGainsButtonElement.textContent = data.AFKGains ? "AFK Gains: ON" : "AFK Gains: OFF";
}

function toggleAFKGains() {
    data.AFKGains = !data.AFKGains;
    getAFKGainsButtonText();
}

const togglePrestigeConfirmationElement = document.getElementById("toggle-prestige-confirmation-button");

function getTogglePrestigeConfirmationText() {
    togglePrestigeConfirmationElement.textContent = data.prestigeConfirmation ? "Prestige Confirmation: ON" : "Prestige Confirmation: OFF";
}

function togglePrestigeConfirmation() {
    data.prestigeConfirmation = !data.prestigeConfirmation;
    getTogglePrestigeConfirmationText();
}



