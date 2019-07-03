<template lang="pug">
section#star
   h1 
      p I'm currently spinning up an instance of this. 
      p Check back soon!
</template>

<script>
export default {
   name: 'STAR',
   data() {
      return {
      }
   },
	props: {
   },
   methods:{}
}
</script>

<style scoped lang="stylus" scoped>
#star
   h1
      animation swinger .5s .3s cubic-bezier(0.790, 0.265, 0.265, 1.550) forwards
      transform translateY(-200%)
   p
      margin 10px

@keyframes swinger{
   from{
      transform translateY(-200%)
   }
   to{
      transform translateY(00%)
   }
}
</style>
