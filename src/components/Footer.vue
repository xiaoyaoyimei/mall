<template>
	<div>
		<div class="newfooter">
			<router-link :to="{ path: '/index' }">
				<img src="../assets/img/bar-home-red.png" v-show="path=='/index'">
				<img src="../assets/img/bar-home-gray.png" v-show="path!='/index'"> 首页
			</router-link>
			<router-link :to="{ path: '/sort' }">
				<img src="../assets/img/bar-list-red.png" v-show="path=='/sort'">
				<img src="../assets/img/bar-list-gray.png" v-show="path!='/sort'">分类</router-link>
			<router-link class="nav" :to="{ path: '/cart' }">
				<img src="../assets/img/bar-cart-red.png" v-show="path=='/cart'">
				<img src="../assets/img/bar-cart-gray.png" v-show="path!='/cart'">购物车</router-link>
			<router-link class="nav" :to="{ path: '/user' }">
				<img src="../assets/img/bar-user-red.png" v-show="path=='/user'">
				<img src="../assets/img/bar-user-gray.png" v-show="path!='/user'">我的</router-link>

		</div>
	</div>

</template>

<script>
	export default {
		data() {
			return {
				path: '/index'
			}
		},
		watch: {
			"$route" () {
				// 获取当前路径
				let path = this.$route.path;
				// 检索当前路径
				this.checkRouterLocal(path);
			}
		},
		methods: {
			/**
			 * 检索当前路径
			 * @param path
			 */
			checkRouterLocal(path) {
				this.path = path;
				// 查找当前路由下标高亮
				//this.navIndex = this.nav.findIndex(item => item.path === path);
			}
		}
	}
</script>

<style scoped="scoped" lang="scss">
	.newfooter {
		position: fixed;
		bottom: 0rem;
		left: 0rem;
		background-color: #ffffff;
		color: #999999;
		height: 49px;
		width: 100%;
		padding: 0.2rem 0rem;
		border-top: 1px solid #ddd;
		box-shadow: -0.1rem 0px 0px 0px #bbb;
		z-index: 100;
		display: flex;
		a {
			width: 25%;
			justify-content: center;
			display: flex;
			flex-direction: column;
			align-items: center;
			img{
				width: 24px;
			}
		}
	}
	
	i {
		display: block;
		font-size: 26px
	}
	
	a.router-link-active {
		color: #ff0000
	}
</style>