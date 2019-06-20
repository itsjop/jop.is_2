<template lang="pug">
section.explorer
  .icons(v-for="file in args" v-on:dblclick="newWindow(file.title, file.component)")
    p {{file.img}}
    p {{file.title}}
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
			default:[{
				img: "ring.png",
				title: "The Ring",
				component:"duckrotation",
				args:{
				}
			}]
		}
	},
	methods:{
		newWindow(title, component){
      alert(title+", "+ component)
			this.$emit('newWindow',{title: title, component: component})
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" scoped>

.explorer
  display grid
  .icons
    cursor pointer
    user-select none

</style>
