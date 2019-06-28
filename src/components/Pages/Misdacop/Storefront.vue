<template lang="pug">
section.misdacop
	- var n = 0;
	header
		.header--slider
			.header--blurrer
				while n < 22
					.header--shoe= n++		 
		.header--topbar
		img.header--logo(src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/522641/missedacop%20logo%20(black).png" alt="Misdacop Logo" @click="navHome") 
		.header--links
			a().h--store Store
			a().h--my-account Account
			a().h--contact Contact
		.header--carousel 
			.carousel--text
				.centerer
					p.tagline NEVER MISS A DROP AGAIN.
					img(src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/522641/missedacop%20logo%20(white).png" alt="Misdacop Logo") 
					p.white.logo misdacop
		.header--botbar
		
	.grid
		.item-showcase(@click="navItem")
			a
				.widepage--showcase
					img.dbz-float.showcase--img(src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/522641/redshoe22.png" alt="Red Shoe")
				//Image from https://www.goat.com/sneakers/tyler-the-creator-x-golf-le-fleur-molten-lava
				.widepage--showtext 
					p Golf Le Fleur x One Star 
					p 'Molten Lava'
			.widepage--catcher Featured Pair - 2h left!
		#listing
			.listing--photogallery
				img#photo1.listing--photo.listing--photo__pregutter(src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/522641/redshoe22.png" alt="Side View")
				img#photo2.listing--photo.listing--photo__preview(src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/522641/redshoe22.png" alt="Front View")
				img#photo3.listing--photo.listing--photo__active(src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/522641/redshoe22.png" alt="Angle View")
				img#photo4.listing--photo.listing--photo__postview(src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/522641/redshoe22.png" alt="Both Shoes")
				img#photo5.listing--photo.listing--photo__postgutter(src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/522641/redshoe22.png" alt="Comes with Bean Sorter!")
				#listing--prev <
				#listing--next >
			.listing--description
				.listing--title
					p Golf Le Fleur x One Star 
					p 'Molten Lava'
				.listing--summary
					p Tyler, The Creator partners up with Converse to celebrate freedom of expression through his designs to reflect his daring confidence, youthful spirit and creative style. The fourth One Star x Golf le Fleur collection features the One Star Ox silhouette in four different colorways, in addition to sweatshirts and graphic tees to match. Pictured is the Converse x GOLF le FLEUR One Star Ox in Molten Lava/Diva Blue/Cherry.
					.listing--the-buy-zone
						button.listing--wishbutton(onclick="buttonclick(this)") Wishlist
						button.listing--buybutton(onclick="buttonclick(this)") Cart
					strong THIS SHOE DOES NOT QUALIFY FOR ANY DISCOUNTS OR SPECIAL PROMOTIONS. 
					strong LIMIT ONE PAIR PER CUSTOMER.
					strong ALL SALES FINAL.
					ul
						li Premium suede upper
						li Contrast stitching
						li Debossed tonal Converse Golf le Fleur logo on tongue
						li Golf le Fleur art on Ortholite sockliner
						li All sizes are listed in U.S. Men's sizing unless stated otherwise
						li Style no: 162126C		
						br
						br
		footer Footer	

</template>

<script>
export default {
   name: 'Storefront',
   data() {
      return {
      }
   },
	props: {},
	methods:{
		navHome(){
			alert()
			this.$emit('navHome')
		},
		navItem(){
			this.$emit('navItem')
		},
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" scoped>

header-shoes-num = 24
shoe-offset = 23
anim-finish = 5s
reducer = 1
shoe-appear()
	animation shoe-appear .8s (anim-finish + .2s) ease forwards
	opacity 0
	will-change: opacity; 
@import url("https://fonts.googleapis.com/css?family=Inconsolata:400,700");
@import url('https://fonts.googleapis.com/css?family=Podkova');
@font-face {
  font-family: LetterGothic;
  src:  url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/522641/LetterGothicStd.otf') 
}
@font-face {
  font-family: Znikomit;
  src:  url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/522641/Znikomit.otf') 
}
section
	height 100%
	overflow-x hidden
	font-family: LetterGothic, monospace;
	background white
   position relative
header
	overflow hidden
	font-family 'Inconsolata', serif;
strong 
	font-weight 900
ul 
	list-style-type: disc; 
	list-style-position: inside; 
	margin-left 10px	
button
	border 1px solid black
	font-size 2vw
	padding 5px 10px
	width auto
	cursor pointer
	transition background .5s ease
.listing--the-buy-zone
	position absolute
	bottom 2vh
	right 2vw
	display flex
	justify-content flex-end
.listing--buybutton, .listing--wishbutton
	margin 10px
	font-family Podkova, serif
#listing 	
	shoe-appear()
	font-family: Inconsolata, monospace;
	display: flex;
	grid-column 2/5
	position relative	
	margin 0 1vw
	// Photos Side
	.listing--photogallery		
		height 70vh
		position relative
		width calc(50% - 1px)
		border 1px black solid
		border-right 0px
		overflow hidden
		background white
		#listing--prev, #listing--next
			width 6vw
			height 50%
			position absolute
			top 50%
			transform translateY(-50%)
			font-size 5vw
			text-align center
			line-height 35vh
			background white	
			transition .5s ease			
			border 1px solid black
			opacity 0
			user-select none
			&:hover
				opacity 1
		#listing--prev	
			border-left 0px solid black
			left 0
		#listing--next
			border-right 0px solid black
			right 0
		.listing--photo
			width 80%
			object-fit contain
			height auto
			top 50%
			left 50%
			transform translate(-50%,-50%)
			position absolute
		.listing--photo__pregutter
			transform translate(-250%,-70%)
		.listing--photo__preview
			transform translate(-160%,-120%)
		.listing--photo__postgutter
			transform translate(150%,-30%)
		.listing--photo__postview
			transform translate(60%,-0%)
		.listing--photo__active
			transform translate(-50%,-50%)
	//Description Side
	.listing--description
		height 70vh
		background white
		width calc(50% - 1px)
		border 1px black solid
		overflow-y scroll		
		box-sizing: content-box;
		.listing--summary
			padding 0px 15px 0px 20px 
			p
				text-align justify
				margin 10px 0 
		.listing--title			
			font-family Podkova, serif
			font-size 40px
			text-align center
			p
				margin 10px 0
		.listing--summary
			padding-bottom 40px
	//Small Screen Resizing
@media (max-width: 750px)	
	#listing
		flex-wrap wrap
		.listing--photogallery
			width calc(99vw - 1px)
			height 40vh
			border-right 1px solid black
			border-bottom 0px
		.listing--description
			height auto
			width calc(100% - 1px)
			.listing--title			
				font-family Podkova, serif
				font-size 6vw			
	.listing--the-buy-zone
		justify-content space-evenly
	button
		font-size 4vw





















header-fade = 1s
.header--slider	
	position absolute
	transform: translateX((shoe-offset)%) translateZ(0);
	width 100%
	height 100%
	will-change: transform; 
	animation header-slider 2s (anim-finish - .1s) ease forwards
.header--blurrer	
	animation header-blur 2s (anim-finish - .5s) ease forwards
	height 100%
	will-change filter
	filter blur(.1px)
	position relative
	top 0


.header--shoe
	position absolute
	left 0
	top 0%
	height 100%
	width 100%
	mask-image: url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/522641/shoe_header.svg);
	mask-size auto 200%
	opacity 0
	mask-position center 50%
	mask-repeat no-repeat
	animation-name shoe-appear
	animation-duration 0
	animation-fill-mode: forwards	
	

@media (min-width: 00px)
	for num in (1..(header-shoes-num/3))
		.header--shoe:nth-child({num*3})
			left (((num*3) - 3)*(130/header-shoes-num)- shoe-offset)%
			background-color mix(cyan, magenta, floor(((num*3) - 1)*(100/header-shoes-num)%))
			animation-delay (anim-finish - (5/(((num*3) - 3)**.9)))+.2s
			z-index header-shoes-num - (num*3)
@media (min-width: 600px) and (max-width: 1200px)
	for num in (1..(header-shoes-num/2))
		.header--shoe:nth-child({num*2})
			left (((num*2) - 2)*(130/header-shoes-num)- shoe-offset)%
			background-color mix(cyan, magenta, floor(((num*2) - 1)*(100/header-shoes-num)%))
			animation-delay (anim-finish - (5/(((num*2) - 2)**.9)))+.2s
			z-index header-shoes-num - (num*2)
@media (min-width: 1200px)
	for num in (1..(header-shoes-num))
		.header--shoe:nth-child({num})
			left (((num) - 1)*(130/header-shoes-num)- shoe-offset)%
			background-color mix(cyan, magenta, floor(((num) - 1)*(100/header-shoes-num)%))
			animation-delay (anim-finish - (5/((num)**.9)))+.2s
			z-index header-shoes-num - (num)			
			
.header--logo
	position absolute
	z-index 101
	top 10px 
	left 0px
	width 20%
	height 10%
	object-fit contain
	object-position bottom
	shoe-appear()
.header--links 
	font-family: LetterGothic, monospace;
	display flex
	position absolute
	top 0
	right 0
	z-index 101
	justify-content flex-end
	a 
		shoe-appear()
		position relative
		line-height 6vh
		padding 0 2vw
		color black
		text-decoration none
		&::before
			background black
			content ''
			width 60%
			left 50%
			transform translateX(-50%)
			height 2px
			position absolute
			bottom 2vh
.header--topbar, .header--botbar
	width 110%
	left -9%
	height 20%
	top -5%
	background white
	position absolute
	z-index 100
	shoe-appear()
	filter blur(.3px) drop-shadow(00 1px 0px black);
	transform rotate(-2deg)
	//box-shadow: 0 1px 0 0px black;
.header--botbar
	top 85%
	position absolute
	z-index 98
	height 20vh
	filter blur(.3px) drop-shadow(00 -1px 0px black);
	//box-shadow: 0 -1.1px 0 0px black;
.white
	color white
.header--carousel
	position absolute
	top 15%
	width 100%
	height 70%
	line-height 60%;
	.carousel--text
		height 100%
	.centerer
		shoe-appear()
		color white
		width 100%
		text-align center
		font-size 7vw
		line-height 7vw;
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		img
			width 20%
			height 21%
			object-fit contain
			object-position bottom
		.logo			
			font-size 5vh
			line-height 3vh;
		p
			width 100%
			vertical-align: middle;
			text-align center
			line-height: normal;
			margin 0
		.tagline
			margin 0
			font-size 30px
			//text-shadow: 2px 2px 13px #feffff;
@keyframes shoe-appear{
	0%{		opacity: 0}
	100%{	opacity: 1}
}
@keyframes shoe-disappear{
	0%{		opacity: 1}
	100%{	opacity: 0}
}
@keyframes header-blur{
	0%{		filter: blur(.1px);}
	100%{	filter: blur(30px);}
}
@keyframes header-slider{
	0%{		transform: translateX((shoe-offset)%);}
	100%{	transform: translateX(-6%)}
}
////////// GRID TEMPLATE ////////

.grid
	width calc(100% - 0px)
	background white	
	position absolute
	top 90%
	z-index 99
	shoe-appear()
	display: grid;
	grid-template-columns: 20px 10% auto 10% 20px;
	grid-template-rows: 24vh auto 150px;
	grid-gap: 1em;
	padding 40px 0px


.item-showcase
aside,
article,
footer {
  background: transparent;
	border 1px solid black
}
.sidebar-right
	grid-column 4
.sidebar-left
	grid-column 2
article
	grid-column: 2 / 5
.item-showcase, footer {
	border-left 0px
	border-right 0px
  grid-column: 1 / 6;
}
.item-showcase
	position relative
	transform skewY(-2deg)
	overflow hidden
	margin-bottom 2vh
	background: linear-gradient(180deg, #dea19d 0%, #a3cadd 100%);
	box-shadow 0px 0px 1px 0px black
	color transparent
	a
		transition .5s ease
		text-decoration none
		color transparent
		@media (max-width: 650px)
			color black
		&:hover
			color black
	.widepage--catcher 
		color black
		font-size 2.5vmax
	.widepage--showtext 
		font-size 50px
		font-family Podkova, serif
		user-select none
		position absolute
		text-align right
		top 50%
		width 150%
		padding 2%
		right 2%
		transform translateY(-50%)	
		transition .5s ease		
		padding 1vmax					
		padding 2%
		right -2%
		&:hover
			p
				margin-left 2vw
				display block
				background: linear-gradient(68deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0) 50%, rgba(255,255,255,0.47) 55%, rgba(255,255,255,0.44) 100%);
	.widepage--showcase
		position absolute
		width 150%
		left 50%
		top 50%
		height 95%
		transform translate(-50%,-50%)
		object-fit contain
		transition .5s ease	
		&::before
			background darken(#a3cadd,40%)
			content ''
			opacity .3
			width 50vh
			left 50%
			transform scaleX(1) scaleY(1) translateX(-50%) skewX(10deg) 
			height 4vh
			border-radius 100%
			position absolute
			bottom .7vh
			transform-origin left top
			animation:dbz-shadow 2s cubic-bezier(.645,.045,.355,1.000) infinite alternate-reverse both 
		.showcase--img
			position absolute
			left 50%
			height 100%
			transform translateX(-50%)
		&:hover
			height 90%
			left 35%
.dbz-float
	animation:dbz-float 2s cubic-bezier(.645,.045,.355,1.000) infinite alternate-reverse both

		
@keyframes dbz-float{
0%{transform:translate(-50%,-3%)}
100%{transform:translate(-50%,3%)}
}@keyframes dbz-shadow{
0%{		transform scaleX(1.1) scaleY(1.3) translateX(-50%) skewY(-2deg);
			filter blur(5px)}
100%{	transform scaleX(1) scaleY(1) translateX(-50%) skewY(-2deg);
			filter blur(2px)}
}

</style>
