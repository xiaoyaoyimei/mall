<template>
	<div>
		订单支付成功 
		查看已支付订单
		
	</div>
</template>

<script>
	 export default {
    data () {
      return {
        pay: ''
      }
    },
    methods: {
      getParams () {
        // 取到路由带过来的参数 
        let routerParams = this.$route.fullPath
        let n= routerParams.indexOf('?')
        // 将数据放在当前组件的数据内
        this.pay = routerParams.substring(n)
          	this.$axios({
							    method: 'post',
							    url:'/order/alipay/check'+this.pay,
								}).then((res)=>{
									if(res.code=='200'){
											this.$router.push({push:'/order/detail',params:{orderNo:res.msg}})
									}
							});
      },
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

<style>
</style>