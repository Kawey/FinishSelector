import {presets, icons, assets} from './presets.js'

let userSelect = presets[0]

localStorage.icon ? JSON.parse( localStorage.icon ) : localStorage.icon = JSON.stringify(icons[0])
let userIcon = JSON.parse( localStorage.icon ) ?? icons[0]

let themesContainer = document.getElementById("tabPanelThemes");

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

export function turnOptionMod() {
  const sidebar = document.getElementById("sidebar")
  const navBarMob = document.getElementById("nav-mobile")
  const optionBox = document.getElementById('option-box')
  optionBox.classList.add("option-mod")
  sidebar.classList.add("option-mod")
  navBarMob.classList.add("option-mod")
}

export function eventPreset() {
  const themeBtns = document.querySelectorAll('.btn-theme')
  themeBtns.forEach((element,index) => {
    element.addEventListener('click', (btn) => {
      console.log(btn.target.dataset.theme);
      const theme = btn.target.dataset.theme
      userSelect = presets[btn.target.dataset.theme]
      localStorage.selected = JSON.stringify(userSelect);

      userIcon = icons[[btn.target.dataset.theme]]
      localStorage.icon = JSON.stringify(userIcon);

      localStorage.asset = JSON.stringify(assets[theme]);
      switchPreset(btn.target,btn.target.dataset.theme)
    });
  });
}

function switchPreset(clickedBtn, themeNum) {
  const oldThemeBtn = themesContainer.querySelector('[aria-checked="true"]')
  oldThemeBtn.setAttribute("aria-checked", false)
  clickedBtn.setAttribute("aria-checked", true)
  if (themeNum <0) {
    themeNum = 0
    return
  } else if (themeNum >4) {
    themeNum = 4
  }
  const imgElms = document.querySelectorAll(".main-img")

  imgElms.forEach(element => {
    const type = element.id.slice(3)
    element.src = `images\\${presets[themeNum][type]}`
  })
}

function updateNavActiveIcon(targetState) {
  const activeIcon = document.querySelector(".nav-buttons.activeNavIcon")
  const activeIconClass = document.getElementsByClassName("nav-buttons activeNavIcon");
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

export function switchCustomInfoState(infoBoxMobile, boxCustomize) {
  console.log("switchCustomInfoState");
  if (localStorage.state === 'info') {
    infoBoxMobile.classList.add("act-mob-info")
    boxCustomize.classList.add("act-mob-info")
  }else {
    infoBoxMobile.classList.remove("act-mob-info")
    boxCustomize.classList.remove("act-mob-info")
  }
}