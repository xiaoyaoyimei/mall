<template>
	<div class="order">
	<h2>	<router-link  to="/user"><Icon type="ios-arrow-back"></Icon></router-link>我的订单</h2>
  	<ul class="splist">
	<li  v-for="(x,index) in cartList" :key="index">
		  <div class="orderno">订单号:{{x.order.orderNo}}</div>
		   <div v-for="(child,index) in x.orderItems" :key="index" class="sphead">
			<div class="img"><img  :src="imageSrc+child.productItemImg"></div>
			<div class="xq">
				<p >{{child.productTitle}}</p>
				<p class="color-gray">{{child.productAttrs}}</p>
			</div>
			<div class="price">￥{{child.orderFee}}<br/>x {{child.quantity}}</div>
			</div>
			<div class="sptitle">合计￥<span>{{x.order.orderTotalFee}}</span></div>
			<div class="cz"> <button  type="button"  class="btn btn-dx" >去支付</button></div>
		</li>
  	</ul>
	</div>
</template>

<script>
export default {
    data () {
      return {
        cartList:[],
        imageSrc:this.global_.imgurl,
      }
    },
    methods: {
      getOrder(){
      			this.$axios({
					    method: 'get',
					    url:'/order/list',
					}).then((res)=>{
						if(res.code=='200'){
						this.cartList = res.object;
						}
						
					});
     	 }
    },
         mounted() {
				this.getOrder();
		}
  }
</script>

<style scoped="scoped" lang="scss">
 @import '@/styles/color.scss';
.splist{
	
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
		padding: 3px ;
		background: #fff;
		border-width:1px;
		border-style:solid;
		border-radius: 5px;
		cursor: pointer;
	}
	.btn-dx{
		border-color:$color-dx;
		color:$color-dx;
		
	}
</style>