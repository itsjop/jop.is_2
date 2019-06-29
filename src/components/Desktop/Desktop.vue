 <template lang="pug">

section.desktop
  .icon(v-for="icon in icons" v-on:dblclick="newWindow(file)")
    img(src="")
    .name {{icon.name}}

</template>

<script>
export default {
	name: 'Desktop',
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
</style>
