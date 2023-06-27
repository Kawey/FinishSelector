window.addEventListener("load", (event) => {
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

  // Get the button that opens the modal
  const btnInfo = document.getElementById("btnInfo");
  const btnFP = document.getElementById("btnFP");
  const btnSummary = document.getElementById("btnSummary");
  const btnCloseSumMob = document.getElementById("btnCloseSumMob");
  //console.log('Element clicked:', extIntBtns);


  /*
      EVENT LISTENERS
  */

  // btnFPLands.addEventListener("click", () => {
    
  // })
  
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

  btnSumLands.addEventListener("click", () => {
    const sidebar = document.getElementById("sidebar")
    sidebar.classList.remove("option-mod")
    optionBox.classList.remove("option-mod")
    activateSummary(elementsSumMod)
  })

  btnCloseSumLands.addEventListener("click", () => {
    elementsSumMod.forEach(element => {
      element.classList.remove("summary-mod");

      switch (true) {
        case element.classList.contains("imagebox"):
          console.log("haha")
          break;

        default:
          break;
      }
    })

    modSummary.style.display = "none";
    modCategory.style.display = "flex";
    
  })

  //open options
  categoryBtns.forEach(element => {
    element.addEventListener('click', () => {
      const sidebar = document.getElementById("sidebar")
      // Your event handler code goes here
      optionBox.classList.add("option-mod")
      sidebar.classList.add("option-mod")
      console.log(' category Element clicked:', element);
    });
  });

  btnCloseOptions.addEventListener('click', () => {
    console.log("click");
    const sidebar = document.getElementById("sidebar")
    sidebar.classList.remove("option-mod")
    optionBox.classList.remove("option-mod")
  })
  // Get the modal

  // When the user clicks on the button, open the modal
  btnInfo.onclick = function () {
    modalInfo.style.display = "flex";
  }

  btnSummary.onclick = function () {
    activateSummary(elementsSumMod)
    modCategory.style.display = "none";
    modSummary.style.display = "flex";
    //btnCloseSumMob.style.display = "block";
  }

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function (event) {
    console.log(event.target);
    if (event.target == modalInfo) {
      modalInfo.style.display = "none";
    }
    if (event.target == modalFP) {
      modalFP.style.display = "none";
    }
    if (event.target.id == "btnCloseSumMob") {
      modSummary.style.display = "none";
      modCategory.style.display = "flex";
      elementsSumMod.forEach(element => {
        element.classList.remove("summary-mod");
      })
    }
  }
});

function activateSummary(elements) {
  const modSummary = document.getElementById("box-summary");
  //btnSumLands.style.display = "none";
  modSummary.style.display = "flex";

  elements.forEach(element => {
    element.classList.add("summary-mod");

    if (element.classList.contains("imagebox")) {
      element.style.display = "block"
    }
    if (element.classList.contains("layers")) {
      element.style.display = "block"
    }
    switch (true) {
      case element.classList.contains("box-category"):
        console.log("hahaha")
        element.style.display = "none";
        break;
      case element.classList.contains("info-box-album"):
        console.log("nope")
        break;
      case element.classList.contains("box-mods-header"):
        console.log("nope")
        break;
      case element.classList.contains("footer-summary"):
        console.log("nope")
        break;
      case element.classList.contains("btn-stummary"):
        console.log("nope")
        break;
      case element.classList.contains("close-sum-mob"):
        console.log("nope")
        break;
      case element.classList.contains("option-box"):
        console.log("nope")
        break;
      default:
        element.style.display = "flex"
        console.log("yes", element);
        break;
    }
  })

      // elmsFooterHeader.forEach(element => {
      //   element.style.display = "flex"
      // })
}

