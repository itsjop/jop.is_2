<template lang="pug">
.windowpane(:id="'windowpane-'+info.zIndex"
		v-bind:style="{ transform: 'translate('+ xPerc +'%,' + yPerc +'%)', zIndex: info.zIndex}")
	.window(ref="window" 
			:class="(closing ? 'closing' : '')+' '+(minimized ? 'minimized' : '')" 
			@mousedown="popWindow(window_id)" :style="{ width: width+'px', height: height+'px',  }")
		.shadow(:style="{transform: 'translate('+ xShadow +'%,' + yShadow +'%)',}")
		.toolbar(@mousedown="startDrag" ref="toolbar")
			.blank
			.bg
			.tidle {{info.title}}
			.buddins
				.maximize +
				.minimize _
				.close(@click="closeWindow(window_id)") 	  X
		.content
			slot
		.scalar.scalar-t(@mousedown="startScale('top')")
		.scalar.scalar-tl(@mousedown="startScale('top','left')")
		.scalar.scalar-l(@mousedown="startScale('left')")
		.scalar.scalar-bl(@mousedown="startScale('bottom','left')")
		.scalar.scalar-b(@mousedown="startScale('bottom')")
		.scalar.scalar-br(@mousedown="startScale('bottom','right')")
		.scalar.scalar-r(@mousedown="startScale('right')")
		.scalar.scalar-tr(@mousedown="startScale('top','right')")
		
</template>

<script>

export default {	
	name: 'Window',
	data() {
		return {
			closing: false,
			minimized: false,
			width: 600,
			height: 400,
			rescale: {
				scaling: false
			},
			x: 0,
			xPerc:10,
			xOffset:0,
			xOrigin:0,
			xStart:0,
			xShadow:0,
			y: 0,
			yPerc:10,
			yOffset: 0,
			yOrigin: 0,
			yStart: 0,
			yShadow:0,
		};
	},   
	props: {
		info:{
			type: Object,
			default:{
				title: {
					type: String,
					default: "Window Title"
				},
				active:{
					type: Boolean,
					default: false
				},
				zIndex:{
					type:Number
				}
			}
		},
		window_id:{
			type:Number
		},
		active:{
			type: Boolean
		}
	},
  methods: {
    updateTitle(){
			alert()
  	},
    startDrag() {
			// Enables window dragging
      this.dragging = true;
			this.setGlobalMouse();
			// Gets the global mouse coordinate offset by the element position
			this.setWindowCoordinates()
		},
		startScale(direction1,direction2 = "nothing"){
			// Enables the scaling flag and the 2 scaling directions
			this.rescale = {}
			this.rescale.scaling = this.rescale[direction1] = this.rescale[direction2] = true
			this.xStart = this.$refs.window.getBoundingClientRect().right;
			this.yStart = this.$refs.window.getBoundingClientRect().bottom;
			this.setGlobalMouse()
			this.setWindowCoordinates()

		},
    doDrag(event) {
			// doDrag is used for all of the drag and drop actions, as it is called from the global dragframe
			if(this.info.active){
			this.setGlobalMouse()
      if (this.dragging) {
				// Calculates the position on the screen with the offset of the element
				// And then makes it a percentage to use transform translate()
				// Also clamps the output so it can't go offscreen
				this.xPerc = Math.min(Math.max(((this.x - this.xOffset)/(window.innerWidth)*100),-((this.width/window.innerWidth)*95)),95)
				this.yPerc = Math.min(Math.max(((this.y - this.yOffset -20)/(window.innerHeight)*100),-3),80)
				this.xShadow = (-1 + (.04 * this.xPerc))
				this.yShadow = (-1 + (.08 * this.yPerc)) 
			}
			// Covers rescaling and adjustment for all the different directions
			if (this.rescale.scaling){
				if (this.rescale.right){
					this.width = this.x - this.xOrigin
				}
				if (this.rescale.bottom){
					this.height = this.y - this.yOrigin
				}
				if (this.rescale.left){
					this.xPerc = (this.x )/(window.innerWidth)*100
					this.width =  this.xStart - this.x
				}
				if (this.rescale.top){					
					this.yPerc = (this.y)/(window.innerHeight)*100
					this.height =  this.yStart - this.y
				}
			}}
		},   
    stopDrag() {
			// disables anything being used for tracking
			this.x = this.y = ''
      this.dragging = this.rescale.scaling = false
    }, 
	setGlobalMouse(){
		// sets the global mouse coordinate in to data
		this.x = event.clientX;
		this.y = event.clientY;
	},
	setWindowCoordinates() {
		// Finds the origin point of the element in the DOM offset by the cursor position
		this.xOrigin = this.$refs.toolbar.getBoundingClientRect().left
		this.yOrigin = this.$refs.toolbar.getBoundingClientRect().top
		this.xOffset = event.clientX - this.xOrigin
		this.yOffset = event.clientY - this.yOrigin
	},
	activateListener(){
		// assigns the listener for the viewport to the current window
		window.addEventListener('mouseup', this.stopDrag);
		window.addEventListener('mouseleave', this.stopDrag);
		window.addEventListener('mousemove', this.doDrag);
	},
	popWindow(index){
		// pops the window to the top of the stack
		this.activateListener()
		this.$emit('popWindow',this.window_id)
	},
	closeWindow(){
		// waits 500ms for the close animation to finish and then passes the close function
		this.closing = true
		console.log("closing")
		setTimeout(() => {				
			console.log("closing real")
			this.$emit('closeWindow',this.window_id)
		}, 500);
	},
	minimizeWindow(){
		// waits 500ms for the minimiw animation to finish and then passes the function
		this.closing = true
		console.log("minimize start")
		setTimeout(() => {				
			console.log("minimize real")
			this.$emit('minimizeWindow',{index: this.window_id, info: this.info})
		}, 500);

	}
	},
	mounted() {
		this.activateListener()
		this.xPerc+=(Math.random()*30)
		this.yPerc+=(Math.random()*30)
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" scoped>
.windowpane
	width 100vw
	height 100vh
	transform translate(0%, 0%)
	position absolute	
	z-index 1
	pointer-events none
	// background #33334444
	// transition .05s ease-out
	// background-image: url(https://images.unsplash.com/photo-1557411732-1797a9171fcf?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ);
	// background-size stretch
	.window
		width 80vw
		height 40vh
		display grid
		pointer-events auto
		animation window-creation .3s cubic-bezier(0.590, 0.160, 0.265, 1.550) forwards
		transform scale(0)
		grid-template:\
		"sc-tl sc-t sc-tr" 10px\
		"sc-l   .   sc-r" 25px\
		"sc-l   .   sc-r" auto\
		"sc-bl sc-b sc-br" 10px\
		/ 10px auto 10px
		&.closing
			// Theoretically I could just play the last animation backwards but boy it fought me there
			animation window-closing .3s cubic-bezier(0.575, -0.545, 0.265, 0.670) forwards 
		.shadow
			grid-column 1/4
			grid-row 2/4
			border-radius 10px 10px 0 0
			// box-shadow 0px 0px 20px var(--accent-darkest)
			filter blur(5px)
			opacity .4
			background var(--accent-darkest)
			z-index -1
		.toolbar
			grid-column 1/4
			grid-row 2/3   
			cursor grab
			user-select none
			display grid
			grid-template-columns 100px auto 100px
			align-items center
			justify-content space-between
			color var(--text-light)
			position relative
			font-size 18px
			bg_dropshadow()
				position relative
				&::before
					content ''
					width 110%
					height 100%
					position absolute
					top 0 
					left 0
					background linear-gradient(90deg, transparent 0%, var(--accent-darker) 10%, var(--accent-darker) 90%, transparent 100%); 
					opacity .3
					z-index -1
					left 50%
					transform translateX(-50%)
			.bg
				grid-column 1/4
				grid-row 1/2
				height 100%
				border-radius 10px 10px 0 0
				position relative
				overflow hidden
				bg()
					content ''
					background var(--accent) linear-gradient(-30deg, var(--accent-dark) 0%, var(--accent-dark) 7%, var(--accent)  13%, var(--accent-dark)  24%, var(--accent)  49%, var(--accent-dark) 59%, var(--accent) 70%,  var(--accent-dark) 90%, var(--accent-dark) 100%); 
					background-size 100% 100% 
					width 105% 
					height 100%
					position absolute 
					z-index -1
					top 0
					left 0
				&::before
					bg()			
					animation bg-slide 15s linear infinite
				&::after		
					bg()
					animation bg-slide2 15s linear infinite
			&:active
				cursor grabbing
			.blank
				grid-row 1/2
				grid-column 1/2
			.tidle
				pointer-events none
				grid-row 1/2
				grid-column 2/3
				padding 2px 15px
				bg_dropshadow() 
			.buddins
				display flex
				grid-column 3/4
				grid-row 1/2
				justify-content space-between
				justify-self end
				cursor pointer
				width 50px
				margin 0 5px 0 0
				padding 2px 15px
				bg_dropshadow()
		scalar(areaname, resizer)
			grid-area areaname
			cursor resizer
			user-select none	
		.scalar-t
			scalar(sc-t, ns-resize)
		.scalar-tl
			scalar(sc-tl, nwse-resize)
		.scalar-tr
			scalar(sc-tr, nesw-resize)
		.scalar-l
			scalar(sc-l, ew-resize)
		.scalar-bl
			scalar(sc-bl, nesw-resize)
		.scalar-b
			scalar(sc-b, ns-resize)
		.scalar-br
			scalar(sc-br, nwse-resize)
		.scalar-r
			scalar(sc-r, ew-resize)

		.content
			grid-column 1/4
			grid-row 3/4
			height 100%
			color var(--text)
			overflow-y scroll
			iframe
				width 100%
				height 100%

// .content
// 	background-image: url(https://images.unsplash.com/photo-1504208434309-cb69f4fe52b0?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjE0NTg5fQ);
// 	background-size cover
		.content
			background lightgray


@keyframes bg-slide{
	from{
		transform:translateX(-2%)
	}
	to{
		transform:translateX(-100%)
	}
}
@keyframes bg-slide2{
	from{
		transform:translateX(98%)
	}
	to{
		transform:translateX(-2%)
	}
}
@keyframes window-creation{
	from{
		transform: scale(0)
	}
	to{
		transform: scale(1)
	}
}
@keyframes window-closing{
	from{
		transform: scale(1)
	}
	to{
		transform: scale(0)
	}
}
</style>
