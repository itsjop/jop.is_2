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
export default {
	name: 'Settings',
	data() {
		return {
      color: getComputedStyle(document.documentElement).getPropertyValue('--primary'),
      activeImg:"Tasky",
      invert: false,
      images:[
        {name:"Arabesque", path:'/img/desktop/arabesque.png'},
        {name:"Basketball", path:'/img/desktop/basketball.png'},
        {name:"Batthern", path:' /img/desktop/batthern.png'},
        {name:"Black Twill", path:' /img/desktop/black-twill.png'},
        {name:"Cardboard", path:' /img/desktop/cardboard.png'},
        {name:"Checkers Light", path:'/img/desktop/checkered-light-emboss.png'},
        {name:"Cartographer", path:' /img/desktop/cartographer.png'},
        {name:"Checkered Pattern", path:' /img/desktop/checkered-pattern.png'},
        {name:"Concrete Wall", path:' /img/desktop/concrete-wall.png'},
        {name:"CrissXCross", path:' /img/desktop/crissxcross.png'},
        {name:"Dark Mosaic", path:' /img/desktop/dark-mosaic.png'},
        {name:"Diagmonds", path:' /img/desktop/diagmonds-light.png'},
        {name:"Diagonal Stripes", path:' /img/desktop/diagonal-striped-brick.png'},
        {name:"Diamond Upholstry", path:' /img/desktop/diamond-upholstery.png'},
        {name:"Escheresque", path:'/img/desktop/escheresque.png'},
        {name:"Foggy Birds", path:' /img/desktop/foggy-birds.png'},
        {name:"Gold Scale", path:'/img/desktop/gold-scale.png '},
        {name:"Gplay", path:'/img/desktop/gplay.png '},
        {name:"Gradient Squares", path:'/img/desktop/gradient-squares.png '},
        {name:"Green Fibers", path:'/img/desktop/green-fibers.png '},
        {name:"Greeb Gobbler", path:' /img/desktop/green-gobbler.png'},
        {name:"Honey, I'm Home", path:'/img/desktop/honey-im-subtle.png '},
        {name:"Leather", path:' /img/desktop/large-leather.png'},
        {name:"Light Wool", path:' /img/desktop/light-wool.png'},
        {name:"My Little Plaid", path:'/img/desktop/my-little-plaid.png '},
        {name:"Nice Snow", path:' /img/desktop/nice-snow.png'},
        {name:"Old Mathematics", path:'/img/desktop/old-mathematics.png '},
        {name:"Old Wall", path:'/img/desktop/old-wall.png '},
        {name:"Outlets", path:'/img/desktop/outlets.png '},
        {name:"Padded", path:'/img/desktop/padded.png '},
        {name:"Perforated White Leather", path:' /img/desktop/perforated-white-leather.png'},
        {name:"Real Carbon Fiber", path:'/img/desktop/real-carbon-fibre.png '},
        {name:"Robots", path:'/img/desktop/robots.png '},
        {name:"Shley Tree", path:'/img/desktop/shley-tree-1.png '},
        {name:"Skulls", path:'/img/desktop/skulls.png '},
        {name:"Snow", path:'/img/desktop/snow.png '},
        {name:"SOS", path:'/img/desktop/sos.png '},
        {name:"Starring", path:'/img/desktop/starring.png '},
        {name:"Subtle White Feathers", path:'/img/desktop/subtle-white-feathers.png '},
        {name:"Swirl", path:'/img/desktop/swirl.png '},
        {name:"Tasky", path:'/img/desktop/tasky.png '},
        {name:"Tileable Wood", path:'/img/desktop/tileable-wood-colored.png '},
        {name:"Tree Bark", path:'/img/desktop/tree-bark.png '},
        {name:"Triangular", path:'/img/desktop/triangular.png '},
        {name:"Wavecut", path:' /img/desktop/wavecut.png'},
        {name:"Wet Snow", path:'/img/desktop/wet-snow.png '},
        {name:"White Diamond", path:'/img/desktop/white-diamond.png'},
        {name:"White Paperboard", path:'/img/desktop/white-paperboard.png '},
        {name:"White Tiles", path:'/img/desktop/white-tiles.png '},
        {name:"Wood Pattern", path:'/img/desktop/wood-pattern.png '},
      ]
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
			let primary = tinycolor(this.color.hex)
			let dark = primary.getLuminance()
      let colors = {}
      // if (dark > .03){
      //   if (dark > .3){
      //     if (dark>.8){
            // if greater than .8
            colors.dark = primary.darken(5)
            colors.darker = primary.darken(10)
            colors.darkest = primary.darken(5)
            primary = tinycolor(this.color.hex)
            colors.light = primary.lighten(10)
            colors.lighter = primary.lighten(5)
            colors.lightest = primary.lighten(5)
            colors.text_light = tinycolor(this.color.hex).lighten(30).desaturate(50)
            colors.text_dark = tinycolor(this.color.hex).darken(40)
      //     }else{
      //     // if .3 to .8 
      //     colors.dark = primary.darken(10)
      //     colors.darker = primary.darken(10)
      //     colors.darkest = primary.darken(10)
      //     primary = tinycolor(this.color.hex)
      //     colors.light = primary.lighten(10)
      //     colors.lighter = primary.lighten(10)
      //     colors.lightest = primary.lighten(10)
      //     colors.text_light = tinycolor(this.color.hex).darken(20).desaturate(50)
      //     colors.text_dark = tinycolor(this.color.hex).lighten(40)
      //   }
      //   }else{
      //     // if .03 to .3 
      //     colors.dark = primary.darken(5)
      //     colors.darker = primary.darken(5)
      //     colors.darkest = primary.darken(5)
      //     primary = tinycolor(this.color.hex)
      //     colors.light = primary.lighten(10)
      //     colors.lighter = primary.lighten(10)
      //     colors.lightest = primary.lighten(10)
      //     colors.text_light = tinycolor(this.color.hex).darken(0).desaturate(0)
      //     colors.text_dark = tinycolor(this.color.hex).lighten(40)
      //   }
      // }else{
      //   // Extreme dark edge case
			//   primary = tinycolor(this.color.hex).lighten(10).saturate(40)
			//   colors.dark = primary.lighten(20)
      //   colors.darker = primary.lighten(10)
      //   colors.darkest = primary.lighten(10)
      //   primary = tinycolor(this.color.hex)
      //   colors.light = primary.darken(2)
      //   colors.lighter = primary.darken(2)
      //   colors.lightest = primary.darken(2)
      //   colors.text_light = tinycolor(this.color.hex).darken(0).desaturate(20)
      //   colors.text_dark = tinycolor(this.color.hex).lighten(80).desaturate(70)
      // }
			// if(dark<.7){
			// 	colors.text_light = tinycolor(this.color.hex).lighten(60).desaturate(20)
			// 	colors.text_dark = tinycolor(this.color.hex).darken(80).desaturate(20)
			// }
			console.log("darkness",dark)
      console.log("colors",colors)
      
      primary = tinycolor(this.color.hex)
      colors.accent = tinycolor(this.color.hex).spin(40)

			document.documentElement.style.setProperty('--accent', colors.accent);
			document.documentElement.style.setProperty('--primary', primary);
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
