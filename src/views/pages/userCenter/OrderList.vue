<template>
	<div class="order">
		<div class="m_header_bar">
			<router-link class="m_header_bar_back" to="/user">
				<Icon type="ios-arrow-back"></Icon>
			</router-link>
			<span class="m_header_bar_title">我的订单</span>
			<span class="m_header_bar_menu"></span>
		</div>

		<ul class="splist box-content" v-if="cartList.length>0">
			<li v-for="(x,index) in cartList" :key="index">
				<div @click="seeDetail(x.order.orderNo)">
					<div class="orderno">订单号:{{x.order.orderNo}}<span class="orderstatus">{{statusfilter(x.order.orderStatus)}}</span>
					</div>
					<div class="orderno">
						下单时间:{{x.order.createTime| formatDate}}
					</div>
					
					<div v-for="(child,i) in x.orderItems" :key="i">
						<div class="sphead">
							<div class="img"><img :src="child.productItemImg | imgfilter"></div>
							<div class="xq">
								<p>{{child.productTitle}}</p>
								<p class="color-gray font-12">{{child.productAttrs}}<br/>{{child.productItemNo}}</p>
							</div>
							<div class="price">￥{{childjun(child) | pricefilter}}<br/>x {{child.quantity}}</div>
						</div>
					</div>
					<div class="sptitle"><span style="float: left;margin-left:10px;color: #f60;">{{refundfilter(x.order.orderStatus)}}</span>合计：<span>￥{{x.order.orderTotalFee| pricefilter}}</span></div>
				</div>
				<div class="cz">
					<button type="button" class="btn " @click="cancel(x.order.orderNo)" v-if="x.order.orderStatus=='01'||x.order.orderStatus=='02'">取消订单</button>
					<button type="button" class="btn btn-dx" @click="quzhifu(x.order.orderNo)" v-if="x.order.orderStatus=='01'">去支付</button>
					<button class="btn btn-dx" @click="qianshou(x.order.orderNo)" v-if="x.order.orderStatus=='06'">签收订单</button>
					<router-link class="btn" :to="{ path: '/user/refund', query: {rforder:x.order.orderNo}}" v-if="x.canRefund==true">退款退货</router-link>
				</div>
			</li>
		</ul>
		<div class="flex-center box-content" v-else>
			<img src="../../../assets/img/order_empty.png" style="max-width: 8rem;">
			<p>暂无任何订单,赶紧去下单吧</p>
			<p>
				<router-link to="/" class="color-dx">去首页</router-link>
			</p>
		</div>
	</div>
</template>

<script>
	import store from '@/store/store'
	import { formatDate } from '@/assets/js/date.js'
	export default {
		data() {
			const temp = [];
			return {
				cartList: [],
				statusList: [],
				refundenums:[],
			}
		},
		computed: {
			token() {
				return store.state.token
			}
		},
		filters: {
			formatDate(time) {
				var date = new Date(time);
				return formatDate(date, 'yyyy-MM-dd hh:mm:ss');
			}
		},
		methods: {
			cancel(value) {
				this.$Modal.confirm({
					content: '<p>确定取消该订单？</p>',
					onOk: () => {
						this.$axios({
							method: 'post',
							url: '/order/cancel/' + value,
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
			qianshou(value) {
				this.$Modal.confirm({
					content: '<p>确定签收该订单？</p>',
					onOk: () => {
						this.$axios({
							method: 'post',
							url: '/order/receive/' + value,
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
						this.$Message.info('放弃签收');
					}
				});
			},
			childjun(value) {
				return value.orderFee / value.quantity
			},
			quzhifu(value) {
				this.$router.push({
					name: '/cartthree',
					query: {
						orderNo: value
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
				refundfilter(value) {
				for(var i = 0; i < this.refundenums.length; i++) {
					if(this.refundenums[i].key == value) {
						return this.refundenums[i].value;
					}
				}

			},
			seeDetail(value) {
				this.$router.push({
					name: '/order/detail',
					query: {
						orderNo: value
					}
				});
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
					this.$axios({
					method: 'get',
					url: '/order/enums',
				}).then((res) => {
					if(res.code == '200') {
						this.statusList = res.object;
					}

				});
			},
			getOrder() {
				if(this.token != null) {
					this.$axios({
						method: 'get',
						url: '/order/list',
					}).then((res) => {
						if(res.code == '200') {
							this.cartList = res.object;
						}
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