<template lang="pug">
section#explanation
  h1.welcome Welcome to:
  h1.small
    .letter j
    span ordan's 
  h1 
    .letter o
    span nline 
  h1 
    .letter p
    span ortfolio 
  h1.small
    .letter . 
    span &
  h1.small
    .letter i
    span nteractive
  h1 
    .letter s
    span ystem 
</template>

<script>
export default {
  name: 'Explanation',   
  data() {
    return {
    }
  },
  methods:{    
  },
  props: {
  }
}
</script>

<style lang="stylus">
#explanation
  user-select none
  position absolute
  right 0
  top 0
  line-height 1.7em
  transition .5s
  cursor pointer
  transform translate(15%, 24%)rotate(-90deg)
  padding 0 20px 0 0
  opacity .3
  display grid
  // grid-template-rows 20px 30px 30px 10px 10px 30px
  transform-origin top left

  &:hover
    opacity 1
    transform translateX(0%)
    h1, .small
      line-height 1.1em
    .letter
      transform rotate(0deg)
      width auto
      max-width auto
    span 
      user-select none
      opacity .8
    .welcome
      opacity 1
  .welcome
    opacity 0
    transition .3s
  h1 
    user-select none
    display flex
    color white
    margin 0
    &.small
      line-height .5em
    .letter
      transform rotate(90deg)
      width 100vw
      max-width 40px
      text-align left
      transition .3s
    span
      transition .3s
      opacity 0
</style>