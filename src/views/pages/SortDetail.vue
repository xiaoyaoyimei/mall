<template>
	<div>
		<div class="clearfix ">
			<Icon type="ios-arrow-back" @click="back()" class="icon-back" />
			<router-link :to="{ path: '/cart' }" class="carticon">
				<Icon type="ios-cart" />
			</router-link>
			<div class="video-wrap">
				<div ref="videoWrap" v-show=" 0== videonum" class="video-height">
					<div v-show="videoshow" class="video">
						<iframe ref="video" frameborder=0 allowfullscreen></iframe>
					</div>
				</div>
				<div v-show=" 1== videonum" class="swiper">
					<wc-swiper v-if="shangp.productImageList.length" :autoplay='false'>
						<wc-slide v-for="(item, index) in shangp.productImageList" :key="index">
							<img :src="item.listImg |imgfilter">
						</wc-slide>
					</wc-swiper>
					<img :src="shangp.product.modelImg |imgfilter" v-else>
					
				</div>
				<div class="controls" v-show="videoshow">
					<button :class="videonum==1?'active':''" @click="togglevideotab(1)">图片</button>
					<button :class="videonum==0?'active':''" @click="togglevideotab(0)">视频</button></div>
			</div>
			<div class="iteminfo">
				<dl class="dl-base clearfix">
					<div class="mylike" @click="likepro">
						<img src="../../assets/img/love.png" v-if="likeshow">
						<img src="../../assets/img/custom-love.png" v-else>
					</div>
					<dd class="sku-price color-newred">
						<span v-if="choosesp.price==0">￥{{shangp.product.salePrice | pricefilter}}</span>
						<span v-else> 
						<span v-if="cxshow">
						<span class="color-red">￥{{choosesp.cuxiaoprice | pricefilter}} </span>
						<label class="color-origin">￥{{choosesp.price | pricefilter}}</label>
						</span>
						<span v-else>￥{{choosesp.price | pricefilter}}</span>
						</span>
					</dd>
				</dl>
				<h1>
					<span class="prf10">{{shangp.product.modelNo}} </span>
				</h1>
				<p class="itemtitle">
					<span class="color-newred">{{shangp.product.modelName}} </span>
				</p>
				<div class="huodong clearfix" v-if="choosesp.activityName!=null&&choosesp.activityName!=''">
					<div class="huodongtitle">活动</div>
					<div class="huodonglist">
						<p><span class="red">活动名称</span><span>{{choosesp.activityName}}</span></p>
					</div>
				</div>
			</div>
			<div class="fuwu">
				<span>○ 官方正品</span>
				<span>○ 极速发货</span>
				<span>○ 七天无理由退换货</span>
			</div>
		</div>
		<div class="bg-lightgray">
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
				<div class="eval  " v-show=" 2 == num">
					<div class="eval-fl ">
						<h5>全部评价
						<span  v-if="!onlyimg" @click="toggleimg()">全部</span>
							<span class="allimg"  @click="toggleimg()" v-else>
							有图
							</span>
							</h5>
						<ul class="eval-ul" v-if="hasPJ">
							<li class="clearfix" v-for="(item, index) in commentList" :key="index">
								<h6><img class="iconUrl" :src="item.list.iconUrl | imgfilter"></h6>
								<div>
									<p class="name">{{item.list.nickName | plusXing('*')}}</p>
									<div class="zan">{{item.list.commentTime | formatDate('yyyy-MM-dd')}}
										<p>
											颜色分类：{{item.shippingOrderItems.productAttrs}}</p>
										<span class='zanicon' :class="{red:item.isZan =='Y'}">
													<span>{{item.number}}</span>
										<img src="../../assets/img/zan-red.png" v-if="item.isZan =='Y'" @click='zan(item.list.id,item.isZan)'>
										<img src="../../assets/img/zan-gray.png" v-else @click='zan(item.list.id,item.isZan)'>
										</span>
									</div>

									<p class="commentContent">{{item.list.commentContent}}</p>
									<div class="sz" v-for="(child, index) in item.imgList" :key="index" v-if="item.imgList.length>0">
										<span>
												<img :src="child | imgfilter"></span>
									</div>

								</div>
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
		<Modal class="cartModal" v-model="cartModal">
			<div class="imgdetail">
				<img :src="ImgUrl |imgfilter" alt="">
				<div class="xinxi">
					<span class="red" v-if="choosesp.price==0">￥{{shangp.product.salePrice | pricefilter}}</span>
					<span class="red" v-else> 
					<span v-if="cxshow">
					<span class="color-red red">￥{{choosesp.cuxiaoprice | pricefilter}} </span>
					<label class="color-origin red">￥{{choosesp.price | pricefilter}}</label>
					</span>
					<span class="red" v-else>￥{{choosesp.price | pricefilter}}</span>
					</span>
					<span v-show="!xiajia">
					库存: {{choosesp.kucun}}件
					</span>
					<span class="prf10">已选：{{shangp.product.modelNo}} </span>
					<div v-if="xiajia" class="xiajia">
						<Icon type="information-circled">
						</Icon>该商品已下架
					</div>
				</div>

			</div>
			<div class="summary">
				<dl v-if="choosesp.activityName!=null&&choosesp.activityName!=''"><dt><em class="act">{{choosesp.activityName}}</em></dt>
					<dd class="color-black">{{choosesp.activityName}} </dd>
				</dl>
				<dl class="noborde clerafix" v-for="(item, i) in shangp.productAttrList" :key="i">
					<dt>{{item.attrKey.catalogAttrValue}}</dt>
					<dd style="overflow: hidden;">
						<ul class="color-sel clerafix">
							<li :class="choosesp.kucun==0?'disabled':'abled'" v-for="(child, index) in item.attrValues" :key="index" @click="chooseSP($event,item)">
								<span v-bind:class="item.attrValues.length==1?'active':''" :titleid="child.id" ref="dditem">
										{{child.modelAttrValue}}</span>
							</li>
						</ul>
					</dd>
				</dl>
				<dl class="dl-base clearfix"><dt>购买数量</dt>
					<dd>
						<div class="number">
							<Icon type="ios-add" class="ios-add" @click="jia" /><input value="1" type="text" v-model="quantity" v-on:blur="changeNumber($event)">
							<Icon type="ios-remove" class="ios-remove" @click="jian" />
						</div>
					</dd>
				</dl>
			</div>
			<div class="opt">
				<button class="btn-cart" @click="atc" v-show="!wuhuotongzhi" v-if="!xiajia"><i class="icon-new icon-minicart"></i>加入购物车</button>
				<button class="btn-xorder" v-show="!wuhuotongzhi" @click="buynow(0)"><i class="icon-new icon-minicart"  ></i>立即下单</button>
				<button v-if="wuhuotongzhi" size="large" class="btn-nopro" disabled="disabled">暂时无货，到货通知</button>

			</div>

		</Modal>
		<div class="detailfooter">
			<router-link :to="{ path: '/index' }"><img src="../../assets/img/bar-home-gray.png"> </router-link>
			<router-link :to="{ path: '/cart' }"><img src="../../assets/img/bar-cart-gray.png"></router-link>
			<button @click="cartmodal()" style="background-color:#ff0000"> 点击购买</button>

		</div>
	</div>
</template>
<script>
	import store from '@/store/store';
	export default {
		data() {
			return {
				videonum: 1,
				hasPJ: true,
				cartList: [],
				cartOne: {
					id: '',
					image: '',
					originSalePrice: 0,
					productName: '',
					quantity: 1,
					salePrice: 0,
					productType: '',
				},
				onlyimg: false, //0为img为空。1显示图片
				//库存是否为0添加购物车显示按钮
				num: 0,
				isActive: false,
				videoshow: false,
				mousehidden: true,
				xiajia: false,
				wuhuotongzhi: false,
				firstshow: false,
				selectedId: -1,
				modal2: false,
				videoIcon: false,
				//商品最原始数据
				oldshangp: {
					product: {
						modelNo: ''
					},
					promotions: [],
					productImageList: [],
					productItemList: [],
					inventory: [],
					productAttrList: [],
				},
				//请求product之后的商品数据
				shangp: {
					product: {
						modelNo: '',
						salePrice: 0
					},
					promotions: [],
					productImageList: [],
					productItemList: [],
					inventory: [],
					productAttrList: [],
				},
				productDesc: [],
				productimg: [],
				cxshow: false,
				stock: false,
				choosesp: {
					id: '',
					img: '',
					itemNo: '',
					price: 0, //现价
					cuxiaoprice: 0,
					activityName: '',
					startTime: '',
					endTime: '',
					kucun: 0,
					quantity: 1,
				},
				cartModal: false,
				productItemId: '',
				quantity: 1,
				max: 100,
				productId: '',
				ImgUrl: '',
				choosepPrice: false,
				productImageListNew: [],
				recomm: [],
				commentList: [],
				dpjiage: 0,
				dpnum: 0,
				compineId: [],
				likeshow: false,
			}
		},
		computed: {
			token() {
				//获取store里面的token
				return store.state.token;
			},
		},
		methods: {
			cartmodal() {
				this.cartModal = true
			},
			back() {
				this.$router.go(-1);
			},
			//喜欢
			likepro() {
				if(this.token != null && this.token != "" && this.token != undefined) {
					this.$axios({
						method: 'post',
						url: `/like/insert/${this.productId}`,
					}).then((res) => {
						if(res.code == '200') {
							this.$Message.info('收藏成功');
							this.likeshow = true;
						} else if(res.code == '500') {
							this.$Message.error(res.object);
							this.likeshow = true;
						} else {
							this.$Message.error('收藏失败');
							this.likeshow = false;
						}

					})
				} else {
					this.$Message.error('您尚未登录,请先登录');
				}

			},
			getlikepro() {
				let id = this.shangp.product.id
				this.$axios({
					method: 'post',
					url: `/like/queryIsLiked/${id}`,
				}).then((res) => {
					this.likeshow = res;
				})
			},
			//点赞
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
			//只显示带图评论
			toggleimg() {
				this.onlyimg = !this.onlyimg;
				this.showcomments();
			},

			//切换商品介绍和规格
			toggletab(num) {
				this.num = num;
			},
			togglevideotab(v) {
				this.videonum = v;
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

			close() {
				this.videoshow = false;
			},
			getVideo(imgVideo) {
				let _this = this;
				if(imgVideo != "") {
					_this.videoshow = true;
					let player = new YKU.Player(imgVideo, {
						styleid: '0',
						client_id: '0996850d68cf40fe',
						vid: imgVideo,
						newPlayer: true,
						isAutoPlay: true,
					});

				}
			},
			buynow(v) {
				if(this.token != null && this.token != "" && this.token != undefined) {
					if(this.productItemId == "") {
						this.$Message.error('请选择商品属性');
						return
					}
					this.cartOne.id = this.choosesp.id;
					this.cartOne.productId = this.choosesp.productId;
					this.cartOne.image = this.choosesp.img;
					this.cartOne.productName = this.choosesp.itemNo;
					this.cartOne.quantity = this.quantity;
					this.cartOne.originSalePrice = this.choosesp.price;
					this.cartOne.salePrice = this.choosesp.cuxiaoprice;
					this.cartOne.promotionTitle = this.choosesp.activityName;
					this.cartOne.productType = this.shangp.product.typeId;
					this.cartOne.productCatalog = this.shangp.product.catalogId;
					this.cartList[0] = this.cartOne;
					//0为单个立即下单，1为推荐组合中的立即下单
					//				if(v==1){
					//					this.cartList=this.cartList.concat(this.compineList)
					//				}
					sessionStorage.removeItem('cart');
					sessionStorage.setItem('cart', JSON.stringify(this.cartList));
					this.$router.push({
						name: '/carttwo'
					});
					localStorage.setItem('orderfrom', 'A')
				} else {
					this.$router.push({
						path: '/login',
						query: {
							redirect: this.$route.fullPath
						}
					})
				}
			},
			//加入购物车addtocart
			atc() {
				if(this.token != null && this.token != "" && this.token != undefined) {
					if(this.productItemId == "") {
						this.$Message.error('请选择商品属性');
						return
					}
					let productItemIds = [];
					productItemIds.push(this.productItemId);
					if(this.compineId.length > 0) {
						productItemIds = this.compineId.concat(productItemIds);
						this.quantity = 1;
					}
					this.$axios({
						method: 'post',
						url: '/order/shopping/add',
						data: {
							productItemIds: productItemIds,
							quantity: this.quantity
						}
					}).then((res) => {
						if(res.code == '200') {
							this.$router.push({
								name: '/cart',
							});
						} else {
							this.$Message.error('加入购物车失败');
						}
					})
				} else {
					this.$router.push({
						path: '/login',
						query: {
							redirect: this.$route.fullPath
						}
					})
				}
			},
			//选择商品
			detail() {
				var self=this;
				return new Promise(function(resolve, reject) {
					var chooseId = "",
						jishu = 0;
					let dditem = self.$refs['dditem'];
					if(dditem != null) {
						for(let n = 0; n < dditem.length; n++) {
							if(dditem[n].getAttribute("class") == 'active') {
								chooseId += dditem[n].getAttribute("titleid") + ',';
								jishu++
							}
						}
					}
					chooseId = (chooseId.slice(chooseId.length - 1) == ',') ? chooseId.slice(0, -1) : chooseId;
					var flag = false;
					if(jishu == self.shangp.productAttrList.length) {
						//通过选择属性读出productItemId
						for(let chooseItem of self.shangp.productItemList) {
							if(chooseItem.productModelAttrs == chooseId) {
								self.shangp.product.modelNo = chooseItem.itemNo;
								self.ImgUrl = chooseItem.listImg;
								self.choosesp.id = chooseItem.id;
								self.choosesp.productId = chooseItem.productId;
								self.choosesp.img = chooseItem.listImg;
								self.choosesp.itemNo = chooseItem.itemNo;
								self.choosesp.price = chooseItem.salePrice;

								//若无促销，则促销价为原价
								self.choosesp.cuxiaoprice = chooseItem.salePrice;
								self.productItemId = chooseItem.id;
								if(self.shangp.promotions.length > 0) {
									for(let cxitem of self.shangp.promotions) {
										if(cxitem.productItemId == self.productItemId) {
											self.cxshow = true;
											self.choosesp.cuxiaoprice = cxitem.onSalePrice;
											self.choosesp.activityName = cxitem.activityName;
											self.choosesp.startTime = cxitem.startTime;
											self.choosesp.endTime = cxitem.endTime;
											self.choosesp.quantity = cxitem.quantity;
										}
									}
								}
								flag = true;
								break;
							} else {
								flag = false
							}
						}
						if(flag == false) {
							self.choosesp.itemNo = "";
							self.choosesp.price = "";
							self.xiajia = true
							self.firstshow = false
						} else {
							self.xiajia = false;
							self.firstshow = true
						}
						//计算库存（库存需大于0才显示）
						var kucunflag = false;
						if(self.shangp.inventory.length > 0) {
							for(let kucunitem of self.shangp.inventory) {
								if(kucunitem.skuId == self.productItemId) {
									kucunflag = true;
									self.choosesp.kucun = kucunitem.quantity - kucunitem.lockQuantity;
									//设置加入购物车的最大值
									self.max = self.choosesp.kucun;
									if(self.choosesp.kucun < 0) {
										self.choosesp.kucun = 0;
										self.max = 0;
									}
								}
							}
						}
						if(!kucunflag) {
							self.choosesp.kucun = 0;
						}
						if(self.choosesp.kucun < 1) {
							self.wuhuotongzhi = true;
						} else {
							self.wuhuotongzhi = false;
						}
						self.getlikepro(self.productItemId);

					} else {
						return;
					}
				});
			},
			//选择属性
			chooseSP(e, pa) {
				this.cxshow = false;
				let p = [];
				var i = 0;
				if(e.target.tagName == "IMG") {
					p = e.target.parentNode.parentNode.parentNode.children;
					for(i = 0; i < p.length; i++) {
						p[i].children[0].className = "";
					}
					e.target.parentNode.className = "active";
				} else {
					p = e.target.parentNode.parentNode.children;
					for(i = 0; i < p.length; i++) {
						p[i].children[0].className = "";
					}
					e.target.className = "active";
				}
				this.detail();
			},
			getParams() {
				// 取到路由带过来的参数 
				let routerParams = this.$route.query.id
				this.productId = routerParams;
			},

			//获取该商品信息
			getProduct() {
				var _this = this;
				return new Promise(function(resolve, reject) {
					_this.videoshow = false;
					_this.$axios({
						method: 'post',
						url: '/product/' + _this.productId,
					}).then((res) => {
						if(res.code == '200') {
							//原始数据用于合并求得的数据=>新数据
							_this.shangp = Object.assign({}, _this.oldshangp, res.object);
							if(_this.shangp.inventory.length > 0) {
								for(let kucunitem of _this.shangp.inventory) {
									_this.choosesp.kucun += kucunitem.quantity - kucunitem.lockQuantity;
								}
								if(_this.choosesp.kucun < 0) {
									_this.choosesp.kucun = 0
								}
							}

							if(_this.choosesp.kucun < 1) {
								_this.wuhuotongzhi = true;
							} else {
								_this.wuhuotongzhi = false;
							}
						//	_this.shangp.productImageList=_this.shangp.productImageList.concat(_this.shangp.product.modelImg);
							if(_this.shangp.product.video != '') {
								_this.videoIcon = true;
							}

						}
						_this.getlikepro();
					});
				})
			},
			getProductDesc() {
				//详情
				this.$axios({
					method: 'post',
					url: '/product/desc/' + this.productId,
				}).then((res) => {
					this.productDesc = res;
				});

				this.$axios({
					method: 'post',
					url: '/product/img/' + this.productId,
				}).then((res) => {
					this.productimg = res;
				});
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
		},
		mounted() {
			this.getParams();
			this.getProduct().then(res => {
				this.detail();
			});
			this.showcomments();

			this.getProductDesc();

		},
	}
</script>
<style lang="scss" scoped="scoped">
	@import '@/styles/color.scss';
	.icon-back {
		position: fixed;
		background: #333;
		opacity: 0.5;
		z-index: 1;
		color: #fff;
		border-radius: 100%;
		left: 1rem;
		font-size: 3.5rem;
		top: 1rem;
	}
	
	.iteminfo {
		padding-top: 1rem;
		position: relative;
		background: #fff;
		padding-left: 1rem;
		padding-right: 1rem;
		padding-top: 1rem;
	}
	
	.dl-base .sku-price {
		margin-top: 0rem;
		font-weight: 700;
		font-size: 2rem;
		float: left;
		color: #FF0000;
	}
	
	.iteminfo h1 {
		margin-top: 0.75rem;
		line-height: 1.5rem;
		margin-bottom: 0.5rem;
	}
	
	.itemtitle {
		font-size: 1.4rem;
		padding-bottom: 0.5rem;
	}
	
	.prf10 {
		font-weight: 700;
		font-size: 1.8rem;
		color: #333333;
	}
	
	.wuliu {
		width: 100%;
		font-weight: 400;
		font-size: 1.8rem;
		color: #999999;
		padding: 1.5rem 1.25rem;
		border-bottom: 0.025rem solid $color-border;
	}
	
	.mylike {
		position: absolute;
		top: 0.5rem;
		right: 1.5rem;
		img{
			width: 2.4rem;
			height: 2.4rem;
		}
	}
	
	
	.huodong {
		width: 100%;
		padding: 0 1.25rem;
		border-bottom: 0.25rem solid $color-border;
	}
	
	.huodong div {
		float: left;
	}
	
	.huodongtitle {
		width: 4rem;
		font-weight: 400;
		font-size: 1.6rem;
		color: #999999;
		margin-top: 1rem;
	}
	
	.huodonglist {
		width: 28rem;
		margin-top: 1rem;
	}
	
	.huodonglist p {
		margin-bottom: 1rem;
		font-weight: 400;
		font-size: 1.6rem;
		color: #333333;
		height: 2.5rem;
		overflow: hidden;
	}
	
	.huodonglist .red {
		color: #FF0000;
		margin-right: 0.75rem;
	}
	
	.fuwu {
		padding: 1rem;
		border-bottom: 1rem solid #F0F0F0;
		border-top: 1rem solid #F0F0F0;
		background: #fff;
		color: #666;
	}
	
	.bg-lightgray {
		width: 100%;
		margin-bottom: 10rem;
	}
	
	.swith-tab {
		width: 100%;
		background: #fff;
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
	
	.pro_intro img {
		width: 100%;
	}
	
	.detailfooter {
		width: 100%;
		height: 4.9rem;
		position: fixed;
		left: 0rem;
		bottom: 0rem;
		z-index: 1000;
		border-top: 1px solid $color-border;
		box-shadow: -0.2rem 0px 0px 0px #1b1b1b;
		background-color: #fff;
		text-align: center;
		display: flex;
		align-items: center;
		a {
			width: 25%;
		}
		button {
			width: 50%;
			border: none;
			font-weight: 400;
			font-size: 1.8rem;
			color: #FFFFFF;
			height: 100%;
		}
	}
	
	.big {
		position: relative;
		width: 100%;
	}
	
	.videoIcon {
		position: absolute;
		left: 2.5rem;
		bottom: 2.5rem;
		width: 3rem;
		height: 3rem;
	}
	
	.guanbi {
		position: absolute;
		right: 2.5rem;
		top: 2.5rem;
		width: 2.5rem;
		height: 2.5rem;
	}
	
	.pro_size {
		padding: 1.25rem;
		background: #fff;
	}
	
	.pro_size span {
		float: left;
		width: 68%;
		margin-top: 0.5rem;
		font-size: 1.5rem;
		overflow: hidden;
		color: #999999;
	}
	
	.pro_size .title {
		width: 28%;
		text-align: right;
		margin-right: 4%;
		color: #333333;
	}
	
	.btn-like {
		background-color: #ffffff;
		border: none;
	}
	
	.noborder {
		border-top: 1px solid $color-border;
	}
	
	.noborder dt {
		font-weight: 400;
		font-size: 2.4px;
		margin-bottom: 0.5rem;
	}
	
	.color-sel {
		margin-top: 1rem;
	}
	
	.color-sel li {
		float: left;
		margin-bottom: 0.5rem;
		margin-right: 1rem;
		text-align: center;
		border-radius: 0.5rem;
	}
	
	.color-sel li span {
		padding-left: 1rem;
		padding-right: 1rem;
		display: block;
		width: 100%;
		border: 1px solid $color-border;
		height: 3rem;
		line-height: 3rem;
		font-size: 1.4rem;
	}
	
	.color-sel li img {
		width: 4rem;
		vertical-align: middle;
	}
	
	.color-sel .active {
		border: 1px solid $color-border-red;
		color: #f00;
	}
	
	.cartModal .dl-base {
		margin-top: 1rem;
		padding-top: 1rem;
		border-top: 1px solid $color-border;
	}
	
	.number input {
		float: right;
		line-height: 3.6rem;
		height: 3.6rem;
		width: 5rem;
		border: 1px solid $color-border;
		text-align: center;
	}
	
	.number .ios-add {
		float: right;
		line-height: 3.6rem;
		height: 3.6rem;
		width: 3.6rem;
		background-color: #f0f0f0;
		text-align: center;
	}
	
	.number .ios-remove {
		float: right;
		line-height: 3.6rem;
		height: 3.6rem;
		width: 3.6rem;
		background-color: #f0f0f0;
		text-align: center;
	}
	
	.imgdetail {
		display: flex;
	}
	
	.imgdetail img {
		width: 10rem;
		height: 10rem;
		margin-right: 1rem;
	}
	
	.xinxi span {
		display: block;
		font-weight: 400;
		font-size: 1.6rem;
		color: #999999;
	}
	
	.summary {
		padding-top: 1rem;
		border-top: 1px solid #eee;
	}
	
	.summary dt {
		font-size: 1.4rem;
		color: #333;
	}
	
	.xinxi .red {
		font-weight: 700;
		font-size: 2rem;
		color: #FF0000;
	}
	
	.opt {
		margin-top: 1.5rem;
		width: 100%;
		text-align: center;
		margin-bottom: 1rem;
		display: flex;
	}
	
	.opt button {
		height: 3.6rem;
		line-height: 3.6rem;
		border: none;
		font-size: 1.6rem;
		width: 50%;
	}
	
	.btn-cart {
		background-color: #f69136;
		color: #fff;
	}
	
	.btn-xorder {
		background-color: #FF0000;
		color: #fff;
	}
	
	.iconUrl {
		width: 4.5rem;
		height: 4.5rem;
		border-radius: 50%;
		border: 1px solid #ddd;
		padding: 0.5rem;
	}
	
	.eval-ul .name {
		font-weight: 400;
		font-size: 1.8rem;
		line-height: 2.5rem;
		color: #333333;
	}
	
	.eval-ul .zan {
		font-weight: 400;
		font-size: 1.2rem;
		color: #999999;
		line-height: 2rem;
	}
	
	.eval-ul .zanicon {
		position: absolute;
		top: 2.5rem;
		right: 0rem;
		color: #999999;
		font-size: 1.8rem;
	}
	
	.zanicon img {
		width: 2rem;
		height: 2rem;
	}
	
	.eval-ul .red {
		color: #FF0000;
	}
	
	.fr img {
		vertical-align: middle;
		margin-left: 1rem;
		width: 2rem;
	}
	
	.eval-ul .commentContent {
		margin-top: 2rem;
		font-weight: 400;
		font-size: 1.5rem;
		line-height: 2.5rem;
		color: #333;
	}
	
	.sz img {
		margin-top: 1.5rem;
		width: 5rem;
		height: 5rem;
	}
	
	.carticon {
		position: fixed;
		z-index: 1;
		right: 1.5rem;
		top: 1rem;
		background: #333;
		border-radius: 50%;
		color: #fff;
		font-size: 2rem;
		height: 3rem;
		width: 3rem;
		text-align: center;
		opacity: 0.5;
	}
	
	.video-wrap {
		position: relative;
		width: 100%;
		display: block;
		.swiper {
			img {
				max-width: 100%;
			}
		}
		.controls {
			position: absolute;
			bottom: 3rem;
			left: 50%;
			margin-left: -70px;
			z-index: 10;
			button {
				background: #fff;
				color: #666;
				border: 1px solid #666;
				margin-left: 1.5rem;
				padding: 0 0.7rem;
				font-size: 1.2rem;
				border-radius: 0.5rem;
			}
			.active {
				background: #0099ff;
				color: #fff;
				border-color: #0099ff;
			}
		}
	}
	
	.video {
		position: absolute;
		left: 0;
		top: 0;
		z-index: 1;
	}
	
	.flex-center {
		background: #fff;
	}
</style>
<style>
	.ivu-modal-close {
		border: 1px solid #bbb;
		border-radius: 50%;
	}
	
	.cartModal .ivu-modal {
		left: 0rem;
		bottom: 0rem;
		width: 100%!important;
		margin: 0px;
	}
	
	.cartModal .ivu-modal-footer {
		display: none!important;
	}
</style>