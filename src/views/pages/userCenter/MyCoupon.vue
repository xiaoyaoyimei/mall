<template>
	<div class="order coupon">
		 	<div class="m_header_bar">
			<router-link to="/user"  class="m_header_bar_back"><Icon type="ios-arrow-back"></Icon></router-link>
			<span class="m_header_bar_title">我的优惠券</span>
			<span  class="m_header_bar_menu"></span>
		</div>
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
	}
</style>