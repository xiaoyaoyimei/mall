<template>
	<div class="order coupon">
		<h2><router-link tag="h2" to="/user"><Icon type="ios-arrow-thin-left"></Icon></router-link>我的优惠券</h2>
		    <Tabs :animated="false" > 
		        <TabPane label="未使用" name="未使用">未使用</TabPane>
		        <TabPane label="已使用"  name="已使用" > 已使用</TabPane>
		        <TabPane label="已过期" name="已过期" >已过期</TabPane>
		    </Tabs>
   </div>
</template>

<script>
</script>

<style >
	 .coupon .ivu-tabs-nav{
		width: 100%;
	}
	.coupon .ivu-tabs-nav .ivu-tabs-tab{
		width: 33.333%;
		text-align: center;
	}
</style>