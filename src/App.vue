
/*////////////////////
TO DO:
HIGH-PRIO:
  code rotation panel
  implement the rest of the components
  add a descript box for details about projects as well as git links
  load up a STAR instance

MID-PRIO:
  store color values in cookies
  ->cookies notification?
  redo log-in screen background to use the clouds and dirt, maybe something with SVGs and a pixel filter?
  have the pen projects spin around to show source code
  slim down jquery with a custom build
  optimise the minimization function 
    or at the very least add an animation or something to make it more obvious

LOW-PRIO:
  add a sign-out and close button that closes the tab or refreshes the desktop
  create an image viewer for random photos and stuff
  stop the windows closing at once from cloising other windows after the queue changes
  window physics!
///////////////////*/

<template lang="pug">
  #app
    #mobile-coverup(v-if="mobileCover")
      p Sorry! Mobile rewrite coming soon!
      p This isn't something that lends itself to being responsive!
      p I mean if you really want, you can have a look anyways?
      button(@click="mobileCover = false") Show me the mess!
    transition-group(name="login")
      login(@login="loggedIn = true" v-if="!loggedIn" key="login")
      #os(v-else key="os")
        desktop
        window( 
            v-for="(window, index) in windows" 
            :key="'window_'+index" 
            :info="window" 
            :window_id="index" 
            @popWindow="popWindow" 
            @closeWindow="closeWindow" 
            @minimizeWindow="minimizeWindow" 
          )
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
// Window files
import Explorer from './components/Explorer/Explorer'
import CoolDog from './components/Pages/CoolDog/CoolDog'
import CoolCat from './components/Pages/CoolCat/CoolCat'
import DuckRotation from './components/Pages/DuckRotation/DuckRotation'
import Settings from './components/Settings/Settings'
import jopOS from './components/Pages/JopOS/JopOS'
import MTGCard from './components/Pages/MTGCard/MTGCard'
import Misdacop from './components/Pages/Misdacop/Misdacop'
import GoldenGirls from './components/Pages/GoldenGirls/GoldenGirls'
import NotGeo from './components/Pages/NotGeo/NotGeo'
import Powerpoint from './components/Pages/Powerpoint/Powerpoint'
import Tdl from './components/Pages/Tdl/Tdl'
import Propeller from './components/Pages/Propeller/Propeller'
import Empty from './components/Empty'

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
      loggedIn: true
    }
  },
  methods:{
    popWindow(newIndex){
      // can be passed a string or a component name
      if(typeof newIndex == 'number'){
        this.windows.map((window, winIndex) =>{ 
          window.active = false
          // Anything that is in front of the new window gets pulled back
          if(window.zIndex >= this.windows[newIndex].zIndex) {
            window.zIndex -= 1
          }
          // And the new index gets popped to the front
          if (winIndex === newIndex){
            window.active = true
            window.minimized = false
            window.zIndex= this.windows.length 
          }
      });}
      else if(typeof num1 == 'string'){
        // Finds all components of that name and brings them to the front
        this.windows.map((window, winIndex) =>{ 
          // maps through and finds all the windows that match the given component name
          if (window.name === winIndex){
            this.popWindow(winIndex)
          }
        })
      }
    },
    newWindow(payload={title:"New window",name:"blank"}){
      // First sees if the selected component is listed as unique
      // if it is, it brings it to the foreground instead of making a new one
      console.log("making new window with props: ",payload)
      if(this.checkUnique(payload.name)){
        // Creates a new window components and seeds the vars needed in to it
        this.windows.push({
          title: payload.title,
          component: payload.name,
          componentInfo: payload,
          zIndex: this.windows.length + 1,
          active: true,
          framed: payload.framed,
          code: payload.code,
          args:{
            folder: this.folders[this.findNameInArray(this.folders, payload.folderPath)],
            allFolders: this.folders
          },
          minimized: false
        })
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
      this.windows.splice(winIndex,1)
    },
    minimizeWindow(payload){
      // Receives the information about the minimized window
      this.windows[payload.index].minimized = true
      this.windows[payload.index].preview = payload.preview
    },
    restoreWindow(winIndex){
      this.windows[winIndex].minimized = false  
    },
  },
  components:{
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
    jopos: jopOS,
    mtgcard: MTGCard,
    misdacop: Misdacop,
    goldengirls: GoldenGirls,
    notgeo: NotGeo,
    powerpoint: Powerpoint,
    tdl: Tdl,
    propeller: Propeller
  }
}
</script>


<style lang="stylus">
@import url('https://fonts.googleapis.com/css?family=Nunito&display=swap');

:root
  --accent: #42F47D
  --primary: #f47142
  --primary-dark: #bf522b
  --primary-darker: #7f3318
  --primary-darkest: #441909
  --primary-light: #ea8662
  --primary-lighter: #eaa991
  --primary-lightest: #edcfc4
  --text-light: #eee
  --text-dark: #222
  --text: #111
  --dark: #111
  --desktop-image: url('/img/desktop/wood-pattern.png')
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
  background-color: #f9eccd;
  fullpage()
#app 
  fullpage()
#os
  fullpage()

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
  
#mobile-coverup
  display none
@media (max-width: 500px)
  #mobile-coverup
    display grid
    width 100vw
    height 100vh
    position absolute 
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
