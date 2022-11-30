"use strict";

const gearsElement = document.getElementById("gears");
const gearsGainedFromPrestigeElement = document.getElementById("gears-gained-from-prestige");
const bonusPerGearElement = document.getElementById("bonus-per-gear");
const totalBonusFromGearsElement = document.getElementById("total-bonus-from-gears");
const totalBonusFromGearsAfterPrestigeElement = document.getElementById("total-bonus-from-gears-after-prestige");

function getGearsToGain() {
    return 150 * Math.sqrt(data.scrapsThisRun/(1e12));
}

function getGearBonus() {
    return 1.01;
}

function loadPrestigeText() {
    updatePrestigeInfo();
}

function updatePrestigeInfo() {
    gearsElement.innerHTML = formatWithCommas(Math.floor(data.gears), 0);
    gearsGainedFromPrestigeElement.innerHTML = formatWithCommas(Math.floor(getGearsToGain()), 0);
    bonusPerGearElement.innerHTML = getGearBonus() - 0.01;
    totalBonusFromGearsElement.innerHTML = formatWithCommas(Math.floor((getGearBonus()) * data.gears), 0);
    totalBonusFromGearsAfterPrestigeElement.innerHTML = formatWithCommas(Math.floor(getGearBonus() * (getGearsToGain() + data.gears)), 0);
}

function updatePrestigeButtonColor() {
    const element = document.getElementById("prestige-button");
    if (getGearsToGain() < 1) {
        element.classList.add("cantPurchase");
        element.classList.remove("canPurchase");
    } else {
        element.classList.add("canPurchase");
        element.classList.remove("cantPurchase");
    }
}

function doPrestige() {
    if (getGearsToGain() < 1) return;
    if (data.prestigeConfirmation && !confirm("Are you sure you want to prestige?")) return;

    data.gears += getGearsToGain();
    data.scraps = 10;
    data.scrapsThisRun = 10;
    data.robotAmounts = [0, 0, 0, 0, 0, 0, 0, 0];

    updateRobotsText();
    shouldRobotsReveal();
    getScrapsPerSecondText();
}