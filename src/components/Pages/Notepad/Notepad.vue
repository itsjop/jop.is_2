<template lang="pug">
section#notepad
  textarea
    
</template>


<script>
export default {
   name: 'notepad',
   data() {
      return {
        note: ""
      }
   },

  mounted() {
    if (localStorage.note) {
      this.note = localStorage.note;
    }
  },
  watch: {
    note(newNote) {
      localStorage.note = newNote;
    }
  },
}
</script>

<style lang="stylus">
#notepad
  width 100%
  height 100%
  textarea
    width 100%
    height 100%
    // resize none
</style>
