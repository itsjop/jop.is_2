<template lang="pug">
section.brambles
   .holder
      .branch
         .branch
            .branch
               .branch
                  .branch
                     .branch
         .branch
            .branch
               .branch
                  .branch
                     .branch
      .branch.rot
         .branch
            .branch
               .branch
                  .branch
                     .branch
         .branch
            .branch
               .branch
                  .branch
                     .branch
      .branch.rot2
         .branch
            .branch
               .branch
                  .branch
                     .branch
         .branch
            .branch
               .branch
                  .branch
                     .branch
</template>

<script>
export default {
   name: 'brambles',
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
fg = #90d7bc
bg = #539156
section
   background bg
   height 100%
   position relative
   overflow hidden
.holder
   position absolute;
   left: 50%;
   top: 50%;
   transform: translate(-50%, -50%);
   width: 35%;
   height: 35%
   background fg
   border-radius 100vw
.branch
	width 20px
	background bg
	height 80px
	position absolute;left: 50%;top: 50%;transform: translate(-50%, -50%);
	transform-origin center
	animation flip 2s infinite 
	*
		animation flip2 2s infinite
	.branch:first-of-type
		transform-origin 50% 95%
		.branch 
			transform-origin 50% 10%
			.branch 
				transform-origin 50% 95%
				.branch 
					transform-origin 50% 10%
					.branch 
						transform-origin 50% 95%
						.branch 
							transform-origin 50% 10%
	.branch:nth-of-type(2)
		transform-origin 50% 10%
		.branch 
			transform-origin 50% 95%
			.branch 
				transform-origin 50% 10%
				.branch 
					transform-origin 50% 95%
					.branch 
						transform-origin 50% 10%
						.branch 
							transform-origin 50% 95%

.rot
	animation flip3 2s infinite 
	*
		animation flip2 2s infinite
.rot2
	animation flip4 2s infinite 
	*
		animation flip2 2s infinite
	
@keyframes flip{
	00%{transform: translate(-50%, -50%) rotate(-10deg) skew(-35deg);}
	100%{transform: translate(-50%, -50%) rotate(350deg) skew(-35deg);}
}
@keyframes flip2{
	00%{transform: translate(-50%, -50%) rotate(-100deg) skewX(15deg) scaleY(.8)}
	100%{transform: translate(-50%, -50%) rotate(260deg) skewX(15deg) scaleY(.8)}
}
@keyframes flip3{
	00%{transform: translate(-50%, -50%) rotate(-70deg) skew(-35deg)}
	100%{transform: translate(-50%, -50%) rotate(290deg) skew(-35deg)}
}
@keyframes flip4{
	00%{transform: translate(-50%, -50%) rotate(-130deg) skew(-35deg)}
	100%{transform: translate(-50%, -50%) rotate(230deg) skew(-35deg)}
}

</style>
