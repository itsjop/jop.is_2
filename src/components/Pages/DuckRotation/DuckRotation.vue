<template lang="pug">
section.bg
	.duck
	audio(autoplay)
		source(src='./DuckRotation.ogg' type='audio/ogg')
		| Your browser does not support the audio element.

</template>

<script>
export default {
   name: 'DuckRotation',
   data() {
      return {
         count: 0
      }
   },
	props: {
   },
	methods:{},
	created(){
		new Audio('src/components/Pages/DuckRotation/DuckRotation.ogg').play()
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" scoped>
.bg
	width 100%
	height 100%
	background-image: url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/522641/duck_bg.png');
	background-size cover
	background-repeat none
.duck
	position absolute;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
	width: 80%
	height: 50%
	animation duck 20s linear infinite
	background url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/522641/duck.png')
	background-size contain
	background-repeat no-repeat
	transform-origin left
@keyframes duck{
	from{transform: rotateY(0deg) translate(-50%, -50%);}
	to{transform: rotateY(-360deg) translate(-50%, -50%);}
}
</style>
