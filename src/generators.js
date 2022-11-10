const generators = [{
    name: "Generator 1",
    baseEffect: 1.00,
    growthRate: 1.08,
    baseCost: 10.00,
}, {
    name: "Generator 2",
    baseEffect: 7.84,
    growthRate: 1.09,
    baseCost: 103.40,
}, {
    name: "Generator 3",
    baseEffect: 61.47,
    growthRate: 1.10,
    baseCost: 1069.16,
}, {
    name: "Generator 4",
    baseEffect: 481.89,
    growthRate: 1.11,
    baseCost: 11055.07,
}, {
    name: "Generator 5",
    baseEffect: 3778.02,
    growthRate: 1.12,
    baseCost: 114309.46,
}, {
    name: "Generator 6",
    baseEffect: 29619.68,
    growthRate: 1.13,
    baseCost: 1181959.77,
}, {
    name: "Generator 7",
    baseEffect: 232218.27,
    growthRate: 1.14,
    baseCost: 12221463.99,
}, {
    name: "Generator 8",
    baseEffect: 1820591.20,
    growthRate: 1.15,
    baseCost: 126369937.68,
}]

function getGeneratorEffect(id) {
    return generators[id].baseEffect * data.generatorLevels[id];
}

function loadGeneratorText() {
    updateGeneratorsText();
    updateBuyGeneratorAmountButtonText();
    shouldGeneratorsReveal();
    getToggleBuyMaxText();
}

function updateGeneratorsText() {
    for (let id in generators) {
        const amountBonus = ((Math.floor(data.generatorLevels[id] / 25) * 0.25) + 1)
        const checkForBuyMax = data.buyGeneratorAmount === -1 ? getMaxGeneratorCost(1, id) : getMaxGeneratorCost(data.buyGeneratorAmount, id);
        document.getElementById(`generator${id}-name`).innerHTML = generators[id].name;
        document.getElementById(`generator${id}-level`).innerHTML = formatWithCommas(data.generatorLevels[id]);
        document.getElementById(`generator${id}-amountBonus`).innerHTML = format(amountBonus);
        document.getElementById(`generator${id}-effect`).innerHTML = format(generators[id].baseEffect);
        document.getElementById(`generator${id}-cost`).innerHTML = format(checkForBuyMax);
    }
}

function shouldGeneratorsReveal() {
    for (let id in generators) {
        if (id > 0) document.getElementById(`generator${id}-button`).style.visibility = data.generatorLevels[id - 1] > 0 ? "initial" : "hidden";
    }
}

function updateGeneratorBorderColor() {
    for (let id in generators) {
        const element = document.getElementById(`generator${id}-button`);
        const checkForBuyMax = data.buyGeneratorAmount === -1 ? getMaxGeneratorCost(1, id) : getMaxGeneratorCost(data.buyGeneratorAmount, id)
        if (data.points < checkForBuyMax) {
            element.classList.add("cantPurchase");
            element.classList.remove("canPurchase");
        } else {
            element.classList.add("canPurchase");
            element.classList.remove("cantPurchase");
        }
    }
}

function buyGenerator(id) {
    if (data.points < getMaxGeneratorCost(data.buyGeneratorAmount, id)) return;
    const checkForBuyMaxAmount = data.buyGeneratorAmount === -1 ? getMaxGeneratorAmount(data.points, id) : data.buyGeneratorAmount;
    const amount = checkForBuyMaxAmount;
    const checkForBuyMaxCost = data.buyGeneratorAmount === -1 ? getMaxGeneratorCost(amount, id) : getMaxGeneratorCost(data.buyGeneratorAmount, id)
    const cost = checkForBuyMaxCost;

    data.points -= cost
    data.generatorLevels[id] += amount;
    updateGeneratorsText();
    shouldGeneratorsReveal();
    getPointsPerSecondText();
}

function toggleBuyGeneratorAmount() {
    if (data.buyGeneratorAmount === 1) {
        data.buyGeneratorAmount = 25;
    } else if (data.buyGeneratorAmount === 25) {
        data.buyGeneratorAmount = 100;
    } else if (data.buyGeneratorAmount === 100) {
        data.buyGeneratorAmount = -1;
    } else {
        data.buyGeneratorAmount = 1;
    }
    updateGeneratorsText();
    updateBuyGeneratorAmountButtonText();
}

const toggleBuyGeneratorAmountButtonElement = document.getElementById("toggleBuyGeneratorAmountButton");

function updateBuyGeneratorAmountButtonText() {
    const checkForBuyMax = data.buyGeneratorAmount === -1 ? "Ma" : data.buyGeneratorAmount
    toggleBuyGeneratorAmountButtonElement.innerHTML = `Buy Amount: ${checkForBuyMax}x`; 
}

function getMaxGeneratorCost(numberToBuy, id) {
    const baseCost = generators[id].baseCost;
    const growthRate = generators[id].growthRate;
    const level = data.generatorLevels[id];
    return baseCost * Math.pow(growthRate, level) * ((Math.pow(growthRate, numberToBuy) - 1) / (growthRate - 1));
}

function getMaxGeneratorAmount(points, id) {
    const baseCost = generators[id].baseCost;
    const growthRate = generators[id].growthRate;
    const level = data.generatorLevels[id];
    return Math.floor(Math.log((points * (growthRate - 1)) / (baseCost * Math.pow(growthRate, level)) + 1) / Math.log(growthRate));
}

function buyMaxGenerators() {
    for (let i = generators.length - 1; i >= 0; i--) {
        const element = document.getElementById(`generator${i}-button`);
        const amount = getMaxGeneratorAmount(data.points, i);
        const cost = getMaxGeneratorCost(amount, i);
        if (element.style.display !== "hidden" && element.classList.contains("canPurchase")) {
            data.points -= cost;
            data.generatorLevels[i] += amount;
        }
    }
    updateGeneratorsText();
    shouldGeneratorsReveal();
    getPointsPerSecondText();
}

const buyMaxToggleElement = document.getElementById("buyMaxToggle");

function getToggleBuyMaxText() {
    buyMaxToggleElement.textContent = data.buyMaxToggle ? "ON" : "OFF";
}

function toggleBuyMax() {
    data.buyMaxToggle = !data.buyMaxToggle;
    getToggleBuyMaxText()
}

function executeBuyMaxGenerators() {
    if (!data.buyMaxToggle) return;

    buyMaxGenerators();
}
