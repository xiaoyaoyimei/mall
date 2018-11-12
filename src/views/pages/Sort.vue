<template>
	<div>
		<header class="bg-black ">
			<div class="search-wrap">
				<input @click="gosearch()" v-model.trim="keyword">
				<Icon type="ios-search" class="icon-search" />
				<span @click="xuanzeModal()">筛选<img src="../../assets/img/sx.png" class="sx"></span>
			</div>
		</header>
		<scroll class="wrapper" :data="data" :pulldown="pulldown" :pullup="pullup" @pulldown="loadData" @scrollToEnd="moreData" ref="child" v-if="hasShow" :loadingStatus='loadingStatus' :bottomTip='bottomTip'>
			<ul class="content mylike clearfix">
				<li v-for="(item, index) in data" :key='index'>
					<router-link :to="{ path: '/sort/sortDetail',query:{id:item.id} }">
						<i v-if="item.promotionTitle !=null">{{item.promotionTitle}}</i>
						<img :src='item.model_img |imgfilter' :alt="item.model_name">
						<p class="ptitle">{{item.model_no}}</p>
						<p class="red">{{item.sale_price}}</p>
					</router-link>
				</li>
			</ul>
		</scroll>
		<div class="flex-center  empty" v-if="!hasShow">
			<img src="../../assets/img/sort_empty.png">
			<p>抱歉 没有找到相关商品</p>
			<div class="try">
				<h6>您还可以尝试以下搜素:</h6>
				<ul>
					<li>电竞</li>
					<li>办公</li>
					<li>吃鸡</li>
					<li>LPL</li>
				</ul>
			</div>
		</div>

		<Spin size="large" fix v-if="spinShow"></Spin>
		<Modal class="filterModal" :class="{zIndex:!filterModal}" v-model="filterModal" title="筛选条件">
			<div class="wrap">
				<div class="dt">类型:</div>
				<div class="dd clearfix">
					<span @click="getList('catalog','',-1)" :class="{active: '-1' == catalogindex}">全部</span>
					<span v-for="(item,index) in catalog" @click="getList('catalog',item.id,index)" :class="{active: index ==catalogindex}">{{item.catalogName}}</span>
				</div>
			</div>
			<div class="wrap">
				<div class="dt">分类:</div>
				<div class="dd clearfix">
					<span @click="getList('type','',-1)" :class="{active: '-1' == typeindex}">全部</span>
					<span v-for="(item,index) in type" @click="getList('type',item.id,index)" :class="{active: index ==typeindex,routerActive:item.red}">{{item.typeName}}</span>
				</div>
			</div>
			<div class="wrap">
				<div class="dt">系列:</div>
				<div class="dd clearfix">
					<span @click="getList('series','',-1)" :class="{active: '-1' == seriesindex}">全部</span>
					<span v-for="(item,index) in series" @click="getList('series',item.id,index)" :class="{active: index == seriesindex}">{{item.seriesName}}</span></div>
			</div>
			<div class="wrap">
				<div class="dt">品牌:</div>
				<div class="dd clearfix">
					<span @click="getList('brand','',-1)" :class="{active: '-1' == brandindex}">全部</span>
					<span v-for="(item,index) in brand" @click="getList('brand',item.id,index)" :class="{active: index == brandindex}">{{item.brandName}}</span></div>
			</div>
			<div class="Hfoot" slot="footer">
				<Button @click="reset">重置</Button>
				<Button class="bg-dx" type="error" @click="ok">搜索</Button>
			</div>
		</Modal>
		<BackTop :height="100" :bottom="200">
			<div class="top">
				<Icon type="md-arrow-round-up" />
			</div>
		</BackTop>
	</div>
</template>
<script>
	import BScroll from 'better-scroll'
	import Scroll from '@/components/Scroll'
	// 引入公共的bug，来做为中间传达的工具
	export default {
		data() {
			return {
				bottomTip: '查看更多',
				loadingStatus: {
					showIcon: false,
					status: ''
				},
				data: [],
				pullup: true,
				pulldown: true,
				curPage: 0,
				searchdate: '',
				spinShow: false,
				startRow: 0,
				pageSize: 16,
				title: '',
				totalSize: 0,
				filterModal: false,
				catalog: [],
				type: [],
				isActive: false,
				series: [],
				brand: [],
				catalogindex: -1,
				typeindex: -1,
				seriesindex: -1,
				brandindex: -1,
				//顶部筛选条件
				searchfilter: {
					catalog: '',
					type: '',
					series: '',
					brand: '',
				},
				flag: true,
				catalogId: '',
				hasShow: true, //搜索有商品
				keyword: '',
				bottomtext: '',
			}
		},
		components: {
			Scroll
		},
		computed: {
			// 计算属性的 getter
			scrollheight: function() {
				// `this` 指向 vm 实例
				return document.body.clientHeight - 49
			}
		},
		created() {
			this.getParams();
		},
		methods: {
			moreData() {
				this.startRow = this.startRow + this.pageSize;
				if(this.startRow < this.totalSize) { //判断是否继续上拉刷新
					this.bottomTip = '查看更多';
					this.loadData() //获取数据方法   
				} else {
					this.bottomTip = '已经到底了';
					return false
				}
			},
			loadData() {
				this.hasMORE = false
				this.loadingStatus = {
					showIcon: true,
					status: '正在加载...'
				}
				this.$axios({
					method: 'GET',
					url: '/product/search?keyWord=' + this.keyword + '&catalog=' + this.searchfilter.catalog + '&series=' + this.searchfilter.series + '&type=' + this.searchfilter.type + '&brand=' + this.searchfilter.brand + '&startRow=' + this.startRow + '&pageSize=' + this.pageSize,
				}).then((res) => {
					var self = this;
					setTimeout(function() {
						self.loadingStatus = {
							showIcon: false,
							status: ''
						}
					}, 600);
					this.totalSize = res.total;
					this.data = this.data.concat(res.itemsList);
					if(res.total > 0) {
						this.hasShow = true;
					} else {
						this.hasShow = false;
					}
				})
			},

			//筛选重置搜索条件
			reset() {
				this.catalogindex = -1;
				this.typeindex = -1;
				this.seriesindex = -1;
				this.brandindex = -1;
				this.searchfilter.catalog = '';
				this.searchfilter.series = '';
				this.searchfilter.type = '';
				this.searchfilter.brand = ''
			},
			xuanzeModal() {
				this.filterModal = true;
			},
			//获取顶部筛选
			getParams() {
				if(this.$route.query.type != undefined) {
					this.getList('type', this.$route.query.type, 4);
				} else {
					if(this.$route.query.keyword != undefined) {
						this.keyword = this.$route.query.keyword;
					}
				}
				this.loadData();
			},

			getTop() {
				this.$axios({
					method: 'GET',
					url: '/product/catalog',
				}).then((res) => {
					this.catalog = res;
				})
				this.$axios({
					method: 'GET',
					url: '/product/brand',
				}).then((res) => {
					this.brand = res;
				})
				this.$axios({
					method: 'GET',
					url: '/product/series',
				}).then((res) => {
					this.series = res;
				})
				this.$axios({
					method: 'GET',
					url: '/product/type',
				}).then((res) => {
					this.type = res;
				})
				this.spinShow = false
			},
			//点击顶部筛选
			getList(type, value, index) {
				if(type == 'catalog') {
					this.catalogindex = index;
					this.searchfilter.catalog = value
				}
				if(type == 'type') {
					this.typeindex = index;
					this.searchfilter.type = value
				}
				if(type == 'series') {
					this.seriesindex = index;
					this.searchfilter.series = value
				}
				if(type == 'brand') {
					this.brandindex = index;
					this.searchfilter.brand = value
				}
			},
			//筛选搜索（类别）
			ok() {
				this.keyword = '';
				this.startRow = 0;
				this.data = [];
				this.$refs.child.scrollTo(0, 0)
				this.loadData();
				this.filterModal = false;
			},
			gosearch() {
				this.$router.push('/search');
			},
		},

		mounted() {
			//得到顶部分类
			this.getTop();
		},

	}
</script>

<style lang="scss" scoped="scoped">
	@import '@/styles/color.scss';
	.bg-black {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
	}
	
	.icon-xuanze {
		background-size: 25rem 25rem;
		width: 2.25rem;
		height: 2.25rem;
		background-position: -8.85rem -11.5rem;
		position: absolute;
		right: 1.5rem;
	}
	
	.mylike {
		border-top: 1px solid $color-border;
		min-height: 100vh;
	}
	
	.mylike li {
		float: left;
		width: 50%;
		text-align: center;
		border-bottom: 1px solid $color-border;
		border-right: 1px solid transparent;
		background: #fff;
		a {
			display: block;
			width: 100%;
			height: 100%;
		}
	}
	
	.mylike li:nth-of-type(2n+1) {
		border-color: $color-border;
	}
	
	.mylike li img {
		width: 100%;
		height: 100%;
	}
	
	.mylike .ptitle {
		font-weight: 400;
		font-size: 1.6rem;
		color: #333;
		height: 2.5rem;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	
	.mylike .red {
		font-size: 1.6rem;
		color: #FF0000;
		padding-bottom: 1rem;
	}
	
	.jiazaicenter {
		font-weight: 400;
		height: 10rem;
		line-height: 10rem;
		font-size: 1.8rem;
		color: #999999;
		text-align: center;
		background-color: #f0f0f0;
	}
	
	.filterModal {
		width: 80%;
		position: absolute;
		top: 0rem;
		right: 0rem;
		min-height: 100vh;
		z-index: 1000000;
	}
	
	.filterModal .wrap {
		margin-top: 0;
	}
	
	.zIndex {
		z-index: -1;
	}
	
	.filterModal .dt {
		margin-bottom: 0.9rem;
		font-weight: bold;
	}
	
	.filterModal .dd {
		margin-bottom: 0.5rem;
		margin-right: 0.5rem;
	}
	
	.dd span {
		float: left;
		width: 49%;
		text-align: center;
		margin-bottom: 0.5rem;
		margin-right: 1%;
		overflow: hidden;
		height: 2.5rem;
		line-height: 2.5rem;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	
	.wrap .active {
		background-color: #f00;
		color: #fff;
	}
	
	.filterModal .Hfoot {
		text-align: center;
	}
	
	.filterModal .Hfoot button {
		width: 7.5rem;
		height: 4rem;
		font-size: 1.6rem;
	}
	
	.try {
		width: 100%;
		padding: 1.5rem;
		h6 {
			margin-top: 2rem;
			font-size: 1.6rem;
			font-weight: normal;
			color: #111;
		}
		li {
			font-size: 1.4rem;
			background: #fff;
			padding: 0.3rem 1rem;
			border-radius: 0.5rem;
			float: left;
			margin-right: 1rem;
			margin-top: 1rem;
			color: #333;
		}
	}
	
	.search-wrap .sx {
		width: 1.6rem;
		height: 1.6rem;
	}
	
	.Hfoot {
		position: fixed;
		bottom: 10px;
	}
	
	.bottom {
		padding: 1rem;
		text-align: center;
	}
</style>
<style>
	.filterModal .ivu-modal {
		width: 100%!important;
		right: 0rem;
		top: 0rem;
		margin: 0rem;
		z-index: 10001;
	}
	
	.filterModal .ivu-modal-body {
		padding: 0;
	}
	
	.filterModal .ivu-modal {
		height: 100%;
	}
	
	.filterModal .ivu-modal-content {
		border-radius: 0rem;
		padding-bottom: 20px;
	}
	
	.filterModal .ivu-modal-header {
		background-color: #f0f0f0;
	}
	
	.filterModal .ivu-modal-header-inner {
		color: #999999;
	}
	
	.filterModal .ivu-modal-wrap {
		left: 7.5rem!important;
	}
	
	.filterModal .ivu-modal-footer {
		border-top: 0 none;
	}
	
	.wrapper {
		overflow: hidden;
		position: fixed;
		top: 44px;
		bottom: 50px;
		z-index: 1;
	}
</style>