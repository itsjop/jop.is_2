<template lang="pug">
   section.mtg
      .card
        .cardgrid
          .background.bg--green
          .title Xytraxian Blumperton
          .mana 
          .image-holder
            .image
          .cardtype Creature - Legendary Stinky Boy
          .series 
          .desc
            p At the beginning of your draw step, you may draw two additional cards. If you do, choose two cards in your hand drawn this turn.
            br 
            p For each of those cards, gain 4 life or put the cards onto the battlefeild.
          .str 2/2
          .artist 322/322 R
            p M15 • 🖌 Piotr Krezelewski
          .sticker
          .sticker2
          .copyright ™ & © 2015 Wizards of the Coast
</template>

<script>
export default {
   name: 'MTGCard',
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
// Art by Piotr Krezelewski, check 'em out! 
// https://www.artstation.com/piotrkrezelewski
// https://www.artstation.com/artwork/VPXY4
cards = 5
body
	background #222
	font-family beleren, serif
	overflow hidden
.hand
	position absolute
	bottom 25%
	right 50%
sizor = 500px
.card	
	position relative
	height sizor
	width sizor * .72
	position absolute;
	left: 50%;
	top: 50%;	
	transform-origin 50% 100%
	transition .2s cubic-bezier(0.680, -0.550, 0.265, 1.550)
	// num = 0
	// for num in (1..cards)
	// 	&:nth-child({num})
	// 		fan = 0
	// 		spread = 15
	// 		transform: translate(-10% - (num * spread)%, -100% ) rotate((-(fan)deg * num)+((((cards / 2) + 1)*fan)deg))
	// 		z-index (num) * -1		
	transform translate(-50%,-50%)
	&:hover		
		transform: translate(-50% , -50% ) rotate(0) scale(1.2)
		z-index cards + 1
.cardgrid
	height 100%
	width 100%
	filter blur(.00vmin)
	background black
	border-radius 5%
	display: grid 
	grid-template-columns: 5% 2.5% 35% 15% 20% 15% 2.5% 5%
	grid-template-rows: 4% 1.5% 5% 45% 5% 23% 3% 6.5% 4% 3%;
	backface-visibility hidden	
	animation: cardwobble 2s cubic-bezier(0.635, 0.050, 0.380, 0.920) 1s infinite;
	
// @keyframes cardwobble{
// 	0%{ transform:  translate(-50%, -50%) rotate(-10deg);}
// 	50%{ transform: translate(-50%, -50%)  rotate(10deg);}
// 	100%{ transform: translate(-50%, -50%)  rotate(-10deg);}
// }	
// @keyframes cardwobble2{
// 	0%{ transform: translateX(7vw) rotate(10deg);}
// 	50%{ transform: translateX(0vw) rotate(-13deg);}
// 	100%{ transform: translateX(7vw) rotate(10deg);}
// }
	.title
		background #BDD2C9
		position relative
		width auto
		vertical-align center
		border-radius 3%
		grid-column-start 3
		grid-column-end 7
		grid-row-start 3
		grid-row-end 3
		padding (sizor / 148)
		border green 2px solid
		border-width 2px 0 2px 0
		&::before
			width 7px
			display inline-block
			position absolute
			background #BDD2C9
			height 100%
			top -2px
			left -7px
			content ''
			border-bottom-left-radius 50%
			border-top-left-radius 50%			
			border 2px green solid
			border-width 2px 0 2px 2px
		&::after
			width 7px
			display inline-block
			position absolute
			background #BDD2C9
			height 100%
			top -2px
			right -7px
			content ''
			border-bottom-right-radius 50%
			border-top-right-radius 50%			
			border 2px green solid
			border-width 2px 2px 2px 0
	.bg--green
		background rgba(255,255,255,.1) url(https://media-dominaria.cursecdn.com/attachments/88/812/635032494788529192.jpg)
		background-blend-mode: lighten;
	.background
		grid-column-start 2
		grid-column-end 8
		grid-row-start 2
		grid-row-end 9
		border-top-left-radius 3%
		border-top-right-radius 3%
		border-bottom-left-radius 10%
		border-bottom-right-radius 10%
	.image-holder
		grid-column-start 3
		grid-column-end 7
		grid-row-start 4
		grid-row-end 5
		position relative
		border green 2px solid
		background-size cover
		overflow hidden
		box-shadow: 0px 0px 10px 5px inset rgba(0,0,0,.8);
	.image
		grid-column-start 3
		grid-column-end 7
		grid-row-start 4
		grid-row-end 5
		position absolute
		left -20%
		top -12%
		width 130%
		height 130%
		background mintcream url(https://78.media.tumblr.com/acbd4c27bb2e7c353327b0374ab24922/tumblr_pap0u4A7DK1sn3ne4o1_1280.jpg)
		background-position bottom
		background-size cover
		transform-origin bottom 60%
		animation: cardwobble2 2s cubic-bezier(0.635, 0.050, 0.380, 0.920) 1s infinite;
	.cardtype
		grid-column-start 3
		grid-column-end 7
		grid-row-start 5
		grid-row-end 6
		position relative
		background #BDD2C9
		border green 2px solid
		padding .8vmin
		&::before
			width 7px
			display inline-block
			position absolute
			background #BDD2C9
			height 100%
			top -2px
			left -7px
			content ''
			border-bottom-left-radius 50%
			border-top-left-radius 50%			
			border 2px green solid
			border-width 2px 0 2px 2px
		&::after
			width 7px
			display inline-block
			position absolute
			background #BDD2C9
			height 100%
			top -2px
			right -7px
			content ''
			border-bottom-right-radius 50%
			border-top-right-radius 50%			
			border 2px green solid
			border-width 2px 2px 2px 0
	.mana
		grid-column-start 6
		grid-column-end 7
		grid-row-start 3
		grid-row-end 3
		background-image: url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/522641/mana.png);
		z-index 2
		background-repeat no-repeat
		background-size 100%
		background-position center right
	.series
		grid-column-start 6
		grid-column-end 7
		grid-row-start 5
		grid-row-end 6
		background-image: url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/522641/m15.png);
		z-index 2
		background-repeat no-repeat
		background-size 72%
		background-position center right
	.desc
		grid-column-start 3
		grid-column-end 7
		grid-row-start 6
		grid-row-end 9
		background #D3E4DA
		border green 2px solid
		padding 3vmin		
		font-family planting, serif
		p 
			//filter blur(.4px)
	.sticker
		grid-column-start 4
		grid-column-end 5
		grid-row-start 9
		grid-row-end 10
		background black
		position absolute
		top -60%
		width 100%
		height 120%
		border-radius 50%
		border green 2px solid
	.sticker2
		grid-column-start 4
		grid-column-end 5
		grid-row-start 9
		grid-row-end 10
		background black url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/522641/sticker.jpg')
		background-size cover
		background-position -20% 30%
		position absolute
		top -50%
		width 100%
		height 120%
		border-radius 50%
		border black 2px solid
	.str
		grid-column-start 6
		grid-column-end 7
		grid-row-start 8
		grid-row-end 9
		background #B7CCC3
		position absolute
		top 50%
		width 90%
		height 65%
		border-radius 30%
		border darken(#B7CCC3,30) 2px solid
		text-align center
		padding 2pt
		box-shadow: inset -1px 2px 3px 0px #4D5450;
	.copyright
		grid-column-start 5
		grid-column-end 7
		grid-row-start 10
		grid-row-end 10
		color white
		text-align right
		vertical-align bottom
		font-family Times New Roman, serif
	.artist
		grid-column-start 2
		grid-column-end 4
		grid-row-start 9
		grid-row-end 10
		color white
		padding 10px
		text-align left
		vertical-align bottom
		font-family Times New Roman, serif
		
		
		
		
		
// 'Beleren' is copyright Wizards of the Coast!
// Don't use 'em for commercial use, dummy!
@font-face {
  font-family: planting;
  src:  url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/522641/Plantin.otf')
}@font-face {
  font-family: beleren;
  src:  url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/522641/beleren-bold_P1.01.ttf')
}		
		
</style>
