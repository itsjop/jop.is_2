<template lang="pug">
section.misdacop
	storefront(v-if="store" @navItem="storefront = false" @navHome="storefront = true")
	listing(v-else @navHome="storefront = true")

</template>

<script>
import StoreFront from './Storefront'
import Listing from './Listing'
export default {
   name: 'Misdacop',
   data() {
      return {
			store: true
      }
   },
	props: {},
	methods:{},
	components:{
		storefront: StoreFront,
		listing: Listing
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" scoped>
section 
	overflow-x hidden
</style>
