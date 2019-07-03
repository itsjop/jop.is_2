<template lang="pug">
section.explorer
  .icons(v-for="file in fullContents" )
    a(v-if="file.link" v-on:dblclick.preventDefault="openLink(file.link)")
      img(:alt="file.summary" :src="file.icon")
    div(v-else)
      img(:alt="file.summary" :src="file.icon" v-on:dblclick="newWindow(file)")
    label {{(file.shortTitle ? file.shortTitle : file.title)}}
</template>

<script>
import Applications from '../../assets/data/Applications'
import Links from '../../assets/data/Links'
export default {
	name: 'Explorer',
	data() {
		return {
      componentList: Applications,
      linkList: Links
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
        if (item.type==="link"){
          folderContents[index] = this.getComponentDetails(item.name,"link")
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
    openLink(url){
      window.open(url);
    },
    getComponentDetails(itemName, fileType="component"){
      // fetches the full application details from the componentList
      let newObj = {}
      if(fileType==="component"){
        this.componentList.map(component =>{
          if(component.name === itemName){
            newObj = component
          }
        }
      )}
      if(fileType==="link"){
        this.linkList.map(component =>{
          if(component.name === itemName){
            newObj = component
          }
        }
      )}
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
  grid-template-columns repeat(auto-fit, minmax(100px, 1fr))
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
      // border 2px solid #33333333
    label
      text-align center

</style>
