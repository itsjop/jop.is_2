<template lang="pug">
section.settings
  .wallpaper-picker
    .preview
      .preview-img(:style="{backgroundImage: 'url('+bg_img+')'}")
    .select
  .color-picker
    sketch-picker(v-model="color")
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
      color:"#f47142",
      bg_img:'/img/desktop/checkered-light-emboss.png'
		}
	},
	watch: {
		color: function(){
			// Watches for when the window is restored to full size
			console.log("color updated!", this.color)
			let accent = tinycolor(this.color.hex)
			let dark = accent.getLuminance()
			let colors = {}
			colors.dark = accent.darken(5)
			colors.darker = accent.darken(5)
			colors.darkest = accent.darken(5)
			accent = tinycolor(this.color.hex)
			colors.light = accent.brighten(5)
			colors.lighter = accent.brighten(5)
			colors.lightest = accent.brighten(10)
			colors.text_light = tinycolor(this.color.hex).darken(40)
			colors.text_dark = tinycolor(this.color.hex).lighten(40)
			if(dark<.6){
				colors.text_light = tinycolor(this.color.hex).lighten(40)
				colors.text_dark = tinycolor(this.color.hex).darken(80)
			}
			console.log("darkness",dark)
			console.log("colors",colors)
			document.documentElement.style.setProperty('--accent', this.color.hex);
			document.documentElement.style.setProperty('--accent-dark', colors.dark);
			document.documentElement.style.setProperty('--accent-darker', colors.darker);
			document.documentElement.style.setProperty('--accent-darkest', colors.darkest);
			document.documentElement.style.setProperty('--accent-light', colors.light);
			document.documentElement.style.setProperty('--accent-lighter', colors.lighter);
			document.documentElement.style.setProperty('--accent-lightest', colors.lightest);
			document.documentElement.style.setProperty('--text-light', colors.text_light);
			document.documentElement.style.setProperty('--text-dark', colors.dark);


		}
	},
	components: {
    'sketch-picker': Sketch
	}
}
</script>

<style scoped lang="stylus" scoped>
.settings
  display grid 
  grid-template-columns repeat(auto-fit, minmax(200px, 1fr))
  .color-picker
    .vc-sketch
      background transparent
      box-shadow none
      width: calc(100% - 20px);
      padding: 10px;
      >:first-child
        height 150px
        padding-bottom 0
        border-radius: 10px;
        border: 2px var(--accent) solid;
      >:nth-child(4)
        border-top none
      
  .wallpaper-picker
    padding 10px
    .preview
      width 100%
      height 150px
      border 2px var(--accent-darkest) solid
      border-radius 10px
      overflow hidden
      background-color var(--accent-light)
      .preview-img
        width 100%
        height 100%
        filter invert(var(--invert))


</style>
