<template >
	<div class="order">
		<div class="m_header_bar">
			<router-link   class="m_header_bar_back" to="/user"><Icon type="ios-arrow-back"></Icon></router-link>
			<span class="m_header_bar_title">售后订单</span>
			<span class="m_header_bar_menu"></span>
		</div>
				<div  class="flex-center box-content" v-if="cartList.length<1">
				<img src="../../../assets/img/order_empty.png" style="max-width: 8rem;">
				<p>暂无任何售后订单</p>
				<p><router-link to="/" class="color-dx">去首页</router-link></p>
				</div>
  	<ul class="splist box-content" v-else>
	      <li  v-for="(x,index) in cartList" :key="index"  >
		   	<div class="orderno">订单号:{{x.refundOrder.orderNo}} 
		   		<span class="orderstatus">{{statusrufundfilter(x.refundOrder.refundOrderStatus)}}</span></div>
		   <div v-for="(child,i) in x.refundOrderItems" :key="i">
		   	<div  class="sphead">
			<div class="img"><img  :src="child.productItemImg | imgfilter"></div>
			<div class="xq">
				<p >{{child.productTitle}}</p>
				<p class="color-gray font-12">{{child.productAttrs}}<br/>{{child.productItemNo}}</p>
			</div>
			<div class="price">￥{{childjun(child) | pricefilter}}<br/>x {{child.quantity}}</div>
			</div>
			</div>
			<div class="sptitle" v-if="!x.refundOrder.refundOrderStatus=='01'&&!x.refundOrder.refundOrderStatus=='05'">合计：<span>￥{{x.refundOrder.refundOrderTotalFee| pricefilter}}</span></div>
			<div class="cz" > 
				<router-link class="btn":to="{ path: '/refund/logisticsInfo', query: {rforder:x.refundOrder.refundOrderNo}}" v-if="x.refundOrder.refundOrderStatus=='02'">填写物流单号</router-link>
			</div>
		</li>
  	</ul>
	</div>
</template>

<script>
	import store from '@/store/store'
	export default {
    data() {
    	 const temp=[] ;
     	 return {
	        cartList:[],
	      	statusList:[],
	      	refundenums:[]
    	}
   	 },
   	 computed: {
   	 	token(){
   	 		return store.state.token
   	 	}
   	 },
    methods: {
    	    childjun (value) {
	        return value.refundOrderFee /value.quantity
	    },
  	statusrufundfilter(value) {
				for(var i = 0; i < this.refundenums.length; i++) {
					if(this.refundenums[i].key == value) {
						return this.refundenums[i].value;
					}
				}
			},
    	getStatusEnum(){
    					this.$axios({
					method: 'get',
					url: '/refund/enums',
				}).then((res) => {
					if(res.code == '200') {
						this.refundenums = res.object;
					}
				});
    	},
	      getOrder(){
	      	
	      	      if(this.token!=null){
	      	      		this.$axios({
						    method: 'get',
						    url:'/refund/getRefundOrderList',
						}).then((res)=>{
								this.cartList= res;
								console.log(this.cartList);
						});
	      	      }else{
	      	      			router.replace({
                        path: 'login',
                       query: {redirect: router.currentRoute.fullPath}
                    	})
	      	      }
	     	 }
	    },
         mounted() {
				this.getOrder();
				this.getStatusEnum();
		}
  }
</script>

<style scoped="scoped" lang="scss">
 .orderstatus{
 	color:#0099ff;
 	float: right;
 }
.splist{
	background: #f6f6f6;
	font-size: 1.4rem;
	li{
	margin-bottom: 1rem;
	background: #fff;
	}
	}

	.splist .sphead{
		overflow: hidden;
		padding:1rem;
		background: #fafafa;
		display: flex;
     cursor:pointer;
	}
	.sphead img{
		max-width:7rem;
	}
	.xq{
	 color:#333;
	 margin-right:1rem;
	 flex: 1;
	}
	.price{
		float: right;
		text-align: right;
	}
	.orderno{
		padding: 1rem;
		font-weight: bold;
	}
	.sptitle{
		border-top:1px solid #eee;
		height: 3.6rem;
		line-height: 3.6rem;
		text-align: right;
		span{
			margin-right:1rem;
			font-size: 14px;
		}
	}
	.cz{
		border-top:1px solid #eee;
		text-align:right;
		padding: 0.5rem;
		button{
			margin-right: 0.5rem;
		}
	}
	.btn{
		padding: 0.3rem 1rem;
		background: #fff;
		border-width:1px;
		border-style:solid;
		border-radius:0.5rem;
		cursor: pointer;
	}
	.btn-dx{
		border-color:#0099ff;
		color:#0099ff;
		
	}

</style>