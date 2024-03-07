import {updateState, turnOptionMod, craateEventPresetBtn} from './updateState.js'
import {presets, icons, assets} from './presets.js'

localStorage.selected ? JSON.parse( localStorage.selected ) 
: localStorage.selected = JSON.stringify(presets[0])
const userSelect = JSON.parse( localStorage.selected ) ?? presets[0]

localStorage.icon ? JSON.parse( localStorage.icon ) 
: localStorage.icon = JSON.stringify(icons[0])
const userIcon = JSON.parse( localStorage.icon ) ?? icons[0]

localStorage.asset ? JSON.parse( localStorage.asset ) 
: localStorage.asset = JSON.stringify(assets[0])
const userAssets = JSON.parse( localStorage.asset ) ?? assets[0]


//localStorage.selected = JSON.stringify(userSelect);


fetch('./asset.json')
  .then(response => response.json())
  .then(data => {
    const imgBox = document.getElementById('image-container')
    // Access the data and create list items for each item in the array
    const importTabs = data.Tabs;

    loadImages(data, userSelect) //load img tags
    loadCategoryMenu(data)//load tab link buttons
    loadTabContent(data)
    loadThemeTabContent(presets)
    const allOptionTiles = document.querySelectorAll(".tile")
    allOptionTiles.forEach((tile)=>{
      tile.addEventListener("click",(evnt)=>{
        const {type,file,color,icon} = evnt.currentTarget.dataset
        const subType = evnt.currentTarget.id
        colorClick(evnt.currentTarget, evnt.currentTarget.dataset.type)

        const srcIcon = icon ?? color
        saveSelection(type, subType, file, srcIcon)
        
      })
    })
  })
  .catch(error => console.error(error));

export function saveSelection(key, subType, value, srcIcon) {
  userSelect[key]= value;
  localStorage.selected = JSON.stringify(userSelect);
  userIcon[key]= srcIcon;
  localStorage.icon = JSON.stringify(userIcon);
  userAssets[key] = subType;
  localStorage.asset = JSON.stringify(userAssets);
}

function loadThemeTabContent(themes) {
  const ThemeBox = document.getElementById('tabPanelThemes')
  themes.forEach((theme,index) => {
    const div = document.createElement("div")
    if (index===0) {
      div.setAttribute("aria-checked", true);
      div.id = 'first'
    }
    div.classList.add("btn-category")
    div.classList.add("btn-theme")
    div.dataset.theme = index;
    div.setAttribute("role", "option")
    div.innerHTML = `Preset #${index+1}`
    ThemeBox.appendChild(div)
  })
  craateEventPresetBtn()
}

function loadImages(imgObj, userSelect) {
  const importTabs = imgObj.Tabs;
  //const importDefaultObj = imgObj.Default;
  const imgBox = document.getElementById('imagebox')
  imgBox.innerHTML += `<img class="layers" src="images\\${imgObj.BG}" alt="BG"></img>`
  //Default options loop imgObj.Default
  let imgItems = '';
  
  // create main IMG elements
  for (let i = 0; i < importTabs.length; i++) {
    const tab = importTabs[i];
    if (userSelect) {
      imgItems += `<img class="layers main-img" id="img${tab}" src="./images\\${userSelect[tab]}" alt="Image Node"></img>`
    }else{
      const imgsrc = getDefaultImg(imgObj.Default[tab], "src")
      imgItems += `<img class="layers main-img" id="img${tab}" src="images\\${imgsrc}" alt="Image Node"></img>`
    }
    
  }
  imgBox.innerHTML += imgItems
  for (let i = 0; i < importTabs.length; i++) {
    const tab = importTabs[i];
    addImg2DOM(imgObj[tab], tab)
  }
}

  function getDefaultImg(obj, target) {
    //console.log("fuunc");
    for (const property in obj) {
      if (obj.hasOwnProperty(property)) {
        if (typeof obj[property] === "object") {
          return getDefaultImg(obj[property], target); // recursive call
        } else {
          if (target === property) {
            //console.log("return", obj[property] );
            return obj[property]
          }
          //console.log(`this${property}: ${obj[property]}`);
        }
      }
    }
  }

  function addImg2DOM(obj, tab) {
    for (const property in obj) {
      if (obj.hasOwnProperty(property)) {
        if (typeof obj[property] === "object") {
          const imgBox = document.getElementById('imagebox')
          imgBox.innerHTML += `<img class="layers" src="images\\${obj[property].src}" alt="back load" style="display: none;"></img>`
          addImg2DOM(obj[property], tab); // recursive call
        } else {
          //console.log(`${property}: ${obj[property]}`);
        }
      }
    }
  }

  function loadCategoryMenu(imgObj) {
    const importTabs = imgObj.Tabs;
    //const tabBox = document.getElementById('exterior-tab')
    const tabBox = document.getElementById('tabPanel-2')
  
    let tabItems = '';
    for (let i = 0; i < importTabs.length; i++) {
      const tab = importTabs[i];
        tabItems += `<button class="btn-category" 
        data-tab="${tab}">${tab}</button>`

    }
    tabBox.innerHTML += tabItems

    // open OPTIONS selected catigory
    const categoryBtns = document.querySelectorAll('.btn-category')
    categoryBtns.forEach((element,index) => {
      element.addEventListener('click', () => {
        updateState("options")
        turnOptionMod()
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
      element.className += " active";
      });
      console.log("op ev");
    });
  }

// create options tiles
function loadTabContent(imgObj) {
  const importTabs = imgObj.Tabs;
  const allTabsDiv = document.getElementById('option-box')

  for (let i = 0; i < importTabs.length; i++) {
    let tabItems = '';
    const tab = importTabs[i];
    const div = document.createElement("div")
    div.id = tab
    //console.log(tab, imgObj.Default[tab]);
    if (i == 0) { //default tab?
      
      div.className = "box-options-tiles active" //static for def?
      div.style.display = "grid"
      
    } else { //not default tab?
      div.classList.add("box-options-tiles")
      div.style.display = "none"
    }

    // add DEFAULT color item
    const { name, color, src, icon } = imgObj.Default[tab]
    //console.log(name,color,src,icon);
    let srcIcon = icon ? `data-icon="${icon}"` : ''
    let finishIcon = icon ? `<img src="./icons/${icon}" alt="">`
    : `<div style="background: ${color};"></div>`

    tabItems += `<div id="${tab}" class=" tile color ${tab.toLowerCase()}-color" 
      data-file="${src}" data-item-name="${name}" ${srcIcon}
      data-color="${color}" data-type="${tab}">
      ${finishIcon}
      <span>${name}</span>
    </div>`
    // add ALL color item
    for (const key in imgObj[tab]) {
      if (Object.hasOwnProperty.call(imgObj[tab], key)) {
        const element = imgObj[tab][key];
        const { name, color, src, icon } = element

        let finishIcon = icon ? 
        `<img src="./icons/${icon}" alt="">`: `<div style="background: ${color};"></div>`
        srcIcon = icon ? `data-icon="${icon}"` : ''

        tabItems += `<div class=" tile color ${tab.toLowerCase() }-color" 
          id="${key}"
          data-file="${src}" data-item-name="${name}"
          data-color="${color}" data-type="${tab}" ${srcIcon}>
          ${finishIcon}
          <span>${name}</span>
        </div>`
      }
    }
    div.innerHTML += tabItems
    allTabsDiv.appendChild(div)
  }

}

  function colorClick(evt, itemName) {
    const img = document.getElementById(`img${itemName}`)
    img.src = `images/${evt.dataset.file}`;
  }