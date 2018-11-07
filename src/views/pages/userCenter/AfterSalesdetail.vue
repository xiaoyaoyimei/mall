<template>
	<div>
		<div class="m_header_bar">
			<router-link class="m_header_bar_back" to="/user/aftersales">
				<Icon type="ios-arrow-back"></Icon>
			</router-link>
			<span class="m_header_bar_title">退货单详情</span>
			<span class="m_header_bar_menu"></span>
		</div>
		<div class="detail">
			<div class="status">
				{{statusfilter(refundOrderdetail.shoppingRefundOrder.refundOrderStatus)}}
			</div>
			<div class="order-detail-wrap">
				<p class="color-black">退款金额:￥{{refundOrderdetail.shoppingRefundOrder.refundOrderTotalFee | pricefilter}}</p>
				<p class="color-gray">申请时间:{{refundOrderdetail.shoppingRefundOrder.createTime | formatDate('yyyy-MM-dd hh:mm:ss')}}</p>
				<ul class="spitem">
					<li class="clearfix orderteail" v-for="(item,index) in orderdetail.shippingOrderItems" :key="index">
						<img :src="item.productItemImg | imgfilter" :alt="item.productTitle">
						<div class="orderdetailText">
							<p>{{orderFeejun(item)|pricefilter}} x {{item.quantity}}</p>
							<p>{{item.productTitle}}</p>
						</div>
					</li>
				</ul>
			</div>
			<div class="wrap">
				<h6>订单信息</h6>
				<ul class="sp">
					<li><span class="t">订单编号:</span><span class="s">{{orderdetail.shippingOrder.orderNo}}</span></li>
					<li><span class="t">成交时间:</span><span class="s">{{orderdetail.shippingOrder.createTime | formatDate('yyyy-MM-dd hh:mm:ss')}}</span></li>
					<li><span class="t">商品总价:</span><span class="s">￥{{orderdetail.shippingOrder.productFee |pricefilter}}</span></li>
					<li><span class="t">活动优惠:</span><span class="s">-￥<label v-if="orderdetail.shippingOrder.discountFee!=''">{{orderdetail.shippingOrder.discountFee|pricefilter}}</label><label v-else>0</label></span></li>
					<li><span class="t">运&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;费:</span>
						<span class="s" v-if="orderdetail.shippingOrder.postageFee!=''">￥{{orderdetail.shippingOrder.postageFee|pricefilter}}</span>
					   <span v-else>￥0.00</span></li>
					<li><span class="t">应付总额:</span><span class="s">￥ {{orderdetail.shippingOrder.orderTotalFee|pricefilter}}</span></li>
				</ul>
			</div>
			<div class="wrap">
				<h6>退款信息</h6>
				<ul class="sp">
					<li><span class="t">退款编号:</span><span class="s">{{refundOrderdetail.shoppingRefundOrder.refundOrderNo}}</span></li>
					<li><span class="t">退款金额:</span><span class="s">￥{{refundOrderdetail.shoppingRefundOrder.refundOrderTotalFee | pricefilter}}</span></li>
					<li><span class="t">要&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;求:</span><span class="s">{{refundOrderdetail.shoppingRefundOrder.remarks}}</span></li>
					<li><span class="t">退货快递:</span><span class="s">{{refundOrderdetail.shoppingRefundOrder.logistics}}</span></li>
					<li><span class="t">退货单号:</span><span class="s">{{refundOrderdetail.shoppingRefundOrder.expressNo}}</span></li>
				</ul>
			</div>
		</div>
		<Spin size="large" fix v-if="spinShow"></Spin>
	</div>

</template>

<script>
	export default {
		data() {
			return {
				spinShow: true,
				orderdetail: {
					shippingOrder: {
						postageFee: 0,
						orderTotalFee: 0
					},
					shippingInvoice: {},
					shippingAddress: {},
					shoppingOrderItems: [],
				},
				refundOrderdetail: {
					shoppingRefundOrder: {
						refundOrderTotalFee: 0
					},
					shippingInvoice: {},
					shippingAddress: {},
					shoppingRefundOrderItems: [],
				},
				statusList: [],
				orderNo: '',
			}
		},
		methods: {
			getStatusEnum() {
				this.$axios({
					method: 'get',
					url: '/refund/enums',
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
					content: '<p>确定取消该售后服务订单？</p>',
					onOk: () => {
						this.$axios({
							method: 'post',
							url: '/order/cancel/' + this.orderNo,
						}).then((res) => {
							if(res.code == '200') {
								this.$Message.info(res.msg);
								this.getOrder();
							} else {
								this.getOrder();
								this.$Message.info(res.msg);
							}
						});
					},
					onCancel: () => {}
				});
			},
			//详情页均值
			discountFeejun(item) {
				return item.discountFee / item.quantity
			},
			productFeejun(item) {
				return item.productFee / item.quantity
			},
			orderFeejun(item) {
				return item.orderFee / item.quantity
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
					url: '/refund/' + this.$route.query.refundOrderNo,
				}).then((res) => {
					this.refundOrderdetail = res;
				});
				this.$axios({
					method: 'get',
					url: '/order/' + this.orderNo,
				}).then((res) => {
					this.orderdetail = res;
					this.spinShow = false;
				});
			},
		},
		mounted() {
			this.getParams();
			this.getOrder();
			this.getStatusEnum();
		},
	}
</script>

<style scoped="scoped" lang="scss">
	.detail {
		padding-bottom: 10rem;
		font-size: 1.4rem;
		background: #f0f0f0;
	}
	
	.status {
		background: #f00;
		height: 8rem;
		color: #fff;
		font-size: 1.6rem;
		padding-top: 2rem;
		padding-left: 2rem;
		margin: 1rem 0;
	}
</style>