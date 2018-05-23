<template>
	<div class="user">
		<div class="user-header">
			<div class="portrait">
				 	<router-link :to="{path: '/user/myinfo'}"  class="tx"> 
				 		<img :src="userinfo.iconUrl"  v-if="userinfo.iconUrl">	
				 	<img src="../../../assets/img/de-tx.jpg" v-else>
				 	</router-link>
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
	 	<h3><img src="../../../assets/img/order.png">我的订单<router-link :to="{ path: '/user/orderlist'}" tag="span" class="more">查看更多订单></router-link></h3>
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
 		.tx img{
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
	 
	 	overflow: hidden;
	 	h3{
	 			background: #fff;
	 		padding: 1rem ;
	 		font-weight: normal;
	 		font-size: 1.4rem;
	 		img{
	 			width:2rem;
	 			height: 2rem;
	 			float: left;
	 			margin-right: 1.5rem;
	 		}
	 	}
	 	a{
	 		padding: 1rem 0;
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

	 	.more{
	 		float: right;
	 		cursor: pointer;
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