<template>
	<div>
		<div class="m_header_bar">
			<router-link class="m_header_bar_back" to="/user/orderlist">
				<Icon type="ios-arrow-back"></Icon>
			</router-link>
			<span class="m_header_bar_title">订单详情</span>
			<span class="m_header_bar_menu"></span>
		</div>
		<div class="detail">
			<div class="status">
				<div v-if="orderdetail.shippingOrder.orderStatus=='01'">
					<p>等待买家付款</p>
					<p class="font-14">订单将在<strong>{{min}}:{{sec}}</strong>自动关闭,请及时付款~</p>
				</div>
				<div v-if="orderdetail.shippingOrder.orderStatus=='02'">
					<p>等待商家发货</p>
					<p class="font-14">您已付款,请耐心等待~</p>
				</div>
				<div v-if="orderdetail.shippingOrder.orderStatus=='06'">
					<p>等待卖家收货</p>
					<p class="font-14">订单将在<strong>{{day}}:{{hr}}:{{min}}:{{sec}} </strong>自动确认收货,请及时确认收货~</p>
				</div>
						<div v-if="orderdetail.shippingOrder.orderStatus=='07'">
					<p>买家已收货</p>
					<p class="font-14">快乐的您分享完美的使用心得</p>
				</div>
				<div v-if="orderdetail.shippingOrder.orderStatus=='03'||orderdetail.shippingOrder.orderStatus=='04'||orderdetail.shippingOrder.orderStatus=='05'">
					{{statusfilter(orderdetail.shippingOrder.orderStatus)}}
				</div>
			</div>
			<div class="order-detail-wrap">
				<p class="color-black">订单编号:{{orderdetail.shippingOrder.orderNo}}</p>
				<p class="color-gray">下单时间:{{orderdetail.shippingOrder.createTime | formatDate}}</p>
				<ul class="spitem">
					<li v-for="(item,index) in orderdetail.shippingOrderItems" :key="index">
						<img :src="item.productItemImg | imgfilter">
						<div class="w13">
							<p class="color-black">{{item.productItemNo}}</p>
							<p class="title">{{item.productTitle}}</p>
							<span>{{item.productAttrs}} </span>
						</div>
						<p>
							<span class="price">￥{{productFeejun(item)|pricefilter}}<br/>x{{item.quantity}}   </span>
						</p>
					</li>
				</ul>
			</div>
			<div class="wrap">
				<h6>收货地址</h6>
				<ul class="sp">
					<li>
						<span class="t">姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名:</span><span class="s">{{orderdetail.shippingAddress.receiverName}} </span>
					</li>
					<li><span class="t">联系电话:</span><span class="s">{{orderdetail.shippingAddress.receiverMobile}} </span>
					</li>
					<li>
						<span class="t">收货地址:</span>
						<span class="s">{{orderdetail.shippingAddress.receiverState}}{{orderdetail.shippingAddress.receiverCity}}{{orderdetail.shippingAddress.receiverDistrict}}
						{{orderdetail.shippingAddress.receiverAddress}}
			 </span></li>
				</ul>
			</div>
			<div class="wrap">
				<h6>发票信息</h6>
				<ul class="sp">

					<li><span class="t">发票状态:</span><span class="s">{{invoiceFilter(orderdetail.shippingInvoice.invoiceStatus)}}</span></li>
				<li><span class="t">收&nbsp;&nbsp;票&nbsp;&nbsp;人:</span><span class="s">{{orderdetail.shippingInvoice.receivePerson}}</span></li>
					
					<li><span class="t">发票抬头:</span><span class="s">{{orderdetail.shippingInvoice.invoiceTitle}}</span></li>
					<li><span class="t">发票类型:</span><span class="s">{{orderdetail.shippingInvoice.invoiceType}} </span>
						<span v-if="orderdetail.shippingOrder.orderStatus!='04'" class="btn-invoice">
		   			<router-link 
		   				:to="{ name: '/addInvoice',
		   				query:{orderNo:orderdetail.shippingOrder.orderNo},
		   				params:{shippingInvoice:orderdetail.shippingInvoice} }" 
		   				v-if="orderdetail.shippingInvoice==''||orderdetail.shippingInvoice.invoiceStatus=='created'">
		   		     	编辑发票</router-link></span> 
		   		     	</li>
		   		     	
				</ul>
			</div>
			<div class="wrap">
				<ul class="sp">
					<li><span class="t">商品总价:</span><span class="s">￥{{orderdetail.shippingOrder.productFee|pricefilter}}</span></li>
					<li><span class="t">活动优惠:</span><span class="s">-￥{{orderdetail.shippingOrder.discountFee|pricefilter}}</span></li>
					<li><span class="t">运&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;费:</span><span class="s">￥{{orderdetail.shippingOrder.postageFee|pricefilter}}</span></li>
					<li class="border"> <span class="t">应付总额:</span><span class="s zjg">￥{{orderdetail.shippingOrder.orderTotalFee|pricefilter}}</span></li>
				</ul>
			</div>
		</div>
		<div class="fixbottom" v-show="orderdetail.shippingOrder.orderStatus=='01'||orderdetail.shippingOrder.orderStatus=='02'">
			<button class="btn-white" @click="cancel()">取消订单</button>
			<button class="btn-red-small" @click="quzhifu()" v-show="orderdetail.shippingOrder.orderStatus=='01'">立即付款</button>
		</div>
	</div>
</template>

<script>
	import { formatDate } from '@/assets/js/date.js'
	export default {
		data() {
			return {
				statusList: [],
				orderdetail: {
					shippingOrder: {},
					shippingInvoice: {},
					shippingAddress: {},
					shippingOrderItems: []
				},
				orderNo: '',
				hr: '',
				min: 0,
				sec: 0,
				jsqtime:0,
				t:'',
			}
		},
		filters: {
			formatDate(time) {
				var date = new Date(time);
				return formatDate(date, 'yyyy-MM-dd hh:mm:ss');
			}
		},

		methods: {
			//发票类型转换
			invoiceFilter(v){
				if(v=='created'){
					return '待开票'
				}else if(v=='B'){
					return '已开票'
				}else{
					return '已寄出'
				}
			},
			countdown: function() {
				const end = Date.parse(new Date(this.jsqtime));
				const now = Date.parse(new Date());
				const msec = end - now;
				let day = parseInt(msec / 1000 / 60 / 60 / 24);
				let hr = parseInt(msec / 1000 / 60 / 60 % 24);
				let min = parseInt(msec / 1000 / 60 % 60);
				let sec = parseInt(msec / 1000 % 60);
				this.day = day;
				this.hr = hr > 9 ? hr : '0' + hr;
				this.min = min > 9 ? min : '0' + min;
				this.sec = sec > 9 ? sec : '0' + sec;
				let self = this;
				this.t = setTimeout(() => {
					self.countdown();
				}, 1000);
			},
			getStatusEnum() {
				this.$axios({
					method: 'get',
					url: '/order/enums',
				}).then((res) => {
					if(res.code == '200') {
						this.statusList = res.object;
					}
				});
			},
			statusfilter(value) {
				for(var i = 0; i < this.statusList.length; i++) {
					if(this.statusList[i].key == value) {
						return this.statusList[i].value;
					}
				}
			},
			cancel() {
				this.$Modal.confirm({
					content: '<p>确定取消该订单？</p>',
					onOk: () => {
						this.$axios({
							method: 'post',
							url: '/order/cancel/' + this.orderNo,
						}).then((res) => {
							if(res.code == '200') {
								this.$Message.info(res.msg);
								this.getOrder();
							} else {
								this.$Message.info(res.msg);
							}
						});
					},
					onCancel: () => {}
				});
			},
			quzhifu() {
				this.$router.push({
					name: '/cartthree',
					query: {
						orderNo: this.orderNo
					}
				});
			},
			productFeejun(item) {
				return item.productFee / item.quantity
			},
			getParams() {
				// 取到路由带过来的参数 
				let routerParams = this.$route.query.orderNo;
				// 将数据放在当前组件的数据内
				this.orderNo = routerParams;
			},
			getOrder() {
				this.$axios({
					method: 'get',
					url: '/order/' + this.orderNo,
				}).then((res) => {
					this.orderdetail = res;
					if(this.orderdetail.shippingOrder.orderStatus=='01'){
						this.jsqtime = this.orderdetail.shippingOrder.createTime +30*60*1000;
						this.countdown();
					}
					if(this.orderdetail.shippingOrder.orderStatus=='06'){
						this.jsqtime = this.orderdetail.shippingOrder.deliverTime +7*24*60*60*1000;
						this.countdown();
					}
				});
			},
		},
		destroyed() {
			clearTimeout(this.t)
		},
		mounted() {
			this.getParams();
			this.getOrder();
			this.getStatusEnum();
		}
	}
</script>

<style scoped="scoped" lang="scss">
  .price{
  	float: right;
  }
	.fixbottom {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		box-sizing: content-box;
		height: 4.9rem;
		background: #fff;
		text-align: right;
		button {
			height: 3.2rem;
			margin-right: 1rem;
			padding: 0 0.8rem;
			cursor: pointer;
			margin-top: 8px;
		}
		.btn-white {
			background: #fff;
			border: 1px solid #eee;
		}
		.btn-red-small{
			background: #f00;
			border: 1px solid #f00;
			color: #fff;
		}
	}
	

</style>
<style>
	.ivu-icon-ios-arrow-left {
		font-size: 3rem;
	}
</style>