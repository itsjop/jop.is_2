// TODO: Change style based on user agent
// Create Mobile View Version

// Personal Clippy Assistant

<template lang="pug">
  #app
    #os
      desktop
      window(:info="window" :window_id="index" :key="'window_'+index" v-for="(window, index) in windows" @popWindow="popWindow" @closeWindow="closeWindow" )
        component(:is="window.component" @newWindow="newWindow" :args="window.args") 
      taskbar(@newWindow="newWindow" )
    //- router-view
  </div>
</template>

<script>
import folders_json from './assets/data/Folders'

import Window from './components/Window/Window'
import Taskbar from './components/Taskbar/Taskbar'
import Desktop from './components/Desktop/Desktop'
import CoolDog from './components/Webpages/CoolDog/CoolDog'
import CoolCat from './components/Webpages/CoolCat/CoolCat'
import DuckRotation from './components/Webpages/DuckRotation/DuckRotation'
import Explorer from './components/Explorer/Explorer'
import Empty from './components/Empty'
export default {
  name: 'App',
  data() {
    return {
      windows:[
      ],
      folders: folders_json,
      uniqueList:[
        "cooldog",
        "coolcat"
      ]
    }
  },
  props: {
    msg: String
  },
  methods:{
    updateTitle(){
      this.windows[0].title = "dog"
    },
    popWindow(newIndex){
      this.windows.map((window, winIndex) =>{ 
        // Anything that is in front of the new window gets pulled back
        if(window.zIndex >= this.windows[newIndex].zIndex) {
          window.zIndex -= 1
        }
        // And the new index gets popped to the front
        if (winIndex === newIndex){
          window.zIndex= this.windows.length 
        }
      });
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
        })
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
        // If it doesn't it goes ahead and creates a new one
        // Or if it doesn't care if there's multiples
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
      // actually removes the window from data
      console.log("closing window", winIndex)
      this.windows.splice(winIndex,1)
    },
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
