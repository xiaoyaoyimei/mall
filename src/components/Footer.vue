<template>
	<div>
		<div class="newfooter">
			<router-link class="nav" :to="{ path: '/index' }"> <Icon type="ios-home" /> 首页</router-link>
			<router-link class="nav" :to="{ path: '/sort' }"> <Icon type="ios-list" />分类</router-link>
			<router-link class="nav" :to="{ path: '/cart' }"> <Icon type="ios-cart" />购物车</router-link>
			<router-link class="nav" :to="{ path: '/user' }"> <Icon type="ios-person"></Icon> 我的</router-link>
		</div>	 
  </div>
 

</template>

<script>
	export default {
		data () {
			return {
			}
		},
    }
</script>

<style scoped="scoped"  lang="scss">
.newfooter{
	position: fixed;
	bottom: 0rem;
	left: 0rem;
    background-color: #ffffff;
    color: #999999;
	height:49px;
	width: 100%;
	padding: 0.2rem 0rem;
	border-top: 1px solid #ddd;
	box-shadow: -0.1rem 0px 0px 0px #bbb;
	z-index: 100;
}
.nav{
	float: left;
	width: 25%;
	text-align: center;
	font-size: 1.2rem;
	text-align: center;
	color: #999999;
}
	i{
		display: block;
		font-size:26px
	}
	a.router-link-active{
			color:#ff0000
	}
</style>