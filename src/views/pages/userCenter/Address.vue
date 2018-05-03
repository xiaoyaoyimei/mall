<template>
	<div class="order">
		<router-link tag="h2" to="/user"><Icon type="ios-arrow-thin-left"></Icon>收货地址</router-link>
		<div class="address">暂无地址</div>
		<div class="addaddress">
			<router-link  to="/user/editaddress">添加新地址</router-link></div>
	</div>
</template>

<script>
</script>

<style scoped="scoped"  lang="scss">
 @import '@/styles/color.scss';
  .addaddress{
  	position: fixed;
  	bottom:0;
  	background: #ed1844;
  	width: 100%;color:#fff;
  	text-align: center;
  	padding:10px 0;
  	cursor: pointer;
  }
  .address{
  	text-align: center;
  	color:#666;
  	margin-top:60px;
  }
</style>