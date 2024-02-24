import {presets,icons} from '../presets.js'
//import { loadSelectedImg } from '../render.js'
console.log("haha");
//console.log(loadSelectedImg);

localStorage.selected ? JSON.parse( localStorage.selected ) : localStorage.selected = JSON.stringify(presets[0])
const userSelect = JSON.parse( localStorage.selected ) ?? presets[0]

localStorage.icon ? JSON.parse( localStorage.icon ) : localStorage.icon = JSON.stringify(icons[0])
const userIcon = JSON.parse( localStorage.icon ) ?? icons[0]

console.log(userSelect);
const imgBox = document.getElementById('imagebox')

loadSelectedImg(userSelect, imgBox)
let mapName = new Map();
mapName.set('wall1', 'Wall #1');
mapName.set('wall2', 'Wall #2');
mapName.set('roof', 'Roof');
mapName.set('soffit', 'Soffit & Fascia');
mapName.set('gate', 'Garage Door');
mapName.set('door', 'Door');
mapName.set('windows', 'Windows');

const iconsHtml = document.getElementsByClassName('material')
loadIcons(iconsHtml)


function loadSelectedImg(userSelected, imgBox) {
  let imgItems = '';
  for (const property in userSelect) {
    imgItems += `<img class="layers main-img" id="img${property}" src="../images\\${userSelected[property]}" alt="Image Node"></img>`
  }
  imgBox.innerHTML += imgItems
  // for (let i = 0; i < importTabs.length; i++) {
  //   const tab = importTabs[i];
  //   const imgsrc = getDefaultImg(obj[tab], "src")
  //   imgItems += `<img class="layers main-img" id="img${tab}" src="images\\${imgsrc}" alt="Image Node"></img>`
  // }
  
}

function loadIcons(elements) {
  console.log(elements);
  console.log(mapName.get(elements.wall1.id));
  console.log(userIcon[mapName.get(elements.wall1.id)]);
  //elements.wall1.src = `../icons/${userIcon[mapName.get(elements.wall1.id)]}`
  console.log(elements.wall2.src? true: false);
  console.log(elements.door.src);
  for (let index = 0; index < elements.length; index++) {
    const element = elements[index];
    console.log(element);
    if (element.src) {
      console.log(element.id);
      console.log(mapName.get(element.id));
      console.log(userIcon[mapName.get(element.id)]);
      element.src = `../icons/${userIcon[mapName.get(element.id)]}`
      console.log("img", `../icons/${userIcon[mapName.get(element.id)]}`);
    } else {
      console.log("color", element.id);
      element.style.backgroundColor = userIcon[mapName.get(element.id)]
    }
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