<template lang="pug">
section.explorer
  .icons(v-for="file in fullContents" v-on:dblclick="newWindow(file)")
    img(:alt="file.summary" :src="file.icon")
    label {{(file.shortTitle ? file.shortTitle : file.title)}}
</template>

<script>
import applications from '../../assets/data/Applications'
export default {
	name: 'Explorer',
	data() {
		return {
      componentList: applications
		}
  },
  computed:{
    // fetches the information for the components
    fullContents: function () {
      let folderContents = this.args.folder.contents
      folderContents.map((item, index) =>{
        if (item.type==="component"){
          folderContents[index] = this.getComponentDetails(item.name)
        }
      })
      return folderContents 
    }
  },
	props: {
		args:{
			type: Object,
		}
	},
	methods:{
		newWindow(file){
			this.$emit('newWindow',file)
    },
    getComponentDetails(componentName){
      // fetches the full application details from the componentList
      let newObj = {}
      this.componentList.map(component =>{
        if(component.name === componentName){
          newObj = component
        }
      })
      return newObj
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" scoped>

.explorer
  display grid
  grid-auto-flow row 
  padding 20px
  grid-template-columns repeat(auto-fit, minmax(50px, 1fr))
  grid-template-rows repeat(auto-fit, 100px)
  min-height 100%
  .icons
    cursor pointer
    user-select none
    display grid
    justify-content center
    img
      width 80px
      height 80px
      border-radius 200px
      color gray 
      border 2px solid #33333333
    label
      text-align center

</style>
