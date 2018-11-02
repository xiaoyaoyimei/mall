<template>
	<div >
		<div class="m_header_bar bg-red">
			<router-link class="m_header_bar_back" to="/user">
				<Icon type="ios-arrow-back"></Icon>
			</router-link>
			<span class="m_header_bar_title">售后服务</span>
			<span class="m_header_bar_menu"></span>
		</div>
				<div class="switchStatus">
		<span  @click="changeStatus('00')" :class="{red:'00' == numactive}" >全部</span>
				<span @click="changeStatus('01')" :class="{red:'01' == numactive}">待审核</span>
				<span @click="changeStatus('02')" :class="{red:'02' == numactive}">待处理</span>
					<span @click="changeStatus('04')" :class="{red:'04' == numactive}">已退款</span>
						<span @click="changeStatus('05')" :class="{red:'05' == numactive}">已拒绝</span>
				</div>
				<Scroll  v-if="hasShow">
		<ul class="splist box-content">
			<li v-for="(x,index) in refundList" :key="index">
				<div @click="seeDetail(x.refundOrder.orderNo)">
					<div class="orderno">
						<p><span class="color-black">订单编号:{{x.refundOrder.orderNo}}</span><span class="orderstatus">{{statusrufundfilter(x.refundOrder.refundOrderStatus)}}</span></p>
						<p>下单时间:{{x.refundOrder.createTime | formatDate('yyyy-MM-dd hh:mm:ss')}}</p>
					</div>

					<div v-for="(child,i) in x.refundOrderItems" :key="i" class="order-wrap">
						<div class="sphead">
						<img :src="child.productItemImg | imgfilter">
							<div class="xq">
								<p class="color-black">{{child.productItemNo}}</p>
								<p class="title">{{child.productTitle}}</p>
								<p class="color-gray font-12">{{child.productAttrs}}</p>
							</div>
							<div class="price">
							<span class="color-black">	￥{{child.refundOrderFee}}</span>
								<br/>x {{child.quantity}}</div>
						</div>
					</div>
					<div class="sptitle">	<span class="color-black font-16"> 合计： ￥{{x.refundOrder.refundOrderTotalFee| pricefilter}}</span></div>
				</div>
				<div class="cz">
						<button type="button" class="btn " @click="seeDetail(x.refundOrder.refundOrderNo,x.refundOrder.orderNo)">订单详情</button>
					<!--	<router-link :to="{name:'/user/Aftersalesdetail',query:{refundOrderNo:x.refundOrder.refundOrderNo,orderNo:x.refundOrder.orderNo}}">订单详情 </router-link>-->
						<button class="btn btn-red-small" v-if="x.refundOrder.refundOrderStatus=='01'" @click="cancelrefund(x.refundOrder.refundOrderNo)">取消</button>
						<button class="btn btn-red-small" v-if="x.refundOrder.refundOrderStatus=='02'||x.refundOrder.refundOrderStatus=='05'" @click="show(x.refundOrder)">显示处理结果</button>
						<button class="btn btn-red-small" v-if="x.refundOrder.refundOrderStatus=='02'" @click="showLogisticsInfo(x.refundOrder.refundOrderNo)">填写物流单号</button>
				</div>
			</li>
		</ul>
		</Scroll>
				<div class="flex-center  empty" v-else>
			<img src="../../../assets/img/sh_empty.png" style="max-width: 8rem;">
			<p>暂无售后记录哦~</p>
				<router-link to="/" class="color-dx">去购物</router-link>
		</div>
		<Modal v-model="infoModal" class="aftersalemodal" width="500" :mask-closable="false">
			<p slot="header">
				<Icon type="ios-information-circle"></Icon>
				<span class="expressNo">填写物流单号</span>
			</p>
			<div>
				<div class="refund">
					<p>退款退货订单号</p><span>{{rfOrderNumer}}</span></div>
				<div class="refund">
					<p>物流公司</p><input placeholder="物流公司" v-model="logistics"></div>
				<div class="refund">
					<p>物流单号</p><input placeholder="物流单号" v-model="expressNo">
				</div>

			</div>
			<div slot="footer">
				<Button type="primary" size="large" long @click="submitLogisticsInfo">提交</Button>
			</div>
		</Modal>
		<Modal v-model="dealModal" class="aftersaledealModal" width="500" :mask-closable="false">
			<p slot="header">
				<Icon type="ios-information-circle"></Icon>
				<span class="expressNo" style="padding-left:25px;">审核结果</span>
			</p>
			<div style="padding-bottom:30px;" class="refund">
				<div>
					<p>退款金额 :</p> <span class="color-red font-15">￥{{refundAmount | pricefilter}}</span>
				</div>
				<div v-if="refundStatus=='05'">
					<p>拒绝原因 : </p>{{refuseReason}}
				</div>
				<div v-if="refundStatus=='02'">
					<div>
						<p>退货联系人 : </p>{{refundAddress.name}}
					</div>
					<div>
						<p>退货联系电话 : </p>{{refundAddress.mobile}}
					</div>
					<div>
						<p>退货地址 : </p>{{refundAddress.address}}
					</div>
				</div>
			</div>
			<div slot="footer">
				<Button type="primary" size="large" long @click="submitLogisticsInfo">提交</Button>
			</div>
		</Modal>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				dealModal: false,
				infoModal: false,
				refundenums: [],
				refundList: [],
				reasonList: [],
				rfOrderNumer: '',
				expressNo: '',
				logistics: '',
				refundAmount: 0,
				refuseReason: '',
				refundAddress: {},
				refundStatus: '02',
				hasShow:true,
			    numactive:'00',
			}
		},
		methods: {
				seeDetail(rvalue,value) {
				this.$router.push({
					name: '/user/Aftersalesdetail',
					query: {
						refundOrderNo:rvalue,
						orderNo: value
					}
				});
				},
			cancelrefund(value) {
				this.$Modal.confirm({
					content: '<p>确定取消该售后订单？</p>',
					onOk: () => {
						this.$axios({
							method: 'post',
							url: '/refund/cancel?refundOrderNo=' + value,
						}).then((res) => {
							if(res.code == '200') {
								this.$Message.info(res.msg);
								this.getRefundOrder();
							} else {
								this.$Message.info(res.msg);
								this.getRefundOrder();
							}
						});
					},
					onCancel: () => {
						this.$Message.info('放弃取消');
					}
				});
			},
					changeStatus(v) {
				this.numactive = v;
				this.status = v;
				this.spinShow=true;
				this.getRefundOrder()
			},
			show(v) {
				this.dealModal = true;

				this.refundAmount = v.refundOrderTotalFee;
				this.refuseReason = v.refuseReason;
				this.refundStatus = v.refundOrderStatus
			},
			showLogisticsInfo(value) {
				this.infoModal = true;
				this.rfOrderNumer = value;
			},
			//提交物流信息
			submitLogisticsInfo() {
				var _this = this;
				_this.$axios({
					method: 'post',
					url: `/refund/submitLogisticsInfo?refundOrderNo=${_this.rfOrderNumer}&expressNo=${_this.expressNo}&logistics=${_this.logistics}`,
				}).then((res) => {
					if(res.code == '200') {
						_this.$Message.info(res.msg);
						_this.infoModal = false;
						_this.getRefundOrder();
					} else {
						_this.$Message.error(res.msg);
						_this.infoModal = false;
						_this.getRefundOrder();
					}
				});
			},
			statusrufundfilter(value) {
				for(var i = 0; i < this.refundenums.length; i++) {
					if(this.refundenums[i].key == value) {
						return this.refundenums[i].value;
					}
				}
			},
			reasonfilter(value) {
				for(var i = 0; i < this.reasonList.length; i++) {
					if(this.reasonList[i].causeId == value) {
						return this.reasonList[i].content;
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
				this.$axios({
					method: 'get',
					url: '/refund/getRefundCauseList',
				}).then((res) => {
					this.reasonList = res;
				});
			},
			getRefundOrder() {
					let refundStatus = '',
					url = '';
				if(this.refundStatus == '00'||this.refundStatus == undefined) {
				url = '/refund/getRefundOrderList'
				} else {
					refundStatus = this.status;
					url = `/refund/getRefundOrderList?refundOrderStatus=${refundStatus}`
				}
				this.$axios({
					method: 'get',
					url: url,
				}).then((res) => {
					if(res.length>0){
						this.refundList = res;
						this.hasShow=true;
					}else{
						this.hasShow=false;
					}
					
				});

			},
			getRefundAddress() {
				this.$axios({
					method: 'get',
					url: '/refund/getRefundAddressList',
				}).then((res) => {
					this.refundAddress = res;
				});
			}

		},
		mounted() {
			this.getRefundOrder();
			this.getStatusEnum();
			this.getRefundAddress();
		}
	}
</script>

<style scoped="scoped">
</style>