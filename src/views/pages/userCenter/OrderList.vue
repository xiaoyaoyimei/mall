<template>
	<div class="order">
		<router-link tag="h2" to="/user"><Icon type="ios-arrow-thin-left"></Icon>订单列表</router-link>
		
    <Tabs :animated="false" :value="name"> 
        <TabPane label="待付款" name="待付款">待付款</TabPane>
        <TabPane label="待发货"  name="待发货">待发货</TabPane>
        <TabPane label="待收货" name="待收货">待收货</TabPane>
                <TabPane label="已完成" name="已完成">已完成</TabPane>
                  <TabPane label="售后" name="售后">售后</TabPane>
    </Tabs>
   </div>
</template>

<script>
	 export default {
    data () {
      return {
        name: ''
      }
    },
    methods: {
      getParams () {
        // 取到路由带过来的参数 
        let routerParams = this.$route.params.tabname
        // 将数据放在当前组件的数据内
        this.name = routerParams
      }
    },
    watch: {
    // 监测路由变化,只要变化了就调用获取路由参数方法将数据存储本组件即可
      '$route': 'getParams'
    },
    mounted() {
			this.getParams();
		}
  }
</script>

<style scoped="scoped" lang="scss">

</style>