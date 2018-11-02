<template>
	<div class="font-16">
		<div class="m_header_bar">
			<router-link to="/seckill" class="m_header_bar_back">
				<Icon type="ios-arrow-back"></Icon>
			</router-link>
			<span class="m_header_bar_title">秒杀详情</span>
		</div>
		<div class="Secdetail">
			<div class="tp">
				<img :src="detail.productItem.listImg | imgfilter" />
				<div class="cursh-wrap">
					<p class="jg">
						<span class="color-dx">秒杀价:￥{{detail.crush.salePrice | pricefilter}}</span>
						<span class="yj">原价:￥{{detail.productItem.salePrice | pricefilter}}</span>
					</p>
					<div class="djs">
						<p v-if="detail.switch==0">距开始还有</p>
						<p v-else>距结束还剩</p>
						<span>{{ `${day}天 ${hr}:${min}:${sec}` }}</span>
					</div>
				</div>
			</div>

			<div class="chooseAddress">
				<ul class="address" v-if="youdizhi">
					<li @click.native="addAdd">
						<p><strong>{{addressList.person}} <label>{{addressList.phone}}</label></strong>
							<span>{{addressList.receiveProvince}}{{addressList.receiveCity}}{{addressList.receiveDistrict}}{{addressList.address}}</span></p>
						<Icon type="ios-arrow-forward"></Icon>
					</li>
					<li class="freight">运费:<span class="color-newred" style="color:#ff0000">￥{{freight | pricefilter}}</span></li>
				</ul>
				<div class="zeroAddress" v-else>
					<div @click="addAdd">
						请选择收货地址
						<Icon class='float float1' type="ios-arrow-forward"></Icon>
					</div>
				</div>
			</div>
			<div class="sxq">
				<p>{{detail.product.modelName}}</p>
				<dl class="dl-base clearfix"><dt class="goumai">购买数量</dt>
					<dd>
						<div class="number">
							<Icon type="md-add" class="ios-add" @click="jia" /><input value="1" type="text" v-model="quantity" v-on:blur="changeNumber($event)" >
							<Icon type="md-remove" class="ios-remove" @click="jian" />
						</div>
					</dd>
				</dl>
			</div>
		</div>
		<div class="fuwu">
			<span class="gray">服务</span>
			<span>○ 官方正品</span>
			<span>○ 极速发货</span>
			<span>○ 七天无理由退换货</span>
		</div>
		<div class="bg-lightgray padding40">
			<ul class="swith-tab pt50 clearfix">
				<li @click="toggletab(0)" :class="{active:0 == num}">商品详情</li>
				<li @click="toggletab(1)" :class="{active:1 == num}">商品参数</li>
				<li @click="toggletab(2)" :class="{active:2 == num}">评价晒单</li>
			</ul>
			<div class="intro_bg">
				<div v-show=" 0 == num" class="pro_intro">
					<div v-for="(item, index) in productimg" :key="index"><img :src="item.imgUrl |imgfilter"></div>
				</div>
				<div v-show=" 1 == num" class="pro_size clearfix">
					<p v-for="(item, index) in productDesc" :key="index">
						<span class="title">{{item.attrCode}}:</span> <span>{{item.attrValue}}</span>
					</p>
				</div>
				<div class="eval pt50 " v-show=" 2 == num">
					<div class="clearfix">
						<div class="eval-fl">
							<h5>全部评价
						<span  v-if="!onlyimg" @click="toggleimg()">全部</span>
							<span class="allimg"  @click="toggleimg()" v-else>
							有图
							</span>
							</h5>
							<ul class="eval-ul" v-if="hasPJ">
								<li v-for="(item, index) in commentList" :key="index">
									<h6><img :src="item.list.iconUrl | imgfilter">{{item.list.nickName}}</h6>
									<p>{{item.list.commentContent}}</p>
									<div class="sz" :key="index"><span v-for="(child, index) in item.imgList"><img :src="child | imgfilter"></span></div>
									<div class="zan"><span class="fr"><i class="icon-new icon-zan" :class="{'icon-zan-active':item.isZan=='Y' }" @click='zan(item.list.id,item.isZan)' ></i>{{item.number}}</span>{{item.list.commentTime | formatDate('yyyy-MM-dd hh:mm:ss')}}</div>
								</li>
							</ul>
							<div class="flex-center  empty" v-else>
								<img src="../../assets/img/pj_empty.png" style="max-width: 8rem;">
								<p>暂无评论记录~</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="foot">
			<button type="button" @click="confirm" class="miaoshagou" v-if="detail.switch==1">马上抢</button>
			<button class="btn-disabled" type="button" v-else>尚未开始</button>
		</div>
	</div>
</template>
<script>
		import store from '@/store/store';
	export default {
		data() {
			return {
				day: 0,
				hr: 0,
				min: 0,
				sec: 0,
				jsqtime: 0,
				detail: {
					productItem: {
						salePrice: 0
					},
					product: {},
					crush: {
						salePrice: 0
					}
				},
				skuId: '',
				quantity: 1,
				loading: true,
				youdizhi: false,
				proId: '',
				productDesc: [],
				productimg: [],
				addressList: {},
				onlyimg: false,
				commentList: [],
				num: 0,
				freight: 0,
				freightPrice: 0,
				freightTypeId: '',
				hasPJ: true,
				max:1

			}
		},
		computed: {
			token() {
				//获取store里面的token
				return store.state.token;
			},
		},
		methods: {
			//只显示带图评论
			toggleimg() {
				this.onlyimg = !this.onlyimg;
				this.showcomments();
			},
			//切换商品介绍和规格
			toggletab(num) {
				this.num = num;
			},
			//获取address中传来的数据
			countdown: function() {
				const end = Date.parse(new Date(this.jsqtime));
				const now = Date.parse(new Date());
				const msec = end - now;
				//当秒杀开始时
				if(msec == 0) {
					this.detail.switch = 1;
					this.jsqtime = this.detail.crush["endTime"];
				}
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
			//添加
			jia: function() {
				if(this.quantity >= this.max) {
					this.quantity = this.max
				} else {
					this.quantity = parseInt(this.quantity) + 1;
				}
			},
			//减
			jian: function() {
				if(this.quantity == 1) {
					this.quantity == 1
				} else {
					this.quantity = parseInt(this.quantity) - 1;
				}
			},
			//显示评论。0位全部评论，1为显示带图评论
			showcomments() {
				var imgshow = this.onlyimg;
				if(imgshow == true) {
					imgshow = 1
				} else {
					imgshow = 0
				}
				this.$axios({
					method: 'get',
					url: '/comment/search/' + this.productId + '/' + imgshow,
				}).then((res) => {
					if(res.code == "200" && res.object.length > 0) {
						this.commentList = res.object;
						this.hasPJ = true;
					} else {
						this.hasPJ = false;
					}
				});
			},
			getDD() {
				let routerParams = this.$route.params.address;
				if(routerParams != undefined) {
					this.addressList = routerParams;
					this.youdizhi = true
				}
			},
			addAdd() {
				localStorage.setItem('fromc', 'miaosha')
				this.$router.push({
					name: '/user/address'
				});
			},
			getAddress() {
				if(this.token != null && this.token != "" && this.token != undefined) {
					var _this = this;
					this.$axios({
						method: 'post',
						url: '/address',
					}).then((res) => {
						if(res.length > 0) {
							res.map(function(i) {
								if(i.isDefault == 'Y' && JSON.stringify(_this.addressList) == "{}") {
									_this.addressList = i;
									_this.youdizhi = true
								}
							});

						}
						if(_this.youdizhi) {
							this.getExpressPrice();
						}
					});
				}
			},
			confirm() {
				if(this.addressList.id == undefined) {
					this.$Message.error('收货地址不能为空');
					return;
				}
				let para = {
					addressId: this.addressList.id,
					quantity: this.quantity,
					skuId: this.$route.query.skuId
				};
				this.$axios({
					method: 'post',
					url: '/promotion/crush/confirm',
					data: para
				}).then((res) => {
					if(res.code == '200') {
						this.$router.push({
							path: '/cartthree',
							query: {
								orderNo: res.object
							}
						});
					} else {
						this.$Message.error(res.object);
						return;
					}
				});
			},
			zan(value, isZan) {
				var zanid = value;
				var Like = isZan;
				if(Like == 'N') {
					Like = 'yes'
				} else {
					Like = 'no'
				}
				this.$axios({
					method: 'post',
					url: '/comment/beLike/' + zanid + '/' + Like,
				}).then((res) => {
					if(res.code == '200') {
						this.showcomments()
					}
				})
			},
						changeNumber: function(event) {
								var obj = event.target;
				this.quantity = parseInt(obj.value);
				let n = /^[1-9]\d*$/;
				if(!n.test(obj.value)) {
					this.$Message.warning('商品数量须大于0个，请输入正整数');
					obj.value = 1
					this.quantity = 1
					return false;
				}
				if(this.quantity >= this.max) {
					this.quantity = this.max
				}
				this.calculate();
			},
			getDetail() {
				this.$axios({
					method: 'get',
					url: '/promotion/crush/' + this.$route.query.skuId,
				}).then((res) => {
					if(res.code == '200') {
						this.detail = res.object;
						this.max=this.detail.crush.unitQuantity;
						this.freightPrice = this.detail.product.salePrice;
						this.freightTypeId = this.detail.product.catalogId;
						if(this.detail.switch == '0') {
							this.jsqtime = this.detail.crush["startTime"]
						} else {
							this.jsqtime = this.detail.crush["endTime"];
						}
						//计时器
						this.countdown();
						this.proId = res.object.productItem.productId;
						this.$axios({
							method: 'post',
							url: '/product/desc/' + this.proId,
						}).then((res) => {
							this.productDesc = res;
						});
						this.$axios({
							method: 'post',
							url: '/product/img/' + this.proId,
						}).then((res) => {
							this.productimg = res;
						});
						//显示评论。0位全部评论，1为显示带图评论
						let imgshow = this.onlyimg;
						if(imgshow == true) {
							imgshow = 1
						} else {
							imgshow = 0
						}
						this.$axios({
							method: 'get',
							url: `/comment/search/${this.proId}/${imgshow}`,
						}).then((res) => {
							if(res.code == "200") {
								this.commentList = res.object;
							}
						});
						this.getExpressPrice()
					}
				});
			},
			getExpressPrice() {
				this.$axios({
					method: 'post',
					url: '/order/getShipPrice',
					data: {
						"price": [this.freightPrice],
						"province": this.addressList.receiveProvince,
						"quantity": [this.quantity],
						"typeIds": [this.freightTypeId]
					}
				}).then((res) => {
					if(res.code == 200) {
						this.freight = res.object;
					}

				});
			}

		},
		watch: {
			//当数量改变时重新计算运费
			quantity(newValue, oldValue) {
				this.getExpressPrice();
			}
		},
		mounted() {
			this.getAddress();
			this.getDetail()
			this.getDD();
		},
		destroyed() {
			clearTimeout(this.t)
		},
	}
</script>

<style scoped="scoped" lang="scss">
	@import '@/styles/color.scss';
	.m_header_bar {
		background-color: #ff0000;
		text-align: center;
		color: #fff;
	}
	
	.m_header_bar_back i {
		color: #fff;
	}
	
	.Secdetail {
		.tp {
			position: relative;
			img {
				display: block;
				width: 100%;
				text-align: center;
			}
		}
	}
	
	.jg {
		background: #fff;
		padding: 1rem;
		flex: 1;
		span {
			display: block;
		}
		.yj {
			text-decoration: line-through;
			font-size: 1.2rem;
		}
	}
	
	.sxq {
		padding: 1rem;
		margin-bottom: 1rem;
		margin-top: 1rem;
		background: #fff;
		p {
			margin-bottom: 1rem;
		}
	}
	
	.chooseAddress {
		margin-top: 10px;
	}
	
	.btn-disabled {
		width: 100%;
		background: #f5f5f5;
		cursor: not-allowed;
		color: #787878;
	}
	
	.djs {
		background: #ff0000;
		color: #fff;
		padding: 0.5rem;
	}
	
	.cursh-wrap {
		display: flex;
		border: 1px solid #ff0000;
	}
	
	.bg-lightgray {
		width: 100%;
		margin-bottom: 10rem;
	}
	
	.swith-tab {
		width: 100%;
		border-bottom: 0.5rem solid $color-border;
	}
	
	.swith-tab li {
		float: left;
		width: 33.33%;
		font-weight: 400;
		font-size: 1.8rem;
		color: #999999;
		height: 5rem;
		line-height: 5rem;
		text-align: center;
		border-right: 0.05rem solid $color-border;
	}
	
	.swith-tab .active {
		color: #FF0000;
		border-bottom: 0.15rem solid $color-border-red;
	}
	
	.fuwu {
		padding: 1rem;
		border-bottom: 0.25rem solid $color-border;
		border-top: 0.25rem solid $color-border;
	}
	
	.fuwu span {
		margin-left: 0.75rem;
		color: #333333;
		font-family: '微软雅黑';
		font-weight: 400;
		font-size: 1.6rem;
	}
	
	.fuwu .gray {
		color: #999999;
		margin-left: 0.25rem;
	}
	
	.pro_intro img {
		width: 100%;
	}
	
	.pro_size {
		padding: 1.25rem;
	}
	
	.pro_size span {
		float: left;
		width: 20rem;
		margin-top: 0.5rem;
		font-size: 0.9rem;
		color: #999999;
	}
	
	.pro_size .title {
		width: 9rem;
		text-align: right;
		margin-right: 2.5rem;
		color: #333333;
	}
	
	.iconUrl {
		width: 4rem;
		height: 4rem;
		border-radius: 50%;
	}
	
	.eval-ul .name {
		font-weight: 400;
		font-size: 1.8rem;
		line-height: 2.5rem;
		color: #333333;
	}
	
	.eval-ul .zan {
		width: 15rem;
		font-weight: 400;
		font-size: 1.2rem;
		color: #999999;
		line-height: 2rem;
	}
	
	.eval-ul .fr {
		position: absolute;
		top: 2.5rem;
		right: 0rem;
		color: #999999;
	}
	
	.eval-ul .red {
		color: #FF0000;
	}
	
	.fr img {
		vertical-align: middle;
		margin-left: 1rem;
	}
	
	.eval-ul .commentContent {
		margin-top: 2rem;
		font-weight: 400;
		font-size: 1.5rem;
		line-height: 2.5rem;
	}
	
	.sz img {
		margin-top: 1.5rem;
		width: 5rem;
		height: 5rem;
	}
	
	.number input {
		float: right;
		line-height: 3.6rem;
		height: 3.6rem;
		width: 5rem;
		border: 1px solid $color-border;
		text-align: center;
	}
	
	.number .ios-add,
	.number .ios-remove {
		float: right;
		line-height: 3.6rem;
		height: 3.6rem;
		width: 3.6rem;
		background-color: #f0f0f0;
		text-align: center;
		color: #333;
		font-size: 2rem;
	}
	
	.goumai {
		padding-top: 0.5rem;
		font-size: 1.8rem;
		float: left;
	}
</style>
<style>
	.spjs .ivu-tabs-tab {
		font-size: 1.6rem;
		text-align: center;
	}
</style>