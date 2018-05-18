<template>
	<div class="sort1">
		<header>
		<div class="search">
		<Icon type="chevron-left"></Icon>	
		 <Input v-model="keyword" icon="ios-search-strong" placeholder="搜索" ></Input>
		</div>
		 <Row type="flex" justify="space-between" class="code-row-bg">
        <Col span="4">综合</Col>
        <Col span="4">销量</Col>
        <Col span="4">价格</Col>
        <Col span="4">筛选</Col>
    </Row>
		<!--<ul class="sort-ul"><li>综合</li><li>销量</li><li>价格</li></ul>-->
		</header>
		 <Scroll class='scroll' :on-reach-bottom="handleReachBottom" :height='600'>
		<Row class="sRow product">
				<Col :xs="12"  class="sMar"  :md="6"   v-for="(item, index) in productList" :key='index'>
					<router-link :to="{ path: '/sort/sortDetail',query:{id:item.id} }">
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
				keyword:''
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
					url:'/product/search?keyword='+this.keyword+'&startRow='+this.startRow+'&pageSize='+this.pageSize,
				}).then((res)=>{
					this.productList = res.itemsList;
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
							var arr = this.productList.concat(res.itemsList);
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
				this.search = res.list;
			},
		},
		watch: {
		//watch title change
			title() {
			delay(() => {
				this.fetchData();
			}, 600);
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
	 height:32px;
	 display: flex;
	 padding:5px;
	 margin-bottom: 10px;
 }
 .search >i{
 	margin:10px 10px 0 0;
 	cursor: pointer;
 }
 .search input{
	 width:100%;
	 display:block;
	 margin: 0 auto;
	 height:32px;
 }
.scroll {
	position: relative;
	top:75px;
	min-height: 90vh;
}
.code-row-bg{
	background: #fff;
	padding: 8px 0;
	text-align: center;
}
.top{
        padding: 10px;
        background: rgba(0, 153, 229, .7);
        color: #fff;
        text-align: center;
        border-radius: 2px;
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