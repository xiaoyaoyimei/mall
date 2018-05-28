<template>
	<div class="user">
		<div class="user-header">
			<div class="portrait">
				<router-link :to="{path: '/login'}"  class="tx" v-if="nologin">
					<img src="../../../assets/img/nologintx.png">
					<span>登录/注册></span>
				</router-link>
				 	<router-link :to="{path: '/user/myinfo'}"  class="tx" v-else> 
				 		<img :src="userinfo.iconUrl"  v-if="userinfo.iconUrl">	
				 	<img src="../../../assets/img/de-tx.jpg" v-else>
				 	</router-link>
				<span class="shdz">
					<router-link :to="{path: '/user/setting'}">
						<img src="../../../assets/img/setting.png"/>
						设置
						</router-link>
						</span>
			</div>
		<div class="integral"><span>积分 0</span><router-link class="discount" :to="{ name: '/sort'}">去购物车抵扣     ></router-link></div></div>
   <ul class="order-list">
   	<router-link :to="{ path: '/user/orderlist'}" tag="li" ><img src="../../../assets/img/order.png">查看更多订单<i>></i></router-link>
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
	        	nologin:true,
	        	userinfo:{
					 iconUrl: '',
					  },
	        }
	      },
	      methods:{
	      	getUser(){
	      		if(localStorage.getItem('token')!=undefined){
	      			this.nologin=false;
	      			this.$axios({
					    method: 'post',
					    url:'/account',
					}).then((res)=>{
						if(res.code=='200'){
							this.userinfo = Object.assign({},res);
						}else{
							this.$Message.error(res.msg);
						}
						
					});
					}else{
						this.nologin=true;
					}
			  }	      
			 },
	      mounted(){
			  this.getUser()
	      }
    }
</script>

<style lang="scss"> 
 /*头部样式*/
	.user-header a{
		color:#fff;
	}
 .user-header{
 	background: url(../../../assets/img/bg.png) repeat scroll 0 0 ;
 	height: 15rem;
 	position:relative;
 	.portrait{
 		padding-left:2rem;
 		padding-top:2rem;
 		overflow:hidden;
 		padding-bottom:3rem;
 		.tx 
 		{
 			line-height: 7.2rem;
 			img{
	 			width:6rem;
	 			border-radius: 6rem;
	 			float: left;
	 			margin-right:2rem;
	 			height:6rem;
 			}
 		}
 		.color-white{
 			color:#fff;
 			font-size: 1.6rem;
 		}
 		.shdz{
 			float: right;
 			color:#fff;
 			margin-right:2rem;
 			line-height: 2.4rem;
 			img{
 				width:2rem;
 				float: left;
 				
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
	 		color:#565656;
	 		img{
	 		   width:2.5rem;
	 		}
	 	}
	 	margin-bottom:1rem
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
	 		padding: 1rem 3rem 1rem 2rem;
	 		.discount{
	 			float: right;
	 			color: #666;
	 		}
	 	}
</style>