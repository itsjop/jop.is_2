<template lang="pug">
   section
      h1 Hey What's Up I'm A Cool Dog
      button(@click="count+=1") Count {{count}}
      img(src="/pages/CoolDog/dog.jpg")
</template>

<script>
export default {
   name: 'CoolDog',
   data() {
      return {
         count: 0
      }
   },
	props: {
   },
   methods:{}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" scoped>

</style>
