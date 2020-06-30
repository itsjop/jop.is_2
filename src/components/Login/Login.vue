<template lang="pug">
section#login
  #logger(:class="(loggedin?'loggedin':'') + (login_anim?' short':'')")
    .guest.user.active-user(@click="logger" :class="login_anim?'short':''")
      img.icon(src="/img/literally_me.png")
      label.name Welcome!
      p Click to log in!
  .welcomer(v-if="!login_anim")
    .message Welcome to:
    .line
      .letter J
        .abr ordan's
      .letter O
        .abr nline
      .letter P
        .abr ortfolio
      .letter . 
        .abr 
      .letter I
        .abr nteractive 
      .letter S
        .abr ystem
</template>

<script>
export default {
   name: 'Login',
   data() {
      return {
        loggedin: false,
        login_anim: true,
      }
   },
	props: {
   },
  methods:{
     logger(){
       this.$emit('login')
     }
  },
  created(){
    setTimeout(() => {
      this.login_anim = true
    }, 7000);
  },
  mounted() {
    if (localStorage.login_anim) {
      //loads the login status from localstorage
      this.login_anim = localStorage.login_anim;
    }
  },
  watch: {
    login_anim(login_val) {
      // sets the localstorage to the login value
      localStorage.login_anim = login_val;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" scoped>
#login
  position absolute
  z-index 9999 //sorry
  width 100vw
  height 100vh
  display grid
  justify-content center
  align-content center
  background: linear-gradient(180deg, var(--primary-darkest) 0%, var(--primary-dark) 70%, var(--accent) 100%) ;
  animation disappear .5s ease reverse
#logger
  position absolute
  z-index 9999 //sorry
  width 100vw
  height 100vh
  display grid
  justify-content center
  align-content center
  &::before
    background: var(--desktop-image)
    content ''
    width 100vw
    height 100vh
    position absolute 
    transform scale(1.1)
    // animation disappear .4s 1s reverse forwards
    filter blur(5px)

  &::after
    content ''
    width 100vw
    height 100vh
    position absolute 
    background black
    animation disappear .4s 6s forwards
    pointer-events none
  &.short::after
    animation-delay 0s
  &.loggedin
    animation log-in .9s cubic-bezier(0.790, 0.265, 0.265, 1.550) reverse forwards
  .user
    display grid
    justify-content center
    justify-items center
    color #eee
    cursor pointer
    transform translateY(300%)
    animation user-in .5s 6s cubic-bezier(0.790, 0.265, 0.265, 1.550) forwards
    filter drop-shadow(0px 0px 5px black)
    &.short
      animation-delay 0s
    .icon
      border-radius 6vmin
      width 20vmin
      height 20vmin
      object-fit cover
    .name
      font-family: Nunito, sans-serif;
      font-size 5vmin
      text-align center
    p
      animation disappear 2s 4s ease alternate-reverse infinite
      opacity 0
      
@keyframes user-in {
0%  {
  transform translateY(300%)
 }
100%{
  transform translateY(00%)
 }}
 @keyframes disappear {
0%  {
  opacity 1
 }
100%{
  opacity 0
 }}

rodate = 2s

.welcomer
    display grid
    color white
    z-index 99999 //still sorry
    position absolute
    height 100%
    width 100%
    justify-content center
    justify-items center
    align-content center
    animation intro-done 1s 5s ease-in forwards
    font-size 20px
    overflow hidden
  .message
    font-size 48px
  .line
    display grid
    animation line-rotate 1s rodate ease forwards
    transform-origin center center
    transform translateX(40%) rotate(-90deg)
    font-size 48px
    // border 1px white solid
    .letter
      // border 1px pink solid
      font-align center 
      animation letter-rotate 1s rodate ease forwards
      transform rotate(90deg)
      display flex
      font-size 40px
      .abr
        margin-top 18px
        font-size 18px
        opacity 0
        animation word-reveal 1s rodate ease forwards
        

@keyframes line-rotate {
0%  {
  transform translateX(40%) rotate(-90deg)
 }
100%{
  transform translateX(0%)  rotate(0deg)
 }}
@keyframes letter-rotate {
0%  {
  transform rotate(90deg)
 }
100%{
  transform rotate(0deg)
 }}
    
@keyframes word-reveal {
0%  {
  opacity 0
  transform translateX(-100%)
 }
100%{
  opacity 1
  transform translateX(00%)
 }}
@keyframes intro-done {
0%  {
  transform translateX(00%)
 }
100%{
  transform translateX(-300%)
 }}
    

</style>
