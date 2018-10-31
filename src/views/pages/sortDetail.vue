<template>
	<div>
		<div class="clearfix ">
			<div class="fl spec ">
				<i class="i icon icon-dx-back" @click="back()"></i>
				<div class="big">
					<div v-show="videoshow" style="width: 7.5rem;height: 7.5rem;">
						<span class="guanbi" @click="close()"><Icon type="ios-close-circle-outline" /></span>
						<div class="youku" :id="shangp.product.video" style="width:100%;height:100%;"></div>
					</div>
					<img v-show="!videoshow" :src="ImgUrl |imgfilter" style="width: 100%;height: 100%">
					<img class="videoIcon" v-if='videoIcon' v-show="!videoshow" @click='getVideo(shangp.product.video)' src="../../assets/img/video.png">
				</div>
				<ul class="small">
					<li class="nextp" @click="pervlist()" v-show="shangp.productImageList.length>5"><Icon type="ios-arrow-back" /></li>
					<li v-for="(item, index) in shangp.productImageList" :key="index" @click='getIndex(item.listImg,index)' 
					:class="{active:item.clickItem,none:item.show}"  style="display:none">
						<img :src="item.smallImg |imgfilter">
					</li>
					<li class="nextp"  @click="nextlist()" v-show="shangp.productImageList.length>5"><Icon type="ios-arrow-forward" /></li>
				</ul>
			</div>
			<div class="fl iteminfo ml40">
				<dl class="dl-base clearfix">
					<div class="mylike"> 
						<button class="btn-like" @click="likepro" >
						<i class="icon"  :class="{'icon-like':!likeshow,'icon-likeRed':likeshow}"></i>
						</button>
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
				<p class="wuliu"><span style="margin-right:0.6rem;">快递：0.00</span> <span>销量：99999</span></p>
				<div class="huodong clearfix">
					<div class="huodongtitle">活动</div>
					<div class="huodonglist">
						<p><span class="red">活动名称</span><span>活动具体内容活动具体内容具体内容</span></p>
						<p><span class="red">活动名称</span><span>活动具体内容活动具体内容具体内容</span></p>
					</div>
				</div>
				<div class="fuwu">
					<span class="gray">服务</span>
					<span>○ 官方正品</span>
					<span>○ 极速发货</span>
					<span>○ 七天无理由退换货</span>
				</div>
				<!--  -->
			</div>
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
								<h5><span class="big-title" :class="{'allimg':!onlyimg }" @click="toggleimg(false)">全部评价</span>
							<span class="onlyimg" :class="{'allimg':onlyimg }" @click="toggleimg(true)">
							<i class="onlyimg"  ></i>有图
							</span>
							</h5>
								<ul class="eval-ul">
									<li class="clearfix" v-for="(item, index) in commentList" :key="index">
										<h6><img class="iconUrl" :src="item.list.iconUrl | imgfilter"></h6>
										<div>
											<p class="name">{{item.list.nickName}}</p>
											<div class="zan">{{item.list.commentTime | formatDate('yyyy-MM-dd hh:mm:ss')}}<span>颜色分类：{{item.shippingOrderItems.productAttrs}}</span> 
												<span class="fr" :class="{red:item.isZan =='Y'}">{{item.number}}
													<img v-if="item.isZan =='Y'" src="../../assets/img/u1782.png"   @click='zan(item.list.id,item.isZan)' />
													<img v-else src="../../assets/img/u1801.png" @click='zan(item.list.id,item.isZan)' />
												</span>
											</div>

											<p class="commentContent" >{{item.list.commentContent}}</p>
											<div class="sz"  v-for="(child, index) in item.imgList" :key="index"><span><img :src="child | imgfilter"></span></div>

										</div>
									</li>
								</ul>
							</div>
						</div>
						<!-- <p class="moreeval" @click="getcommentList" v-if="commentList.length>1">查看更多评价</p> -->
					</div>

				</div>
		</div>
		<Modal class="cartModal" 	v-model="cartModal" 	title="选择规格" >
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
								<li :class="choosesp.kucun==0?'disabled':'abled'" v-for="(child, index) in item.attrValues" :key="index" @click="chooseSP($event,item)" >
									<span v-bind:class="item.attrValues.length==1?'active':''" :titleid="child.id" ref="dditem">
										<!-- <img :src="child.smallImg |imgfilter " v-if="item.attrKey.isColorAttr == 'Y'"> -->
										{{child.modelAttrValue}}</span>
								</li>
							</ul>
						</dd>
					</dl>
					<dl class="dl-base clearfix"><dt>购买数量</dt>
						<dd>
							<div class="number">
								<Icon type="ios-add" class="ios-add"  @click="jia"/><input value="1" type="text" v-model="quantity"><Icon type="ios-remove" class="ios-remove" @click="jian"/></div>
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
			<router-link class="nav" :to="{ path: '/index' }"> <Icon type="ios-home" /> </router-link>
			<router-link class="nav" :to="{ path: '/cart' }"> <Icon type="ios-cart"  /></router-link>
			<button class="nav " @click="cartmodal()" style="background-color:#ff0000"> 点击购买</button>

		</div>	
	</div>
</template>
<script>
	export default {
		data() {
			return {
				cartList:[],
				cartOne:{
					id:'',
					image:'',
					originSalePrice:0,
					productName:'',
					quantity:1,
					salePrice:0,
					productType:'',
				},
				compine: [],
				compineList:[],
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
					id:'',
					img: '',
					itemNo: '',
					price: 0,//现价
					cuxiaoprice: 0,
					activityName: '',
					startTime: '',
					endTime: '',
					kucun: 0,
					quantity:1,
				},
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
				index:4,
				listindex:5,
				cartModal:false,
			}
		},
		methods: {
			cartmodal(){
				this.cartModal = true
			},
			back(){
				this.$router.go(-1);
			},
			checkAllGroupChange(data) {
				var _this = this;
				_this.dpnum = data.length;
				_this.dpjiage = 0;
				this.compineList=[];
				data.forEach((item,index) => {
					if(JSON.stringify(this.recomm[item].promotion)=="{}"){
						this.compineList.push({id:this.recomm[item].list.id,image:this.recomm[item].list.list_img,
							productName:this.recomm[item].list.item_no,quantity:1,originSalePrice:this.recomm[item].list.sale_price,
							salePrice:this.recomm[item].list.sale_price,
							productType:this.recomm[item].list.catalogId})
						this.dpjiage += parseFloat(this.recomm[item].list.sale_price);
					}else{
						this.compineList.push({id:this.recomm[item].list.id,image:this.recomm[item].list.list_img,
							productName:this.recomm[item].list.item_no,quantity:1,originSalePrice:this.recomm[item].list.sale_price,
							salePrice:this.recomm[item].promotion.onSalePrice,promotionTitle:this.recomm[item].promotion.activityName,
							productType:this.recomm[item].list.catalogId})
						this.dpjiage += parseFloat(this.recomm[item].promotion.onSalePrice);
					}
					this.compineId.push(this.recomm[item].list.id)
				});
				if(this.choosesp.cuxiaoprice > 0) {
					this.dpjiage += parseFloat(this.choosesp.cuxiaoprice*this.quantity);
				} else {
					this.dpjiage += parseFloat(this.choosesp.price*this.quantity);
				}
				
			},
			//喜欢
			likepro() {
				let id = this.shangp.product.id;
				if(localStorage.getItem('token') != null && localStorage.getItem('token') != undefined) {
					this.$axios({
						method: 'post',
						url: `/like/queryIsLiked/${id}`,
					}).then((res) => {
						if(res) {
							this.$Message.info('该商品已在收藏列表');
						} else {
							this.likeshow = !this.likeshow;
							this.$axios({
								method: 'post',
								url: `/like/insert/${id}`,
							}).then((res) => {
								if(res.code == '200') {
									this.$Message.info('收藏成功');
								} else {
									this.$Message.error('收藏失败');
								}
							})
						}
					})
				} else {
					this.$Message.error('您尚未登录,请先登录');
				}

			},
			getlikepro(){
				let	id = this.shangp.product.id
				this.$axios({
						method: 'post',
						url: `/like/queryIsLiked/${id}`,
					}).then((res) => {
						this.likeshow = res;
					})
			},
			//点赞
			zan(value, isZan) {
				let zanid = value;
				let Like = isZan;
				if(Like == 'N') {
					Like = 'Y'
				} else {
					Like = 'N'
				}
				this.$axios({
					method: 'post',
					url: `/comment/beLike/${zanid}/${Like}`,
				}).then((res) => {
					if(res.code == '200') {
						this.showcomments()
					}
				})
			},
			//只显示带图评论
			toggleimg(onlyimg) {
				this.onlyimg = onlyimg;
				this.showcomments();
			},
			//切换商品介绍和规格
			toggletab(num) {
				this.num = num;
			},
			changeNumber: function(event) {
				var obj = event.target;
				this.quantity = parseInt(obj.value);
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
			pervlist(){
				this.$forceUpdate();
                if(this.listindex > 5){
                    let i = this.listindex-6;
                    this.shangp.productImageList[this.listindex-1].show = false;
                    this.shangp.productImageList[i].show =true;
					this.listindex--
				}
			},
			nextlist(){
				this.$forceUpdate();
				if(this.listindex < this.shangp.productImageList.length){
					let i =this.listindex-5
					this.shangp.productImageList[this.listindex].show = true;
					this.shangp.productImageList[i].show =false;
					this.listindex++;
				}
			},
			next(){
				if(this.index < this.recomm.length){
					let i =this.index-4
					this.recomm[this.index].show = true;
					this.recomm[i].show =false;
					this.index++;
				}
              },
            prev(){
                if(this.index > 4){
                    let i = this.index-5;
                    this.recomm[this.index-1].show = false;
                    this.recomm[i].show =true;
                    this.index--
                }
            },
			getIndex(imgUrl, index) {
				this.videoshow = false;
				this.ImgUrl = imgUrl;
				for(let i = 0; i < this.shangp.productImageList.length; i++) {
					if(index == i) {
						this.shangp.productImageList[i].clickItem = true;
					} else {
						this.shangp.productImageList[i].clickItem = false;
					}

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
					if(localStorage.getItem('token') != null && localStorage.getItem('token') != undefined) {
				if(this.productItemId == "") {
					this.$Message.error('请选择商品属性');
					return
				}
				this.cartOne.id=this.choosesp.id;
				this.cartOne.image=this.choosesp.img;
				this.cartOne.productName=this.choosesp.itemNo;
				this.cartOne.quantity=this.quantity;
				this.cartOne.originSalePrice=this.choosesp.price;
				this.cartOne.salePrice=this.choosesp.cuxiaoprice;
				this.cartOne.promotionTitle=this.choosesp.activityName;
				this.cartOne.productType=this.shangp.product.catalogId;
				this.cartList[0]=this.cartOne;
				//0为单个立即下单，1为推荐组合中的立即下单
				if(v==1){
					this.cartList=this.cartList.concat(this.compineList)
				}
				sessionStorage.removeItem('cart');
				sessionStorage.setItem('cart', JSON.stringify(this.cartList));
				this.$router.push({ name:'/carttwo',query:{orderfrom:'A'}});
				}else{
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
				if(localStorage.getItem('token') != null && localStorage.getItem('token') != undefined) {
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
							Bus.$emit('cartmsg', "again");
							//this.$router.push({name:'/cartthree',query: { orderNo: res.msg}});  
							this.$router.push({
								name: '/cartzero',
								query: {
									cartBefore: this.choosesp.id
								}
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
				var chooseId = "",
					jishu = 0;
				let dditem = this.$refs['dditem'];
				if(dditem!=null) {
					for(let n = 0; n < dditem.length; n++) {
						if(dditem[n].getAttribute("class") == 'active') {
							chooseId += dditem[n].getAttribute("titleid") + ',';
							jishu++
						}
					}
				}
				chooseId = (chooseId.slice(chooseId.length - 1) == ',') ? chooseId.slice(0, -1) : chooseId;
				var flag = false;
				if(jishu == this.shangp.productAttrList.length) {
					//通过选择属性读出productItemId
					for(let chooseItem of this.shangp.productItemList) {
						if(chooseItem.productModelAttrs == chooseId) {
							this.shangp.product.modelNo = chooseItem.itemNo;
							this.ImgUrl = chooseItem.listImg;
							this.choosesp.id=chooseItem.id;
							this.choosesp.img = chooseItem.listImg;
							this.choosesp.itemNo = chooseItem.itemNo;
							this.choosesp.price = chooseItem.salePrice;
							//若无促销，则促销价为原价
							this.choosesp.cuxiaoprice =chooseItem.salePrice;
							this.productItemId = chooseItem.id;
							if(this.shangp.promotions.length > 0) {
								for(let cxitem of this.shangp.promotions) {
									if(cxitem.productItemId == this.productItemId) {
										this.cxshow = true;
										this.choosesp.cuxiaoprice = cxitem.onSalePrice;
										this.choosesp.activityName = cxitem.activityName;
										this.choosesp.startTime = cxitem.startTime;
										this.choosesp.endTime = cxitem.endTime;
										this.choosesp.quantity=cxitem.quantity
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
						this.choosesp.itemNo = "";
						this.choosesp.price = "";
						this.xiajia = true
						this.firstshow = false
					} else {
						this.xiajia = false;
						this.firstshow = true
					}
					//计算库存（库存需大于0才显示）
					var kucunflag = false;
					if(this.shangp.inventory.length > 0) {
						for(let kucunitem of this.shangp.inventory) {
							if(kucunitem.skuId == this.productItemId) {
								kucunflag = true;
								this.choosesp.kucun = kucunitem.quantity - kucunitem.lockQuantity;
								if(this.choosesp.kucun < 0) {
									this.choosesp.kucun = 0;
								}
							}
						}
					}
					if(!kucunflag) {
						this.choosesp.kucun = 0;
					}
					if(this.choosesp.kucun < 1) {
						this.wuhuotongzhi = true;
					} else {
						this.wuhuotongzhi = false;
					}
					 this.getlikepro(this.productItemId);

				} else {
					return;
				}

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
				let _this = this;
				_this.videoshow = false;
				this.$axios({
					method: 'post',
					url: '/product/' + this.productId,
				}).then((res) => {
					if(res.code == '200') {
						//原始数据用于合并求得的数据=>新数据
						_this.shangp = Object.assign({}, this.oldshangp, res.object);
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
						for(let a = 0; a < _this.shangp.productImageList.length; a++) {
							_this.shangp.productImageList[a].clickItem = false;
							if(a<5){
								_this.shangp.productImageList[a].show = true
							}else{
								_this.shangp.productImageList[a].show =false
							}
						}
						_this.ImgUrl = _this.shangp.product.modelImg;
						if(_this.shangp.productImageList.length > 0) {
							_this.shangp.productImageList[0].clickItem = true;
						}
						if(_this.shangp.product.video != '') {
							_this.videoIcon = true;
						}

					}
						this.getlikepro();
				});
			},
			getProductDesc() {
				//获得搭配
				this.$axios({
					method: "GET",
					url: "/product/match/" + this.productId,
				}).then(res => {
					if(res.code==200){
						for(let i =0; i<res.object.length;i++){
							if(i<4){
								res.object[i].show = true;
							}else{
								res.object[i].show =false
							}
						}
							this.recomm = res.object;
					}
				
				});
				this.$axios({
					method: 'post',
					url: '/product/desc/' + this.productId,
				}).then((res) => {
					this.productDesc = res;
				});

				//comment/search/{productId}/{isImg}
				this.$axios({
					method: 'post',
					url: '/product/img/' + this.productId,
				}).then((res) => {
					this.productimg = res;
				});
			},
			//显示评论。0位全部评论，1为显示带图评论
			showcomments() {
				let imgshow = this.onlyimg;
				if(imgshow == true) {
					imgshow = 1
				} else {
					imgshow = 0
				}
				this.$axios({
					method: 'get',
					url: `/comment/search/${this.productId}/${imgshow}`,
				}).then((res) => {
					if(res.code == "200") {
						this.commentList = res.object;
					}
				});
			},
			// getcommentList(){
			// 	d
			// }
		},
		mounted() {
			this.getParams();
			this.getProduct();
			this.showcomments();
			setTimeout(() => {
				this.detail();
			}, 1000)
			this.getProductDesc();
		
		},
	}
</script>
<style lang="scss" scoped="scoped">
@import '@/styles/color.scss';
.spec{
	position:relative;
}
.spec .i{
	position: absolute;
	top:1.5rem;
	left: 1.5rem;
	width: 5rem;
	height: 5rem;
	border-radius: 50%;
	z-index: 100;
	background-color: #414141;
	background-position: -11.5rem -22.8rem;
}
.iteminfo{
	background-color: #ffffff;
	position: relative;
}
.dl-base .sku-price{
	margin-top: 0rem;
	font-weight: 700;
	font-size:2rem;
	float: left;
	color: #FF0000;
	padding: 0rem 1.25rem;

}
.iteminfo h1{
	margin-top: 0.75rem;
	height: 1.5rem;
	line-height:1.5rem;
	margin-bottom: 0.5rem;
	padding: 0rem 1.25rem;

}
.prf10{
	font-weight: 700;
	font-size: 1.8rem;
	color: #333333;
}
.itemtitle .color-newred{
	font-weight: 400;
    font-style: normal;
	font-size: 1.8rem;
	display: block;
	height: 2.5rem;
	overflow: hidden;
	padding: 0rem 1.25rem;
	color: #333333;
}
.wuliu{
	width: 100%;
	font-weight: 400;
    font-size: 1.8rem;
	color: #999999;
	padding: 1.5rem 1.25rem;
	border-bottom: 0.025rem solid $color-border;
}
.mylike{
	position: absolute;
	top: 0rem;
	right: 2.505rem;
}
.mylike i{
	background-size: 25rem 25rem;
}
.huodong{
	width: 100%;
	padding: 0 1.25rem;
	border-bottom: 0.25rem solid $color-border;
}
.huodong div{
	float: left;
}
.huodongtitle{
	width: 4rem;
	font-weight: 400;
	font-size: 1.6rem;
	color: #999999;
	margin-top: 1rem;
}
.huodonglist{
	width: 28rem;
	margin-top: 1rem;
}
.huodonglist p{
	margin-bottom: 1rem;
	font-weight: 400;
	font-size:1.6rem;
	color: #333333;
	height: 2.5rem;
	overflow: hidden;
}
.huodonglist .red{
	color: #FF0000;
	margin-right:0.75rem;
}
.fuwu{
	padding: 1rem;
	border-bottom: 0.25rem solid $color-border;
	border-top: 0.25rem solid $color-border;
}
.fuwu span{
	margin-left: 0.75rem;
	color: #333333;
	font-family: '微软雅黑';
    font-weight: 400;
    font-size: 1.6rem;
}
.fuwu .gray{
	color: #999999;
	margin-left: 0.25rem;
}
.bg-lightgray{
	width: 100%;
	margin-bottom: 10rem;
}
.swith-tab{
	width: 100%;
	border-bottom: 0.5rem solid $color-border;	
	
}
.swith-tab li{
	float: left;
	width:33.33%;
	font-weight: 400;
	font-size: 1.8rem;
	color: #999999;
	height: 5rem;
	line-height: 5rem;
	text-align: center;
	border-right: 0.05rem solid $color-border;
}
.swith-tab .active{
	color: #FF0000;
	border-bottom: 0.15rem solid $color-border-red;
}
.pro_intro img{
	width: 100%;
}
.detailfooter{
	width: 100%;
	height: 7rem;
	position: fixed;
	left: 0rem;
	bottom: 0rem;
	z-index: 1000;
	border-top: 1px solid $color-border;
	box-shadow: -0.2rem 0px 0px 0px #1b1b1b;
	background-color: #fff;
	// padding: 0.3rem 0rem;
}
.nav{
	float: left;
	width: 25%;
	text-align: center;
	font-size: 1.8rem;
	color: #999999;
	padding: 1.5rem 0rem;
	
}
button.nav{
	width: 50%;
	display: inline-block;
	background-color: #fff;
	height: 7rem;
	border: none;
	font-weight: 400;
	font-size:1.8rem;
	color: #FFFFFF;
}
i{
	display: block;
	font-size:4rem
}
.big{
	position: relative;
}
.videoIcon{
	position: absolute;
	left: 2.5rem;
	bottom:2.5rem;
	width: 3rem;
	height: 3rem;
}
.guanbi{
	position: absolute;
	right: 2.5rem;
	top:2.5rem;
	width: 2.5rem;
	height: 2.5rem;	
}
.pro_size{
	padding: 1.25rem;
}
.pro_size p{
}
.pro_size span{
	float: left;
	width: 68%;
	margin-top: 0.5rem;
	font-size: 1.5rem;
	overflow: hidden;
	color: #999999;
}
.pro_size .title{
	width:28%;
	text-align: right;
	margin-right: 4%;
	color: #333333;
}
.eval-fl h5{
	margin-top: 1.5rem;
	padding: 0rem 1.25rem;
	height: 3.5rem;
	line-height: 3.5rem;
	border-bottom:0.05rem solid $color-border; 
}
.btn-like{
	background-color: #ffffff;
	border: none;
}
.noborder{
	border-top: 1px solid $color-border;
}
.noborder dt{
	font-weight: 400;
	font-size: 2.4px;
	margin-bottom: 0.5rem;
}
.color-sel{
	margin-top: 1rem;
	
}
.color-sel li{
	float: left;
	width: 40%;
	margin-bottom: 0.5rem;
	margin-right: 10%;
	text-align: center;
	// 
}
.color-sel li span{
	display: block;
	width: 100%;
	border: 1px solid $color-border;
	height: 3rem;
	line-height: 3rem;
}
.color-sel li img{
	width: 4rem;
	vertical-align: middle;
}
.color-sel .active{
	border: 1px solid $color-border-red;
	background-color: #FF0000;
	color: #FFFFFF;
	border-radius: 0.5rem;
}
.cartModal .dl-base{
	margin-top: 2rem;
	padding-top:2rem;
	border-top: 1px solid  $color-border;
}
.dl-base dt{
	float: left;
	width: 6.5rem;
	font-size: 1.6rem;
	line-height: 5rem;
	height: 5rem;
}
.dl-base dd{
	float: right;
	width: 19rem;

}
.number input{
	width: 7rem;
	height: 5rem;
	line-height: 5rem;
	border: 1px solid $color-border;
	text-align: center;
}
.number .ios-add{
	float: left;
	width: 6rem;
	line-height: 5rem;
	height: 5rem;
	background-color: #f0f0f0;
	text-align: center;
}
.number .ios-remove{
	float: right;
	line-height: 5rem;
	height: 5rem;
	width: 6rem;
	background-color: #f0f0f0;
	text-align: center;
}
.imgdetail{
	width: 23rem;
	height: 10rem;
	position: relative;
	margin-bottom: 2rem;
}
.imgdetail img{
	width: 10rem;
	vertical-align: middle;
}
.imgdetail .xinxi {
	// display: inline;
	float: right;
	width: 13rem;
}
.xinxi span{
	display: block;
	width: 13rem;
	font-weight: 400;
    font-size: 1.6rem;
    color: #999999;
}
.xinxi .red{
	font-weight: 700;
    font-size: 2rem;
    color: #FF0000;
}
.opt{
	margin-top: 8rem;
	width: 100%;
	text-align: center;
	margin-bottom: 2rem;

}
.opt button{
	width: 49%;
	height: 4rem;
	line-height: 4rem;
	border: none;
}
.btn-cart{
	background-color: #f69136;
	color: #fff;
}
.btn-xorder{
	background-color: #FF0000;
	color: #fff;
}
.cartModal{
	width: 100%;
}

.eval-fl h5 span{
	float: left;
	width: 8rem;
	font-size: 1.8rem;
	font-weight: 400;
}
.eval-fl .onlyimg{
	float: right;
	padding-right: 0.25rem;
	text-align: right;
}
.allimg{
	color: #FF0000;
}
.eval-ul{
	padding: 0rem 2.5rem;
}
.eval-ul h6{
	float: left;
	width: 6rem;
}
.eval-ul li{
	margin-top: 2.5rem;
	padding-bottom: 2.5rem;
	border-bottom: 1px solid $color-border;
}
.eval-ul li> div{
	float: left;
	width: calc(100% - 6rem);
	position: relative;
}
.iconUrl{
	width: 4rem;
	height: 4rem;
	border-radius: 50%;
}
.eval-ul .name{
	font-weight: 400;
    font-size: 1.8rem;
	line-height: 2.5rem;
	color: #333333;
}
.eval-ul .zan{
	width: 15rem;
	font-weight: 400;
    font-size: 1.2rem;
    color: #999999;
    line-height: 2rem;
}
.eval-ul .fr{
	position: absolute;
	top: 2.5rem;
	right: 0rem;
	color: #999999;
}
.eval-ul .red{
	color: #FF0000;
}
.fr img{
	vertical-align: text-bottom;
	margin-left: 1rem;
	width: 2rem;
}
.eval-ul .commentContent{
	margin-top: 2rem;
	font-weight: 400;
    font-size: 1.5rem;
    line-height: 2.5rem;
}
.sz img{
	margin-top: 1.5rem;
	width: 5rem;
	height:5rem;
}
</style>
<style>
.cartModal .ivu-modal{
	position: fixed;
	left: 0rem;
	bottom: 0rem;
	width: 100%!important;
	margin: 0px;
}
 .cartModal .ivu-modal-footer{
	 display:none!important;
 }
</style>
