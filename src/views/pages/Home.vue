<template>
	<div class="homepage">
		<header class="bg-black">
			<div class="search-wrap">
				<img src="../../assets/img/waplogo.png" class="logo">
				<input placeholder="新品" @click="gosearch()" v-model="keyword">
				<Icon type="ios-search" class="icon-search"/>
			</div>
		</header>
		
			<div class="side_nav_wrap clear">
				<Carousel v-model="value3" :autoplay="setting.autoplay" :autoplay-speed="setting.autoplaySpeed" :dots="setting.dots" :radius-dot="setting.radiusDot" :trigger="setting.trigger" :arrow="setting.arrow" class="banner">
					<CarouselItem v-for="(item, index) in Items" :key="index">
						<div class="demo-carousel">
							<a :href="item.linkUrl"><img :src="item.phoneUrl |imgfilter"></a>
						</div>
					</CarouselItem>
				</Carousel>
				<ul class="minipro clearfix">
					<li>
						<router-link :to="{ path: '/sort',query:{type:'f1e3e761ab6b4a659e676e83bae636a4'}}">
							<img src="../../assets/img/xp.png"> 新品
						</router-link>
					</li>
					<li>
						<router-link :to="{ path: '/advice'}">
							<img src="../../assets/img/yj.png"> 建议
						</router-link>
					</li>
					<li>
						<router-link :to="{ path: '/seckill'}">
							<img src="../../assets/img/ms.png"> 秒杀
						</router-link>
					</li>
					<li>
						<router-link :to="{ path: '/sort',query:{keyword:'座椅周边'}}">
							<img src="../../assets/img/zb.png"> 周边
						</router-link>
					</li>
				</ul>
				<div class="floor">
					<ul class="clearfix one">
						<li v-for="(item, index) in hotitem" :key='index'>
							<img src="../../assets/img/icon-rexiao.png" class="rx">
							<router-link :to="{ path: '/sort/sortDetail',query:{id:item.list.product_id} }">
								<img :src="item.list.img_url | imgfilter" :ref="item.list.id">
								<h6>{{item.list.model_no}}</h6>
								<span class="color-newred">￥{{item.list.sale_price|pricefilter}}</span>
							</router-link>
						</li>
					</ul>
				</div>
				<div class="floor">
					<div class="more">
							<router-link :to="{ path: '/sort',query:{keyword:'电竞椅'} }" class="seemore"> 查看更多
								<Icon type="ios-arrow-forward" />
							</router-link>
						<span>电竞椅</span></div>
					<div class="two  list-wrap clearfix">
						<div class="ad-wrap">
							<router-link :to="{ path: '/sort/sortDetail',query:{id:gameproductone.product_id} }">
								<img :src="gameproductone.img_url | imgfilter">
								<div class="ad ">
									<h5>{{gameproductone.model_no}}</h5>
									<h6>{{gameproductone.describe1}}</h6>
									<h6>{{gameproductone.describe2}}</h6>
									<span>¥ {{gameproductone.sale_price }}</span>
								</div>
							</router-link>
						</div>
						<ul class="clearfix">
							<li  v-for="(item, index) in gameproduct" :key='index' v-if="index>0" v-show='index<5'>
								<router-link :to="{ path: '/sort/sortDetail',query:{id:item.list.product_id} }">
									<img :src="item.list.img_url  |imgfilter" >
									<h6>{{item.list.model_no}}</h6>
									<span class="color-newred">¥ {{item.list.sale_price|pricefilter}}</span>
								</router-link>
							</li>
						</ul>
					</div>
					<div class="more">
						<div class="seemore fr">
							<router-link :to="{ path: '/sort',query:{keyword:'办公'} }"> 查看更多
								<Icon type="ios-arrow-forward" />
							</router-link>
						</div>
						<span>办公</span>
					</div>
					<div class=" three clearfix list-wrap">
						<ul class=" clearfix  office ">
							<li class="w594">
								<router-link :to="{ path: '/sort/sortDetail',query:{id:officeproductone.product_id} }" class="gradlan">
									<img :src="officeproductone.img_url | imgfilter">
									<div class="ad ">
										<h5>{{officeproductone.model_no}}</h5>
										<h6>{{officeproductone.describe1}}</h6>
										<h6>{{officeproductone.describe2}}</h6>
										<span>¥ {{officeproductone.sale_price | pricefilter}}</span>
									</div>
								</router-link>
							</li>
							<li class="officeproduct" v-for="(item, index) in officeproduct" :key='index' v-if="index>0" v-show='index<5'>
								<router-link :to="{ path: '/sort/sortDetail',query:{id:item.list.product_id} }">
									<img :src="item.list.img_url  |imgfilter" >
									<h6>{{item.list.model_no}}</h6>
									<span class="color-newred">¥ {{item.list.sale_price|pricefilter}}</span>
								</router-link>

							</li>
						</ul>
					</div>
					<div class="more">
							<router-link :to="{ path: '/sort',query:{keyword:'家居'} }"> 查看更多
								<Icon type="ios-arrow-forward" />
							</router-link>
						<span>家居</span></div>
					<div class=" three clearfix">
						<ul class=" clearfix  office">
							<li class="w594">
								<router-link :to="{ path: '/sort/sortDetail',query:{id:houseproductone.product_id} }"   >
									<img :src="houseproductone.img_url | imgfilter">
									<div class="ad ">
										<h5>{{houseproductone.model_no}}</h5>
										<h6>{{houseproductone.describe1}}</h6>
										<h6>{{houseproductone.describe2}}</h6>
										<span>¥ {{houseproductone.sale_price | pricefilter}}</span>
									</div>
								</router-link>
							</li>
							<li class="officeproduct" v-show='index<5' v-for="(item, index) in houseproduct" :key='index' v-if="index>0">
								<router-link :to="{ path: '/sort/sortDetail',query:{id:item.list.product_id} }">
									<img :src="item.list.img_url  |imgfilter" :ref="item.list.id">
									<h6>{{item.list.model_no}}</h6>
									<span class="color-newred">¥ {{item.list.sale_price|pricefilter}}</span>
								</router-link>

							</li>
						</ul>
					</div>
					<div class="more">
							<router-link :to="{ path: '/sort',query:{keyword:'座舱'} }"> 更多
								<Icon type="ios-arrow-forward" />
							</router-link>
						<span>座舱</span></div>
					<div class="floorad clearfix">
						<div class="yxzc" v-for="(item, index) in cockpitproduct" v-if='index<2' :key='index'>
							<router-link :to="{ path: '/sort/sortDetail',query:{id:item.list.product_id} }">
								<img :src="item.list.img_url  |imgfilter" class="zhuozi">
								<div class="ad">
									<h5>{{item.list.model_no}}</h5>
									<span class="color-newred">¥ {{item.list.sale_price|pricefilter}}</span></div>
							</router-link>
						</div>
					</div>
					<div class="more">
							<router-link :to="{ path: '/sort',query:{keyword:'座椅周边'} }"> 更多
								<Icon type="ios-arrow-forward" />
							</router-link>
						<span>座椅周边</span></div>
						<div class="max100"><router-link :to="{ path: '/sort',query:{keyword:'座椅周边'} }"><img src="../../assets/img/zyzb.jpg"></router-link></div>
					<div class="homeBottom">
						—— 我是有底线的 ——
					</div>
				</div>
			</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				value3: 0,
				keyword: '',
				loginflag: true,
				setting: {
					autoplay: false,
					autoplaySpeed: 2000,
					dots: "inside",
					radiusDot: false,
					trigger: "click",
					arrow: "hover"
				},
				Items: [],
				hotitem: [],
				aditems: [],
				gameproduct: [],
				gameproductone:{},
				officeproduct: [],
				officeproductone: {},
				houseproduct: [],
				houseproductone: {sale_price:0},
				type: [],
				basictype: [],
				tableproduct: [],
				cockpitproduct: [],
				peripheryproduct: [],
				toolbarNologin: {}, //侧边栏个人中心是否登录
				seckillTime: false,
				seckilllist: [{
					switch: '',
				}],
				jsqtime: '',
				day: '',
				hr: '',
				min: 0,
				sec: 0,
				currentPlay: 'red',
				percent: 0,

			};
		},
		computed: {
			token() {
				//获取store里面的token
				return this.$store.state.token;
			}
		},
		filters: {
			baifenhao(val) {
				return val + "%";
			}
		},
		methods: {
			gosearch() {
				this.$router.push({
					path: '/search',
					query: {
						keyword: this.keyword
					}
				});
			},
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
				hr = day * 24 + hr;
				if(this.day < 3) {
					this.seckillTime = true
				} else {
					this.seckillTime = false
				}
				this.hr = hr > 9 ? hr : '0' + hr;
				this.min = min > 9 ? min : '0' + min;
				this.sec = sec > 9 ? sec : '0' + sec;
				let self = this;
				this.t = setTimeout(() => {
					self.countdown();
				}, 1000);
			},
			getBanner() {
				//判断是否已经登录
				if(this.token != null) {
					this.loginflag = false;
				}
				this.$axios({
					method: 'get',
					url: '/promotion/crush/',
				}).then((res) => {
					if(res.code == '200') {
						this.seckilllist = res.object;
						if(this.seckilllist[0].switch == '0') {
							this.jsqtime = this.seckilllist[0].crush["startTime"]
						} else {
							this.jsqtime = this.seckilllist[0].crush["endTime"];
						}
						//计时器
						this.countdown();
					}
				});
				this.$axios({
					method: "GET",
					url: "/index/hotitem"
				}).then(res => {
					if(res.code == "200") {
						this.hotitem = res.object;
					}
				});
				this.$axios({
					method: "GET",
					url: "/index/poster"
				}).then(res => {
					if(res.code == "200") {
						this.Items = res.object;
					}
				});
				this.$axios({
					method: "GET",
					url: "/index/basictype"
				}).then(res => {
					if(res.code == "200") {
						this.basictype = res.object;
					}
				});
				this.$axios({
					method: 'GET',
					url: '/index/gameproduct',
				}).then((res) => {
					if(res.code == '200') {
						this.gameproduct = res.object;
						if(this.gameproduct.length > 0) {
							this.gameproductone = this.gameproduct[0].list;
						}
					}
				});
				this.$axios({
					method: 'GET',
					url: '/index/officeproduct',
				}).then((res) => {
					if(res.code == '200') {
						this.officeproduct = res.object;
						if(this.officeproduct.length > 0) {
							this.officeproductone = this.officeproduct[0].list;
						}
					}
				});
				this.$axios({
					method: 'GET',
					url: '/index/houseproduct',
				}).then((res) => {
					if(res.code == '200') {
						this.houseproduct = res.object;
						if(this.houseproduct.length > 0) {
							this.houseproductone = this.houseproduct[0].list;
						}
					}
				});
				this.$axios({
					method: 'GET',
					url: '/index/tableproduct',
				}).then((res) => {
					if(res.code == '200') {
						this.tableproduct = res.object;
					}
				});
				this.$axios({
					method: 'GET',
					url: '/index/cockpitproduct',
				}).then((res) => {
					if(res.code == '200') {
						this.cockpitproduct = res.object;
					}
				});
				this.$axios({
					method: 'GET',
					url: '/index/peripheryproduct',
				}).then((res) => {
					if(res.code == '200') {
						this.peripheryproduct = res.object;
					}
				});

			},
			switchimg(e, listImg, imgid) {
				this.$refs[imgid][0].src = this.global_.imgurl + listImg;
			}
		},
		destroyed() {
			clearTimeout(this.t)
		},
		mounted() {
			this.getBanner();

		},

		created() {
			this.touch = {}
		},
	};
</script>

<style lang="scss" scoped="scoped">
	@import '@/styles/color.scss';
	.homepage {
		background: #f0f0f0;
	}
	
	.minipro {
		display: flex;
		background: #fff;
		padding: 0 0 1rem;
		font-size: 1.4rem;
		color: #888;
		li {
			width: 25%
		}
		a {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			img {
				width: 6rem;
				height: 6rem;
			}
		}
	}
	
	.more {
		font-size: 1.8rem;
		margin-top: 1rem;
		margin-bottom: 0.5rem;
		overflow: hidden;
		padding-left: 1.5rem;
		padding-right: 1.5rem;
		 a {
		color: #999999;
		font-size: 1.4rem;
		float: right;
	}
	}
	
	.two{
		.ad-wrap{
			width: 33.333%;
			float: left;
			// height: 323px;
			img{
				max-width: 100%;
				// height: 323px;
			}
			a{
				position: relative;
			}
		}
		ul{
			width:66.66%;
			float: left;
		}
		li{
			float: left;
			width: 50%;
			// height: 161px;
			text-align: center;
			border-left: 1px solid transparent;
			border-top:1px solid transparent;
			img{
				max-width: 60%;
				// height: 110px;
			}
		}
		li:nth-child(2n){
			border-left:1px solid #eee
		}
		li:nth-child(n+3){
			border-top:1px solid #eee
		}
	}
	    .ad {
		position: absolute;
		top: 1rem;
		left: 1rem;
	}
	
	.ad h5 {
		font-weight: 700;
		font-size: 1.6rem;
		color: #FFFFFF;
	}
	
	.ad h6 {
		font-weight: 400;
		font-size: 1.2rem;
		color: #FFFFFF;
		height: 1.5rem;
		line-height: 1.5rem;
	}
	
	.ad span {
		font-weight: 700;
		font-size: 1.2rem;
		color: #FFFFFF;
	}


	
	
	.color-newred {
		color: #ff0000;
		font-size: 1.4rem;
		font-weight: bold;
	}
	
	.w594 {
		float: left;
		width: 66.67%;
		// height: 16rem;
		position: relative;
	}
	
	.w594 img {
		width: 100%;
	}
	
	.w594 .ad {
		position: absolute;
		top: 2.25rem;
		left: 2rem;
	}
	.office li{
		border-right:1px solid #eee;
	}
		.office li:nth-child(5){
			border-top: 1px solid #eee;
		}
	.officeproduct {
		float: left;
		width: 33.33%;
		text-align: center;
		// height: 16rem;
	}
	.floor ul{
		background: #fff;
		a{
			display: block;
			// height: 16rem;
		}
		
	}
	.officeproduct img {
		width:75%;
	}
	
	.floor li h6 {
		overflow: hidden;
		font-size: 1.2rem;
		white-space: nowrap;
		text-overflow: ellipsis;
		font-weight: normal;
	}
	
	 .yxzc {
		float: left;
		width: 50%;
		position: relative;
		background: #fff;
		a{
			display: block;
			// height: 115px;
			overflow: hidden;
		}
		img{
			max-width: 100%;
		}
	}
	
	.floorad .yxzc:nth-of-type(1){
		border-right: 0.05rem solid $color-border!important;
	}
	
	
	.floorad .ad h5 {
		font-size: 1.6rem;
		color: #333333;
	}
	
	.floorad .ad p {
		font-size: 1.2rem;
		color: #333333;
	}
	
	.floorad .ad span {
		font-size: 1.2rem;
		color: #333333;
	}
	
	.peripheryproduct li {
		width: 100%;
	}
	
	.peripheryproduct img {
		width: 100%;
		max-height: 100%;
	}
	
	.homeBottom {
		background-color: #f0f0f0;
		// height: 15rem;
		width: 100%;
		font-weight: 400;
		font-size: 1.2rem;
		padding-top: 3rem;
		color: #999999;
		text-align: center;
	}
	
	
	.one li {
		float: left;
		width: 33.33%;
		// height: 18.5rem;
		position: relative;
		text-align: center;
		border-top: 0.05rem solid $color-border;
		border-bottom: 0.05rem solid $color-border;
		.rx{
			position: absolute;
			left: 0;
			top: 0;
			width:2rem
		}
	}
	.one li:nth-of-type(2) {
		border-left: 0.05rem solid $color-border;
	}
	
	.one li:nth-of-type(3) {
		border-left: 0.05rem solid $color-border;
	}
	
	.one img {
		max-width: 100%;
	}
	
	.one i {
		position: absolute;
		top: 0.5rem;
		background-size: 25rem 25rem;
		left: 0.5rem;
	}
	
	.one .color-newred {
		color: #ff0000;
		height: 1.5rem;
		overflow: hidden;
	}
	
	.demo-carousel img ,	.max100 img{
		max-width: 100%;
	}
	
	.list-wrap {
		a {
			display: block;
		}
		background: #fff;
		border-top: 1px solid #eee;
		border-bottom: 1px solid #eee;
	}
	.search-wrap .icon-search{
		left: 6rem;
	}
.bg-black{
	position: fixed;
	z-index: 2;
	top: 0;
}
.side_nav_wrap{
	margin-top: 44px;
}
</style>