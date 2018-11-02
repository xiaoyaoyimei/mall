<template>
	<div class="order">
		<div class="m_header_bar bg-red">
			<router-link class="m_header_bar_back" to="/user">
				<Icon type="ios-arrow-back"></Icon>
			</router-link>
			<span class="m_header_bar_title">我的订单</span>
			<span class="m_header_bar_menu"></span>
		</div>
		<div class="switchStatus">
		<span  @click="changeStatus('00')" :class="{red:'00' == numactive}" >全部订单</span>
				<span @click="changeStatus('01')" :class="{red:'01' == numactive}">待付款</span>
				<span @click="changeStatus('02')" :class="{red:'02' == numactive}">已付款</span>
				<span @click="changeStatus('05')" :class="{red:'05' == numactive}">待发货</span>
				<span @click="changeStatus('06')" :class="{red:'06' == numactive}">已发货</span>
				</div>
		<Scroll  v-show="!noorderShow">
		<ul class="splist box-content">
			<li v-for="(x,index) in cartList" :key="index">
				<div>
					<div class="orderno">
						<p><span class="color-black">订单编号:{{x.order.orderNo}}</span><span class="orderstatus">{{statusfilter(x.order.orderStatus)}}</span></p>
						<p>下单时间:{{x.order.createTime| formatDate}}</p>
					</div>

					<div v-for="(child,i) in x.orderItems" :key="i" class="order-wrap">
						<div class="sphead">
						<img :src="child.productItemImg | imgfilter">
							<div class="xq">
								<p class="color-black">{{child.productItemNo}}</p>
								<p class="title">{{child.productTitle}}</p>
								<p class="color-gray font-12">{{child.productAttrs}}</p>
							</div>
							<div class="price">
							<span class="color-black">	￥{{childjun(child) | pricefilter}}</span>
								<br/>x {{child.quantity}}<br/>
							<router-link v-if="x.order.orderStatus=='07'&&!child.pinglun" class="color-red pingjia" style="color:#ff0000" :to="{ path: '/user/evaluate', query: {rforder:x.order.orderNo,index:i}}">去评价</router-link>	
							</div>
								
						</div>
					</div>
					<div class="sptitle">
						<!--<span style="float: left;margin-left:10px;color: #f60;">
						{{refundfilter(x.order.orderStatus)}}</span>-->
					<span>共{{}}件商品</span>	<span class="color-black font-16"> 合计： ￥{{x.order.orderTotalFee| pricefilter}}</span></div>
				</div>
				<div class="cz">
					<button type="button" class="btn " @click="seeDetail(x.order.orderNo)" >订单详情</button>
					<button type="button" class="btn " @click="cancel(x.order.orderNo)" v-if="x.order.orderStatus=='01'||x.order.orderStatus=='02'">取消订单</button>
					<button type="button" class="btn btn-red-small" @click="quzhifu(x.order.orderNo)" v-if="x.order.orderStatus=='01'">立即付款</button>
					<button class="btn btn-red-small" @click="qianshou(x.order.orderNo)" v-if="x.order.orderStatus=='06'">签收订单</button>
					<router-link class="btn" :to="{ path: '/user/refund', query: {rforder:x.order.orderNo}}" v-if="x.canRefund==true">退款退货</router-link>
					<!--  -->
				</div>
			</li>
		</ul>
		</Scroll>
		<div class="flex-center  empty" v-show="noorderShow">
			<img src="../../../assets/img/order_empty.png" style="max-width: 8rem;">
			<p>您还没有相关的订单</p>
				<router-link to="/" class="color-dx">去购物</router-link>
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
				numactive:'00',
				cartList: [],
				statusList: [],
				refundenums: [],
				status: '01',
				noorderShow: false,
				height:500
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
				changeStatus(v) {
				this.numactive = v;
				this.status = v;
				this.spinShow=true;
				this.getOrder()
			},
			getOrder() {
				if(this.token != null) {
					let url = '';
					if(this.status != undefined&&this.status != '00') {
						status = this.status;
						url = `/order/list?orderStatus=${status}`
					} else {
						url = '/order/list'
					}
					this.$axios({
						method: 'get',
						url: url,
					}).then((res) => {
						if(res.code == '200') {
							this.cartList = res.object;
							this.noorderShow = false;
						} else {
							this.noorderShow = true;
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
			this.status = this.$route.query.status
			if(this.status==undefined){
				this.status='00'
			}
			this.numactive=this.status;
			this.getOrder();
			this.getStatusEnum();
		}
	}
</script>

<style scoped="scoped" lang="scss">


</style>
