 <template lang="pug">

section.desktop
  canvas#wallpaper
  .icon(v-for="(file, index) in fullContents" 
        v-on:dblclick="file.type==='component' ? newWindow(file.title, file.name) : newWindow(file.title, 'explorer', file.name)")
    svg(mlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" v-if="file.type==='folder'" version="1.1" viewBox="0 0 24 24")
      path(d='M19,20H4C2.89,20 2,19.1 2,18V6C2,4.89 2.89,4 4,4H10L12,6H19A2,2 0 0,1 21,8H21L4,8V18L6.14,10H23.21L20.93,18.5C20.7,19.37 19.92,20 19,20Z')
    img(:src="file.icon" v-else :alt="file.summary")
    .name {{(file.shortTitle ? file.shortTitle : file.title)}}
  explanation
  button THE BUTTON SAYS {{storeMessage}}
</template>

<script>
import applications from '../../assets/data/Applications'
import folders from '../../assets/data/Folders'
import Explanation from './Explanation/Explanation'

import { EventBus } from '../../main';
import prefersReducedMotion, { motionPreferences } from '@magica11y/prefers-reduced-motion';

const motionPreference = prefersReducedMotion();
const disableAnimations = (motionPreference === motionPreferences.REDUCE);


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
          folder: "personalLinks"
				// }, {
        //   type: "folder",
        //   name: "explorer",
        //   folder: "experiments"
				}, {
          type: "folder",
          name: "explorer",
          folder: "portfolio"
				}, {
          type: "folder",
          name: "explorer",
          folder: "realProjects"
				}, {
          type: "component",
					name: "personal",
				}, {
          type: "component",
					name: "star",
				}, {
          type: "component",
					name: "duckrotation",
				}, 
      ],
      wiggles: [true, false, false, false],
      style_height: 0,
      style_width: 0,
      canvas: "",
      ctx: "",
      dpi: "",
      raf: "",
      img: new Image(),
      x: 0,
      y: 0, 
      speed: .15,
      baseSpeed: .15,
      nextSpeed: .15,
      angle: 0,
      nextAngle: 0,
      motionSetting: ""
		}
  },
  mounted(){
    this.canvas = document.getElementById('wallpaper')
    this.ctx = this.canvas.getContext('2d')
    this.dpi = window.devicePixelRatio
    this.img.src = localStorage.desktop_image || "img/desktop/foggy-birds.png"
    this.motionSetting = disableAnimations ? "none" : localStorage.motion_setting || "full"
    this.speeed = localStorage.motion_speed || .15
    disableAnimations ? localStorage.motion_setting = 'none' : ''
    this.img.onload = window.requestAnimationFrame(this.screenDraw);
    EventBus.$on('update-bg', imgName => {
      console.log("updating desktiop")
      this.img.src = imgName
      this.img.onload = window.requestAnimationFrame(this.screenDraw);
    });
    EventBus.$on('update-motion', motion => {
      console.log("updating m,otion", motion)
      this.motionSetting = motion
    });
    EventBus.$on('update-speed', newSpeed => {
      console.log("updating spead", newSpeed)
      this.baseSpeed = newSpeed      
      this.speed = newSpeed      
    });
    EventBus.$on('update-angle', newAngle => {
      console.log("updating agnel", newAngle)
      this.angle = newAngle
    });
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
          folderContents[index].icon = '/svg/folder.svg'
        }
        folderContents[index].type = item.type
      })
      return folderContents 
    },    
    absAngle(){
      // used to show where the angle would be if it were forced to be between 0 and 360
      return this.angle<=0 ? this.angle - 360 : this.angle
    },
    storeMessage() {
      return this.$store.state.message
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
            // console.log("found folder!", folder, componentName)
            newObj = folder
            // console.log("found ob!", newObj)
          }
        })
      }
      return newObj
    },
    newWindow(title, component, folderPath){
      console.log("newWindw", title, component, folderPath)
      this.$emit('newWindow',{...this.getComponentDetails(component),title: title, name: component, folderPath: folderPath})
    },      
    fix_dpi() {
      //create a style object that returns width and height  
      let style = {
        height() {
          return +getComputedStyle(this.canvas).getPropertyValue('height').slice(0,-2);
        },
        width() {
          return +getComputedStyle(this.canvas).getPropertyValue('width').slice(0,-2);
        }
      }
      //set the correct attributes for a crystal clear image!  
      this.canvas.setAttribute('width', style.width() * this.dpi);
      this.canvas.setAttribute('height', style.height() * this.dpi);
    },
    fix_dpi() {
      //get CSS height
      //the + prefix casts it to an integer
      //the slice method gets rid of "px"
      this.style_height = +getComputedStyle(this.canvas).getPropertyValue("height").slice(0, -2); //get CSS width
      this.style_width = +getComputedStyle(this.canvas).getPropertyValue("width").slice(0, -2); //scale the canvas
      this.canvas.setAttribute('height', this.style_height * this.dpi);
      this.canvas.setAttribute('width', this.style_width * this.dpi);
    },
    screenDraw() {  
      this.fix_dpi();
      this.ctx.clearRect(0,0, this.canvas.width, this.canvas.height);
      this.ctx.fillStyle = this.ctx.createPattern(this.img, 'repeat');
      this.ctx.translate(this.x, this.y);
      this.ctx.fillRect(-this.x,-this.y, this.style_width, this.style_height)  
      this.ctx.translate(this.x, this.y);
      this.ctx.fill()
      this.mover()
      this.raf = window.requestAnimationFrame(this.screenDraw);
    },
    mover(){
      if(this.motionSetting==="full"){
        if(Math.abs(Math.abs(this.angle) - Math.abs(this.nextAngle))< 2){
          // randomly picks the next direction when it gets too close
          this.nextAngle = Math.random() * 360
          // this modification makes sure the angle always takes the closest path, even if it's across the 0-axis
          Math.abs(this.nextAngle - this.absAngle)>180 ? this.nextAngle - 360 : ''
          this.nextSpeed = this.baseSpeed + (Math.random()*this.baseSpeed)-(this.baseSpeed/2)
        }
        // takes a fraction of the difference between the two values and adds in in the direction of nextAngle
        this.angle+=(Math.abs(this.angle - this.nextAngle)*.01)*Math.sign(this.nextAngle - this.angle)
        // this.speed+=(Math.abs(this.speed - this.nextSpeed)*.01)*Math.sign(this.nextSpeed - this.speed)
        // mods the x and y over the width of the image, based on the speed and the direction of the angle (from deg to rad)
        this.img.height ?
            this.x = this.x%this.img.height + (this.speed * Math.cos((this.angle*Math.PI)/180))
          : console.log("height not ready", this.img.height)
        this.img.width ?
            this.y = this.y%this.img.width + (this.speed * Math.sin((this.angle*Math.PI)/180))
          : console.log("width not ready", this.img.width)
      }else if(this.motionSetting==="linear"){
        this.img.height ?
            this.x = this.x%this.img.height + (this.speed * Math.cos((this.angle*Math.PI)/180))
          : console.log("height not ready", this.img.height)
        this.img.width ?
            this.y = this.y%this.img.width + (this.speed * Math.sin((this.angle*Math.PI)/180) )
          : console.log("width not ready", this.img.width)
      }else {
        //just do nothing! it's easy!
      }
    }
  },
	props: {
  },
  components:{
    Explanation
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
  width calc(100vw - 40px)
  height 100vh
  display flex
  flex-direction column 
  flex-wrap wrap
  align-content flex-start
  // grid-auto-flow column
  // grid-template-columns 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 
  // grid-template-rows 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 
  grid-gap 15px
  position absolute
  top 0
  z-index -10
  padding 20px
  &::before
    bckground()
    background linear-gradient(180deg, var(--primary-dark) 0% 0%, var(--primary-darkest) 100%);
  // &::after
  //   bckground()
  //   background-image var(--desktop-image);
  //   z-index -11
  //   filter invert(var(--invert))
  #wallpaper
    top 0
    left 0
    position absolute
    width 100vw
    height 100vh
    filter invert(var(--invert))
  .icon
    cursor pointer
    display grid
    justify-content center
    justify-items center
    user-select none
    gap 10px
    border 2px transparent dashed
    color var(--text-light)
    text-shadow 0px 0px 10px var(--text-dark)
    transition .1s ease-out
    animation desktop-pop .4s cubic-bezier(0.790, 0.265, 0.265, 1.550) forwards
    transform scale(0)
    fill var(--accent)
    max-width 100px
    &:active
      border 2px dashed var(--primary)
      transition 0s ease-out
      transform scale(1.1)
    &:focus
      border 2px dashed var(--primary)
      transition 0s ease-out
      transform scale(1.1)
    &.wiggle
      animation:wobble-hor-bottom .8s both
    img, svg
      width icon-size
      height icon-size
      filter: drop-shadow(0px 0px 3px var(--text-dark));
    .name
      text-align center
      height 36px

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

</style>
