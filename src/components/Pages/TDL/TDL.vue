<template lang="pug">
section.tdl
   - var n = 0;
   ul#shuffle
      while n < 50
         .anchor(id='anchor-' + n)= n++
            .wanderer <!-- offset X & Y animation-->
               .wiggler <!--wave animation-->
                  .wobbler <!--passive animation, to be added-->
                     .shape(id='shape-' + n) <!--shape itself, currently only square-->
   #overlay
   #t
      .t
      .tl
   #d
      .d
      .dr
   #l
      .l
      .lr
   .top HOME &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ABOUT &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; HEADER ONLY&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; (for a facebook group)
   .bottom 
      .useless-image Fake Article Here - Don't Scroll

</template>

<script>
export default {
   name: 'TDL',
   data() {
      return {
      }
   },
	props: {},
   methods:{},
   created(){
   var n=0;
   var shape=0;
   var direction=0
   while (n<50){//populates the 50 shapes
      shape = Math.floor(Math.random() * 4);// (random 0 - 3)
      if (shape==0){//double semicircle
         $( "#shape-" +n ).css("background","transparent")
         direction = Math.floor(Math.random() * 4);//random direction
            if (direction==0){$( "#shape-"+n ).append("<div class='semi-r'></div><div class='semi-r semi-r2'></div>");}
            if (direction==1){$( "#shape-"+n ).append("<div class='semi-l'></div><div class='semi-l semi-l2'></div>");}
            if (direction==2){$( "#shape-"+n ).append("<div class='semi-u'></div><div class='semi-u semi-u2'></div>");}
            if (direction==3){$( "#shape-"+n ).append("<div class='semi-d'></div><div class='semi-d semi-d2'></div>");}
      }	
      if (shape==1){
         $( "#shape-" +n ).css("background","transparent")
         direction = Math.floor(Math.random() * 4);//random direction
            if (direction==0){$( "#shape-"+n ).append("<div class='tri-l'></div>");}		
            if (direction==1){$( "#shape-"+n ).append("<div class='tri-r'></div>");}		
            if (direction==2){$( "#shape-"+n ).append("<div class='tri-d'></div>");}		
            if (direction==3){$( "#shape-"+n ).append("<div class='tri-u'></div>");}
      }
      // if (shape==2||shape==3){//this block just punches holes in the grid
      // //uncomment it if you want the empty spaces
      // 	$( "#anchor-" +n ).css("display","none");//just removes divs
      // }
      n++
   }

   },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" scoped>

@font-face {
    font-family: sophia;
    src: url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/522641/sofiapro-light.otf);  
}

rows=5
cols=10
vsize=50%
hsize=40%
shape-anim-time=7s
shape-anim-delay=.7s
logo-anim-time=3.5s
c=0
r=0
n=0
midnight=#11163f	
blu=#3fc1d6
pnk=#ed3082
grn=#68bf68
ylw=#fcc94c
orn=#f27a33
prp=#725ea5

@media (max-width: 600px)
	rows=10
	cols=5
	
random(min,max)
  return floor(math(0, 'random')*(max - min + 1) + min)

tri()
	width 0
	height 0
	border-style solid
logo-anim()
	animation logo-anim-time ease-out
	animation-timing-function cubic-bezier(0.115, 1.035, 0.290, 1.000);
	 
randomOfficialColor(num)
	if num == 0 
		return blu
	else if num == 1 
		return pnk
	else if num == 2 
		return grn
	else if num == 3 
		return ylw
	else if num == 4 
		return orn
	else 
		return prp
	
randomShape(num)
	if num == 0  
		border-radius 50%
	else if num == 1 
		border-radius 50%
	else if num == 2 
		border-radius 50%
	else if num == 3 
		border-radius 50%
	else if num == 4 
		border-radius 50%
	else 
		border-radius 50%

body, html
	background midnight

for r in (1..rows)
	for c in (1..cols)
		.anchor:nth-child({(((r - 1)*cols)+c)})
			transform translate( ((c - 1)*(100/cols) + 3)%,((r - 1) * (20) + 5)% )
			.wiggler 
				animation-delay random(0,100)/20
			.wobbler
				animation-delay (((r - 1)*cols)+c*5)*10ms +shape-anim-delay
			.shape
				animation-delay (((r - 1)*cols)+c*5)*10ms+shape-anim-delay
				background-color: randomOfficialColor(random(0,5))
				randomShape(random(0,5))

.anchor
	width 3%
	height 3%
	position absolute
	transition 1s ease
	color midnight

.wobbler
	height 100%
	width 100%
	position absolute
	top 0
	transform-origin 50% 50%
	animation fling shape-anim-time*2
	animation-iteration-count infinite
	animation-timing-function:cubic-bezier(0.215, 0.610, 0.355, 1.000); /* easeOutCubic */

.wiggler
	height 100%
	width 100%
	position absolute
	top 0
	animation wander 5s
	animation-iteration-count infinite
	animation-timing-function:cubic-bezier(0.215, 0.610, 0.355, 1.000); /* easeOutCubic */

.shuffle, body
	overflow hidden
.shape
	height 100%
	width 100%
	position absolute
	top 0	
	animation sharpen shape-anim-time*2
	animation-iteration-count infinite
	animation-timing-function:cubic-bezier(0.215, 0.610, 0.355, 1.000);
	
@keyframes fling {
	0% {transform: rotate(00deg) scale(1);}
	2.5% {transform: rotate(-45deg) scale(.95);}
	5% {transform: rotate(225deg) scale(1.1);}
	7.5% {transform: rotate(135deg) scale(1.05);}
	10% {transform: rotate(180deg) scale(1);}
	50% {transform: rotate(180deg) scale(1);}
	52.5% {transform: rotate(135deg) scale(.95);}
	55% {transform: rotate(405deg) scale(1.1);}
	57.5% {transform: rotate(225deg) scale(1.05);}
	60% {transform: rotate(360deg) scale(1);}
	100% {transform: rotate(360deg) scale(1); }
}
@keyframes sharpen {
	0% {border-radius: 50% }
	2.5% {border-radius: 50% }
	5% {border-radius: 0% }
	7.5% {border-radius: 30% }
	10% {border-radius: 50%; }
	50% {border-radius: 50% }
	52.5% {border-radius: 40% }
	55% {border-radius: 0% }
	57.5% {border-radius: 30% }
	60% {border-radius: 50% }
	100% { border-radius: 50% }
}
#overlay
	position absolute
	width 100%
	height 100%
	background rgba(0,0,0,0)
	animation fade 2s linear 1s forwards 
	
//letter container divs
#t
	position absolute
	left 35%
	top 35%
	background rgba(0,0,0,0)
	width 8%
	height 8%
#d
	position absolute
	left 45%
	top 35%
	background rgba(0,0,0,0)
	width 8%
	height 8%
#l
	position absolute
	left 55%
	top 35%
	background rgba(0,0,0,0)
	width 8%
	height 8%
.t
	position absolute
	left 7%
	top 10%
	height 25%
	width 86%
	background pnk
	border-radius 1%
	logo-anim()
	animation-name t1in
.tl
	position absolute
	left 37%
	top 43%
	height 43%
	width 25%
	background blu
	border-radius 1%
	logo-anim()
	animation-name t2in
	
.d
	position absolute
	left 20%
	top 10%
	height 80%
	width 20%
	background ylw
	border-radius 1%
	logo-anim()
	animation-name d1in
.dr
	position absolute
	left 50%
	top 10%
	height: hsize * 2;
	width: hsize;
	background grn
	border-radius 1%
	border-bottom-right-radius: 80% ;
	border-top-right-radius: 80% ;
	logo-anim()
	animation-name d2in

.l
	position absolute
	left 20%
	top 10%
	height 79%
	width 20%
	background orn
	border-radius 1%
	logo-anim()
	animation-name l1in
.lr	
	position absolute
	left 48%
	top 47%
	width: 0;
	height: 0;
	border-style: solid;
	border-width: 3.3% 0 0 3.3%;
	border-color: transparent transparent transparent prp;
	logo-anim()
	animation-name l2in
.top
	width 100%
	height 8%
	background #eaeaea
	position absolute
	box-shadow 0 1% 1% 1% rgba(0,0,0,.5)
	font-size: 4%
	font-family: sophia, "Century Gothic", CenturyGothic, AppleGothic, sans-serif;
	padding-top 2%
	padding-left 8%
	
.bottom
	width 100%
	height 11%
	background #eaeaea
	position absolute
	bottom 0
	box-shadow 0 -1% 1% 1% rgba(0,0,0,.5)

.useless-image
	background-image url("https://images.unsplash.com/photo-1495777938638-9afeb081a42e?ixlib=rb-0.3.5&q=85&fm=jpg&crop=entropy&cs=srgb&s=0c14eb095293ba5bc39433f1c976b5c7")
	width 60%
	height 500px
	margin 6.5% auto
	font-family: sophia, "Century Gothic", CenturyGothic, AppleGothic, sans-serif;
	font-size: 8%;
	text-align center
	color #eaeaea
	
	
//divs for the semicircles	
.semi-r
	height 80%
	width 44%
	top 10%
	left 7%
	position absolute
	background ylw
	border-bottom-right-radius: 80% ;
	border-top-right-radius: 80% ;
.semi-r2
	left 50%
.semi-l
	height 80%
	width 44%
	top 10%
	left 7%
	position absolute
	background orn
	border-bottom-left-radius: 80% ;
	border-top-left-radius: 80% ;
.semi-l2
	left 50%	
.semi-u
	height 44%
	width 80%
	top 10%
	left 7%
	position absolute
	background prp
	border-top-left-radius: 80% ;
	border-top-right-radius: 80% ;
.semi-u2
	top 50%		
.semi-d
	height 44%
	width 80%
	top 10%
	left 7%
	position absolute
	background blu
	border-bottom-left-radius: 80% ;
	border-bottom-right-radius: 80% ;
.semi-d2
	top 50%	
	
.tri-l
	tri()
	border-width: 3% 0 0 3%;
	border-color: transparent transparent transparent blu;
.tri-r
	tri()
	border-width: 0 0 3% 3%;
	border-color: transparent transparent orn transparent;
.tri-u
	tri()
	border-width: 3% 3% 0 0;
	border-color: prp transparent transparent transparent;
.tri-d
	tri()
	border-width: 0 3% 3% 0; 
	border-color: transparent grn transparent transparent;

@keyframes fade {
	from {background: rgba(0,0,0,0)}
	to{background: rgba(0,0,0,.4)}
}	
@keyframes t1in {	
	0%{transform: translate(-50%,-50%)}
	20%{transform: translate(-50%,-50%)}
	100%{transform: initial}
}
@keyframes t2in {	
	0%{transform: translate(-50%,50%)}
	20%{transform: translate(-50%,50%)}
	100%{transform: initial}
}
@keyframes d1in {	
	0%{transform: translate(0,50%)}
	20%{transform: translate(0,50%)}
	100%{transform: initial}
}
@keyframes d2in {	
	0%{transform: translate(0,-50%)}
	20%{transform: translate(0,-50%)}
	100%{transform: initial}
}
@keyframes l1in {	
	0%{transform: translate(50%,50%)}
	20%{transform: translate(50%,50%)}
	100%{transform: initial}
}
@keyframes l2in {	
	0%{transform: translate(50%,-50%)}
	20%{transform: translate(50%,-50%)}
	100%{transform: initial} 
}

</style>
