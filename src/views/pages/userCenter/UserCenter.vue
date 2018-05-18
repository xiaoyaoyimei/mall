<template>
	<div class="user">
		<div class="user-header">
			<div class="portrait">
				 	<router-link :to="{path: '/user/myinfo'}"> <img :src="userinfo.iconUrl" class="tx" >		</router-link>
				    <span class="color-white"  >
				    </span>
				<span class="shdz">
					<router-link :to="{path: '/user/setting'}">
						<img src="../../../assets/img/setting.png"/>
						</router-link>
						</span>
			</div>
		<div class="integral"><span>积分 0</span><router-link class="discount" :to="{ name: '/sort'}">去购物车抵扣     ></router-link></div></div>
	 <div class="myorder">
	 	<h3>我的订单<router-link :to="{ path: '/user/orderlist'}" tag="span" class="more">查看更多订单></router-link></h3>
	  	<!--<router-link :to="{ path: '/user/orderlist', query: { tabname: '待付款' }}"><img  src="../../../assets/img/待付款.png"><p>待付款</p></router-link>
		<router-link :to="{ path: '/user/orderlist', query: { tabname: '待发货'}}"><img  src="../../../assets/img/待发货.png"><p>待发货</p></router-link>
		<router-link :to="{ path: '/user/orderlist', query: { tabname: '待收货' }}"><img  src="../../../assets/img/待收货.png"><p>待收货</p></router-link>
		<router-link :to="{ path: '/user/orderlist', query: { tabname: '已完成' }}"> <img  src="../../../assets/img/已完成.png"><p>已完成</p></router-link>
		<router-link :to="{ path: '/user/orderlist', query: { tabname: '售后' }}"> <img  src="../../../assets/img/售后.png"><p>售后</p></router-link>-->
   </div>
   <ul class="order-list"> 
   	<router-link :to="{ path: '/user/mycoupon' }" tag="li"><img  src="../../../assets/img/a1.png">我的优惠券<i>></i></router-link>
   		<router-link :to="{ path: '/user/couponcenter' }" tag="li"><img  src="../../../assets/img/a2.png">领券中心<i>></i></router-link>	
   <router-link :to="{ path: '/user/mylove' }" tag="li"><img  src="../../../assets/img/a3.png">我的收藏<i>></i></li></router-link>	
   	<li><img  src="../../../assets/img/a4.png">在线客服<i>></i></li>
   		<li><img  src="../../../assets/img/a5.png">联系我们<i>></i></li>
   		<li><img  src="../../../assets/img/a6.png">关于我们<i>></i></li>
   </ul>
   </div>
</template>

<script>
	export default {
	    data () {
	        return {
	        	userinfo:{
					 iconUrl: '',
					  },
	        }
	      },
	      methods:{
	      	getUser(){
	      				this.$axios({
					    method: 'post',
					    url:'/account',
					}).then((res)=>{
						this.userinfo = Object.assign({},res.data);
					});
			  }	      
			 },
	      mounted(){
			  this.getUser()
	      }
    }
</script>

<style lang="scss"> 
 @import '@/styles/color.scss';
 /*头部样式*/
	.user-header a{
		color:#fff;
	}
 .user-header{
 	background: url(../../../assets/img/bg.png) repeat scroll 0 0 ;
 	height: 150px;
 	position:relative;
 	.portrait{
 		padding-left:20px;
 		padding-top:30px;
 		overflow:hidden;
 		padding-bottom:30px;
 		.tx{
 			width:60px;
 			border:2px solid #fff;
 			border-radius: 60px;
 			float: left;
 			margin-right:20px;
 			height:60px;
 		}
 		.color-white{
 			color:$color-white;
 			font-size: 16px;
 		}
 		.shdz{
 			float: right;
 			color:#fff;
 			img{
 				width:20px;
 				float: left;
 				margin-right:20px;
 			}
 		}
 	}
 }
	.myorder {
	 	background: #fff;
	 	overflow: hidden;
	 	h3{
	 		border-bottom:1px solid $color-border;
	 		padding: 10px 0;
	 		font-weight: normal;
	 		text-indent: 10px;;
	 	}
	 	a{
	 		padding: 10px 0;
	 		display: inline-block;
	 		width:20%;
	 		float: left;
	 		text-align: center;
	 		color:$color-default;
	 		img{
	 		   width:25px;
	 		}
	 	}
	 	margin-bottom:10px
	}
	.order-list{
		    padding:0 10px;
	 		background: #fff;
	 		li{
	 			padding:10px 0;
	 			border-bottom:1px solid $color-border;
	 			font-size: 14px;
	 			display: flex;
	 			cursor: pointer;
	 		}
	 		img{
	 			height: 20px;
	 			width:20px;
	 			margin-right:15px;
	 		}
	 		i{
	 			position: fixed;
				right: 15px;
	 			font-size: 16px;
	 		}
	 	}
	 	.more{
	 		float: right;
	 		cursor: pointer;
	 		margin-right:10px;
	 	}
	 	.integral{
	 		background: rgba(168,168,168,0.1);
	 		width: 100%;
	 		position:absolute;
	 		bottom:0px;
	 		padding: 10px 30px 10px 20px;
	 		font-size: 14px;
	 		.discount{
	 			float: right;
	 			color: #666;
	 		}
	 	}
</style>