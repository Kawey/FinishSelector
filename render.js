import {updateState, turnOptionMod, eventPreset} from './updateState.js'
import {presets, icons} from './presets.js'

// No default value needed, left-hand operand is "Hello"
const greeting = "Hello";
const defaultGreeting = greeting ?? "Hi";
console.log(defaultGreeting); // Output: "Hello"

// Default value used, left-hand operand is undefined
let name;
const fullName = name ?? "Guest";
console.log(fullName); // Output: "Guest"

localStorage.selected ? JSON.parse( localStorage.selected ) 
: localStorage.selected = JSON.stringify(presets[0])
const userSelect = JSON.parse( localStorage.selected ) ?? presets[0]

localStorage.icon ? JSON.parse( localStorage.icon ) 
: localStorage.icon = JSON.stringify(icons[0])
const userIcon = JSON.parse( localStorage.icon ) ?? icons[0]
//localStorage.selected = JSON.stringify(userSelect);


fetch('../asset.json')
  .then(response => response.json())
  .then(data => {
    const imgBox = document.getElementById('image-container')
    // Access the data and create list items for each item in the array
    const importTabs = data.Tabs;

    loadImages(data, userSelect) //load img tags
    loadCategoryMenu(data)//load tab link buttons
    loadTabContent(data)
    loadThemeTabContent(presets)
    //loadSummary(data)
    //activateDefaultColors(data)
    //document.getElementById("defaultOpen").click();
    const allOptionTiles = document.querySelectorAll(".tile")
    allOptionTiles.forEach((tile)=>{
      tile.addEventListener("click",(evnt)=>{
        const {type,file,color,icon} = evnt.currentTarget.dataset
        console.log("wow!",evnt.currentTarget, evnt.currentTarget.dataset.type);
        colorClick(evnt.currentTarget, evnt.currentTarget.dataset.type)

        console.log("data", type);
        const srcIcon = icon ?? color
        updateSelectedImg(type, file, srcIcon)
        console.log(icon);
      })
    })
  })
  .catch(error => console.error(error));

export function updateSelectedImg(key, value, srcIcon) {
  console.log("updateSelectedImg");
  userSelect[key]= value;
  localStorage.selected = JSON.stringify(userSelect);
  userIcon[key]= srcIcon;
  localStorage.icon = JSON.stringify(userIcon);
}

function loadThemeTabContent(themes) {
  const ThemeBox = document.getElementById('tabPanelThemes')
  themes.forEach((theme,index) => {
    const div = document.createElement("div")
    if (index===0) {
      div.setAttribute("aria-checked", true);
    }
    div.classList.add("btn-category")
    div.classList.add("btn-theme")
    div.dataset.theme = index;
    div.setAttribute("role", "option")
    div.innerHTML = `Preset #${index+1}`
    ThemeBox.appendChild(div)
  })
  eventPreset()
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
      imgItems += `<img class="layers main-img" id="img${tab}" src="../images\\${userSelect[tab]}" alt="Image Node"></img>`
      console.log(userSelect[tab]);
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
  // for (let i = 0; i < importTabs.length; i++) {
  //   const tab = importTabs[i];
  // }
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
    //const tabBox = document.getElementById('exterior-tab')
    const tabBox = document.getElementById('tabPanel-2')
  
    let tabItems = '';
    for (let i = 0; i < importTabs.length; i++) {
      const tab = importTabs[i];
        tabItems += `<button class="btn-category" 
        data-tab="${tab}">${tab}</button>`

    }
    tabBox.innerHTML += tabItems
    console.log("openOptionMenu()");
    //openOptionMenu()

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
      let finishIcon = icon? `<img src="./icons/${icon}" alt="">`: `<div style="background: ${color};"></div>`
      tabItems += `<div id="${tab.toLowerCase()}-color0" class=" tile color ${tab.toLowerCase()}-color" 
          data-file="${src}" data-item-name="${name}" ${srcIcon}
          data-color="${color}" data-type="${tab}">
        ${finishIcon}
        <span>${name}</span>
      </div>`
      console.log("icon",icon);
      // add ALL color item
      for (const key in imgObj[tab]) {
        if (Object.hasOwnProperty.call(imgObj[tab], key)) {
          const element = imgObj[tab][key];
          //console.log(element)
          const { name, color, src, icon } = element
          let finishIcon = icon? `<img src="./icons/${icon}" alt="">`: 
                                `<div style="background: ${color};"></div>`
          //console.log(name, color, src);
          srcIcon = icon ? `data-icon="${icon}"` : ''
          tabItems += `<div class=" tile color ${tab.toLowerCase() }-color" 
      data-file="${src}" data-item-name="${name}"
          data-color="${color}" data-type="${tab}" ${srcIcon}>
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
    const img = document.getElementById(`img${itemName}`)
    console.log("img",img);
    img.src = `images/${evt.dataset.file}`;
  }