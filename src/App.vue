<template lang="pug">
  #app
    #os-bg
      <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><g fill-rule="evenodd"><g><path opacity=".5" d="M96 95h4v1h-4v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9zm-1 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9z" /><path d="M6 5V0H5v5H0v1h5v94h1V6h94V5H6z" /></g></g></svg>
    //- #nav
    //-   router-link(to="/") Home
    //-   router-link(to="/about") About
    #os
      window(:info="window" :window_id="index" :key="'window_'+index" v-for="(window, index) in windows" @popWindow="popWindow")
        cooldog
      taskbar
    //- router-view
  </div>
</template>

<script>
import Window from './components/Window/Window'
import Taskbar from './components/Taskbar/Taskbar'
import CoolDog from './components/Webpages/CoolDog/CoolDog'
export default {
  name: 'App',
  data() {
    return {
      windows:[
        {
          title:"lolwhat",
          active: false
        },
        {
          title:"catTime",
          active: true
        },
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
    popWindow(index){
      let tempArr = this.window[index]
      this.window.splice(index,1)
      this.window.push(tempArr)
    }
  },
  components:{
    window: Window,
    cooldog: CoolDog,
    taskbar: Taskbar
  }
}
</script>


<style lang="stylus">
@import url('https://fonts.googleapis.com/css?family=Nunito&display=swap');

:root
  --accent: #f47142
  --accent-dark: #bf522b
  --accent-darker: #7f3318
  --accent-light: #ea8662
  --accent-lighter: #eaa991
  --accent-lightst: #edcfc4
  --text-light: #eee
  --text-dark: #222
  --text: #111
  --dark: #111

body
  overflow hidden
  font-family: 'Nunito', sans-serif;
  //from http://www.heropatterns.com/
  background-color: #f9eccd;
#os
  width 100vw
  height 100vh
#os-bg
  width 100vw
  height 100vh
  position absolute
  top 0 
  left 0
  pointer-events none
  background var(--accent-lightest)
  svg 
    width 100vw
    height 100vh
    fill var(--accent-lighter)
</style>
