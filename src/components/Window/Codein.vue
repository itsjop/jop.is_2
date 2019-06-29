<template lang="pug">
section.codin Codin babey!!!
</template>
<script>

export default {
  name: 'codin',
  data() {
    return { 
      code: null,
      lineNumbers: true,
      html: `<ul>
   <li>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</li>
   <li>Aliquam tincidunt mauris eu risus.</li>
   <li>Vestibulum auctor dapibus neque.</li>
</ul>
         
      `
    }
  },
	props: {},
  methods:{},
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
code.hljs span
  font-size 8px
		
</style>
