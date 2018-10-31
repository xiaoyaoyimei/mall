<template>
	<div class="new">
		<div class="">
			<header class="bg-black ">
				<div>
					<i class="i icon icon-dx-back"  @click="back()"></i>
					<input placeholder="新品" @click="gosearch()" v-model="keyword">
					<i class="search icon icon-search"></i>

				</div>
			</header>
			<div class="sort">
				<span class="red">综合</span>
				<span  v-bind:class="{ active: isActive }">销量</span>
				<span  v-bind:class="{ active: isActive }">新品</span>
				<span  v-bind:class="{ active: isActive }">价格</span>
				<i class="right icon icon-xuanze"  v-bind:class="{ active: isActive }"  @click="xuanzeModal()"></i>
			</div>
			<div style='background-color:#fff;' v-if="hasShow">
				<scroll :on-reach-bottom="handleReachBottom" style="height:5rem;">
				<ul class="clearfix mylike" >
					<li v-for="(item, index) in productList" :key='index'>
						<router-link :to="{ path: '/sort/sortDetail',query:{id:item.id} }">
							<i v-if="item.promotionTitle !=null">{{item.promotionTitle}}</i>

							<img :src='item.model_img |imgfilter' alt="">
							<p class="ptitle">{{item.model_name}}</p>
							<p class="red">{{item.sale_price}}</p>
						</router-link>
					</li>
				</ul>
				<div class="jiazaicenter">{{bottomtext}}</div>
				</scroll>
			</div>
			<div class="empty_result flex-center" v-else>
				<Icon type="ios-warning" />
				<span>该区域没有符合搜索条件的产品哦,试试其他关键字~</span>
			</div>
		</div>
		<Spin size="large" fix v-if="spinShow"></Spin>
		<Modal class="filterModal" :class="{zIndex:!filterModal}"	v-model="filterModal" 	title="筛选条件" >
			<!-- <p>
				<router-link to="/index">首页</router-link> &gt;<span class="color-newred"> 全部结果</span> </p> -->
			<div class="wrap">
				<div class="dt">类型:</div>
				<div class="dd clearfix">
					<span @click="getList('catalog','',-1)" :class="{active: '-1' == catalogindex}">全部</span>
					<span v-for="(item,index) in catalog" @click="getList('catalog',item.id,index)" :class="{active: index ==catalogindex}">{{item.catalogName}}</span>
				</div>
			</div>
			<div class="wrap">
				<div class="dt">分类:</div>
				<div class="dd clearfix" >
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
				<Button   @click="reset">重置</Button>
				<Button  class="bg-dx" type="error"  @click="ok">搜索</Button>
			</div>
		</Modal>
	</div>
</template>
<script>
		// 节流函数
	const delay = (function() {
	let timer = 0;
	return function(callback, ms) {
		clearTimeout(timer);
		timer = setTimeout(callback, ms);
	};
	})();
	// 引入公共的bug，来做为中间传达的工具
	export default {
		data() {
			return {
				searchdate: '',
				spinShow: false,
				productList: [],
				startRow: 0,
				pageSize: 16,
				title: '',
				totalSize: 0,
				filterModal:false,
				catalog: [],
				type: [],
				isActive:false,
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
				catalogId:'',
				hasShow:true,//搜索有商品
				scrollheight:0,
				keyword:'',
				bottomtext:'加载更多。。。。'
			}
		},
		methods: {
				back(){
					this.$router.go(-1);
				},
				//筛选搜索
			   ok(){
				    this.startRow = 0;
					this.$axios({
						method: 'GET',
						url: '/product/search?catalog=' + this.searchfilter.catalog + '&series=' + this.searchfilter.series + '&type=' + this.searchfilter.type + '&brand=' + this.searchfilter.brand + '&startRow=' + this.startRow + '&pageSize=' + this.pageSize,
					}).then((res) => {
						this.productList = res.itemsList;
						if(this.productList.length>0){
							this.hasShow=true
						}else{
							this.hasShow=false
						}
						this.totalSize = res.total;
					})
					this.filterModal = false;
			    },
			    //筛选重置搜索条件
				reset(){
					this.catalogindex=-1;
					this.typeindex=-1;
					this.seriesindex=-1;
					this.brandindex=-1;
				},
				xuanzeModal(){
				this.filterModal = true;
				},
			//获取顶部筛选
			getParams() {
				
				this.scrollheight= document.body.offsetHeight-131;
				if(this.$route.query.type!=undefined){
				this.getList('type',this.$route.query.type,this.$route.query.typeindex)
				}
				if(this.$route.query.keyword!=undefined){
				this.keyword=this.$route.query.keyword;
				this.fetchData();
				}else{
					this.fetchData();					
				}	
			},
			async fetchData() {
				this.productList=[],
				this.startRow=0;
				const res = await this.$axios({
					url: '/product/search?keyWord='+this.keyword+'&startRow='+this.startRow+'&pageSize='+this.pageSize,
					method: 'GET',
				});
				if(res.total>0){
							this.show=false;
							this.productList = res.itemsList;
							this.totalSize=res.total;
						}else{
							this.show=true;
				}
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
					for (let index = 0; index < this.type.length; index++) {
						if(this.type[index].id == this.catalogId){
							this.type[index].red = true;
							this.typeindex = -2
						}else{
							this.type[index].red = false;
						}
						
					}
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
					for (let i = 0; i < this.type.length; i++) {
						this.type[i].red = false;
						
					}
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

			//点击header的搜索
			getTopList() {
					this.$axios({
					method: 'GET',
					url: '/product/search?keyWord=' + this.keyword + '&startRow=' + this.startRow + '&pageSize=' + this.pageSize,
				}).then((res) => {
					this.productList = res.itemsList;
						if(this.productList.length>0){
						this.hasShow=true
					}else{
						this.hasShow=false
					}
					this.totalSize = res.total;
				})
			},
			handlePage(value) {
				this.startRow = (value - 1) * this.pageSize;
				this.getList();
			},
			gosearch(){
				this.$router.push('/search'); 
			},
			handleReachBottom () {
				this.startRow=this.startRow+this.pageSize;
				let _this=this;
				if(_this.productList.length<this.totalSize){
                return new Promise(resolve => {
                    this.$axios({
						method: 'GET',
						url:'/product/search?startRow='+this.startRow+'&pageSize='+this.pageSize,
						}).then((res)=>{
							_this.productList=_this.productList.concat(res.itemsList);
						})
						resolve();
                });
                }else{
                	 this.bottomtext='没有更多了。。。。';
                	 return;
                }
            }
		},

	  watch: {
		keyword() {
			delay(() => {
				this.fetchData();
			}, 600);
		},
    },
		mounted() {
			//得到顶部分类
			this.getTop();
			//首页点击左侧分类
			this.getParams();
		},

	}
</script>

<style lang="scss" scoped="scoped">
@import '@/styles/color.scss';
.new{
	background-color: #ffffff;
}
	.bg-black{
		width: 100%;
		height: 5rem;
		background-color: #ff0000;
	}
	.bg-black .i{
		vertical-align: middle;
	}
	.bg-black div{
		padding:0.3rem 0.5rem;
		position: relative;
	}
	.bg-black input{
		width: 80%;
		// width: 25rem;
		height: 3.2rem;
		border-radius: 2.1rem;
		outline: none;
		text-align: center;
		box-shadow: none;
		font-size: 2.4rem;
		position: relative;
		top: 0.2rem;
	}
	.bg-black .search{
		position: absolute;
		top: 1rem;
		left: 7rem
	}
	.sort{
		width: 100%;
		height: 5rem;
		background-color: #f0f0f0;
		padding: 0rem 1.25rem;
	}
	.sort .red{
		background-color: #ff0000;
	}
	.sort span{
		margin-right: 0.15rem;
		display: inline-block;
		width: 6rem;
		height: 2.5rem;
		background-color: #909090;
		color: #ffffff;
		text-align: center;
		line-height: 2.5rem;
		margin-top: 1.6rem;
		border-radius: 1.5rem;
		font-size: 1.8rem;
	}
	.sort .icon-xuanze{
		float: right;
		background-size: 25rem 25rem;
		width:2.25rem;
		height: 2.25rem;
		background-position: -8.85rem -11.5rem;
		margin-top: 1.6rem;
		cursor: pointer;
	}
	.mylike{
		width: 100%;;
		min-height: 78rem;
	}
	.mylike li{
		float: left;
		width: 50%;
		padding: 1.25rem;
		text-align: center;
		border-bottom: 1px solid $color-border;
	}
	.mylike li:nth-of-type(2n+1){
		border-right: 1px solid $color-border;
	}
	.mylike li img{
		width: 10rem;
		height:10rem;
	}
	.mylike .ptitle{
		font-weight: 400;
		font-size: 1.8rem;
		text-align: center;
		color: #333;
		height: 2.5rem;
		overflow: hidden;
	}
	.mylike .red{
		font-weight: 400;
		font-size: 1.8rem;
		color: #FF0000;
		text-align: center;
	}
	.jiazaicenter{
		font-weight: 400;
		height: 10rem;
		line-height: 10rem;
		font-size: 1.8rem;
		color: #999999;
		text-align: center;
		background-color: #f0f0f0;
	}
	.filterModal{
		width: 80%;
		position: absolute;
		top:0rem;
		right: 0rem;
		min-height: 100vh;
		z-index: 1000000;
	}
	.filterModal .wrap{
		margin-top: 0.25rem;
		border-bottom: 0.05rem solid $color-border;
		margin-bottom: 1.5rem;
	}
	.zIndex{
		z-index: -1;
	}
	.filterModal .dt{
		margin-bottom: 0.9rem;
	}
	.filterModal .dd{
		margin-bottom: 0.5rem;
		margin-right: 0.5rem;
	}
	.dd span{
		float: left;
		width:49%;
		text-align: center;
		margin-bottom: 0.5rem;
		margin-right:1%;
		overflow: hidden;
		height: 2.5rem;
		line-height: 2.5rem;
		font-size:1.5rem;
	}
	.wrap .active{
		background-color: #fcd1d1;
	}
	.filterModal .Hfoot{
		text-align: center;
	}
	.filterModal .Hfoot button{
		width: 7.5rem;
		height: 2.5rem;
		line-height: 1rem;
	}
</style>
<style>
.new .ivu-scroll-container{
	height: 100rem!important;
	margin-bottom: 8rem;
	z-index: 10;
}
 .filterModal .ivu-modal{
	 width: 100%!important;
	 right:0rem;
	 top: 0rem;
	 margin: 0rem;
 }
 .filterModal .ivu-modal-content{
	 border-radius: 0rem;
 }
 .filterModal .ivu-modal-header{
	 background-color: #f0f0f0;
 }
 .filterModal .ivu-modal-header-inner{
	 color: #999999;
 }
 .filterModal .ivu-modal-wrap{
	 left:7.5rem!important;
 }
 .new .ivu-scroll-content{
	background-color: #ffffff!important;
 }
</style>
