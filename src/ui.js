"use strict";

const robotsMenuContainerElement = document.getElementById("robots-container");
const prestigeMenuContainerElement = document.getElementById("prestige-container");
const upgradesMenuContainerElement = document.getElementById("upgrades-container");
const changelogMenuContainerElement = document.getElementById("changelog-container");
const settingsMenuContainerElement = document.getElementById("settings-container");

let activeMenu = robotsMenuContainerElement;
prestigeMenuContainerElement.classList.add("is-removed-from-layout");
upgradesMenuContainerElement.classList.add("is-removed-from-layout");
changelogMenuContainerElement.classList.add("is-removed-from-layout");
settingsMenuContainerElement.classList.add("is-removed-from-layout");

const robotsMenuButtonElement = document.getElementById("robots-menu-button");
const prestigeMenuButtonElement = document.getElementById("prestige-menu-button");
const upgradesMenuButtonElement = document.getElementById("upgrades-menu-button");
const changelogMenuButtonElement = document.getElementById("changelog-menu-button");
const settingsMenuButtonElement = document.getElementById("settings-menu-button");

const selectedButtonBorderColor = 'DarkOrange';
const defaultButtonBorderColor = 'Gray';

let activeMenuButton = robotsMenuButtonElement;
robotsMenuButtonElement.style.borderColor = selectedButtonBorderColor;
prestigeMenuButtonElement.style.borderColor = defaultButtonBorderColor; 
upgradesMenuButtonElement.style.borderColor = defaultButtonBorderColor; 
changelogMenuButtonElement.style.borderColor = defaultButtonBorderColor; 
settingsMenuButtonElement.style.borderColor = defaultButtonBorderColor; 

function openMenu(clickedMenu, clickedMenuButton) {
    activeMenu.classList.add("is-removed-from-layout");
    activeMenuButton.style.borderColor = defaultButtonBorderColor;
    activeMenu = clickedMenu;
    activeMenuButton = clickedMenuButton;
    activeMenuButton.style.borderColor = selectedButtonBorderColor;
    activeMenu.classList.remove("is-removed-from-layout");
}