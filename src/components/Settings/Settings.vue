<template lang="pug">
section.settings
  h2 Desktop Settings
  hr
  .color
    .color-picker
      h1 Color Picker
      sketch-picker(v-model="color")
      span.credit All backgrounds provided by 
        a(href="https://www.transparenttextures.com/" target="_blank") transparenttextures.com
    transition-group.wallpaper-picker(name="fade")
      h1(key="lavel") Desktop Pattern
      .select(key="bg-picker")
        .option(v-for="(image, index) in images" @click="setWall(index)" :class="activeImg === image.name ? 'active':'' ")
          .bg(:style="{backgroundImage: ' url('+image.path+')'}")
          label {{image.name}}
      .invert(key="invert")
        h4 Invert background?
        input(type="checkbox" v-model="invert")
      .motion-picker(key="motion")
        h4 Background Motion:
        .radios
          label(for="full") Dynamic
            input(@change="setMotion('full')" type='radio' name='motion' id="full" value='full' v-model="motionSetting")
          label(for="linear") Linear
            input(@change="setMotion('linear')" type='radio' name='motion' id="linear" value='linear' v-model="motionSetting") 
          label(for="none" @click="setMotion('none')") None
            input(@change="setMotion('none')" type='radio' name='motion' id="none" value='none' v-model="motionSetting") 
      .speed-picker(v-if="motionSetting==='linear'" key="angle")
        h4 Background Angle:
        .radios
          label ⭮ 
          input(@change="setAngle()" type="range" min="0" max="360" v-model="motionAngle" step="1" class="slider" id="myRange" )
          label ⭯
      .speed-picker(v-if="motionSetting!=='none'" key="speed")
        h4 Background Speed:
        .radios
          label Slow
          input(@change="setSpeed()" type="range" min="0" max="90" v-model="motionSpeed" step="1" class="slider" id="myRange" )
          label Fast
        
  //- h4 Gravity
  //- h4 OS toggle
</template>

<script>
import { EventBus } from '../../main';

import tinycolor from 'tinycolor2'
import { Sketch } from 'vue-color'
import allImages from '../../assets/data/Backgrounds'
export default {
	name: 'Settings',
	data() {
		return {
      color: getComputedStyle(document.documentElement).getPropertyValue('--primary'),
      activeImg:"Tasky",
      invert: false,
      images: allImages,
      motionSetting: "full",
      motionSpeed: 15,
      motionAngle: 315
		}
	},
	watch: {
    invert: function(){
      //makes sure the value is numeric for the css filter functions
      if(this.invert){
        this.invert = 1
      }else{
        this.invert = 0
      }
			document.documentElement.style.setProperty('--invert', this.invert);
      localStorage.bg_invert = this.invert
    },
		color: function(){
			// Watches for when the window is restored to full size
			console.log("color updated!", this.color)
      let colors = {}
			colors.primary = tinycolor(this.color.hex)
      colors.dark = tinycolor(this.color.hex).darken(20)
      colors.darker = tinycolor(this.color.hex).darken(30)
      colors.darkest = tinycolor(this.color.hex).darken(40)
      colors.light = tinycolor(this.color.hex).lighten(10)
      colors.lighter = tinycolor(this.color.hex).lighten(15)
      colors.lightest = tinycolor(this.color.hex).lighten(20)
      colors.text_light = tinycolor(this.color.hex).lighten(40).desaturate(50)
      colors.text_dark = tinycolor(this.color.hex).darken(40)
      colors.accent = tinycolor(this.color.hex).spin(60)

			document.documentElement.style.setProperty('--accent', colors.accent);
			document.documentElement.style.setProperty('--primary', colors.primary);
			document.documentElement.style.setProperty('--primary-dark', colors.dark);
			document.documentElement.style.setProperty('--primary-darker', colors.darker);
			document.documentElement.style.setProperty('--primary-darkest', colors.darkest);
			document.documentElement.style.setProperty('--primary-light', colors.light);
			document.documentElement.style.setProperty('--primary-lighter', colors.lighter);
			document.documentElement.style.setProperty('--primary-lightest', colors.lightest);
			document.documentElement.style.setProperty('--text-light', colors.text_light);
      document.documentElement.style.setProperty('--text-dark', colors.text_dark);

      localStorage.color_accent = colors.accent
      localStorage.color_primary = colors.primary
      localStorage.color_dark = colors.dark
      localStorage.color_darker = colors.darker
      localStorage.color_darkest = colors.darkest
      localStorage.color_light = colors.light
      localStorage.color_lighter = colors.lighter
      localStorage.color_lightest = colors.lightest
      localStorage.color_text_light = colors.text_light
      localStorage.color_text_dark = colors.text_dark
      }
  },
  methods:{
    setWall(index){
      localStorage.desktop_image = this.images[index].path
      this.activeImg = this.images[index].name
      EventBus.$emit('update-bg', this.images[index].path);
    },
    setMotion(){
      localStorage.motion_setting = this.motionSetting
      EventBus.$emit('update-motion', this.motionSetting);
    },
    setSpeed(){
      localStorage.motion_speed = this.motionSpeed/100
      EventBus.$emit('update-speed', this.motionSpeed/100);
    },
    setAngle(){
      localStorage.motion_speed = (Number(this.motionAngle) + 90)%360
      EventBus.$emit('update-angle',(Number(this.motionAngle) + 90)%360)
    },
  },
  created(){
    for (let i = this.images.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.images[i], this.images[j]] = [this.images[j], this.images[i]];
    }
    this.images.map(img=>{
      if(this.activeImg === img){
        this.images.unshift(img)
      }; 
    }) 
  },
  mounted(){
    this.motionSetting = localStorage.motion_setting || "full"
  },
	components: {
    'sketch-picker': Sketch
	}
}
</script>

<style scoped lang="stylus" scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.settings
  padding 10px
  h2
    margin 0
  hr
    border-style inset
  .color
    display grid 
    grid-template-columns repeat(auto-fit, minmax(300px, 1fr))
    grid-gap 20px
    h1
      margin 10px 0 0px
    .color-picker
      .vc-sketch
        background transparent
        box-shadow none
        width: calc(100% - 20px);
        padding 0
        >:first-child
          height 160px
          padding-bottom 0
          border-radius: 10px;
          border: 2px var(--primary) solid;
        >:nth-child(3)
          display none
        >:nth-child(4)
          border-top none
      .credit
        font-size 11px
        text-align center
        font-style: italic;
        opacity .5
        a
          color var(--text-dark)

    .motion-picker, .speed-picker
      display grid 
      h4
        margin 0 10px 0 0
      .radios 
        display flex
        justify-content space-around
        flex-grow 2
        align-content center
        align-items center
        input 
          margin-left 2px  
    .wallpaper-picker
      .invert
        display flex
        h4
          margin 5px 10px 5px 0
      .select
        width 100%
        height 250px
        overflow-y scroll
        border-radius 10px
        .option
          height 47px
          display grid
          cursor pointer
          justify-content center
          align-content center
          position relative
          grid-template-columns 1fr 2fr 1fr
          grid-template-rows 1fr 2fr 1fr
          background var(--primary-darkest)
          transition .2s
          &.active
            box-shadow 0px 0px 10px 3px inset var(--primary-dark)
          label
            grid-column 2/3
            grid-row 2/3
            font-weight 600
            color var(--text-light)
            text-align center
            position relative
            user-select none
            cursor pointer
            text-shadow 0px 0px 5px var(--primary-darkest)
            // background black 
          .bg
            filter invert(var(--invert))
            grid-column 1/4
            grid-row 1/4


// label
//   font-weight 600
//   color var(--text-light)
//   text-align center
//   position absolute
//   left 50%
//   top 50%
//   transform translate(-50%,-50%)
//   z-index 1
//   padding 5px
//   &::before
//     content ''
//     position absolute
//     width 100%
//     height 100%
//     left 50%
//     top 50%
//     transform translate(-50%,-50%)
//     background var(--primary-darkest)
//     opacity .4
//     filter blur(5px)
//     z-index -1

</style>
