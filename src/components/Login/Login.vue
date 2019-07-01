<template lang="pug">
section#login(:class="loggedin?'loggedin':''")
  .guest.user.active-user(@click="logger")
    img.icon(src="https://images.unsplash.com/photo-1544723795-3fb6469f5b39?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=435&q=80")
    label.name Guest User
    p Click to log in!
</template>

<script>
export default {
   name: 'Login',
   data() {
      return {
        loggedin: false
      }
   },
	props: {
   },
   methods:{
     logger(){
       this.$emit('login')
     }
   }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" scoped>
@import url("https://fonts.googleapis.com/css?family=Raleway:400,400i,700");
#login
  position absolute
  z-index 99999 //sorry
  width 100vw
  height 100vh
  display grid
  justify-content center
  align-content center
  background: linear-gradient(180deg, var(--primary) 0% 0%, var(--primary-darker) 100%);
  &::before
    content ''
    width 100vw
    height 100vh
    position absolute 
    background black
    animation disappear .4s .4s forwards
  &.loggedin
    animation log-in .9s cubic-bezier(0.790, 0.265, 0.265, 1.550) reverse forwards
  .user
    display grid
    justify-content center
    justify-items center
    color #eee
    cursor pointer
    animation user-in .5s cubic-bezier(0.790, 0.265, 0.265, 1.550)
    filter drop-shadow(0px 0px 5px black)
    .icon
      border-radius 6vmin
      width 20vmin
      height 20vmin
      object-fit cover
    .name
      font-family: Raleway, sans-serif;
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
</style>
