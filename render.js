import {openOptionMenu} from './script.js'
//Current satate obj
const userSelect = {}
export const presets = [{
  "Brick": "brick_00.png",
  "Stone": "stone_00.png",
  "Roof": "roof_00.png",
  "Filing": "filing_00.png",
  "Gate": "gate_00.png",
  "Door": "door_00.png",
  "Windows": "windows_00.png"
},{
  "Brick": "brick_01.png",
  "Stone": "stone_01.png",
  "Roof": "roof_01.png",
  "Filing": "filing_01.png",
  "Gate": "gate_01.png",
  "Door": "door_01.png",
  "Windows": "windows_01.png"
},{
  "Brick": "brick_02.png",
  "Stone": "stone_02.png",
  "Roof": "roof_02.png",
  "Filing": "filing_02.png",
  "Gate": "gate_02.png",
  "Door": "door_02.png",
  "Windows": "windows_02.png"
},{
  "Brick": "brick_03.png",
  "Stone": "stone_03.png",
  "Roof": "roof_03.png",
  "Filing": "filing_03.png",
  "Gate": "gate_03.png",
  "Door": "door_03.png",
  "Windows": "windows_03.png"
},{
  "Brick": "brick_04.png",
  "Stone": "stone_04.png",
  "Roof": "roof_04.png",
  "Filing": "filing_04.png",
  "Gate": "gate_04.png",
  "Door": "door_01.png",
  "Windows": "windows_04.png"
}]

fetch('asset.json')
  .then(response => response.json())
  .then(data => {
    const imgBox = document.getElementById('image-container')
    // Access the data and create list items for each item in the array
    const importTabs = data.Tabs;

    loadImages(data) //load img tags
    loadCategoryMenu(data)//load tab link buttons
    loadTabContent(data)
    //loadSummary(data)
    //activateDefaultColors(data)
    //document.getElementById("defaultOpen").click();
    const allOptionTiles = document.querySelectorAll(".tile")
    allOptionTiles.forEach((tile)=>{
      tile.addEventListener("click",(evnt)=>{
        console.log("wow!",evnt.currentTarget, evnt.currentTarget.dataset.type);
        colorClick(evnt.currentTarget, evnt.currentTarget.dataset.type)
      })
    })
    //console.log("Fetch done!");
  })
  .catch(error => console.error(error));

  window.addEventListener('DOMContentLoaded', function () {
    //console.log("Render Loaded");
  })

  function loadImages(imgObj) {
    const importTabs = imgObj.Tabs;
    //const importDefaultObj = imgObj.Default;
    const imgBox = document.getElementById('imagebox')
    imgBox.innerHTML += `<img class="layers" src="images\\${imgObj.BG}" alt="BG"></img>`
    //Default options loop imgObj.Default
    let imgItems = '';
    
    // create main IMG elements
    for (let i = 0; i < importTabs.length; i++) {
      const tab = importTabs[i];
      const imgsrc = getDefaultImg(imgObj.Default[tab], "src")
      imgItems += `<img class="layers main-img" id="img${tab}" src="images\\${imgsrc}" alt="Image Node"></img>`
      addImg2DOM(imgObj[tab], tab)
    }
    imgBox.innerHTML += imgItems
    for (let i = 0; i < importTabs.length; i++) {
      const tab = importTabs[i];
    }
  }

  function getDefaultImg(obj, target) {
    //console.log("fuunc");
    for (const property in obj) {
      if (obj.hasOwnProperty(property)) {
        if (typeof obj[property] === "object") {
          return getDefaultImg(obj[property], target); // recursive call
        } else {
          //console.log(`this ${property}: ${target}`);
          //console.log(target === property);
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
    const tabBox = document.getElementById('exterior-tab')
  
    let tabItems = '';
    for (let i = 0; i < importTabs.length; i++) {
      const tab = importTabs[i];
        tabItems += `<button class="btn-category" 
        data-tab="${tab}">${tab}</button>`

    }
    tabBox.innerHTML += tabItems
    openOptionMenu()
  }

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
      let finishIcon = icon? `<img src="./icons/${icon}" alt="">`: `<div style="background: ${color};"></div>`
      tabItems += `<div id="${tab.toLowerCase()}-color0" class=" tile color ${tab.toLowerCase()}-color" 
          data-file="${src}" data-item-name="${name}"
          data-color="${color}" data-type="${tab}">
        ${finishIcon}
        <span>${name}</span>
      </div>`

      // add ALL color item
      for (const key in imgObj[tab]) {
        if (Object.hasOwnProperty.call(imgObj[tab], key)) {
          const element = imgObj[tab][key];
          //console.log(element)
          const { name, color, src, icon } = element
          let finishIcon = icon? `<img src="./icons/${icon}" alt="">`: 
                                `<div style="background: ${color};"></div>`
          //console.log(name, color, src);
          tabItems += `<div class=" tile color ${tab.toLowerCase() }-color" 
      data-file="${src}" data-item-name="${name}"
          data-color="${color}" data-type="${tab}">
      ${finishIcon}
      <span>${name}</span>
      </div>`
      //onclick="colorClick(this, '${tab}')"
        }
      }
      div.innerHTML += tabItems
      allTabsDiv.appendChild(div)
      
      
    }
    
  }

  function colorClick(evt, itemName) {
    //console.log(evt.target.parentElement.id.toLowerCase());
    console.log("itemName ", `img${itemName}`);
    const img = document.getElementById(`img${itemName}`)
    console.log("img", img);
    console.log("evt.target.dataset.file ",evt.dataset.file);
    img.src = `images/${evt.dataset.file}`;
    //document.getElementById(`option-${itemName.toLowerCase()}`).innerText = evt.target.dataset.itemName;
    //document.getElementById(`${itemName.toLowerCase()}-color`).style.background = evt.target.dataset.color;
    //console.log(evt.target.parentElement.id.toLowerCase(), evt.target);
    //activeColor(`${evt.target.parentElement.id.toLowerCase()}-color`, evt.target) 
  }