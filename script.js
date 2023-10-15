//import {sayHi} from './render.js';
import {presets} from './render.js'
let currentTheme = 0
const currentState = new URLSearchParams(window.location.search).get('state');
//console.log("currentState",currentState);

// On load, check query pram and update the DOM
window.addEventListener('DOMContentLoaded', function () {
  //console.log('DOMContentLoaded');
  switch (currentState) {
    case "category":
      
      break;
    case "options":
      turnOptionMod()
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
  //console.log(urlParams);
  //document.getElementById('paramValue').textContent = currentParamValue || 'None';
});

function getAllQueryParameters() {
  const urlParams = new URLSearchParams(window.location.search);
  const queryParams = {};

  for (const [paramName, paramValue] of urlParams.entries()) {
      queryParams[paramName] = paramValue;
  }

  return queryParams;
}

window.addEventListener("load", (event) => {
  //console.log('Loaded');
  const btnCloseOptions = document.getElementById("btnCloseOption");
  const optionBox = document.getElementById('option-box')

  const extIntBtns = document.querySelectorAll('.btns-ext-int')
  const tabInterior = document.getElementById("interior-tab")
  const tabExterior = document.getElementById("exterior-tab")
  const categoryBtns = document.querySelectorAll('.btn-category')
  const btnCloseSumLands = document.getElementById("btnCloseSumLands")

  const elementsSumMod = document.querySelectorAll('.getSumMod')
  const elmsFooterHeader = document.querySelectorAll('.get-footer-header')

  const modalInfo = document.getElementById("modal-info-mobile");
  const modalFP = document.getElementById("modal-FP-mobile");
  const modSummary = document.getElementById("box-summary");
  const modCategory = document.getElementById("box-category");

  const infoBoxAlbum = document.getElementById("info-box-album");

  const btnSumLands = document.getElementById("btnSumLands");

  const btnCloseFPLands = document.getElementById("btnCloseFPLands");

  // TABS SYSTEM
  const tabsContainer = document.querySelector("[role=tablist]");
  const tabButtons = tabsContainer.querySelectorAll("[role=tab]");
  const tabPanels = document.querySelectorAll("[role=tabpanelexterior]");
  console.log(tabsContainer, tabButtons, tabPanels);

  // Get NAV Mobile buttons
  // btnCustomize need add in future
  const btnInfo = document.getElementById("btnInfo");
  const btnFP = document.getElementById("btnFP");
  const btnSummary = document.getElementById("btnSummary");
  //btnReset need add in future
  const btnCloseSumMob = document.getElementById("btnCloseSumMob");
  //console.log('Element clicked:', extIntBtns);
  const btnsCloseSum = document.querySelectorAll(".btnCloseSum")

  /*
      BUTTONS EVENT LISTENERS
  */

  //Switch Interior / Exterior
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

  tabsContainer.addEventListener("click", (e) => {
    const clickedTab = e.target.closest("button");
    const currentTab = tabsContainer.querySelector('[aria-selected="true"]');
    console.log(currentTab);
    if (!clickedTab || clickedTab === currentTab) return;
  
    switchTab(clickedTab, tabsContainer);
  });

  //OLD switch tab panels remove
  const btnsThemeCustom = document.querySelectorAll(".btn-icon-txt-color")
  const tabTheme = document.getElementById("theme-tab")
  const btnCustomFacade = document.getElementById("btnCustom")
  const btnColorThemes = document.getElementById("btnThemes")

  //OLD switch tab panels remove
//   btnsThemeCustom.forEach(element => {
//   element.addEventListener('click', ()=> {
//     console.log("element.id", element.id, "active",element.classList.contains('border-active') );
//     if (element.id == "btnThemes") {
//       if (!element.classList.contains('border-active')) {
//         console.log('activate theme');
//         closeOptionsMenu()
//         btnCustomFacade.classList.remove("border-active")
        
//         btnColorThemes.classList.add("border-active")
        
//         tabExterior.style.display = "none"
//         tabTheme.style.display = "flex"
//       }
//     } else {
//       if (!element.classList.contains('border-active')) {
//         console.log('The btnCustom ');
//         btnColorThemes.classList.remove("border-active")
        
//         btnCustomFacade.classList.add("border-active")
//         tabExterior.style.display = "flex"
//         tabTheme.style.display = "none"
//       }
//     }
//   });
// });

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

  // avtivate INFO mode nav-bar
  btnInfo.onclick = function () {
    updateState("info")
    modalInfo.style.display = "flex";
  }

  btnSummary.onclick = function () {
    updateState("summary")
    activateSummary(elementsSumMod)
    modCategory.style.display = "none";
    modSummary.style.display = "flex";
  }

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function (event) {
    if (event.target == modalInfo) {
      updateState("category")
      modalInfo.style.display = "none";
    }
  }

  // activate SUMMARY in landscape mode
  btnSumLands.addEventListener("click", () => {
    updateState("summary")
    const sidebar = document.getElementById("sidebar")
    sidebar.classList.remove("option-mod")
    optionBox.classList.remove("option-mod")
    activateSummary()
  })

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
}); //load end

function switchTab(newTab, tabsContainer) {
  console.log("tabsContainer", tabsContainer);
  const oldTab = tabsContainer.querySelector('[aria-selected="true"]')
  const activePanelId = newTab.getAttribute("aria-controls");
  const activePanel = tabsContainer.nextElementSibling.querySelector(
    "#" + CSS.escape(activePanelId)
  );
  console.log("activePanel", activePanel);
  const tabButtons = tabsContainer.querySelectorAll("[role=tab]");
  tabButtons.forEach((button) => {
    button.setAttribute("aria-selected", false);
    button.setAttribute("tabindex", "-1");
  });
  const tabPanels = document.querySelectorAll("[role=tabpanelexterior]");
  tabPanels.forEach((panel) => {
    panel.setAttribute("hidden", true);
  });

  activePanel.removeAttribute("hidden", false);

  newTab.setAttribute("aria-selected", true);
  newTab.setAttribute("tabindex", "0");
  newTab.focus();
  moveIndicator(oldTab, newTab);
}

export function eventPreset() {
  const themeBtns = document.querySelectorAll('.btn-theme')
  themeBtns.forEach((element,index) => {
    element.addEventListener('click', (btn) => {
      switchPreset(btn.target.dataset.theme)
    });
  });
}

function switchPreset(targetTheme) {
  if (targetTheme <0) {
    targetTheme = 0
    return
  } else if (targetTheme >4) {
    targetTheme = 4
  }
  const imgElms = document.querySelectorAll(".main-img")

  imgElms.forEach(element => {
    console.log(element.id.slice(3));
    const type = element.id.slice(3)
    //console.log("&& ",presets[targetTheme][type]);
    element.src = `images\\${presets[targetTheme][type]}`
  })
}

export function openOptionMenu() {
    // open OPTIONS
    const categoryBtns = document.querySelectorAll('.btn-category')
    categoryBtns.forEach((element,index) => {
      element.addEventListener('click', () => {
        updateState("options")
        turnOptionMod()
        console.log(' category Element clicked:', element.dataset.tab);
        document.getElementById("optionName").innerHTML = element.dataset.tab
  
        const tabcontent = document.getElementsByClassName("box-options-tiles");
        for (let i = 0; i < tabcontent.length; i++) {
          tabcontent[i].style.display = "none";
        }
      const categoryBtn = document.getElementsByClassName("btn-category");
      for (let i = 0; i < categoryBtn.length; i++) {
        categoryBtn[i].className = categoryBtn[i].className.replace(" active", "");
      }
      document.getElementById(element.dataset.tab).style.display = "grid";
      console.log("element ",element);
      element.className += " active";
      });
    });
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

export function turnOptionMod() {
  const sidebar = document.getElementById("sidebar")
  const navBarMob = document.getElementById("nav-mobile")
  const optionBox = document.getElementById('option-box')
  optionBox.classList.add("option-mod")
  sidebar.classList.add("option-mod")
  navBarMob.classList.add("option-mod")
}

function updateNavActiveIcon(targetState) {
  const activeIcon = document.querySelector(".nav-buttons.activeNavIcon")
  const activeIconClass = document.getElementsByClassName("nav-buttons activeNavIcon");
  console.log("activeIcon ",activeIcon, activeIconClass);
  activeIcon.classList.remove("activeNavIcon")
  switch (targetState) {
    case "category":
      document.getElementById("btnCustomize").classList.add("activeNavIcon")
      break;
    case "options":
      document.getElementById("btnCustomize").classList.add("activeNavIcon")
      break;
    case "info":
      document.getElementById("btnInfo").classList.add("activeNavIcon")
      break;
    case "floorplan":
      document.getElementById("btnFP").classList.add("activeNavIcon")
      break;
    case "summary":
      document.getElementById("btnSummary").classList.add("activeNavIcon")
      break;
    default:
      document.getElementById("btnCustomize").classList.add("activeNavIcon")
      console.log("Switch default");
      break;
  }
}

export function updateState(paramValue) {
  updateNavActiveIcon(paramValue)
  // Get the current URL
  const url = new URL(window.location.href);

  // Set the query parameter
  url.searchParams.set('state', paramValue);
  url.searchParams.set('wall', "0")
  // Update the URL with the new query parameter
  window.history.replaceState({}, '', url);
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

