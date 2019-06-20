<template lang="pug">
  #app
    #os
      desktop
      window(:info="window" :window_id="index" :key="'window_'+index" v-for="(window, index) in windows" @popWindow="popWindow" @closeWindow="closeWindow")
        component(:is="window.component" @newWindow="newWindow" :args="window.args") 
      taskbar(@newWindow="newWindow")
    //- router-view
  </div>
</template>

<script>
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
        {
          title:"Explorer",
          active: true,
          zIndex: 1,
          component:'explorer',
          args:this.folder
        },
      ],
      folder:[
        {
          img: "ring.png",
          title: "The Ring",
          component:"duckrotation",
          args:{
          }
        },{
          img: "ring.png",
          title: "The Ring 2",
          component:"duckrotation",
          args:{
          }
        },{
          img: "ring.png",
          title: "The Ring 3",
          component:"duckrotation",
          args:{
          }
        }
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
        if(window.zIndex >= this.windows[newIndex].zIndex) {
          window.zIndex -= 1
        }
        if (winIndex === newIndex){
          window.zIndex= this.windows.length 
        }
      });
    },
    newWindow(payload={title:"New window",component:"blank"}){
      this.windows.push({
        title: payload.title,
        component: payload.component,
        zIndex: this.windows.length + 1,
        active: true,
        args:(payload.component="explorer"?this.folder:{})
      })
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
