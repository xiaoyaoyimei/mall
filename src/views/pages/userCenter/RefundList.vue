<template>
	<div class="order">
		<div class="m_header_bar">
			<router-link class="m_header_bar_back" to="/user">
				<Icon type="ios-arrow-back"></Icon>
			</router-link>
			<span class="m_header_bar_title">售后订单</span>
			<span class="m_header_bar_menu"></span>
		</div>

		<ul class="splist box-content" v-if="cartList.length>0">
			<li v-for="(x,index) in cartList" :key="index">
				<div class="orderno">售后订单号:{{x.refundOrder.refundOrderNo}}
				</div>
				<div class="orderno">
					退款退货时间:{{x.refundOrder.createTime| formatDate}}

					<span class="orderstatus">{{statusrufundfilter(x.refundOrder.refundOrderStatus)}}</span></div>
				<div v-for="(child,i) in x.refundOrderItems" :key="i">
					<div class="sphead">
						<div class="img"><img :src="child.productItemImg | imgfilter"></div>
						<div class="xq">
							<p>{{child.productTitle}}</p>
							<p class="color-gray font-12">{{child.productAttrs}}<br/>{{child.productItemNo}}</p>
						</div>
						<div class="price">￥{{childjun(child) | pricefilter}}<br/>x {{child.quantity}}</div>
					</div>
				</div>
				<div class="sptitle" v-if="!x.refundOrder.refundOrderStatus=='01'&&!x.refundOrder.refundOrderStatus=='05'">合计：<span>￥{{x.refundOrder.refundOrderTotalFee| pricefilter}}</span></div>
				<div class="cz">
					<button type="button" class="btn" v-if="x.refundOrder.refundOrderStatus=='01'" @click="cancel(x.refundOrder.refundOrderNo)">取消退款退货</button>
					<router-link class="btn" :to="{ path: '/refund/logisticsInfo', query: {rforder:x.refundOrder.refundOrderNo}}" v-if="x.refundOrder.refundOrderStatus=='02'">填写物流单号</router-link>
				</div>
			</li>
		</ul>
		<div class="flex-center box-content" v-else>
			<img src="../../../assets/img/order_empty.png" style="max-width: 8rem;">
			<p>暂无任何售后订单</p>
			<p>
				<router-link to="/" class="color-dx">去首页</router-link>
			</p>
		</div>
	</div>
</template>

<script>
	import { formatDate } from '@/assets/js/date.js'
	import store from '@/store/store'
	export default {
		data() {
			const temp = [];
			return {
				cartList: [],
				statusList: [],
				refundenums: []
			}
		},
		filters: {
			formatDate(time) {
				var date = new Date(time);
				return formatDate(date, 'yyyy-MM-dd hh:mm:ss');
			}
		},
		computed: {
			token() {
				return store.state.token
			}
		},
		methods: {
			cancel(value) {
				this.$Modal.confirm({
					content: '<p>确定取消该售后订单？</p>',
					onOk: () => {
						this.$axios({
							method: 'post',
							url: '/refund/cancel?refundOrderNo=' + value,
						}).then((res) => {
							if(res.code == '200') {
								this.$Message.info(res.msg);
								this.getOrder();
							} else {
								this.$Message.info(res.msg);
							}
						});
					},
					onCancel: () => {
						this.$Message.info('放弃取消');
					}
				});
			},
			childjun(value) {
				return value.refundOrderFee / value.quantity
			},
			statusrufundfilter(value) {
				for(var i = 0; i < this.refundenums.length; i++) {
					if(this.refundenums[i].key == value) {
						return this.refundenums[i].value;
					}
				}
			},
			getStatusEnum() {
				this.$axios({
					method: 'get',
					url: '/refund/enums',
				}).then((res) => {
					if(res.code == '200') {
						this.refundenums = res.object;
					}
				});
			},
			getOrder() {

				if(this.token != null) {
					this.$axios({
						method: 'get',
						url: '/refund/getRefundOrderList',
					}).then((res) => {
						this.cartList = res;
					});
				} else {
					router.replace({
						path: 'login',
						query: {
							redirect: router.currentRoute.fullPath
						}
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

</style>