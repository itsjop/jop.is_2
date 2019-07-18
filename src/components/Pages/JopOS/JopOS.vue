<template lang="pug">
   .frame(@mouseup.prevent="$emit('stopDrag')" @mousedown.prevent="$emit('doDrag')")
      iframe(src="http://jop.is")
</template>

<script>
export default {
   name: 'jopis',
   data() {
      return {
      }
   },
	props: {},
   methods:{}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" scoped>
   .frame
      width 100%
      height 100%
      iframe
         width 100%
         height 100%
</style>
