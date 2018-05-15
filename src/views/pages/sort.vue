<template>
	<div class="sort1">
	 
	<header>
		<div class="search">
			<Icon class='search1' type="ios-search-strong"></Icon><input type="text" class="search" placeholder="搜索" v-model.trim="title" />
		</div>
	 	<Row>
		 <i-col span="24">
				<Menu mode="horizontal" :theme="theme1" active-key="1">
					<i-col span="6">
						<Menu-item name="1" key="1">
							综合
						</Menu-item>
					</i-col>
					<i-col span="6">
						<Menu-item name="2" key="2">
							最新
						</Menu-item>
					</i-col>
					<i-col span="6">
						<Menu-item name="3" key="3">
						价格
						<!-- <div>价格
							<Icon type="arrow-up-b"></Icon></div>
						<div style="position:absolute;top:10px;"><span style="opacity:0;">价格</span>	<Icon type="arrow-down-b"></Icon></div> -->
		<!-- <i-table size="small" border :columns="columns5" :data="data5"></i-table> -->
						</Menu-item>
					</i-col>
					<i-col span="6">
						<Menu-item name="4" key="4">
							销量
						</Menu-item>
					</i-col>
				</Menu>
			</i-col>
		</Row>
		</header>
		 <Scroll class='scroll' :on-reach-bottom="handleReachBottom">
		<Row class="sRow product">
		
				<Col :xs="12"  class="sMar"  :md="6"   v-for="(item, index) in productList" :key='index'>
					<router-link :to="{ path: '/sort/sortDetail' }">
						<img  :src='imageSrc + item.model_img'>
						<p class="sP">{{item.series_name}}
						</p>
						<h6 class="sh6">{{item.sale_price}}<small class="sSmall">已售68件</small></h6>
					</router-link>
				</Col>
		</Row>
		</Scroll>
		<back-top :height="0" :bottom="200">
        	<div class="top" @click="top">返回顶端</div>
    	</back-top>
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
    export default {
        data () {
            return {
				theme1: 'light',
				productList:[],
				imageSrc:this.global_.imgurl,
				startRow:1,
				pageSize:10,
				title:''
			}
			
		},
		name: 'scroll-top',
		methods:{
			getMockData () {
            },
            getTargetKeys () {

            },
            handleChange2 (newTargetKeys) {
                this.targetKeys2 = newTargetKeys;
            },
            filterMethod (data, query) {
                return data.label.indexOf(query) > -1;
            },
			getList(){
				this.$axios({
					method: 'GET',
					url:'/product/search?startRow='+this.startRow+'&pageSize='+this.pageSize,
				}).then((res)=>{
					this.productList = res.data.itemsList;
				})
			},
			top(){
				document.querySelector(".ivu-scroll-container").scrollTop = 0; 
			},
			handleReachBottom (dir) {
				this.startRow=this.startRow+10;
				console.log(this.startRow)
                return new Promise(resolve => {
                    this.$axios({
						method: 'GET',
						url:'/product/search?startRow='+this.startRow+'&pageSize='+this.pageSize,
						}).then((res)=>{
							var arr = this.productList.concat(res.data.itemsList);
							this.productList = arr;
							console.log(this.productList)
							
						})
						resolve();
                });
			},
			async fetchData(val) {
				const res = await this.$axios({
					url: '写上你的URL',
					method: 'GET',
					params: { title: this.title },
				});
				this.search = res.data.list;
			},
		},
		watch: {
		//watch title change
			title() {
			delay(() => {
				this.fetchData();
			}, 300);
			},
		},
		 mounted(){
			  this.getList();
	      }
    }
</script>

<style lang="scss">
 @import '@/styles/color.scss';
 header{
	 position:fixed;
	 top:0px;
	 left:0px;
	 z-index:10;
	 width:100%;
 }
.search{
	 width:100%;
	 height:50px;
 }
 .search input{
	 width:100%;
	 display:block;
	 margin: 0 auto;
	 height:50px;
	 padding:0px 50px ;
	font-size:30px;
 }
 .search1{
	 position:fixed;
	 top:10px;
	 left:15px;
	 font-size:30px;
 }
 .ivu-scroll-container{
	 height:700px!important;
 }
 .ivu-transfer-list-content{
	 display:none;
 }
.ivu-table-row{
	float:left;
}
// .ivu-back-top{
// 	display:block!important;
// }
.top{
        padding: 10px;
        background: rgba(0, 153, 229, .7);
        color: #fff;
        text-align: center;
        border-radius: 2px;
    }
.sRow{
	margin-top:8.5em;
}
.sMar{
	margin-top:0.2em;
	box-sizing:border-box;
	padding:0.25em;
	a{
		margin-top:-0.2em;
		box-sizing:border-box;
		width:100%;
		img{
			max-width:100%;
		}
	}
}
.sP{
	color:$color-default;
	text-align:left;
	text-indent:1.5em;
	font-size:1.2em;
	height:3em;
	line-height:1.5em;
	background-color:$color-white;
}
.sh6{
	color:$color-dx;
	text-align:left;
	text-indent:2em;
	font-size:0.8em;
	// height:1.5em;
	// line-height:1.5em;
	background-color:$color-white;
	padding-bottom:0.5em;
	overflow:hidden;
}
.sSmall{
	color:$color-gray;
	font-size:0.3em;
	font-weight:normal;
	float:right;
	padding-right:0.25em;
}
</style>