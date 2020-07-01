/*////////////////////
TO DO:
SHIPPABLE:
  ABOUT YOU JACKASS
  load up / record a STAR instance
  async call on minimization
  re-comment the whole thing for final build

MID-PRIO:
  background sliding left and right
  redo log-in screen background to use the clouds and dirt, maybe something with SVGs and a pixel filter?
  optimise the minimization function 
    or at the very least add an animation or something to make it more obvious

LOW-PRIO:
  nested folders
  desktop drag-and-drop selection
  add a sign-out and close button that closes the tab or refreshes the desktop
  create an image viewer for random photos and stuff
  stop the windows closing at once from cloising other windows after the queue changes
  window physics!

  go back to doing the rotating panel code rotation 
  3-language panel for code, git link in the header
///////////////////*/

<template lang="pug">
  #app
    #mobile-coverup(v-if="mobileCover")
      p Sorry! Mobile rewrite coming soon!
      p This isn't something that lends itself to being responsive!
      p I mean if you really want, you can have a look anyways?
      button(@click="mobileCover = false") Show me the mess!
    transition-group(name="login")
      login(@login="loggedIn = true" :style="!this.$route.path.slice(1) ? '' : 'display: none'" v-if="!loggedIn" key="login")
      #os(v-else key="os")
        clippy(ref="clippy" @clipLoad="setInitialClippy")
        desktop(@newWindow="newWindow")
        window( 
            v-for="(window, index) in windows" 
            :key="window.uid"
            :info="window"
            @changeProp="changeProp"
            @popWindow="popWindow" 
            @closeWindow="closeWindow" 
            @minimizeWindow="minimizeWindow"
            @setMinimizedPreview="setMinimizedPreview")
          component(:is="window.component" @newWindow="newWindow" :args="window.args") 
        taskbar(:windows="windows" @newWindow="newWindow" @restoreWindow="restoreWindow")
  </div>
</template>

<script>
// External
import folder_structure from './assets/data/Folders'
import applications from './assets/data/Applications'
// Core Elements
import Desktop from './components/Desktop/Desktop'
import Taskbar from './components/Taskbar/Taskbar'
import Window from './components/Window/Window'
import Login from './components/Login/Login'
import Clippy from './components/Clippy/Clippy'
// Window files
import Explorer from './components/Explorer/Explorer'
import CoolDog from './components/Pages/CoolDog/CoolDog'
import CoolCat from './components/Pages/CoolCat/CoolCat'
import DuckRotation from './components/Pages/DuckRotation/DuckRotation'
import Settings from './components/Settings/Settings'
import JopOS from './components/Pages/JopOS/JopOS'
import NotGeo from './components/Pages/NotGeo/NotGeo'
import Powerpoint from './components/Pages/Powerpoint/Powerpoint'
import Propeller from './components/Pages/Propeller/Propeller'
import Brambles from './components/Pages/Brambles/Brambles'
import Personal from './components/Pages/Personal/Personal'
import Calculator from './components/Pages/Calculator/Calculator'
import Notepad from './components/Pages/Notepad/Notepad'
import Star from './components/Pages/Star/Star'
import Empty from './components/Empty'
import Misdacop from './components/Pages/Misdacop/Misdacop'
import GoldenGirls from './components/Pages/GoldenGirls/GoldenGirls'
import MTGCard from './components/Pages/MTGCard/MTGCard'

/* 
-- All Window Properties --
title     (str) Title of Application.
component (str) Name/ID of component to render in slot.
zIndex    (num) Literally the z-index. Tracks the visual stacking order of the windows.
active    (bül) Whether or not the window is in front. Used for optimisation purposes.
minimized (bül) For whether or not the component is minimized. 
args      (obj) Miscellanous arguments. Fed directly to the component slot.
  folder      (arr) For <explorer>. Name of current folder.
  allFolders  (arr) For <explorer>. All folders directly from folder_structure. Used for navigation later.
*/

export default {
  name: 'App',
  data() {
    return {
      windows:[],
      folders: folder_structure,
      componentList: applications,
      mobileCover: true,
      loggedIn: false,
      interacted: false,
      wallpaperImg: ""
    }
  },
  mounted() {
    if (localStorage.color_accent) {
      // Sets up all the local storage variables
			document.documentElement.style.setProperty('--accent', localStorage.color_accent);
			document.documentElement.style.setProperty('--primary', localStorage.color_primary);
			document.documentElement.style.setProperty('--primary-dark', localStorage.color_dark);
			document.documentElement.style.setProperty('--primary-darker', localStorage.color_darker);
			document.documentElement.style.setProperty('--primary-darkest', localStorage.color_darkest);
			document.documentElement.style.setProperty('--primary-light', localStorage.color_light);
			document.documentElement.style.setProperty('--primary-lighter', localStorage.color_lighter);
			document.documentElement.style.setProperty('--primary-lightest', localStorage.color_lightest);
			document.documentElement.style.setProperty('--text-light', localStorage.color_text_light);
      document.documentElement.style.setProperty('--text-dark', localStorage.color_text_dark);
      document.documentElement.style.setProperty('--invert', localStorage.bg_invert);
    }
    if(localStorage.desktop_image){
      document.documentElement.style.setProperty('--desktop-image', localStorage.desktop_image);
    }else{
      localStorage.desktop_image = "/img/desktop/foggy-birds.png"
    }

    console.log("path", this.$route.path)
    console.log("pathl", this.$route.path.slice(1).length)
    // skips login and loads a window if there's a URL present
    this.$route.path.slice(1).length > 0 ?
      this.checkLoadRoute(this.$route.path.slice(1)) 
      : console.log("no special route")
  },
  methods:{
    checkLoadRoute(){
      this.loggedIn = true
      console.log("path",this.$route.path.slice(1).split('/'))
      let prams = ("path",this.$route.path.slice(1).split('/'))
      console.log('prams', prams)
      // short code for folder or anything else that needs to be categorized
      if (prams[0] === "f"){ }
      if (prams[0] === "explorer"){
        this.$router.push({path:"/"})
      }else{
        this.newWindow({name: prams[0], centered: true})
      }
    },
    popWindow(newIndex){
      // can be passed a string or a component name
      // if the name ends in a number it's a window uid
      // console.log("POP", newIndex,newIndex[newIndex.length -1])
      if(typeof Number(newIndex[newIndex.length -1]) == 'number'){
        // console.log("NUMBER")
        this.windows.map((window, winIndex) =>{
          window.active = false
          // Anything that is in front of the new window gets pulled back
          if(window.uid !== newIndex) {
            window.zIndex -= 1
          }
          // And the new index gets popped to the front
          if (window.uid === newIndex){
            window.active = true
            window.minimized = false
            window.zIndex= this.windows.length
            this.$router.push({path:window.name})
          }
        })
      }
      else {
        // Finds all components of that name and brings them to the front
        this.windows.map((window, winIndex) =>{ 
          // maps through and finds all the windows that match the given component name
          if (window.name === winIndex){
            this.popWindow(winIndex)
          }
        })
      }
    },
    generateIterativeName(name){
      let uniqueName = name
      let unique = false
      let loopUnique = true
      let number = 0
      while(!unique){
        this.windows.map(window=>{
          if (window.uid === uniqueName+number){
            // did find a match
            loopUnique = false
          }
          if (loopUnique){
            //if no match was found it is unique
            unique = true
          }else{
            //else tries again on the next loop
            loopUnique = true
            number+=1
          }
        })
        return uniqueName+number
      }
      return uniqueName
    },
    newWindow(payload={title:"New window",name:"blank",centered: false}){
      // First sees if the selected component is listed as unique
      // if it is, it brings it to the foreground instead of making a new one
      console.log("making new window with props: ",payload)
      if(this.checkUnique(payload.name)){
        // Creates a new window components and seeds the vars needed in to it
        // Generates a unique window name
        let iterativeName = this.generateIterativeName(payload.name)
        // Looks up the window's data in the event it isn't passed,
        // for instance, in the event it's opened from a URL
        let windowData = applications.filter(app => app.name === payload.name)[0]
        this.$router.push({path:payload.name})
        this.windows.push({
          //TODO: get a proper spread operator in here
          title: payload.title || windowData.title,
          component: payload.name,
          componentInfo: payload,
          zIndex: this.windows.length + 1,
          active: true,
          framed: payload.framed,
          code: payload.code,
          icon: payload.icon || windowData.icon,
          url: payload.url,
          size: payload.size,
          name: payload.name,
          uid: iterativeName,
          centered: payload.centered,
          args:{
            folder: this.folders[this.findNameInArray(this.folders, payload.folderPath)],
            allFolders: this.folders
          },
          minimized: false,
        })
        if(!this.$route.path.slice(1)){
          this.$refs.clippy.dismissClippy(`Thanks!
            I'll get out of your way now.`)
        }
        localStorage.clippy = true
        setTimeout(() => {
          this.interacted = true
        }, 1300);
        this.popWindow(this.windows.length - 1)
      }
    },
    checkUnique(component){
      // Checks to see if the listed component is in the unique category
      let result = true
      let isUnique = false
      console.log("checking unique")
      this.componentList.map(comp =>{
        if(comp.name === component){
          if(comp.unique){
            isUnique = true;
          }
        }
      })
      if(isUnique) {
        // If it is, it sees if it already exists
        this.windows.map((window, winIndex) =>{
          if(window.component === component){
            this.popWindow(winIndex)
            console.log("found")
            result = false
          }          
        })
      }else{
        // If it's not unique or not existing it goes ahead and creates a new one
        console.log("not unique")
      }
      return result
    },
    findNameInArray(array, name, id="name"){
      // finds name by selector (default 'name')
      // going back, this could be replaced with 'array.filter' but eh it's already here
      let ret = ""
      array.map((arr, thisIndex) =>{
        if(arr[id] === name){
          ret = thisIndex
        }
      })
      return ret
    },
    closeWindow(winIndex){
      // Actually removes the window from data
      this.windows = this.windows.filter(item => item.uid != winIndex)
      console.log("WINDOWS", this.windows)
      this.$router.push({path:this.windows.length ? this.windows[this.windows.length - 1].name : "/"})
      console.log("windows",this.windows)

    },
    minimizeWindow(payload){
      // Receives the information about the minimized window
      this.windows.map(window=>{
        if (window.uid === payload.index){
          window.minimized = true
           window.preview = ""
        }
      })
    },
    setMinimizedPreview(payload){
      // Receives the information about the minimized window
      this.windows = this.windows.map(window=>{
        // finds the window ID that needs to be minimised and updates its preview
        if (window.uid === payload.index){
          window.preview = payload.preview
        }
        return window
      })
    },
    restoreWindow(winIndex){
      this.windows[winIndex].minimized = false  
    },
    setInitialClippy(){
      console.log('pelase')
      if(this.$route.path.slice(1)){ 
        this.$refs.clippy.showClippy(9000, "Here's that app you wanted, cheif!", "...okay! Seeya!")}
      else if(!localStorage.clippy){ 
        this.$refs.clippy.showClippy(30000, `Howdy, welcome! 
        Go ahead and double-click on anything over there to get started!`, "Okay, I guess I'll leave you to it!")}
    },
    changeProp(payload){
      this.data[payload.prop] = payload.val
    }
  },
  components:{
    clippy: Clippy,
    login: Login,
    window: Window,
    empty: Empty,
    cooldog: CoolDog,
    coolcat: CoolCat,
    duckrotation: DuckRotation,
    desktop: Desktop,
    taskbar: Taskbar,
    explorer: Explorer,
    settings: Settings,
    jopos: JopOS,
    mtgcard: MTGCard,
    misdacop: Misdacop,
    goldengirls: GoldenGirls,
    notgeo: NotGeo,
    powerpoint: Powerpoint,
    star: Star,
    brambles: Brambles,
    propeller: Propeller,
    personal: Personal,
    notepad: Notepad,
    calculator: Calculator,
  }
}
</script>


<style lang="stylus">
@import url('https://fonts.googleapis.com/css?family=Nunito&display=swap');

:root
  --accent: #f4427e
  --primary: #b842f4
  --primary-dark: #860bc5
  --primary-darker: #650994
  --primary-darkest: #440664
  --primary-light: #ca72f7
  --primary-lighter: #d33af8
  --primary-lightest: #dca2fa
  --text-light: #fff
  --text-dark: #440664
  --text: #111
  --dark: #111
  --desktop-image: url('/img/desktop/foggy-birds.png')
  --invert: 0

t-time = .5s
*
  transition: color t-time, background-color t-time, drop-shadow t-time, fill t-time, filter t-time
h1, h2, h3, h4, h5, h6
  color var(--text-dark)
hr 
  border-color var(--text-dark)
  border-style outset
  border-width 1px
fullpage()
  width 100vw
  height 100vh
  z-index -100
  position absolute
body
  overflow hidden
  font-family: 'Nunito', sans-serif;
  //from http://www.heropatterns.com/
  fullpage()
#app 
  fullpage()
#os
  fullpage()

.router-check
  position absolute
  top 0 
  right 50%
  background limegreen
  color white

.login 
	transition all 0.5s cubic-bezier(0.680, -0.550, 0.375, 0.885)
.login-enter, .login-leave-to 
	opacity 0
	transform translateY(-100%)
.login-enter-to 
	opacity 1
	transform translateY(00%)
.login-leave-active, .card-move 
	opacity 1
	transition all 0.5s cubic-bezier(0.680, -0.550, 0.375, 0.885)
  

.tippy-popper[x-placement^="top"]
  .tippy-tooltip
    background var(--primary)
    filter drop-shadow(0px 0px 5px var(--primary))
  .tippy-arrow
      border-top 8px solid var(--primary)
      filter drop-shadow(0px 0px 5px var(--primary))


#mobile-coverup
  display none
@media (max-width: 500px)
  #mobile-coverup
    display grid
    width 100vw
    height 100vh
    position fixed 
    padding 10px
    top 0
    left 0
    z-index 99999
    justify-content center
    align-content center
    color white
    background black
    text-align center
    box-sizing: border-box;




</style>
