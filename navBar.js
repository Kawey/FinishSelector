import {switchCustomInfoState, switchPreset} from './updateState.js'
import {presets, icons, assets} from './presets.js'

export function navBar(element, target ,infoBoxMobile, boxCustomize) {
  let [activeSummary, activeFp, activeInfo, activeCustom] = ['',"",'',''];
  let linkSummary = `onclick="location.href='./page-sum/summary.html'"`;
  let linkFP = `onclick="location.href='./page-fp/floor-plan.html'"`;
  let linkCustomizeInfo = `onclick="location.href='./index.html'"`;
  switch (target) {
    case 'summary':
      activeSummary = 'activeNavIcon'
      linkSummary = ''
      linkFP = `onclick="location.href='../page-fp/floor-plan.html'"`;
      linkCustomizeInfo = `onclick="location.href='../index.html'"`;
      break;
    case 'fp':
      activeFp = 'activeNavIcon'
      linkFP = ''
      linkCustomizeInfo = `onclick="location.href='../index.html'"`;
      linkSummary = `onclick="location.href='../page-sum/summary.html'"`;
      break;
      case 'info':
        activeInfo = 'activeNavIcon'
        //linkFP = ''
        break;
  
    default:
      activeCustom = 'activeNavIcon'
      linkCustomizeInfo = ''
      break;
  }

  const result = `  
  <button id="btnCustomize" class="nav-buttons ${activeCustom}" ${linkCustomizeInfo} data-type="customize">
    <svg class="icon-nav" width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g id="icon_m_customize">
        <rect id="Rectangle 258" x="21" y="7" width="15" height="14" rx="2" transform="rotate(90 21 7)" stroke="#A4A4A4"
          stroke-width="2" />
        <rect id="Rectangle 259" x="21" y="12" width="10" height="14" rx="2" transform="rotate(90 21 12)"
          stroke="#A4A4A4" stroke-width="2" />
      </g>
    </svg>
    <span>CUSTOMIZE</span>
  </button>
  <button id="btnInfo" class="nav-buttons ${activeInfo}" ${linkCustomizeInfo} data-type="info">
    <svg class="icon-nav" width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g id="icon_m_info">
        <path id="Rectangle 259"
          d="M14.8275 6.43849L14 5.21909L13.1725 6.43849L9.88336 11.2856C9.32122 12.114 9.0207 13.092 9.0207 14.0931L9.0207 19.0414C9.0207 21.7914 11.25 24.0207 14 24.0207C16.75 24.0207 18.9793 21.7914 18.9793 19.0414L18.9793 14.0931C18.9793 13.092 18.6788 12.114 18.1166 11.2856L14.8275 6.43849Z"
          stroke="#A4A4A4" stroke-width="2" />
        <rect id="Rectangle 260" x="12.709" y="18.6127" width="2.58063" height="4.51611" fill="#A4A4A4" />
        <rect id="Rectangle 261" x="12.709" y="13.1291" width="2.58063" height="2.58063" fill="#A4A4A4" />
      </g>
    </svg>
    <span>INFO</span>
  </button>
  <button id="btnFP" class="nav-buttons ${activeFp}" ${linkFP} type="button" data-type="fp">
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g id="icon_m_fp">
        <rect id="Rectangle 258" x="14" y="3.41421" width="14.9704" height="14.9704" rx="2"
          transform="rotate(45 14 3.41421)" stroke="#A4A4A4" stroke-width="2" />
        <path id="Line 285" d="M8.99805 18.9998L13.498 14.4999" stroke="#A4A4A4" stroke-width="2"
          stroke-linecap="round" />
        <path id="Line 287" d="M15.9971 11.9999L18.997 8.99991" stroke="#A4A4A4" stroke-width="2"
          stroke-linecap="round" />
        <path id="Line 286" d="M13.498 14.4998L17.998 18.9998" stroke="#A4A4A4" stroke-width="2"
          stroke-linecap="round" />
      </g>
    </svg>
    <span>FLOOR PLAN</span>
  </button>
  <button id="btnSummary" class="nav-buttons ${activeSummary}" ${linkSummary} data-type="summary">
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g id="icon_m_sum">
        <rect id="Rectangle 194" x="3" y="6" width="17.8888" height="2.55554" rx="1.27777" fill="#A4A4A4" />
        <rect id="Rectangle 197" x="23.4443" y="6" width="2.55554" height="2.55554" rx="1.27777" fill="#A4A4A4" />
        <rect id="Rectangle 195" x="3" y="12.7374" width="17.8888" height="2.55554" rx="1.27777" fill="#A4A4A4" />
        <rect id="Rectangle 198" x="23.4443" y="12.7374" width="2.55554" height="2.55554" rx="1.27777" fill="#A4A4A4" />
        <rect id="Rectangle 196" x="3" y="19.4747" width="17.8888" height="2.55554" rx="1.27777" fill="#A4A4A4" />
        <rect id="Rectangle 199" x="23.4443" y="19.4747" width="2.55554" height="2.55554" rx="1.27777" fill="#A4A4A4" />
      </g>
    </svg>
    <span>SUMMARY</span>
  </button>
  <button id="btnReset" class="nav-buttons" data-type="reset">
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g id="icon_m_reset">
        <path id="Vector"
          d="M14.5 8.75448V10.3193C14.5 10.7128 15.0063 10.9051 15.2969 10.6253L17.9125 8.18623C18.1 8.01139 18.1 7.74037 17.9125 7.56553L15.2969 5.12643C15.0063 4.85542 14.5 5.04775 14.5 5.44115V7.00602C10.3562 7.00602 7 10.1358 7 13.9999C7 14.9091 7.1875 15.7833 7.53438 16.5788C7.7875 17.1646 8.59375 17.3219 9.07188 16.8761C9.325 16.64 9.42813 16.2816 9.2875 15.9669C9.01562 15.3637 8.875 14.6905 8.875 13.9999C8.875 11.1062 11.3969 8.75448 14.5 8.75448ZM19.9281 11.1236C19.675 11.3597 19.5719 11.7269 19.7125 12.0328C19.975 12.6448 20.125 13.3092 20.125 13.9999C20.125 16.8936 17.6031 19.2452 14.5 19.2452V17.6804C14.5 17.287 13.9937 17.0946 13.7031 17.3744L11.0875 19.8135C10.9 19.9883 10.9 20.2593 11.0875 20.4342L13.7031 22.8733C13.9937 23.1443 14.5 22.952 14.5 22.5673V20.9937C18.6438 20.9937 22 17.8639 22 13.9999C22 13.0907 21.8125 12.2164 21.4656 11.4209C21.2125 10.8351 20.4063 10.6778 19.9281 11.1236Z"
          fill="#A4A4A4" />
      </g>
    </svg>
    <span>RESET</span>
  </button>
`
  element.innerHTML = result
  element.addEventListener('click', (event) => {
    const clickedElement = event.target;
    console.log(clickedElement.closest('button').dataset.type);
    const clickTarget = clickedElement.closest('button').dataset.type
    if (localStorage.state === 'customize' && clickTarget == 'info' ) {
      navBar(element,'info',infoBoxMobile, boxCustomize)
      localStorage.state = clickTarget
      switchCustomInfoState(infoBoxMobile, boxCustomize)
    }else{
      clickTarget === 'reset' ? localStorage.state : localStorage.state = clickTarget
    }

    if (clickTarget === 'reset' && localStorage.state != 'summary') {
      localStorage.selected = JSON.stringify(presets[0]);
      localStorage.icon = JSON.stringify(icons[0]);
      localStorage.asset = JSON.stringify(assets[0]);
      switchPreset(undefined, 0)
    }
    
    console.log(infoBoxMobile, boxCustomize);
    
  })
}



