<template lang="pug">
   section
      h1 Hey What's Up I'm A Cool Cat
      button(@click="count+=1") Count {{count}}
      img(src="https://cdn.shopify.com/s/files/1/1511/4266/products/Fashion-Glasses-Small-Pet-Dogs-Cat-Glasses-Sunglasses-Eye-wear-Protection-Pet-Cool-Glasses-Pet-Photos.jpg?v=1521388987")
</template>

<script>
export default {
   name: 'CoolCat',
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
