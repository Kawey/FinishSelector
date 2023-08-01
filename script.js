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
  console.log("categoryBtns", categoryBtns.length);
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

  //Switch presets
  const presetArrowBtns = document.querySelectorAll(".theme")
  presetArrowBtns.forEach(element => {
    element.addEventListener('click', (arrow) => {
      console.log("this",arrow.currentTarget.id.split('-')[1]);
      const direction = arrow.currentTarget.id.split('-')[1]
      if (direction === "right") {
        switchPreset(currentTheme+1)
      } else {
        switchPreset(currentTheme-1)
      }
    });
  });

  function switchPreset(targetTheme) {
    if (targetTheme <0) {
      targetTheme = 0
      return
    } else if (targetTheme >4) {
      targetTheme = 4
    }
    const imgElms = document.querySelectorAll(".main-img")
    console.log(imgElms);

    imgElms.forEach(element => {
      console.log(element.id.slice(3));
      const type = element.id.slice(3)
      console.log("&& ",presets[targetTheme][type]);
      element.src = `images\\${presets[targetTheme][type]}`
    })
    document.getElementById("themeNumber").innerHTML = targetTheme+1
    currentTheme = targetTheme
  }

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

  // activate SUMMARY in landscape mode
  btnSumLands.addEventListener("click", () => {
    updateState("summary")
    const sidebar = document.getElementById("sidebar")
    sidebar.classList.remove("option-mod")
    optionBox.classList.remove("option-mod")
    activateSummary(elementsSumMod)
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
    console.log(event.target.parentElement);
    if (event.target == modalInfo) {
      updateState("category")
      modalInfo.style.display = "none";
    }
  }
}); //load end

export function openOptionMenu(params) {
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

function activateSummary(elements) {
  const modSummary = document.getElementById("box-summary");
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

