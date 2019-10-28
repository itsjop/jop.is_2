<template lang="pug">
section.taskbar(ref="taskbar")
  .bg
  .pinned.application(@click="newWindow('Settings','settings')")
    .shadow
    svg.icon(mlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" viewBox="0 0 24 24")
      path( d="M12,15.5A3.5,3.5 0 0,1 8.5,12A3.5,3.5 0 0,1 12,8.5A3.5,3.5 0 0,1 15.5,12A3.5,3.5 0 0,1 12,15.5M19.43,12.97C19.47,12.65 19.5,12.33 19.5,12C19.5,11.67 19.47,11.34 19.43,11L21.54,9.37C21.73,9.22 21.78,8.95 21.66,8.73L19.66,5.27C19.54,5.05 19.27,4.96 19.05,5.05L16.56,6.05C16.04,5.66 15.5,5.32 14.87,5.07L14.5,2.42C14.46,2.18 14.25,2 14,2H10C9.75,2 9.54,2.18 9.5,2.42L9.13,5.07C8.5,5.32 7.96,5.66 7.44,6.05L4.95,5.05C4.73,4.96 4.46,5.05 4.34,5.27L2.34,8.73C2.21,8.95 2.27,9.22 2.46,9.37L4.57,11C4.53,11.34 4.5,11.67 4.5,12C4.5,12.33 4.53,12.65 4.57,12.97L2.46,14.63C2.27,14.78 2.21,15.05 2.34,15.27L4.34,18.73C4.46,18.95 4.73,19.03 4.95,18.95L7.44,17.94C7.96,18.34 8.5,18.68 9.13,18.93L9.5,21.58C9.54,21.82 9.75,22 10,22H14C14.25,22 14.46,21.82 14.5,21.58L14.87,18.93C15.5,18.67 16.04,18.34 16.56,17.94L19.05,18.95C19.27,19.03 19.54,18.95 19.66,18.73L21.66,15.27C21.78,15.05 21.73,14.78 21.54,14.63L19.43,12.97Z")
    label Settings
  .pinned.application(@click="newWindow('New Folder','explorer','portfolio')")
    .shadow
    svg.icon(mlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" viewBox="0 0 24 24")
      path(d='M19,20H4C2.89,20 2,19.1 2,18V6C2,4.89 2.89,4 4,4H10L12,6H19A2,2 0 0,1 21,8H21L4,8V18L6.14,10H23.21L20.93,18.5C20.7,19.37 19.92,20 19,20Z')
    label Explorer
  .pinned.application(@click="newWindow('Calculator','calculator')" )
    .shadow
    img.icon(src="/pages/Calculator/icon.png")
    label Calculator
  //- .pinned.application(@click="newWindow('Notepad','notepad')")
    .shadow
    img.icon(src="/pages/Notepad/icon.png")
    label Notepad
  .vertbar(v-if="windows.length > 0")
  .active.application(v-for="(window, index) in appCategories" @click="popAllOfType(index)")
    .shadow
    img.icon(:src="window.icon")
    label {{window.title}}
  .vertbar(v-if="windows.filter(item => item.minimized ===true).length > 0")
  .active.application(v-for="(minWin, index) in windows" v-if="minWin.minimized" @click="restoreWindow(index)")
    .shadow
    img.icon(:src="minWin.preview")
    label {{minWin.title}} 
</section>


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
          title: "Settings",
          icon: "/svg/setting2.svg",
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
    },
    appCategories: function(){
      let cats = []//categories
      this.windows.map(window =>{
        if(!cats.includes(window.component)){
          cats.push(window)
        }
      })
      return cats
    }
  },
  props: {
    windows:{
      type: Array
    }
  },
  methods:{
    newWindow(title, component, folderPath){
      console.log("NEWWINDWOSASDf")
      console.log("title",title,"name",component,"folderPath",folderPath)
      console.log(this.getComponentDetails(component))
      this.$emit('newWindow',{...this.getComponentDetails(component),title: title, name: component, folderPath: folderPath})
    },
    restoreWindow(index){
      this.$emit('restoreWindow', index)
    },
    popAllOfType(type){
      this.windows.map((window, index)=>{
        if(window.component === type){
          this.$emit('popWindow',index)
        }
      })
      // this.$emit('restoreWindow', index)
    },
    getComponentDetails(componentName){
      let newObj = {}
      console.log("componentName",componentName)
      console.log("componentList",this.componentList)
      this.componentList.map(component =>{
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
<style lang="stylus">

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
    background var(--primary) 
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
    // max-width 100px
    // height 80px
    animation appAppear .3s cubic-bezier(0.560, -0.005, 0.300, 1.460) forwards
    z-index 1
    &:hover
      transform translateY(-30%) 
      label
        opacity 1
        background #dddddd99
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
      transform scale(1) translateY(-10%)
      filter: drop-shadow(0px 10px 10px var(--primary-darker));
    svg
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
      color #ffffff
      white-space: nowrap;
      border 2px solid #eeeeeeee
      &:after
        content ''
        background #eeeeeeee
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
