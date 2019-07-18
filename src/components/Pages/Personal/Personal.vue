<template lang="pug">
section#personal
  header.heade(ref="header")
    .greeting hey, i'm
    .name 
      p jordan
      p crandall
    .orbs
      .orb.orb1(:style="{ animationDuration: (Math.random()*6)+2+'s', backgroundColor: orbs[0].color}")
      .orb.orb2(:style="{ animationDuration: (Math.random()*6)+2+'s', backgroundColor: orbs[1].color}")
      .orb.orb3(:style="{ animationDuration: (Math.random()*6)+2+'s', backgroundColor: orbs[2].color}")
      .orb.orb4(:style="{ animationDuration: (Math.random()*6)+2+'s', backgroundColor: orbs[3].color}")
    //- .orb(v-for="(orb, index) in orbs" :ref="'orb'+index" :key="'orb'+index" :style="{ backgroundColor: orb.color, left: orb.x+'px', top: orb.y+'px', width: orb.size + 'px',height: orb.size + 'px' }")


  .boddy
    h1 I'm a front-end developer,
    h1 but you already knew that.
    br
    h2 You're probably here to see these logos.
    .logos
      img.logo(src="./vue.png")
      img.logo(src="./react.png")
      img.logo(src="./js.png")
      img.logo(src="./firebase.png")
      h2.label Vue
      h2.label React
      h2.label ES6/Babel
      h2.label Firebase
    .langs
      h2.primary Vue
        h6 My newest favorite. Vue 2's excellent syntactic sugar makes prototyping and scaling a breeze. Its easily seperated components, lifecycle hooks, callbacks, and native precompiler support massively streamline the modern framework structure.
      br
      h2.primary React
        h6 Incredibly fast, and incredibly streamlined, React's JSX is a huge step forward in the Javascript-everything world. React's State update speed is unparalleled (sometimes even too fast). React is my go-to for applications that live on the edge.
      br
      h2.primary ES6 / Babel
        h6 By no means a framework, but the core Javacript update to ES6 (and the Babel compatibility compiler behind it), enable huge advances in asyncronous data management, iteration and, most of all, keeping track of where on earth <strong><i>this</i></strong> is.
        h6 Also I'm a big fun of the arrow function.
  svg(xmlns='http://www.w3.org/2000/svg' version='1.1')
    defs
      filter#goo
        fegaussianblur(in='SourceGraphic' stddeviation='10' result='blur')
        fecolormatrix(in='blur' mode='matrix' values='1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7' result='goo')
        feblend(in='SourceGraphic' in2='goo')
</template>

<script>
import posed from 'vue-pose'
import tinycolor from 'tinycolor2'
export default {
   name: 'Personal',
   data() {
      return {
         help:"aaa",
         orbs:[
            {color:tinycolor('#f54242').spin((Math.random()*360)).toHexString()},
            {color:tinycolor('#f54242').spin((Math.random()*360)).toHexString()},
            {color:tinycolor('#f54242').spin((Math.random()*360)).toHexString()},
            {color:tinycolor('#f54242').spin((Math.random()*360)).toHexString()},
         ]
      }
   },
   props: {},
   methods:{},
   created () {

    // console.log('created', this);
    // const refreshRate = 1000 / 60;
    // const maxXPosition = 400;
    // let rect = document.getElementById('orb1');
    // let speedX = 1;
    // let positionX = 0;
    // this.orbs.map(orb=>{
    //   orb.startingY = Math.random()*220
    //   orb.endingY = Math.random()*220
    //   orb.speed = Math.random()
    //   orb.size = (Math.random()*50)+50
    //   orb.startingX = -orb.size
    //   orb.x = -orb.size
    //   orb.y = orb.startingY
    //   orb.startingColor = tinycolor("orange").spin(Math.random()*360)
    //   orb.endingColor = tinycolor("orange").spin(Math.random()*360)
    //   orb.percent = 0
    // })
    // function step() {
    //   // increment the Xpos by speed
    //   // increment the Ypos by the (vertical delta / window width) 

    //   this.orbs.map(orb=>{
    //     orb.x += orb.speed
    //     // finds the total width including size gutter
    //     orb.percent = orb.x / (this.$refs.header.offsetWidth+(orb.size*2))
    //     console.log(this.$refs.header.offsetWidth)
    //     orb.y = (orb.endingY - orb.startingY) * orb.percent
    //     orb.color = tinycolor.mix(orb.startingColor, orb.endingColor, orb.percent *100)
    //     if(orb.x > this.$refs.header.offsetWidth+(orb.size) ){
    //       setTimeout(() => {
    //         orb.startingY = Math.random()*220
    //         orb.endingY = Math.random()*220
    //         orb.speed = Math.random()*2
    //         orb.size = (Math.random()*50)+50
    //         orb.startingX = -orb.size
    //         orb.x = -orb.size
    //         orb.y = orb.startingY
    //         orb.startingColor = tinycolor("orange").spin(Math.random()*360)
    //         orb.endingColor = tinycolor("orange").spin(Math.random()*360)
    //         orb.percent = 0
    //       }, (Math.random()*2)+1);
    //     }
    //   })
      // window.requestAnimationFrame(step.bind(this));
    // }
    // window.requestAnimationFrame(step.bind(this));
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" scoped>
section
  width 100%
  height 100%
  overflow-x hidden 
  background #333
p
  margin 0
.heade
  position relative
  width 100%
  height 70%
  background-image url('/img/desktop/triangular.png')
  background-color white
.greeting, .name
  position absolute
  color var(--primary-dark)
.greeting
  top 5%
  left 5%
  font-size 76px
.name
  font-size 102px
  text-align right
  top 25%
  right 15%
h6
  font-weight 500
.orbs
  position relative
  width 100%
  height 100%
  // filter:url('#goo');

.orb
  position absolute 
  width 100px
  height 100px
  background red
  border-radius 200px
  transform translate(-50%, -50%)
  mix-blend-mode exclusion
  z-index 1
  animation orb-breathe 4s cubic-bezier(0.790, 0.265, 0.265, 1.550) alternate infinite

  &.orb1
    top 50%
    left 90%
    width 300px
    height 300px
  &.orb2
    top 30%
    left 50%
    width 150px
    height 150px
  &.orb3
    top 40%
    left 25%
    width 100px
    height 100px
  &.orb4
    top 70%
    left 10%
    width 200px
    height 200px
.boddy
  position relative
  width 100%
  height 500px
  background #333
  z-index 0
  margin 0
  padding 0
  .center
    text-align center
  h1, h2, h3, h4, h5, h6
    margin 0
    color white
  h1
    color var(--primary)
    font-size 48px
    margin 5px
  h2
    color white
    font-weight 100
    font-size 30px
  .primary
    color var(--primary)
  .accent
    color var(--accent)

.logos
  display grid
  width 80%
  margin 3% 10%
  grid-template-columns 1fr 1fr 1fr 1fr
  grid-gap .5fr
  grid-template-rows 80px 30px
  justify-content center
  align-content center
  justify-items center
  .label
    font-align center
  img
    object-fit contain
    height 100%
    width 100%

.langs
  padding 20px


@keyframes orb-breathe{
  from {
   transform translate(-50%, -50%) scale(1)
  }
  to {
   transform translate(-50%, -50%) scale(1.5)
  }
}

</style>
