<template lang="pug">
section.not-geo
   .header
      .publication &nbspGalactic Geographic
      .date November 17, 2074
      #imache.slider
      .mask
      #imache2.slider
      a(href="https://unsplash.com/photos/wK_DZlAJJ_Q").maintitle The Beauty of the Night 
   #section1.article-body
      #sb-img1.sb-image.right
      #text1.textwords.left
         h1 Exhausted After the Hunt
         br
         p The mother wolf sleeps alone on a smooth rock. 
         span Captured in 
         a(href="https://unsplash.com/photos/wK_DZlAJJ_Q") Orlu, France by Grégoire Bertaud
         span , this placid scene contrasts the vile activities of the day.
   #section2.article-body
      #sb-img2.sb-image.left
      #text2.textwords.right.textwords-alt
         h1 No Home Like Eternal Darkness
         br
         p A teeming school of bioluminescent jellyfish float along the currents. 
         span Captured in 
         a(href="https://unsplash.com/photos/jRlX5meHgvM") China by Teddy H.
         span , these grocery-bag beings float wherever the water takes them.
   #section3.article-body
      #sb-img3.sb-image.right
      #text3.textwords.left
         h1 Prime Time
         br
         p With the endless nights above the arctic circle, all of the time is hunting time for this keen arctic fox.
         span Captured in 
         a(href="https://unsplash.com/photos/tHh5asdZd1g") Thórsmörk, Iceland by Jonatan Pie
         span .
   .footer
      p Copyright: Galactic Geographic, 2018. All Rights Reserved.
      p Please don't sue me, NatGeo.
</template>

<script>
import './index'
export default {
   name: 'NotGeo',
   data() {
      return {
      }
   },
	props: {},
   methods:{}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" scoped>
@import url('https://fonts.googleapis.com/css?family=Playfair+Display|Quattrocento+Sans');
html body
	background black
	width 100vw
	height 100vh
	overflow-x hidden
section
	color white
	font-family: 'Playfair Display', serif
	background black
	position relative

.header
	position relative
	height 500px
	width 100%
.slider
	border-radius 2vmax 2vmax 0 0
	width 80%
	height 80%
	position absolute;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
	background-size cover
	background-position bottom
#imache
	//transition .2s linear
	background url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/522641/mt-bg.jpg')
	background-size cover
	background-position bottom
#imache2
	background url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/522641/mt-top.png')
	background-size cover
	background-position bottom
	box-shadow: inset 0px -18px 16px 0px rgba(0,0,0,1);
.mask
	width 100%
	background black
	position absolute
	bottom -5%
	height 15%
.maintitle
	width 100%
	color white
	text-decoration none
	position absolute
	bottom 10%
	right 8%
	font-size 5vmax
	text-align right
	z-index 10
	&::before
		background #FFCC00
		content ""
		position absolute
		z-index -2
		right 0 
		bottom -20px
		height 10px
		width 60%
.publication
	position absolute
	line-height 20px
	left 2%
	top 0%
	z-index 10
.publication::before
	display: inline-block;
	content: ''
	position relative
	left 0
	top 1.9vmin
	width 3.6vmin
	height 5vmin
	background #FFCC00
.publication::after
	display: inline-block;
	position absolute
	left .67vmin
	top 2.5vmin
	content: ''
	width 2.33vmin
	height 3.9vmin
	background black
.date
	position absolute
	right 5vmin
	top 3vmin
	z-index 10
.article-body
	position relative
	background black
	width 100%
	height 50vh
	z-index 2
	display flex
	flex-wrap wrap-reverse
h1
	font-size 4vmax
.textwords
	position absolute
	top 25%
	width 70%
	max-width 800px
	background black
	color #ccc
	padding 10px 10px 10px 20px
	// transform translate(-50%)
	&::before
		top 0
		background #FFCC00
		content ""
		position absolute
		left 0 
		width 10px
		height 100%
	p, span, a
		font-size 16px
		line-height auto
		font-family: 'Quattrocento Sans', sans-serif;
	a
		color white
	h1
		color #cccccc
		margin 10px
.textwords-alt	
	padding 10px 25px 10px 10px
	&::before
		top 0
		left auto
		background #FFCC00
		content ""
		position absolute
		right 5px
		width 10px
		height 100%
#text2
	top 35%
#text3
	top 40%
.sb-image
	position absolute
	min-width 500px
	bottom 0
	width 70%
	height 95%
	background-size cover
	background-position center
#sb-img1
	box-shadow inset -25px 25px 50px 0px #000
	background-image url('https://images.unsplash.com/photo-1518443855757-dfadac7101ae?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=6d79498c26e2a9561b0ddae80e48894a&auto=format&fit=crop&w=1350&q=80')
	transform: scaleX(-1);
	background-position center
#sb-img2
	box-shadow inset 25px 25px 50px 0px #000
	background-image url('https://images.unsplash.com/photo-1445247484843-b57c04d06d2a?ixlib=rb-0.3.5&s=bc363889badb06d716934742a6ff1ad9&auto=format&fit=crop&w=1350&q=80')
	transform: scaleX(-1);
	background-position 30%
#sb-img3
	box-shadow inset -25px 25px 30px 0px #000
	background-image url('https://images.unsplash.com/photo-1482878603463-6092a522e6e5?ixlib=rb-0.3.5&s=7bf14a462aaf030b93f06e5f643ba88c&auto=format&fit=crop&w=634&q=80')
	transform: scaleX(-1);
	background-position center 70%
.left
	left 0 
.right
	right 0
	text-align right
.footer
	padding-top 3vh
	width 100%
	height 10vh
	text-align center
	line-height 3vh
	font-family: 'Quattrocento Sans', sans-serif;
</style>
