<template lang="pug">

//- .windowpane(:id="'windowpane-'+window_id")
//- .dragframe( @mousemove="doDrag" @click="preventDefault()" @mouseup="stopDrag" @mouseleave="stopDrag" v-bind:style="{zIndex: window_id }")
.windowpane(:id="'windowpane-'+window_id" v-bind:style="{ transform: 'translate('+ xPerc +'%,' + yPerc +'%)'}")
	//- .window(v-draggable="draggableValue" :class="info.active ? 'active' : 'inactive'")
	.window(:class="info.active ? 'active' : 'inactive'" ref="window" @click="popWindow(window_id)" v-bind:style="{ width: width+'px', height: height+'px'}")
		.content
			slot
		//- @click="setWindowCoordinates(busstop)"
		.toolbar(@mousedown="startDrag" ref="toolbar")
			.blank
			.bg
			.tidle {{info.title}}
			.buddins
				.maximize +
				.minimize _
				.close 	  X
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
			x: 0,
			xPerc:0,
			xOffset:0,
			xOrigin:0,
			xStart:0,
			y: 0,
			yPerc:0,
			yOffset: 0,
			yOrigin: 0,
			yStart: 0,
			width: 600,
			height: 400,
			rescale: {
				scaling: false
			}
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
				}
			}
		},
		window_id: {
			type: Number,
			default: "0"
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
				this.xPerc = (this.x - this.xOffset)/(window.innerWidth)*100
				this.yPerc = (this.y - this.yOffset)/(window.innerHeight)*100				
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
					console.log("scaleX")
				}
				if (this.rescale.top){					
					this.yPerc = (this.y)/(window.innerHeight)*100
					this.height =  this.yStart - this.y
					console.log("scaleY")
				}
			}}
		},   
    stopDrag() {
			this.x = this.y = ''
      this.dragging = this.rescale.scaling = false			
			console.log("stopDrag")
    }, 
		setGlobalMouse(){
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
	},
	mounted() {
    window.addEventListener('mouseup', this.stopDrag);
    window.addEventListener('mouseleave', this.stopDrag);
    window.addEventListener('mousemove', this.doDrag);
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" scoped>
.dragframe
	width 100vw
	height 100vh
	position absolute 
	top 0
	left 0
	background #33333333
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
		grid-template:\
		"sc-tl sc-t sc-tr" 10px\
		"sc-l   .   sc-r" 25px\
		"sc-l   .   sc-r" auto\
		"sc-bl sc-b sc-br" 10px\
		/ 10px auto 10px
		.toolbar
			grid-column 2/3
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
			grid-column 2/3
			grid-row 3/4
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
</style>
