<template>
	<div class="user">
		<div class="user-header ">
			<div class="portrait">
				<router-link :to="{path: '/login'}" class="tx" v-if="nologin">
					<img src="../../../assets/img/nologintx.png">
					<span>登录/注册></span>
				</router-link>
				<div v-else>
					<div class="tx">
						<img :src="userinfo.iconUrl | imgfilter" v-if="userinfo.iconUrl">
						<img src="../../../assets/img/de-tx.jpg" v-else>
					</div>
					<div class="info">
						<h3>HI {{userinfo.nickName}}</h3>
						<h4>{{userinfo.customerMobile}}</h4>
					</div>
					<span class="shdz">
					<router-link :to="{path: '/user/setting'}">
						<img src="../../../assets/img/sz.png"/>
						</router-link>
						</span>
				</div>
			</div>
		</div>
		<div class="order-more">
			<h6><label>我的订单</label><router-link :to="{ path: '/user/orderlist'}">查看全部订单></router-link></h6>
			<ul class="order-status">
				<router-link :to="{ path: '/user/orderlist',query:{status:'01'} }" tag="li"><img src="../../../assets/img/dfk.png">待付款</router-link>
				<router-link :to="{ path: '/user/orderlist',query:{status:'05'} }" tag="li"><img src="../../../assets/img/dfh.png">待发货</router-link>
				<router-link :to="{ path: '/user/orderlist',query:{status:'06'} }" tag="li"><img src="../../../assets/img/dsh.png">已发货</router-link>
				<router-link :to="{ path: '/user/orderlist',query:{status:'07'} }" tag="li"><img src="../../../assets/img/yqs.png">已签收</router-link>
				<router-link :to="{ path: '/user/orderlist',query:{status:'04'} }" tag="li"><img src="../../../assets/img/yqx.png">已取消</router-link>
				<router-link :to="{ path: '/user/aftersales'}" tag="li"><img src="../../../assets/img/sh.png">售后</router-link>
			</ul>
		</div>
		<ul class="dl">
			<router-link :to="{ path: '/user/mylove' }" tag="li"><img src="../../../assets/img/u2.png"><span>喜欢的商品</span></router-link>
			<router-link :to="{ path: '/user/myevaluate' }" tag="li"><img src="../../../assets/img/u9.png"><span>我的评价</span></router-link>
			<router-link :to="{ path: '/user/setting' }" tag="li"><img src="../../../assets/img/u3.png"><span>个人信息</span></router-link>
			<li @click="addAdd"><img src="../../../assets/img/u4.png"><span>收货地址</span></li>
		</ul>
		<ul class="dl mb50">
			<router-link :to="{ path: '/user/contentus' }" tag="li"><img src="../../../assets/img/u5.png"><span>联系我们</span></router-link>
			<router-link :to="{ path: '/user/about' }" tag="li"><img src="../../../assets/img/u6.png"><span>关于我们</span></router-link>
			<router-link :to="{ path: '/help/yszc' }" tag="li"><img src="../../../assets/img/u7.png"><span>隐私政策</span></router-link>
			<router-link :to="{ path: '/advice' }" tag="li"><img src="../../../assets/img/u8.png"><span>意见反馈</span></router-link>
		</ul>
	</div>
</template>

<script>
	import { getToken } from '@/base/auth'
	export default {
		data() {
			return {
				nologin: true,
				userinfo: {
					iconUrl: '',
				},
			}
		},
		methods: {
					addAdd() {
				localStorage.setItem('fromc', 'setting')
				this.$router.push({
					name: '/user/address'
				});
			},
			getUser() {
				if(getToken() != undefined) {
					this.nologin = false;
					this.$axios({
						method: 'post',
						url: '/account',
					}).then((res) => {
						this.userinfo = Object.assign({}, res);
					});
				} else {
					this.nologin = true;
				}
			}
		},
		mounted() {
			this.getUser()
		}
	}
</script>

<style lang="scss" scoped="scoped">
	/*头部样式*/
	
	.order-more {
		background: #fff;
		h6 {
			display: flex;
			border-bottom: 1px solid #eee;
			margin: 0 1rem;
			padding-top: 1rem;
			padding-bottom: 0.5rem;
			font-weight: normal;
			align-items: baseline;
			label {
				flex: 1;
				font-size: 2rem;
				color: #666;
			}
			a {
				font-size: 1.4rem;
			}
		}
	}
	
	.order-status {
		display: flex;
		flex-wrap: wrap;
		padding: 1rem 0 1rem 1rem;
		li {
			display: flex;
			justify-content: center;
			flex-direction: column;
			align-items: center;
			width: 25%;
			padding-bottom: 0.5rem;
			font-size: 1.4rem;
			img {
				max-width: 3.2rem;
				max-height:3.2rem;
			}
		}
	}
	
	.dl {
		margin-top: 10px;
		background: #fff;
		li {
			height: 5rem;
			display: flex;
			align-items: center;
			border-bottom: 1px solid #eee;
			margin: 0 1rem;
			font-size: 2rem;
			img {
				max-width: 2.4rem;
				max-height: 2.4rem;
				margin-left: 1rem;
				margin-right: 0.5rem;
			}
			span {
				flex: 1;
			}
		}
	}
	
	.info {
		color: #fff;
		h3 {
			font-size: 2rem;
			font-weight: normal;
		}
		h4 {
			font-size: 1.5rem;
			font-weight: normal;
		}
	}
	
	.user {
		color: #666;
	}
	
	.user-header a {
		color: #fff;
		font-size: 1.4rem;
	}
	
	.user-header {
		margin-bottom: 10px;
		background: #f00;
		height: 13rem;
		position: relative;
		.portrait {
			padding-left: 2rem;
			padding-top: 2rem;
			overflow: hidden;
			position: relative;
			.tx {
				line-height: 3.2rem;
				img {
					width: 7rem;
					border-radius: 6rem;
					float: left;
					margin-right: 1.5rem;
					height: 7rem;
				}
			}
			.color-white {
				color: #fff;
				font-size: 1.6rem;
			}
			.shdz {
				position: absolute;
				top: 2rem;
				right: 0rem;
				color: #fff;
				margin-right: 2rem;
				line-height: 2rem;
				img {
					width: 2.5rem;
				}
			}
		}
	}
	
	.mb50 {
		margin-bottom: 5rem;
	}
</style>