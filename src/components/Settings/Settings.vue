<template lang="pug">
	section.settings
		h1 Settings time bitch!!
		h4 color picker
		h4 dark mode
		swatches(v-model="color")
		//- h4 Gravity
		//- h4 OS toggle
</template>

<script>
import tinycolor from 'tinycolor2'
import Swatches from 'vue-swatches'
export default {
	name: 'Settings',
	data() {
		return {
			color:"#f47142"
		}
	},
	watch: {
		color: function(){
			// Watches for when the window is restored to full size
			console.log("color updated!", this.color)
			let accent = tinycolor(this.color)
			let dark = accent.getLuminance()
			let colors = {}
			colors.dark = accent.darken(5)
			colors.darker = accent.darken(5)
			colors.darkest = accent.darken(5)
			accent = tinycolor(this.color)
			colors.light = accent.brighten(5)
			colors.lighter = accent.brighten(5)
			colors.lightest = accent.brighten(10)
			colors.text_light = tinycolor(this.color).darken(40)
			colors.text_dark = tinycolor(this.color).lighten(40)
			if(dark<.6){
				colors.text_light = tinycolor(this.color).lighten(40)
				colors.text_dark = tinycolor(this.color).darken(70)
			}
			console.log(dark)
			console.log(colors)
			document.documentElement.style.setProperty('--accent', this.color);
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
	components: { Swatches },
}
</script>

<style scoped lang="stylus" scoped>

</style>
