<template lang="pug">
section.settings
  h2 Desktop Settings
  hr
  .color
    .color-picker
      label Color Picker
      sketch-picker(v-model="color")
      span.credit All backgrounds provided by 
        a(href="https://www.transparenttextures.com/" target="_blank") transparenttextures.com
    .wallpaper-picker
      label Desktop Pattern
      .select
        .option(v-for="(image, index) in images" @click="setWall(index)" :class="activeImg === image.name ? 'active':'' ")
          .bg(:style="{backgroundImage: ' url('+image.path+')'}")
          label {{image.name}}
      .invert
        h4 Invert background?
        input(type="checkbox" v-model="invert")
  //- h4 Gravity
  //- h4 OS toggle
</template>

<script>
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
      images: allImages
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
      colors.accent = tinycolor(this.color.hex).spin(40)

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
      }
  },
  methods:{
    setWall(index){
			document.documentElement.style.setProperty('--desktop-image', "url("+this.images[index].path+")");
			this.activeImg = this.images[index].name
    }
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
    }) },
	components: {
    'sketch-picker': Sketch
	}
}
</script>

<style scoped lang="stylus" scoped>
.settings
  padding 10px
  h2
    margin 0
  hr
    border-style inset
  .color
    display grid 
    grid-template-columns repeat(auto-fit, minmax(200px, 1fr))
    grid-gap 20px
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

        
    .wallpaper-picker
      .invert
        display flex
        h4
          margin 5px 10px
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
