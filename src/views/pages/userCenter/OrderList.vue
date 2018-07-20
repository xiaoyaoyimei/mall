<template >
	<div class="order">
		<div class="m_header_bar">
			<router-link   class="m_header_bar_back" to="/user"><Icon type="ios-arrow-back"></Icon></router-link>
			<span class="m_header_bar_title">我的订单</span>
			<span class="m_header_bar_menu"></span>
		</div>
				<div  class="flex-center box-content" v-if="cartList.length<1">
				<img src="../../../assets/img/order_empty.png" style="max-width: 8rem;">
				<p>暂无任何订单,赶紧去下单吧</p>
				<p><router-link to="/" class="color-dx">去首页</router-link></p>
				</div>
  	<ul class="splist box-content" v-else>
	 <li  v-for="(x,index) in cartList" :key="index"  >
		   <div @click="seeDetail(x.order.orderNo)"> 
		   	<div class="orderno">订单号:{{x.order.orderNo}} 
		   		<span class="orderstatus">{{statusfilter(x.order.orderStatus)}}</span></div>
		   <div v-for="(child,i) in x.orderItems" :key="i">
		   	<div  class="sphead">
			<div class="img"><img  :src="child.productItemImg | imgfilter"></div>
			<div class="xq">
				<p >{{child.productTitle}}</p>
				<p class="color-gray font-12">{{child.productAttrs}}<br/>{{child.productItemNo}}</p>
			</div>
			<div class="price">￥{{childjun(child) | pricefilter}}<br/>x {{child.quantity}}</div>
			</div>
			</div>
			<div class="sptitle">合计：<span>￥{{x.order.orderTotalFee| pricefilter}}</span></div>
			</div>
			<div class="cz" > 
				<button  type="button"  class="btn "  @click="cancel(x.order.orderNo)" v-if="x.order.orderStatus=='01'||x.order.orderStatus=='02'">取消订单</button>
				<button  type="button"  class="btn btn-dx"  @click="quzhifu(x.order.orderNo)" v-if="x.order.orderStatus=='01'">去支付</button>
					<button   class="btn btn-dx"  @click="qianshou(x.order.orderNo)" v-if="x.order.orderStatus=='06'">签收订单</button>
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
	      	statusList:[]
    	}
   	 },
   	 computed: {
   	 	token(){
   	 		return store.state.token
   	 	}
   	 },
    methods: {
    	      cancel(value){
                this.$Modal.confirm({
                    content: '<p>确定取消该订单？</p>',
                    onOk: () => {
                         		this.$axios({
					    method: 'post',
					    url:'/order/cancel/'+value,
					}).then((res)=>{
						if(res.code=='200'){
							  this.$Message.info(res.msg);
							  this.getOrder();
						}
						else{
							  this.$Message.info(res.msg);
						}
					});
                    },
                    onCancel: () => {
                        this.$Message.info('放弃取消');
                    }
                });
            },
              	  qianshou(value){
                this.$Modal.confirm({
                    content: '<p>确定签收该订单？</p>',
                    onOk: () => {
                      this.$axios({
					    method: 'post',
					    url:'/order/receive/'+value,
					}).then((res)=>{
						if(res.code=='200'){
							  this.$Message.info(res.msg);
							  this.getOrder();
						}
						else{
							  this.$Message.info(res.msg);
							  
						}
					});
                    },
                    onCancel: () => {
                        this.$Message.info('放弃签收');
                    }
                });
            },
    	    childjun (value) {
	        return value.orderFee /value.quantity
	    },
    	quzhifu(value){
    		this.$router.push({name:'/cartthree',query:{orderNo:value}});  
    	},
    	statusfilter(value){
    			for(var i = 0 ;i < this.statusList.length;i++){
					if(this.statusList[i].key == value){
						return this.statusList[i].value;
					}
				}
    	},
		seeDetail(value){
			this.$router.push({name:'/order/detail',query:{orderNo:value}});  
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
	      	      if(this.token!=null){
	      	      		this.$axios({
						    method: 'get',
						    url:'/order/list',
						}).then((res)=>{
							if(res.code=='200'){
								this.cartList= res.object;
							}
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
		border-radius:1rem;
		cursor: pointer;
	}
	.btn-dx{
		border-color:#0099ff;
		color:#0099ff;
		
	}
</style>