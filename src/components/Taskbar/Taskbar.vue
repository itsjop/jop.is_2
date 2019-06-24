<template lang="pug">

section.taskbar(ref="taskbar")
  .bg
  .pinned.application(v-for="app in pinnedApplications" @click="newWindow(app.title,app.name)")
    .shadow
    img.icon(:src="app.icon")
    label {{app.title}}
  .vertbar
  .active.application(v-for="app in activeApplications")
    .shadow
    img.icon(:src="app.icon")
    label {{app.title}}
  .vertbar
  button(@click="newWindow('New Folder','explorer','portfolio')") NEW WINDOW
  .vertbar
  .active.application(v-for="(window, index) in windows" v-if="window.minimized" @click="restoreWindow(index)")
    .shadow
    img.icon(:src="window.preview")
    label {{window.title}}

</template>

<script>
import applications from '../../assets/data/Applications'
export default {
  name: 'taskbar',
  data() {
    return {
      componentList: applications,
      pinnedApplications:[
        {
          title: "Incredible Application",
          icon: "/svg/settings.svg",
          name: "settings"
        },
      ],
      activeApplications:[
        {
          title: "Active Application",
          icon: "thing.png",
          name: ""
        }
      ]
    }
  },
  computed:{
    // fetches the information for the components
    fullContents: function () {
      let folderContents = this.args.folder.contents
      folderContents.map((item, index) =>{
        if (item.type==="component"){
          folderContents[index] = this.getComponentDetails(item.name)
        }
      })
      return folderContents
    }
  },
  props: {
    windows:{
      type: Array
    }
  },
  methods:{
    newWindow(title, component, folderPath){
      console.log("title",title,"name",component,"folderPath",folderPath)
      this.$emit('newWindow',{title: title, name: component, folderPath: folderPath})
    },
    restoreWindow(index){
      this.$emit('restoreWindow', index)
    },
    getComponentDetails(componentName){
      let newObj = {}
      this.componentList.map(component =>{
        console.log("hit component details", componentName, component.name)
        if(component.name === componentName){
          console.log("component",component)
          newObj = component
        }
      })
      return newObj
    },
    slerdMePlease(){
      // I don't remember what the hell this was supposed to be but I can't bring myself to delete it
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" scoped>

.taskbar					
  position absolute 
  bottom 0
  height 100px
  left 50%
  transform translate(-50%)
  padding 0 20px
  transition .2s
  display flex
  justify-content space-between
  z-index 50
  perspective 50vw
  // &:hover
  // 	transform translate(-50%) scale(1.1)
  .bg
    position absolute
    background cyan 
    width 100%
    height 50%
    bottom 0
    transform rotateX(30deg)
  .shadow
    position absolute
    bottom 20px
    left 50%
    transform translateX(-50%)
    background black
    width 100%
    height 10px
    border-radius 100%
    filter blur(5px)
    z-index -1
    transition .1s
    mix-blend-mode overlay
  .vertbar
    width 2px 
    height 80%
    background white
    margin 0 20px 0 10px
    border-radius 3px
    opacity .6
  .application
    margin 0px 20px
    padding 20px 0 30px
    transition .1s ease
    transform translateY(0%)
    display grid
    position relative
    animation appAppear .3s cubic-bezier(0.560, -0.005, 0.300, 1.460) forwards
    z-index 1
    &:hover
      transform translateY(-30%) 
      label
        opacity 1
        background #44444444
        transform translate(-50%,0%)
        padding 4px
        border-radius 5px
        position absolute
      .icon
        transform scale(1.3) translateY(-10%)
    .icon
      border-radius 10px
      transition .1s ease
      max-width 80px
      min-width 60px
      cursor pointer
      fill var(--accent)
    label
      opacity 0
      background gray
      transition .1s
      text-align center
      position absolute
      top -40px
      left 50%
      transform translate(-50%,0%)
      white-space: nowrap;
      border 2px solid #55555555
      &:after
        content ''
        background #44444444
        position absolute
        bottom -10px
        left 50%
        width 20px
        height 10px
        transform translate(-50%)
        clip-path: polygon(45% 100%, 0 0, 100% 0);
  button	
    height 40px
    transform translateY(50%) scale(1)
    cursor pointer

@keyframes appAppear{
  from{
    transform translateY(50%) 
  }
  to{
    transform translateY(-00%) 
  }
}

</style>
