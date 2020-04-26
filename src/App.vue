<template>
  <div id="app">
   
    <router-view v-if="isRouterAlive"></router-view>
  </div>
</template>

<style>

</style>

<script>
export default {
  provide(){
    return {
      reload:this.reload
    }
  },
  data(){
    return {
      isRouterAlive:true
    }
  },
  methods:{
    async reload(){
      this.isRouterAlive=false;
      await this.$nextTick(function(){
        this.isRouterAlive=true
      })
    }
  }
}
</script>
