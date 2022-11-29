"use strict";

const robots = [{
    name: "Robot 1",
    baseEffect: 1.00,
    growthRate: 1.08,
    baseCost: 10.00,
}, {
    name: "Robot 2",
    baseEffect: 7.84,
    growthRate: 1.09,
    baseCost: 103.40,
}, {
    name: "Robot 3",
    baseEffect: 61.47,
    growthRate: 1.10,
    baseCost: 1069.16,
}, {
    name: "Robot 4",
    baseEffect: 481.89,
    growthRate: 1.11,
    baseCost: 11055.07,
}, {
    name: "Robot 5",
    baseEffect: 3778.02,
    growthRate: 1.12,
    baseCost: 114309.46,
}, {
    name: "Robot 6",
    baseEffect: 29619.68,
    growthRate: 1.13,
    baseCost: 1181959.77,
}, {
    name: "Robot 7",
    baseEffect: 232218.27,
    growthRate: 1.14,
    baseCost: 12221463.99,
}, {
    name: "Robot 8",
    baseEffect: 1820591.20,
    growthRate: 1.15,
    baseCost: 126369937.68,
}]

function getRobotEffect(id) {
    return robots[id].baseEffect * data.robotAmounts[id];
}

function loadRobotText() {
    updateRobotsText();
    updateBuyRobotAmountButtonText();
    shouldRobotsReveal();
    getToggleBuyMaxText();
}

function updateRobotsText() {
    for (let id in robots) {
        const amountBonus = ((Math.floor(data.robotAmounts[id] / 25) * 0.25) + 1)
        const checkForBuyMax = data.buyRobotAmount === -1 ? getMaxRobotCost(1, id) : getMaxRobotCost(data.buyRobotAmount, id);
        document.getElementById(`robot${id}-name`).innerHTML = robots[id].name;
        document.getElementById(`robot${id}-amount`).innerHTML = formatWithCommas(data.robotAmounts[id]);
        document.getElementById(`robot${id}-amountBonus`).innerHTML = format(amountBonus, 2);
        document.getElementById(`robot${id}-effect`).innerHTML = format(robots[id].baseEffect, 2);
        document.getElementById(`robot${id}-cost`).innerHTML = format(checkForBuyMax, 2);
    }
}

function shouldRobotsReveal() {
    for (let id in robots) {
        if (id > 0) document.getElementById(`robot${id}-button`).style.visibility = data.robotAmounts[id - 1] > 0 ? "initial" : "hidden";
    }
}

function updateRobotBorderColor() {
    for (let id in robots) {
        const element = document.getElementById(`robot${id}-button`);
        const checkForBuyMax = data.buyRobotAmount === -1 ? getMaxRobotCost(1, id) : getMaxRobotCost(data.buyRobotAmount, id)
        if (data.scraps < checkForBuyMax) {
            element.classList.add("cantPurchase");
            element.classList.remove("canPurchase");
        } else {
            element.classList.add("canPurchase");
            element.classList.remove("cantPurchase");
        }
    }
}

function buyRobot(id) {
    if (data.scraps < getMaxRobotCost(data.buyRobotAmount, id)) return;
    const checkForBuyMaxAmount = data.buyRobotAmount === -1 ? getMaxRobotAmount(data.scraps, id) : data.buyRobotAmount;
    const amount = checkForBuyMaxAmount;
    const checkForBuyMaxCost = data.buyRobotAmount === -1 ? getMaxRobotCost(amount, id) : getMaxRobotCost(data.buyRobotAmount, id)
    const cost = checkForBuyMaxCost;

    data.scraps -= cost
    data.robotAmounts[id] += amount;
    updateRobotsText();
    shouldRobotsReveal();
    getScrapsPerSecondText();
}

function toggleBuyRobotAmount() {
    if (data.buyRobotAmount === 1) {
        data.buyRobotAmount = 25;
    } else if (data.buyRobotAmount === 25) {
        data.buyRobotAmount = 100;
    } else if (data.buyRobotAmount === 100) {
        data.buyRobotAmount = -1;
    } else {
        data.buyRobotAmount = 1;
    }
    updateRobotsText();
    updateBuyRobotAmountButtonText();
}

const toggleBuyRobotAmountButtonElement = document.getElementById("toggleBuyRobotAmountButton");

function updateBuyRobotAmountButtonText() {
    const checkForBuyMax = data.buyRobotAmount === -1 ? "Ma" : data.buyRobotAmount
    toggleBuyRobotAmountButtonElement.innerHTML = `Buy Amount: ${checkForBuyMax}x`; 
}

function getMaxRobotCost(numberToBuy, id) {
    const baseCost = robots[id].baseCost;
    const growthRate = robots[id].growthRate;
    const amount = data.robotAmounts[id];
    return baseCost * Math.pow(growthRate, amount) * ((Math.pow(growthRate, numberToBuy) - 1) / (growthRate - 1));
}

function getMaxRobotAmount(scraps, id) {
    const baseCost = robots[id].baseCost;
    const growthRate = robots[id].growthRate;
    const amount = data.robotAmounts[id];
    return Math.floor(Math.log((scraps * (growthRate - 1)) / (baseCost * Math.pow(growthRate, amount)) + 1) / Math.log(growthRate));
}

function buyMaxRobots() {
    for (let i = robots.length - 1; i >= 0; i--) {
        const element = document.getElementById(`robot${i}-button`);
        const previousRobot = i - 1 === -1 ? 0 : i - 1;
        const amount = getMaxRobotAmount(data.scraps, i);
        const cost = getMaxRobotCost(amount, i);
        if (document.getElementById(`robot${previousRobot}-button`).style.display !== "hidden" && element.classList.contains("canPurchase")) {
            data.scraps -= cost;
            data.robotAmounts[i] += amount;
        }
    }
    updateRobotsText();
    shouldRobotsReveal();
    getScrapsPerSecondText();
}

const buyMaxToggleElement = document.getElementById("buyMaxToggle");

function getToggleBuyMaxText() {
    buyMaxToggleElement.textContent = data.buyMaxToggle ? "ON" : "OFF";
}

function toggleBuyMax() {
    data.buyMaxToggle = !data.buyMaxToggle;
    getToggleBuyMaxText()
}

function executeBuyMaxRobots() {
    if (!data.buyMaxToggle) return;

    buyMaxRobots();
}
