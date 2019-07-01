 <template lang="pug">

section.desktop
  .icon(v-for="(file, index) in fullContents" 
        v-on:dblclick="file.type==='component' ? newWindow(file.title, file.name) : newWindow(file.title, 'explorer', file.name)"
        :class="wiggles[index]?'wiggle':''")
    img(:src="file.icon" :alt="file.summary")
    .name {{(file.shortTitle ? file.shortTitle : file.title)}}

</template>

<script>
import applications from '../../assets/data/Applications'
import folders from '../../assets/data/Folders'
export default {
	name: 'Desktop',
	data() {
		return {
      componentList: applications,
      folderList: folders,
			icons:[
				{
          type: "folder",
          name: "explorer",
          folder: "experiments"
				},
				{
          type: "folder",
          name: "explorer",
          folder: "portfolio"
				},
				{
          type: "component",
					name: "duckrotation",
				},
				{
          type: "component",
					name: "star",
				},
      ],
      wiggles: [true, false, false, false]
		}
  },
  created(){
     setTimeout(() => {
        this.randomWiggler(Math.floor(Math.random() * this.icons.length))
      }, Math.random()*1000);
  },
  computed:{
    // fetches the information for the components
    fullContents: function () {
      let folderContents = this.icons
      folderContents.map((item, index) =>{
        if (item.type==="component"){
          folderContents[index] = this.getComponentDetails(item.name)
        }
        if (item.type==="folder"){
          folderContents[index] = this.getComponentDetails(item.folder,"folder")
          folderContents[index].icon = '/img/folder.svg'
        }
        folderContents[index].type = item.type
      })
      return folderContents 
    }
  },
  methods:{
    getComponentDetails(componentName,componentType="component"){
      // fetches the full application details from the componentList
      console.log("componentName",componentName)
      let newObj = {}
      if (componentType==="component"){
        this.componentList.map(component =>{
          if(component.name === componentName){
            newObj = component
          }
        })
      }
      if (componentType==="folder"){
        this.folderList.map(folder=>{
          if(folder.name===componentName){
            console.log("found folder!", folder, componentName)
            newObj = folder
            console.log("found ob!", newObj)
          }
        })
      }
      return newObj
    },
    newWindow(title, component, folderPath){
      console.log("newWindw", title, component, folderPath)
      this.$emit('newWindow',{...this.getComponentDetails(component),title: title, name: component, folderPath: folderPath})
    },
    randomWiggler(wigg){
      //sets the icon to wiggle
      this.icons.map((icon, index)=>{
        if (index===wigg){
          this.wiggles[index] = true
        }else{
          this.wiggles[index] = false
        }
      })
      console.log("wiggling ", wigg)
      console.log("wiggles ", this.wiggles)
      // starts the next wiggle countdown
      setTimeout(() => {
          console.log("wigglestart")
          this.randomWiggler(Math.floor(Math.random() * this.icons.length))
        }, (Math.random()*4000)+4000);   
      //stops the current wiggle
      setTimeout(() => {
        console.log("wigglestop")
        this.icons.map((icon, index)=>{
          this.wiggles[index] = false
        })
        }, 1500);      
      }
  },
	props: {
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" scoped>

icon-size = 80px
bckground()
  content ''
  width 100vw
  height 100vh
  position absolute 
  top 0
  left 0
  transition background-color .5s
  z-index -12
.desktop
  width 100vw
  height 100vh
  display grid 
  grid-auto-flow column
  grid-template-columns 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 
  grid-template-rows 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 
  grid-gap 15px
  position absolute
  top 0
  z-index -10
  padding 20px
  &::before
    bckground()
    background-color var(--primary-darkest)
  &::after
    bckground()
    background-image var(--desktop-image);
    z-index -11
    filter invert(var(--invert))
  .icon
    cursor pointer
    display grid
    justify-content center
    user-select none
    padding 5px
    border 2px transparent dashed
    color var(--text-light)
    text-shadow 0px 0px 10px var(--text-dark)
    transition .1s ease-out
    animation desktop-pop .4s cubic-bezier(0.790, 0.265, 0.265, 1.550) forwards
    transform scale(0)
    &:active
      border 2px dashed var(--primary)
      transition 0s ease-out
      transform scale(1.1)
    &.wiggle
      animation:wobble-hor-bottom .8s both
    img 
      width icon-size
      height icon-size
      filter: drop-shadow(0px 0px 3px var(--text-dark));
    .name
      text-align center  

for num in (1..20)
	.icon:nth-of-type({num})
		animation-delay (num + 2)* .09s

@keyframes desktop-pop{
  from{
    transform scale(0)
  }
  to{
    transform scale(1)
  }
}
/* ----------------------------------------------
 * Generated by Animista on 2019-7-1 9:25:23
 * w: http://animista.net, t: @cssanimista
 * ---------------------------------------------- */
@keyframes wobble-hor-bottom{
  0%,100%{transform:translateX(0);transform-origin:50% 50%}
  15%{transform:translateX(-30px) rotate(-6deg)}
  30%{transform:translateX(15px) rotate(6deg)}
  45%{transform:translateX(-15px) rotate(-3.6deg)}
  60%{transform:translateX(9px) rotate(2.4deg)}
  75%{transform:translateX(-6px) rotate(-1.2deg)}
}

</style>
