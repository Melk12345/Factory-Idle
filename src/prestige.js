const bonusPerPrestigePointElement = document.getElementById("bonus-per-prestige-point");
const currentPrestigePointsElement = document.getElementById("current-prestige-points");
const prestigePointsGainedFromPrestigeElement = document.getElementById("prestige-points-gained-from-prestige");
const bonusFromCurrentPrestigePointsElement = document.getElementById("bonus-from-current-prestige-points");
const bonusFromPrestigePointsAfterPrestigeElement = document.getElementById("bonus-from-prestige-points-after-prestige");

function getPrestigePointsToGain() {
    return 150 * Math.sqrt(data.pointsThisRun/(1e12));
}

function getPrestigePointBonus() {
    return 2;
}

function loadPrestigeText() {
    updatePrestigeInfo();
}

function updatePrestigeInfo() {
    bonusPerPrestigePointElement.innerHTML = getPrestigePointBonus();
    currentPrestigePointsElement.innerHTML = format(Math.floor(data.prestigePoints), 0);
    prestigePointsGainedFromPrestigeElement.innerHTML = format(Math.floor(getPrestigePointsToGain()), 0);
    bonusFromCurrentPrestigePointsElement.innerHTML = format(Math.floor(getPrestigePointBonus() * data.prestigePoints), 0);
    bonusFromPrestigePointsAfterPrestigeElement.innerHTML = format(Math.floor(getPrestigePointBonus() * (getPrestigePointsToGain() + data.prestigePoints)), 0);
}

function updatePrestigeButtonColor() {
    const element = document.getElementById("prestige-button");
    if (getPrestigePointsToGain() < 1) {
        element.classList.add("cantPurchase");
        element.classList.remove("canPurchase");
    } else {
        element.classList.add("canPurchase");
        element.classList.remove("cantPurchase");
    }
}

function doPrestige() {
    if (getPrestigePointsToGain() < 1) return;
    if (data.prestigeConfirmation && !confirm("Are you sure you want to prestige?")) return;

    data.prestigePoints += getPrestigePointsToGain();
    data.points = 10;
    data.pointsThisRun = 10;
    data.generatorLevels = [0, 0, 0, 0, 0, 0, 0, 0];
}