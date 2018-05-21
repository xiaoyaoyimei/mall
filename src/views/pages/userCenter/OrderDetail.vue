<template>
<div>
		<div class="m_header_bar">
			<router-link   class="m_header_bar_back" to="/user/orderlist"><Icon type="ios-arrow-back"></Icon></router-link>
			<span class="m_header_bar_title">订单详情</span>
			<span class="m_header_bar_menu"></span>
		</div>
		<div class="detail">
		  	<ul class="address" >
			<li>
			<img src="../../../assets/img/地址.png">
		    <div> 
		    <p>{{orderdetail.shippingAddress.receiverName}} <strong>{{orderdetail.shippingAddress.receiverMobile}}</strong></p>
		    <p>{{orderdetail.shippingAddress.receiverState}}{{orderdetail.shippingAddress.receiverCity}}{{orderdetail.shippingAddress.receiverDistrict}}{{orderdetail.shippingAddress.receiverAddress}}</p>
			</div>
			</li>
		   </ul>
		 
		   	<ul class="spitem">
		    <li v-for="(item,index) in orderdetail.shippingOrderItems" :key="index">
		   		<img :src="imageSrc+item.productItemImg">
		   		<p>
		   			<span class="title">{{item.productTitle}}</span>
		   			<span>{{item.productAttrs}}</span>
		   			<span class="price">{{item.productFee}}</span></p>
		   	</li>
		   	</ul>
		   	  <div class="sp">
		   		<span>订单编号：{{orderdetail.shippingOrder.orderNo}}</span>
		   		<span>下单时间：{{orderdetail.shippingOrder.createTime}}</span>
		   		
		   			<span>发票类型：{{orderdetail.shippingInvoice}}</span>
		   			<span>发票抬头：</span>
		   			<span>发票内容：</span>
		   		</div>
		   	<ul class="sptotal">
		   	<li>	<span class="t">商品总额</span><span class="s">{{orderdetail.shippingOrder.orderTotalFee}}</span></li>
		   	<li>	<span class="t">运费</span><span class="s">+{{orderdetail.shippingOrder.postageFee}}</span></li>
		    		<li class="border"> <span class="t"></span><span>实付款：<label class="zjg">{{orderdetail.shippingOrder.paiedFee}}</label></span></li></ul>
		   </div>
	</div>
</template>

<script>
	export default {
    data () {
      return {
      	orderdetail:{},
        imageSrc:this.global_.imgurl,
        orderNo:'',
      }
    },
    methods: {
    	  getParams () {
                // 取到路由带过来的参数 
                let routerParams = this.$route.params.orderNo;
                // 将数据放在当前组件的数据内
                this.orderNo = routerParams;
          },
      getOrder(){
      			this.$axios({
					    method: 'get',
					    url:'/order/'+this.orderNo,
					}).then((res)=>{
						this.orderdetail = res;
					});
     	 }
    },
         mounted() {
         	    this.getParams();
				this.getOrder();
		}
  }
</script>

<style scoped="scoped" lang="scss">
	.detail {
		.address{ 
			background:#fff;
			padding:10px;
			li{
			display: flex;
			img{
				width:24px;
				height:24px;
				margin-right:10px;
			}
		}
		}
	}
	.spitem{
		margin-top:10px;
		background: #fff;
		
			li{
			padding: 10px;
			display: flex;
			p{
				flex:1;
				.title{
					display: block;
					overflow: hidden;
					text-overflow:ellipsis;
					white-space: nowrap;
					width:270px;
				}
				.price{
					color:#222;
					display: block;
					margin-top:10px;
					font-weight: bold;
				}
			}
			
		}
		img{
			max-width: 70px;
			max-height: 70px;
			margin-right:10px;
		}
	}
	.sp{
		margin-top:10px;
		background: #fff;
		padding: 10px;
		span{
			display: block;
			margin-bottom: 10px;
		}
	}
	.sptotal {
		margin-top:10px;
		background: #fff;
		.border{
			border-top:1px solid #eee;
		}
		li{
			padding: 5px 10px;
		display: flex;
		.t{
			flex: 1;
		}
		.s{
			color:#222;
			font-weight: bold;
		}
		.zjg{
			color:#d32122;
			font-size: 18px;
		}
	}
}
</style>