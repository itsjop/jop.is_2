 <template lang="pug">

section.desktop
  .icon(v-for="icon in icons" v-on:dblclick="")
    img(src="https://upload.wikimedia.org/wikipedia/en/thumb/e/e0/WPVG_icon_2016.svg/1024px-WPVG_icon_2016.svg.png")
    .name {{icon.name}}

</template>

<script>
export default {
	name: 'taskbar',
	data() {
		return {
			icons:[
				{
					name: "thing",
					icon: "thing.png",
					application: "./webpages/CoolDog"
				},
				{
					name: "thing",
					icon: "thing.png",
					application: "./webpages/CoolDog"
				},
				{
					name: "thing",
					icon: "thing.png",
					application: "./webpages/CoolDog"
				},
				{
					name: "thing",
					icon: "thing.png",
					application: "./webpages/CoolDog"
				},
			]
		}
	},
	props: {
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" scoped>

icon-size = 80px
.desktop
  width 100vw
  height 100vh
  display grid 
  grid-auto-flow column
  grid-template-columns 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 
  grid-template-rows 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 
  grid-gap 15px
  position absolute
  background var(--accent-lightest) url("https://www.transparenttextures.com/patterns/checkered-light-emboss.png");
  top 0
  z-index -10
  padding 20px
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
    &:active
      border 2px dashed var(--accent)
      transition 0s ease-out
      transform scale(1.1)
    img 
      width icon-size
      height icon-size
      filter: drop-shadow(0px 0px 3px var(--text-dark));
    .name
      text-align center
    

</style>
