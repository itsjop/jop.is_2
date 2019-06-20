<template lang="pug">
section.toolbar
	.application(v-for="app in applications")
	button(@click="newWindow('New Explorer','explorer')") NEW WINDOW

</template>

<script>
export default {
	name: 'taskbar',
	data() {
		return {
			applications:[
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

.toolbar					
	background linear-gradient(180deg, transparent 0%, transparent 40%, var(--accent) 41%, var(--accent) 100%); 
	position absolute 
	bottom 0
	height 100px
	left 50%
	transform translate(-50%)
	padding 0 20px
	transition .5s
	display flex
	justify-content space-between
	z-index 50
	.application
		background blue
		border-radius 10px
		width 60px
		height 60px
		margin 30px 20px
		transition .2s ease-out
		transform translateY(-30%) scale(1)
		&:hover
			transform translateY(-80%) scale(1.3)
		& + div:hover
			transform translateY(-80%) scale(1.2)
	button	
		height 40px
		transform translateY(50%) scale(1)
		cursor pointer

</style>
