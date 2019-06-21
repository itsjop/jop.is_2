<template lang="pug">
section.explorer
  .icons(v-for="file in args.folder.contents" v-on:dblclick="newWindow(file.title, file.component)")
    img(:alt="file.img" :src="file.img")
    label {{file.title}}
</template>

<script>
export default {
	name: 'Explorer',
	data() {
		return {
			count: 0
		}
	},
	props: {
		args:{
			type: Object,
		}
	},
	methods:{
		newWindow(title, component){
			this.$emit('newWindow',{title: title, component: component})
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" scoped>

.explorer
  display grid
  grid-auto-flow row 
  padding 20px
  grid-template-columns repeat(auto-fit, minmax(50px, 1fr))
  grid-template-rows repeat(auto-fit, 100px)
  min-height 100%
  .icons
    cursor pointer
    user-select none
    display grid
    justify-content center
    img
      width 80px
      height 80px
      background lightgreen
      color gray
    label
      text-align center

</style>
