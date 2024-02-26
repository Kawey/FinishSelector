// http://127.0.0.1:5501/page-sum/summary.html?Wall1=Wall1&Wall2=Wall2&Roof=Roof&SoffitFascia=SoffitFascia&GarageDoor=GarageDoor&Door=Door&Windows=Windows
// http://127.0.0.1:5501/page-sum/summary.html?Wall1=brick1&Wall2=stone1&Roof=roof1&SoffitFascia=filing1&GarageDoor=gate1&Door=door1&Windows=window1

import {presets,icons, assets} from '../presets.js'
//import { loadSelectedImg } from '../render.js'
console.log("haha");
//console.log(loadSelectedImg);

// fetch('../asset.json')
//   .then(response => response.json())
//   .then(data => {

//   })
//   .catch(error => console.error(error));

localStorage.selected ? JSON.parse( localStorage.selected ) : localStorage.selected = JSON.stringify(presets[0])
const userSelect = JSON.parse( localStorage.selected ) ?? presets[0]

localStorage.icon ? JSON.parse( localStorage.icon ) : localStorage.icon = JSON.stringify(icons[0])
const userIcon = JSON.parse( localStorage.icon ) ?? icons[0]

localStorage.asset ? JSON.parse( localStorage.asset ) : localStorage.asset = JSON.stringify(assets[0])
const userAsset = JSON.parse( localStorage.asset ) ?? assets[0]

//console.log(userSelect);
const imgBox = document.getElementById('imagebox')
const iconsHtml = document.getElementsByClassName('material')
const btnPDF = document.getElementById('btnPDF');
const urlParams = new URLSearchParams(window.location.search);
console.log(urlParams.has("Wall1"));

if (urlParams.size ===7 && urlParams.has("Wall1")) {
  console.log("Search");
  loadFromUrl(urlParams, imgBox, iconsHtml)
  console.log(iconsHtml);

} else {
  console.log("Local");
  loadSelectedImg(userSelect, imgBox)
  loadIcons(iconsHtml, userIcon)
}

async function getAllAssets() {
  let response = await fetch('../asset.json');
  let allAssets = await response.json();
  
  return allAssets
}


document.getElementById('btnShare').addEventListener('click', () => {
console.log("share");
createUrlParams(userAsset)
});

btnPDF.addEventListener("click", ()=>{
  console.log("pdf");
  //btnPDF.style.display= "none";
  //const element2print = document.getElementsByTagName('body')
  const element2print = document.getElementById('print')
  console.log(element2print);
  //const element2print = document.createElement("div");
  //const imgContainer = document.getElementById('image-container');
  //const copyImg = imgContainer.cloneNode(true);

  //const element = document.getElementById('element-to-print');
  //const copyElement = element.cloneNode(true);

  //element2print.appendChild(copyImg);
  //element2print.appendChild(copyElement);
  var opt = {
    margin: 5,
    filename: 'hosue.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 5},
    jsPDF: { unit: 'mm', format: 'letter', orientation: 'landscape' }
    };

    // New Promise-based usage:
    html2pdf().set(opt).from(element2print).save();
    btnPDF.style.display = "block";
});

async function loadFromUrl(searchParams, imgBox, icons) {
   const allAssets = await getAllAssets()
   const savePreset = {}
   for(let [name, value] of searchParams) {
    //console.log(`${name} ${value}`);
    //console.log(allAssets[name][value].src);

    let imgItems = '';
    const srcImg = allAssets[name]?.[value]?.src ?? allAssets.Default[name].src;
    savePreset[name] = srcImg
    console.log(srcImg);
    imgItems += `<img class="layers main-img" id="img${value}" src="../images\\${srcImg}" alt="Image Node"></img>`
    imgBox.innerHTML += imgItems

    const element = icons[name];
    console.log(element);
    if (element.src) {
      const srcIcon = allAssets[name]?.[value]?.icon ?? allAssets.Default[name].icon;
      element.src = `../icons/${srcIcon}`
      //console.log("img", `../icons/${userIcon[element.id]}`);
    } else {
      
      const color = allAssets[name]?.[value]?.color ?? allAssets.Default[name].color;
      console.log("color", color)
      element.style.backgroundColor = color
    }
  }
  localStorage.selected = JSON.stringify(savePreset)
}

function loadSelectedImg(userSelected, imgBox) {
  let imgItems = '';
  for (const property in userSelect) {
    imgItems += `<img class="layers main-img" id="img${property}" src="../images\\${userSelected[property]}" alt="Image Node"></img>`
  }
  imgBox.innerHTML += imgItems
}

function loadIcons(elements, userIcon) {
  for (let index = 0; index < elements.length; index++) {
    const element = elements[index];
    //console.log(element);
    if (element.src) {
      element.src = `../icons/${userIcon[element.id]}`
      //console.log("img", `../icons/${userIcon[element.id]}`);
    } else {
      console.log("color", element.id);
      element.style.backgroundColor = userIcon[element.id]
    }
  }
}

function createUrlParams(userAsset) {
  const paramsObj = { foo: "bar", baz: "bar" };
  const searchParams = new URLSearchParams(userAsset);

  // Create a new URL object, starting with the base path of the current URL
  const newUrl = new URL(window.location.pathname, window.location.href);

  // Append the search parameters to the new URL object
  newUrl.search = searchParams.toString();

  // Update the address bar with the complete URL
  //window.location.href = newUrl;
  navigator.clipboard.writeText(newUrl)
  .then(() => {
    console.log('Text copied to clipboard!');
  })
  .catch(err => {
    console.error('Failed to copy text:', err);
  });
}
