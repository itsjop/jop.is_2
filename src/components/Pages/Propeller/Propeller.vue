<template lang="pug">
section.propeller
	.dotter
	.spinner
		.circle.red
	.spinner.onetwenty
		.circle.blue
	.spinner.twofourty
		.circle.green

</template>

<script>
export default {
	name: 'Propeller',
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

scaler = 	cubic-bezier(0.760, 0.010, 0.365, 0.990)
spin = 		cubic-bezier(0.760, 0.010, 0.365, 0.990)

section 
	overflow hidden
	background black
	width 100%
	height 100%
.circle
	position: absolute;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
	width 20%
	height 20%
	border-radius 200px
	animation dots 8s scaler 100 
	
.red
	background magenta
.green
	background yellow
.blue 
	background cyan
.spinner
	mix-blend-mode screen
	position absolute
	width 100%;
	height 100%;
	left: 50%;
	top: 50%;
	transform: translate(-48%, -50%) rotate(720deg);
	transform-origin center
	animation spin1 4s spin infinite 
	&.onetwenty
		animation-name spin2
	&.twofourty
		animation-name spin3
	
@keyframes dots {
0%  {
	transform translate(-46%,-50%) scale(1)
	filter blur(10px) invert(0)
	border-radius 200px
}
25%  {
	transform translate(-0%,-50%) scaleX(1.3) scaleY(.5)
	filter blur(0px) invert(0)
	border-radius 50% 20% 200px 50%
}
50%  {
	transform translate(-46%,-50%) scale(1)
	filter blur(10px) invert(0)
	border-radius 200px
 }
75%  {
	transform translate(50%,-00%) scaleX(1) scaleY(1)
	filter blur(0px) invert(1)
	border-radius 200vw
}
100%  {
	transform translate(-46%,-50%) scale(1)
	filter blur(10px) invert(0)
	border-radius 200px
 }
}
 
// @keyframes dots {
// 0%  {
// 	transform translate(500%,-50%)
//  }
// 100%{
// 	transform translate(-50%,-50%)
//  }}
 
@keyframes spin1 {
0%{
	transform translate(-50%,-50%) rotate(0deg)
}
50%  {
	transform translate(-50%,-50%) rotate(720deg)
 }
100%{
	transform translate(-50%,-50%) rotate(1440deg)
}}
@keyframes spin2 {
0%{
	transform translate(-50%,-50%) rotate(120deg)
}
50%  {
	transform translate(-50%,-50%) rotate(840deg)
 }
100%{
	transform translate(-50%,-50%) rotate(1560deg)
}}
@keyframes spin3 {
0%{
	transform translate(-50%,-50%) rotate(240deg)
}
50%  {
	transform translate(-50%,-50%) rotate(960deg)
 }
100%{
	transform translate(-50%,-50%) rotate(1680deg)
}}
.dotter
	position relative
	width 100%;
	height 100%;


</style>
