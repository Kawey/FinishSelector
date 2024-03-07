import {updateState, turnOptionMod, switchCustomInfoState} from './updateState.js'
import { navBar } from '../navBar.js'

// mobile nav bar state menagment
localStorage.state ? localStorage.state 
: localStorage.state = "customize"

if (localStorage.state === "summary" || localStorage.state === "fp") {
  localStorage.state = "customize"
}

const infoBoxMobile = document.getElementById("info-box-album");
const boxCustomize = document.getElementById("boxCustomize");

switchCustomInfoState(infoBoxMobile, boxCustomize)
const elmNavBar = document.getElementById('nav-mobile')
navBar(elmNavBar, localStorage.state,infoBoxMobile, boxCustomize)



const btnCloseOptions = document.getElementById("btnCloseOption");
const optionBox = document.getElementById('option-box')

const extIntBtns = document.querySelectorAll('.btns-ext-int')
const tabInterior = document.getElementById("interior-tab")
const tabExterior = document.getElementById("exterior-tab")
//const categoryBtns = document.querySelectorAll('.btn-category')
//const btnCloseSumLands = document.getElementById("btnCloseSumLands")

const elementsSumMod = document.querySelectorAll('.getSumMod')
//const elmsFooterHeader = document.querySelectorAll('.get-footer-header')

const modalInfo = document.getElementById("modal-info-mobile");
const modalFP = document.getElementById("modal-FP-mobile");
const modSummary = document.getElementById("box-summary");
const modCategory = document.getElementById("box-category");

// TABS SYSTEM
const tabsContainer = document.querySelector("[role=tablist]");
//const tabButtons = tabsContainer.querySelectorAll("[role=tab]");
const tabPanels = document.querySelectorAll("[role=tabpanelexterior]");



// Get NAV Mobile buttons
// btnCustomize need add in future
const btnInfo = document.getElementById("btnInfo");
const btnFP = document.getElementById("btnFP");
const btnSummary = document.getElementById("btnSummary");
//btnReset need add in future
const btnCloseSumMob = document.getElementById("btnCloseSumMob");
const btnsCloseSum = document.querySelectorAll(".btnCloseSum")

let currentTheme = 0 //remove?
const currentState = new URLSearchParams(window.location.search).get('state');




// let userSelect = presets[0]
// localStorage.selected = JSON.stringify(userSelect);

// On load, check query pram and update the DOM 
switch (currentState) {
  case "category":
    break;
  case "options":
    //turnOptionMod()
    break;
  case "info":
    
    break;
  case "floorplan":
    
    break;
  case "summary":
    activateSummary()
    break;
  default:
    break;
}

function getAllQueryParameters() {
  const urlParams = new URLSearchParams(window.location.search);
  const queryParams = {};

  for (const [paramName, paramValue] of urlParams.entries()) {
      queryParams[paramName] = paramValue;
  }

  return queryParams;
}

/*
    BUTTONS EVENT LISTENERS
*/
// Switch Interior / Exterior
extIntBtns.forEach(element => {
  element.addEventListener('click', () => {
    // Your event handler code goes here
    console.log('intext Element clicked:', element);
    if (element.id == "btnInterior") {
      tabExterior.style.display = "none"
      tabInterior.style.display = "flex"
    } else {
      tabExterior.style.display = "flex"
      tabInterior.style.display = "none"
    }
  });
});

// Switch Color / Custom
tabsContainer.addEventListener("click", (e) => {
  const clickedTab = e.target.closest("button");
  const currentTab = tabsContainer.querySelector('[aria-selected="true"]');
  if (!clickedTab || clickedTab === currentTab) return;
  switchTab(clickedTab);
});

// close OPTION
btnCloseOptions.addEventListener('click', () => {
  updateState("category")
  const sidebar = document.getElementById("sidebar")
  const navBarMob = document.getElementById("nav-mobile")
  const categoryBtn = document.getElementsByClassName("btn-category");
  for (let i = 0; i < categoryBtn.length; i++) {
    categoryBtn[i].className = categoryBtn[i].className.replace(" active", "");
  }
  sidebar.classList.remove("option-mod")
  optionBox.classList.remove("option-mod")
  navBarMob.classList.remove("option-mod")
})

// // avtivate INFO mode nav-bar
// btnInfo.onclick = function () {
//   updateState("info")
//   modalInfo.style.display = "flex";
// }

// btnSummary.onclick = function () {
//   updateState("summary")
//   activateSummary(elementsSumMod)
//   modCategory.style.display = "none";
//   modSummary.style.display = "flex";
// }

// When the user clicks anywhere outside of the modal, close it
// window.onclick = function (event) {
//   if (event.target == modalInfo) {
//     updateState("category")
//     modalInfo.style.display = "none";
//   }
// }

// activate SUMMARY in landscape mode
// btnSumLands.addEventListener("click", () => {
//   updateState("summary")
//   const sidebar = document.getElementById("sidebar")
//   sidebar.classList.remove("option-mod")
//   optionBox.classList.remove("option-mod")
//   activateSummary()
// })

// close SUMMARY
btnsCloseSum.forEach(btn => {
  btn.addEventListener('click', () => { 
    elementsSumMod.forEach(element => {
      element.classList.remove("summary-mod");
    })
    updateState("category")
    modSummary.style.display = "none";
    modCategory.style.display = "flex";
  })
})

function switchTab(newTab) {
  const oldTab = tabsContainer.querySelector('[aria-selected="true"]')
  const activePanelId = newTab.getAttribute("aria-controls");
  const activePanel = tabsContainer.nextElementSibling.querySelector(
    "#" + CSS.escape(activePanelId)
  );
  const tabButtons = tabsContainer.querySelectorAll("[role=tab]");
  tabButtons.forEach((button) => {
    button.setAttribute("aria-selected", false);
    button.setAttribute("tabindex", "-1");
  });
  tabPanels.forEach((panel) => {
    panel.setAttribute("hidden", true);
  });

  activePanel.removeAttribute("hidden", false);

  newTab.setAttribute("aria-selected", true);
  newTab.setAttribute("tabindex", "0");
  newTab.focus();
  moveIndicator(oldTab, newTab, tabsContainer);
}

function moveIndicator(oldTab, newTab, tabsContainer) {
  const newTabPosition = oldTab.compareDocumentPosition(newTab)
  const newTabWidth = newTab.offsetWidth / tabsContainer.offsetWidth
  let transitionWidth;

  //if the new tab is to the right
  if (newTabPosition === 4) {
    transitionWidth = newTab.offsetLeft + newTab.offsetWidth - oldTab.offsetLeft;
  } else { //if the new tab is to the left
    transitionWidth = oldTab.offsetLeft + newTab.offsetWidth - newTab.offsetLeft
    tabsContainer.style.setProperty('--_left', newTab.offsetLeft+ "px");
  }

  //tabsContainer.style.setProperty('--_left', newTab.offsetLeft+ "px");
  tabsContainer.style.setProperty('--_width', transitionWidth / tabsContainer.offsetWidth);

  setTimeout(()=> {
    tabsContainer.style.setProperty('--_left', newTab.offsetLeft+ "px");
    tabsContainer.style.setProperty('--_width', newTabWidth);
  },250)
  //tabsContainer.style.setProperty('--_width', newTabWidth);
}

function closeOptionsMenu() {
  updateState("category")
    const sidebar = document.getElementById("sidebar")
    const navBarMob = document.getElementById("nav-mobile")
    const categoryBtn = document.getElementsByClassName("btn-category");
    for (let i = 0; i < categoryBtn.length; i++) {
      categoryBtn[i].className = categoryBtn[i].className.replace(" active", "");
    }
    document.querySelectorAll(".option-mod").forEach((item)=> {
      item.classList.remove("option-mod")
    })
    //sidebar.classList.remove("option-mod")
    //.classList.remove("option-mod")
    //navBarMob.classList.remove("option-mod")
  
}





function activateSummary() {
  const modSummary = document.getElementById("box-summary");
  const elements = document.querySelectorAll('.getSumMod')
  //btnSumLands.style.display = "none";
  modSummary.style.display = "flex";

  elements.forEach((element, index) => {
    element.classList.add("summary-mod");

    if (element.classList.contains("imagebox")) {
      element.style.display = "block"
    }
    if (element.classList.contains("layers")) {
      element.style.display = "block"
    }
    switch (true) {
      case element.classList.contains("box-category"):
        console.log(index, "nope")
        element.style.display = "none";
        break;
      case element.classList.contains("info-box-album"):
        console.log(index, "nope")
        break;
      case element.classList.contains("box-mods-header"):
        console.log(index, "nope")
        break;
      case element.classList.contains("footer-summary"):
        console.log(index, "nope")
        break;
      case element.classList.contains("btn-stummary"):
        console.log(index, "nope")
        break;
      case element.classList.contains("close-sum-mob"):
        console.log(index, "nope")
        break;
      case element.classList.contains("option-box"):
        console.log(index, "nope")
        break;
      case element.classList.contains("nav-mobile"):
        console.log(index,"nope")
        break;
      case element.classList.contains("sidebar"):
        console.log(index, "nope")
        break;
      default:
        element.style.display = "flex"
        console.log(index,"yes", element);
        break;
    }
  })

      // elmsFooterHeader.forEach(element => {
      //   element.style.display = "flex"
      // })
}

