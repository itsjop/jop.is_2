<template lang="pug">
section.taskbar(ref="taskbar")
	.pinned.application(v-for="app in pinnedApplications")
		.icon
		label {{app.name}}
	.vertbar
	.active.application(v-for="app in activeApplications")
		.icon
		label {{app.name}}
	.vertbar
	button(@click="newWindow('New Folder','explorer','portfolio')") NEW WINDOW
	.minimized(v-for="windows in minimized")
		.active.application(v-if="window.minimized")
			.icon(src="window.icon")
			label {{app.name}}

</template>

<script>
export default {
	name: 'taskbar',
	data() {
		return {
			pinnedApplications:[
				{
					name: "Incredible Application",
					icon: "thing.png",
					application: "./webpages/CoolDog"
				},
			],
			activeApplications:[
				{
					name: "Active Application",
					icon: "thing.png",
					application: "./webpages/CoolDog"
				}
			]
		}
	},
	props: {
		windows:{
			type: Array
		}
	},
	methods:{
		newWindow(title, component, folderPath){
			console.log("title",title,"component",component,"folderPath",folderPath)
			this.$emit('newWindow',{title: title, component: component, folderPath: folderPath})
		},
		slerdMe(){

		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" scoped>

.taskbar					
	background linear-gradient(180deg, transparent 0%, transparent 40%, var(--accent) 41%, var(--accent) 100%); 
	position absolute 
	bottom 0
	height 100px
	left 50%
	transform translate(-50%)
	padding 0 20px
	transition .2s
	display flex
	justify-content space-between
	z-index 50
	// &:hover
	// 	transform translate(-50%) scale(1.1)
	.vertbar
		width 2px 
		height 80%
		background white
		margin 0 20px 0 10px
		border-radius 3px
		opacity .6

	.application
		margin 30px 20px
		transition .1s ease
		transform translateY(-60%) 
		display grid
		position relative
		&:hover
			transform translateY(-80%) 
			label
				opacity 1
				background #44444444
				transform translate(-50%,-50%)
				padding 4px
				border-radius 5px
				position absolute
				&:after
					background uhadad
					// border 2px solid #55555555
			.icon
				transform scale(1.3)
		.icon
			background green
			border-radius 10px
			transition .1s ease
			width 60px
			height 60px
			cursor pointer
		label
			opacity 0
			background gray
			transition .1s
			text-align center
			position absolute
			top -40px
			left 50%
			transform translate(-50%,50%)
			white-space: nowrap;
			border 2px solid #55555555
			&:after
				content ''
				background #44444444
				position absolute
				bottom -10px
				left 50%
				width 20px
				height 10px
				transform translate(-50%)
				clip-path: polygon(45% 100%, 0 0, 100% 0);
	button	
		height 40px
		transform translateY(50%) scale(1)
		cursor pointer

</style>
