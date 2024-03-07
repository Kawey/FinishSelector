import { navBar} from '../navBar.js'

// mobile nav bar state menagment
localStorage.state ? localStorage.state 
: localStorage.state = "fp"
localStorage.state = "fp"

const elmNavBar = document.getElementById('nav-mobile')
navBar(elmNavBar, 'fp')