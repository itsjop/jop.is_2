<template lang="pug">
   section
      h1 Hey What's Up I'm A Cool Dog
      button(@click="$emit('updateTitle')") Update
      img(src="https://i.kym-cdn.com/entries/icons/original/000/002/203/20533_cooldog.jpg")
</template>

<script>
export default {
	name: 'CoolDog',
	props: {
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" scoped>

</style>
