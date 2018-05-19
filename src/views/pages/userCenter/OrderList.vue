<template>
	<div class="order">
		<div class="m_header_bar">
			<router-link   class="m_header_bar_back" to="/user"><Icon type="ios-arrow-back"></Icon></router-link>
			<span class="m_header_bar_title">我的订单</span>
			<span class="m_header_bar_menu"></span>
		</div>
  	<ul class="splist">
	<li  v-for="(x,index) in cartList" :key="index"  @click="seeDetail(x.order.orderNo)">
		  <div class="orderno">订单号:{{x.order.orderNo}} <span class="orderstatus">{{statusfilter(x.order.orderStatus)}}</span></div>
		   <div v-for="(child,i) in x.orderItems" :key="i" class="sphead">
			<div class="img"><img  :src="child.productItemImg | imgfilter"></div>
			<div class="xq">
				<p >{{child.productTitle}}</p>
				<p class="color-gray">{{child.productAttrs}}</p>
			</div>
			<div class="price">￥{{child.orderFee}}<br/>x {{child.quantity}}</div>
			</div>
			<div class="sptitle">合计￥<span>{{x.order.orderTotalFee}}</span></div>
			<div class="cz" v-if="x.order.orderStatus=='01'"> <button  type="button"  class="btn btn-dx" >去支付</button></div>
		</li>
  	</ul>
	</div>
</template>

<script>
	
export default {
    data() {
    	 const temp=[] ;
      return {
        cartList:[],
       statusList:[]
    	}
   	 },
    methods: {
    	statusfilter(value){
    			for(var i = 0 ;i < this.statusList.length;i++){
					if(this.statusList[i].key == value){
						return this.statusList[i].value;
					}
				}
    	},
		seeDetail(value){
				this.$router.push({name:'/user/orderlist/datail',params:{orderNo:value}});  
		},
    	getStatusEnum(){
    			this.$axios({
						    method: 'get',
						    url:'/order/enums',
						}).then((res)=>{
							if(res.code=='200'){
							this.statusList = res.object;
							}
						
						});
    	},
	      getOrder(){
	      			this.$axios({
						    method: 'get',
						    url:'/order/list',
						}).then((res)=>{
							if(res.code=='200'){
								this.cartList= res.object;
							}
							
						});
	     	 }
	    },
         mounted() {
				this.getOrder();
				this.getStatusEnum();
		}
  }
</script>

<style scoped="scoped" lang="scss">
 @import '@/styles/color.scss';
 .orderstatus{
 	color:$color-dx;
 	float: right;
 }
.splist{
	background: #f6f6f6;
	li{
	margin-bottom: 10px;
	background: #fff;
	}
	}
	.img{
		margin-right:10px
	}
	.splist .sphead{
		overflow: hidden;
		padding:10px;
		background: #fafafa;
		display: flex;
	}
	.xq{
	 color:#333;
	 margin-right:10px
	}
	.price{
		float: right;
		text-align: right;
	}
	.orderno{
		padding: 10px;
		font-weight: bold;
	}
	.sptitle{
		border-top:1px solid #eee;
		border-bottom:1px solid #eee;
		height: 36px;
		line-height: 36px;
		text-align: right;
		span{
			margin-right:10px;
			font-size: 14px;
		}
	}
	.cz{
		text-align:right;
		padding: 5px;
		button{
			margin-right: 5px;
		}
	}
	.btn{
		padding: 3px 10px;
		background: #fff;
		border-width:1px;
		border-style:solid;
		border-radius:10px;
		cursor: pointer;
	}
	.btn-dx{
		border-color:$color-dx;
		color:$color-dx;
		
	}
</style>