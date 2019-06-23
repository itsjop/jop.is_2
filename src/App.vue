/*
minimize animation / flagging
Exporting DOM image to raw data
Passing that data upwards
Passing the raw data down to the toolbar
Adding it to the minimized array
Rendering it to the Taskbar
*/

<template lang="pug">
  #app
    #os
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
// Core Elements
import Desktop from './components/Desktop/Desktop'
import Taskbar from './components/Taskbar/Taskbar'
import Window from './components/Window/Window'
// Window files
import Explorer from './components/Explorer/Explorer'
import CoolDog from './components/Webpages/CoolDog/CoolDog'
import CoolCat from './components/Webpages/CoolCat/CoolCat'
import DuckRotation from './components/Webpages/DuckRotation/DuckRotation'
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
      folders: folder_structure,
      windows:[],
      uniqueList:[
        "cooldog",
        "coolcat"
      ],// Tracks the list of unique windows, only one of each Unique window can exist at a time. 
    }
  },
  props: {
    msg: String
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
    newWindow(payload={title:"New window",component:"blank"}){
      // First sees if the selected component is listed as unique
      // if it is, it brings it to the foreground instead of making a new one
      console.log("newWindow",payload)
      if(this.checkUnique(payload.component)){
        // Creates a new window components and seeds the vars needed in to it
        this.windows.push({
          title: payload.title,
          component: payload.component,
          zIndex: this.windows.length + 1,
          active: true,
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
      console.log("checking unique")
      if(this.uniqueList.includes(component)) {
        // If it is, it sees if it already exists
        console.log("component",component)
        this.windows.map((window, winIndex) =>{
          console.log("window.component",window.component)
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
      let please = ""
      array.map((arr, thisIndex) =>{
        if(arr[id] === name){
          please = thisIndex
        }
      })
      return please
    },
    closeWindow(winIndex){
      // Actually removes the window from data
      this.windows.splice(winIndex,1)
    },
    minimizeWindow(payload){
      // Receives the information about the minimized window
      this.windows[payload.index].minimized = true
      console.log("minimize start")
      setTimeout(() => {				
        console.log("minimize real")
      }, 500);
    },
    restoreWindow(winIndex){
      this.windows[winIndex].minimized = false  
    }
  },
  components:{
    window: Window,
    empty: Empty,
    cooldog: CoolDog,
    coolcat: CoolCat,
    duckrotation: DuckRotation,
    desktop: Desktop,
    taskbar: Taskbar,
    explorer: Explorer
  }
}
</script>


<style lang="stylus">
@import url('https://fonts.googleapis.com/css?family=Nunito&display=swap');

:root
  --accent: #f47142
  --accent-dark: #bf522b
  --accent-darker: #7f3318
  --accent-darkest: #441909
  --accent-light: #ea8662
  --accent-lighter: #eaa991
  --accent-lightest: #edcfc4
  --text-light: #eee
  --text-dark: #222
  --text: #111
  --dark: #111

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
</style>
