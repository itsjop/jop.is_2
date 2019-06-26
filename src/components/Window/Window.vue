<template lang="pug">

//- Overrides the styling for the window positioning if minimized. Also, can't be line-broken :/
.windowpane(:id="'windowpane-'+info.zIndex"
    v-bind:style="info.minimized ? {transform: 'translate('+ '50%, 120%)', zIndex: info.zIndex} : {transform: 'translate('+ xPerc +'%,' + yPerc +'%)', zIndex: info.zIndex}"
    :class="(info.minimized ? 'minimized ' : ' ' )+(dragging?'dragging':'')")
  .window(ref="window" :id="'window-'+info.zIndex"
      :class="(closing ? 'closing' : '')+' '+(info.minimized ? 'minimized' : '')" 
      @mousedown="popWindow(window_id)" :style="{ width: width+'px', height: height+'px',  }")
    .shadow(:style="{transform: 'translate('+ xShadow +'%,' + yShadow +'%)',}")
    .toolbar(@mousedown="startDrag" ref="toolbar")
      .blank
      .bg(:class="info.active ? 'anim' : ''")
      .tidle {{info.title}}
      .buddins
        .maximize +
        .minimize(@click="minimizeWindow(window_id)") _
        .close(@click="closeWindow(window_id)") X
    .content(:class="offScreen ? 'offscreen' : '' ")
      slot
    .scalar.scalar-t(@mousedown="startScale('top')")
    .scalar.scalar-tl(@mousedown="startScale('top','left')")
    .scalar.scalar-l(@mousedown="startScale('left')")
    .scalar.scalar-bl(@mousedown="startScale('bottom','left')")
    .scalar.scalar-b(@mousedown="startScale('bottom')")
    .scalar.scalar-br(@mousedown="startScale('bottom','right')")
    .scalar.scalar-r(@mousedown="startScale('right')")
    .scalar.scalar-tr(@mousedown="startScale('top','right')")
    
</template>

<script>
import domtoimage from 'dom-to-image';
export default {	
  name: 'Window',
  data() {
    return {
      closing: false,
      width: 600,
      height: 400,
      rescale: {
        scaling: false
      },
      dragging: false,
      offScreen: false,
      preview: "",
      x: 0,
      xPerc:10,
      xOffset:0,
      xOrigin:0,
      xStart:0,
      xShadow:0,
      y: 0,
      yPerc:10,
      yOffset: 0,
      yOrigin: 0,
      yStart: 0,
      yShadow:0,
    };
  },   
  props: {
    info:{
      type: Object,
      default:{
        title: {
          type: String,
          default: "Window Title"
        },
        active:{
          type: Boolean,
          default: false
        },
        zIndex:{
          type:Number
        }
      }
    },
    window_id:{
      type:Number
    },
  },
  watch: {
    'info.minimized': function(newVal, oldVal){
      // Watches for when the window is restored to full size
      if(!this.info.minimized){
        this.offScreen = false
      }
    }
  },
  methods: {
    updateTitle(){
      alert()
    },
    startDrag() {
      // Enables window dragging
      this.dragging = true;
      this.setGlobalMouse();
      // Gets the global mouse coordinate offset by the element position
      this.setWindowCoordinates()
    },
    startScale(direction1,direction2 = "nothing"){
      // Enables the scaling flag and the 2 scaling directions
      this.rescale = {}
      this.rescale.scaling = this.rescale[direction1] = this.rescale[direction2] = true
      this.xStart = this.$refs.window.getBoundingClientRect().right;
      this.yStart = this.$refs.window.getBoundingClientRect().bottom;
      this.setGlobalMouse()
      this.setWindowCoordinates()

    },
    doDrag(event) {
      // doDrag is used for all of the drag and drop actions, as it is called from the global dragframe

      this.setGlobalMouse()
      if (this.dragging) {
        // Calculates the position on the screen with the offset of the element
        // And then makes it a percentage to use transform translate()
        // Also clamps the output so it can't go offscreen
        this.xPerc = Math.min(Math.max(((this.x - this.xOffset)/(window.innerWidth)*100),-((this.width/window.innerWidth)*95)),95).toFixed(2)
        this.yPerc = Math.min(Math.max(((this.y - this.yOffset -20)/(window.innerHeight)*100),-3),80).toFixed(2)
        this.xShadow = (-1 + (.04 * this.xPerc))
        this.yShadow = (-1 + (.08 * this.yPerc)) 
      }
      // Covers rescaling and adjustment for all the different directions
      if (this.rescale.scaling){
        if (this.rescale.right){
          this.width = this.x - this.xOrigin
        }
        if (this.rescale.bottom){
          this.height = this.y - this.yOrigin
        }
        if (this.rescale.left){
          this.xPerc = (this.x )/(window.innerWidth)*100
          this.width =  this.xStart - this.x
        }
        if (this.rescale.top){					
          this.yPerc = (this.y)/(window.innerHeight)*100
          this.height =  this.yStart - this.y
        }
      }
    },   
    stopDrag() {
      // disables anything being used for tracking
      this.x = this.y = ''
      this.dragging = this.rescale.scaling = false
    }, 
    setGlobalMouse(){
      // sets the global mouse coordinate in to data
      this.x = event.clientX;
      this.y = event.clientY;
    },
    setWindowCoordinates() {
      // Finds the origin point of the element in the DOM offset by the cursor position
      this.xOrigin = this.$refs.toolbar.getBoundingClientRect().left
      this.yOrigin = this.$refs.toolbar.getBoundingClientRect().top
      this.xOffset = event.clientX - this.xOrigin
      this.yOffset = event.clientY - this.yOrigin
    },
    activateListener(){
      // assigns the listener for the viewport to the current window
      window.addEventListener('mouseup', this.stopDrag);
      window.addEventListener('mouseleave', this.stopDrag);
      window.addEventListener('mousemove', this.doDrag);
    },
    popWindow(index){
      // pops the window to the top of the stack
      this.activateListener()
      this.$emit('popWindow',this.window_id)
    },
    closeWindow(){
      // waits 500ms for the close animation to finish and then passes the close function
      this.closing = true
      console.log("closing")
      setTimeout(() => {				
        console.log("closing real")
        this.$emit('closeWindow',this.window_id)
      }, 500);
    },
    minimizeWindow(){       
      this.preview = domtoimage.toPng(document.getElementById('window-'+this.info.zIndex), { quality: 0.1 })
        .then( (blob) =>{          
        this.$emit('minimizeWindow',{index: this.window_id, info: this.info, preview: blob })   
      })
        .catch(function (error) {
          console.error('oops, something went wrong!', error);
      })
      setTimeout(() => {				
        this.offScreen = true;
      }, 1000);
    },
  },
  mounted() {
    this.activateListener()
    this.xPerc+=(Math.random()*30)
    this.yPerc+=(Math.random()*30)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" scoped>
.windowpane
  width 100vw
  height 100vh
  transform translate(0%, 0%)
  position absolute	
  z-index 1
  pointer-events none
  will-change transform
  transform translateZ(0)
  transition .3s cubic-bezier(0.605, 0.215, 0.420, 1.580);
  &.dragging
    transition 0s
  &.minimized
    transition .3s cubic-bezier(0.470, -0.570, 0.750, 0.750)
  .window
    width 80vw
    height 40vh
    display grid
    pointer-events auto
    animation window-creation .3s cubic-bezier(0.590, 0.160, 0.265, 1.550) forwards
    transform scale(0) translateZ(0)
    will-change transform
    grid-template:\
    "sc-tl sc-t sc-tr" 10px\
    "sc-l   .   sc-r" 25px\
    "sc-l   .   sc-r" auto\
    "sc-bl sc-b sc-br" 10px\
    / 10px auto 10px
    &.closing
      // Theoretically I could just play the last animation backwards but boy it fought me there
      animation window-closing .3s cubic-bezier(0.575, -0.545, 0.265, 0.670) forwards 
    .shadow
      grid-column 1/4
      grid-row 2/4
      border-radius 10px 10px 0 0
      // box-shadow 0px 0px 20px var(--primary-darkest)
      filter blur(5px)
      opacity .4
      background var(--primary-darkest)
      z-index -1
    .toolbar
      grid-column 1/4
      grid-row 2/3   
      cursor grab
      user-select none
      display grid
      grid-template-columns 100px auto 100px
      align-items center
      justify-content space-between
      color var(--text-light)
      position relative
      font-size 18px
      bg_dropshadow()
        position relative
        &::before
          content ''
          width 110%
          height 100%
          position absolute
          top 0 
          left 0
          background linear-gradient(90deg, transparent 0%, var(--text-dark) 10%, var(--text-dark) 90%, transparent 100%); 
          opacity .3
          z-index -1
          left 50%
          transform translateX(-50%)
      .bg
        grid-column 1/4
        grid-row 1/2
        height 100%
        border-radius 10px 10px 0 0
        position relative
        overflow hidden 
        bg()
          content ''
          background var(--primary) linear-gradient(-30deg, var(--primary-dark) 0%, var(--primary-dark) 7%, var(--primary)  13%, var(--primary-dark)  24%, var(--primary)  49%, var(--primary-dark) 59%, var(--primary) 70%,  var(--primary-dark) 90%, var(--primary-dark) 100%); 
          background-size 100% 100% 
          width 105% 
          height 100%
          position absolute 
          z-index -1
          top 0
          left 0
        &::before
          bg()			
          animation bg-slide 15s linear infinite
          animation-play-state: paused;
        &::after		
          bg()
          animation bg-slide2 15s linear infinite
          animation-play-state: paused;
        &.anim
          &::before, &::after
            animation-play-state: running;
          
      &:active
        cursor grabbing
      .blank
        grid-row 1/2
        grid-column 1/2
      .tidle
        pointer-events none
        grid-row 1/2
        grid-column 2/3
        padding 2px 15px
        color var(--text-light)
        bg_dropshadow() 
      .buddins
        display flex
        grid-column 3/4
        grid-row 1/2
        justify-content space-between
        justify-self end
        cursor pointer
        width 50px
        margin 0 5px 0 0
        padding 2px 15px
        bg_dropshadow()
    scalar(areaname, resizer)
      grid-area areaname
      cursor resizer
      user-select none	
    .scalar-t
      scalar(sc-t, ns-resize)
    .scalar-tl
      scalar(sc-tl, nwse-resize)
    .scalar-tr
      scalar(sc-tr, nesw-resize)
    .scalar-l
      scalar(sc-l, ew-resize)
    .scalar-bl
      scalar(sc-bl, nesw-resize)
    .scalar-b
      scalar(sc-b, ns-resize)
    .scalar-br
      scalar(sc-br, nwse-resize)
    .scalar-r
      scalar(sc-r, ew-resize)

    .content
      grid-column 1/4
      grid-row 3/4
      height 100%
      color var(--text)
      overflow-y scroll
      background var(--text-light)
      &.offscreen
        display none
        // for performance
      iframe
        width 100%
        height 100%

@keyframes bg-slide{
  from{
    transform:translateX(-2%)
  }
  to{
    transform:translateX(-100%)
  }
}
@keyframes bg-slide2{
  from{
    transform:translateX(98%)
  }
  to{
    transform:translateX(-2%)
  }
}
@keyframes window-creation{
  from{
    transform: scale(0) translateZ(0)
  }
  to{
    transform: scale(1) translateZ(0)
  }
}
@keyframes window-closing{
  from{
    transform: scale(1) translateZ(0)
  }
  to{
    transform: scale(0) translateZ(0)
  }
}
</style>
