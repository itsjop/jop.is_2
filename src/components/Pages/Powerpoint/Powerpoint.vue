<template lang="pug">
section.powerpoint
   - var n = 0;

   .floater
      .row.title.red clicker
      .row.subtitle.red
         p.header a project by 
         hr.style-one
         p.small jordan crandall
         p.small click on either side to move the slides
         p.small or use the arrow keys
			
			

   #slides
      #slide-0.slide.slide-init
         .header.white Project Conception
         .midpage
            .midpage30#logo.right
            .content.black.midpage70.left Our original idea was to create a Clicker game, where players accumulate points by pressing a button, and can purchase upgrades to earn points faster, points accumulate through a service in the background, with an achievement system as well.	
      #slide-1.slide.slide-init
         .header.white Planning and Project Management
         .midpage
            .midpage30#mockup.left
            .content.black.midpage70.right At an early stage in development, we planned out the looks and workflow of our appplication, and assigned different development tasks to individual members. 
               br
               br
               p Jordan worked to put together a discord server and to check up on everyone with their responsibilities.
      #slide-2.slide.slide-init
         .header.white Implementation
         .midpage
            .midpage30#main.left
            .content.black.midpage70.right The first objective was to build the MainActivity, with the points/button clicking logic. Afterwards, we created the logic for purchasing upgrades. This was followed by the Achievements system, and then lastly the incorporation of a service which would save data while the app was loaded. Finally, we imlimented the AppDrawer and settings menu. 
      #slide-3.slide.slide-init
         .header.white Feature Overview
         .content.black 
               ul
                  br
                  li Clicker and Upgrades
                  br
                  li Achievements
                  br
                  li Settings & App Drawer
                  br
                  li Service saving datain the background and update activity when you load it back up.
      #slide-4.slide.slide-init
         .header.white Achievements
         .midpage
            .midpage30#ach.left
            .content.black.midpage70.right While not the most beautiful, the acheivements panel is fully functional. 
            br
            br
            p The programming goal of the acivements page was designed to allow the modular addition and display of achievements
      #slide-5.slide.slide-init
         .header.white Upgrades
         .content.black This is how I planned to upgrades functionality, how it was implimented, and what more could be done in the future.
      #slide-6.slide.slide-init
         .header.white Progress Saving Activity
         .midpage
            .midpage30#sidebar.left
            .content.black.midpage70.right This is the original idea for the app in which it runs in the background and implements while you're away.
               br
               br
               p For the service it's declared in the Android Manifest then you send an intent from onPause to start the service. The service pulls the app data from saved preferences and uses a runnable to calculate the points every second and updates the savedPreference. onResume stops the service.
            
      #slide-7.slide.slide-init
         .header.white More Features
         .content.black Here's some features we had planned/came up with during development, but did not have the time to implement or implement fully.
            br
            br
            p •Consitant notifications
            br
            p •Custom Clicker Setup
            br 
            p •Importing / Exporting clicker files
      #slide-8.slide.slide-init
         .header.black Questions?
         .content.black This is where you get to ask me whatever you want about the Clicker
      #slide-9.slide.slide-init
         .header.black Fin
         .content.black Thanks for paying attention or at least being quiet if you didn't
         
   #nextSlide.slideButton(@click="nextSlider")
   #prevSlide.slideButton(@click="prevSlider")

      
</template>

<script>
import $ from 'jquery'
import './index'
export default {
   name: 'Powerpoint',
   data() {
      return {
			n: 0,
			totalSlides: 10
      }
   },
	props: {},
   methods:{
		nextSlider(){
			if (this.n + 1 <= this.totalSlides) {
				$("#slide-" + this.n).removeClass("slide-init");
				$("#slide-" + this.n).addClass("slide-out");
				this.n++;
			}
		},
		prevSlider(){
			if (this.n - 1 >= 0) {
				this.n--;
				$("#slide-" + this.n).removeClass("slide-out");
				$("#slide-" + this.n).addClass("slide-init");
		}
	}
},
   created(){
   }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" scoped>
@import url("https://fonts.googleapis.com/css?family=Raleway:400,400i,700");
n=0
totalslides=10
transitionspeed=1s
titleFontSize=16px
headerFontSize=32px
subtitleFontSize=16px
contentFontSize=16px

vertical-align() 
  position relative
  top arguments
  -webkit-transform translateY(-arguments)
  -ms-transform translateY(-arguments)
  transform translateY(-arguments)
	
threefourthswidth()
	width 70%
	padding 30px
	margin-top 20px !important //sorry
	margin-top 20px !important //also sorry
	
red()
	background red
	color white
	threefourthswidth()
	
blue()
	background red
	color white
	threefourthswidth()
	
orange()
	background black
	color white
	threefourthswidth()
	
green()
	background #00cc00
	color white
	threefourthswidth()
		
black()
	background black
	color white
	threefourthswidth()
	
white()
	background white
	color black
	threefourthswidth()
	
text()
	margin 0 auto
	
headers()	
	font-family Raleway, Century Gothic, sans-serif
	text-transform uppercase

InOut()
	-webkit-transition all 1000ms cubic-bezier(1.000, 0.000, 0.000, 1.000); 
	-moz-transition all 1000ms cubic-bezier(1.000, 0.000, 0.000, 1.000); 
	-o-transition all 1000ms cubic-bezier(1.000, 0.000, 0.000, 1.000); 
	transition all 1000ms cubic-bezier(1.000, 0.000, 0.000, 1.000); /* easeInOutExpo */


	

section 
	background-color #222
	overflow hidden
	height 100%
	width 100%
	position relative

.counter
	position absolute
	color white 
	font-family  Raleway, "Century Gothic", CenturyGothic, AppleGothic, sans-serif
	font-size 7%
	text-align right

#counter1
	bottom 0%

#counter2
	bottom 7%

.slide
	width 100%
	height 100%
	top 0
	background slategray
	position absolute
	box-shadow  -.5% 0 10px 0 rgba(0,0,0,.5)
	background-image  url("https://www.transparenttextures.com/patterns/fake-luxury.png")
	//thanks mr transparent!
	background-position random(0%, 12%) random(0%, 12%)
	InOut()
	
.slide-out
	transform translateX(0) !important
.slide-init
	transform translateX(initial) !important
	
#slides
	for n in (1..totalslides)
		.slide:nth-child({n})
			transform: translateX((99 - totalslides + n)%)
			background-color: hsl((n - .7)*28,100,60)

#mockup
	background-image url("https://s3-us-west-2.amazonaws.com/s.cdpn.io/522641/mock.png")
	background-size contain
	background-position center top
	background-repeat no-repeat
	height 80%

#ach
	background-image url("https://s3-us-west-2.amazonaws.com/s.cdpn.io/522641/ach.png")
	background-size contain
	background-position center top
	background-repeat no-repeat	
	height 80%

#main
	background-image url("https://s3-us-west-2.amazonaws.com/s.cdpn.io/522641/main.png")
	background-size contain
	background-position center top
	background-repeat no-repeat	
	height 80%
	
#settings
	background-image url("https://s3-us-west-2.amazonaws.com/s.cdpn.io/522641/sett.png")
	background-size contain
	background-position center top
	background-repeat no-repeat	
	height 80%
		
#sidebar
	background-image url("https://s3-us-west-2.amazonaws.com/s.cdpn.io/522641/sidebar.png")
	background-size contain
	background-position center top
	background-repeat no-repeat	
	height 80%
	
#logo
	background-image url("https://s3-us-west-2.amazonaws.com/s.cdpn.io/522641/logo.png")
	background-size contain
	background-position center top
	background-repeat no-repeat	
	height 80%
		
#activity
	background-image url("http://www.wideskills.com/sites/default/files/subjects/android/chapter3/3_6%20UPD/Image_4.png")
	background-size contain
	background-position center top
	background-repeat no-repeat	
	height 80%
	
.midpage
	margin 0 auto
	margin-top 3%
	width 70%
			
.midpage30
	margin 0 auto
	width 30%

.left
	float: left
	
.right
	float:right
	
.midpage70
	margin 0 auto
	width 65%	!important
			
.slideButton
	background black
	opacity 0.0
	top 0
	width (totalslides)%
	height 100%
	position absolute

#nextSlide
	right 0%

#prevSlide
	left 0

.red
	red()
	
.orange
	orange()
	
.green
	green()
	
.blue
	blue()
	
.white
	white()
	
.black
	black()
	
.small
	font-size 12px
	margin 0
	
.title
	font-size titleFontSize
	headers()
	text()
	
.header
	font-size headerFontSize
	headers()
	text()

.subtitle	
	font-size subtitleFontSize
	headers()	
	text()
		
.content
	font-size contentFontSize
	text()

.floater
	vertical-align(0%)
	
li
	list-style-type:circle

hr.style-one 
	border 0
	height 1px
	background #333
	background-image linear-gradient(to right, red, #fff, red)


</style>
