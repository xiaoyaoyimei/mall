<template>
	<div class="sort1 ">
		  <!--<button v-on:click="tshow = !tshow">
    Toggle
  </button>
  <transition name="fade">
    <p v-if="tshow">hello</p>
  </transition>-->
		<div class="header-home-wrapper sort-box">
		    <router-link to="/index"  class="icon-back">
				<Icon type="ios-arrow-back"></Icon>
		    </router-link>
		<div class="SearchBarWrapper">
		<div class="search">
		<img src="../../assets/img/search.png" class="search-form-icon">
		<div class="inputwrap">
		 <input   placeholder="搜索" class="search-form-input" v-model="keyword"></input>
		 </div>
		</div>
		</div>
		<span class="search-button"  @click="getList()" >搜索</span>
		</div>
		 <Row type="flex" justify="space-between" class="code-row-bg">
	        <Col span="4" v-bind:class="{ active: isActive }">综合</Col>
	        <Col span="4" v-bind:class="{ active: isActive }">销量</Col>
	        <Col span="4" v-bind:class="{ active: isActive }">价格</Col>
	        <Col span="4" v-bind:class="{ active: isActive }">筛选</Col>
   	   	</Row>
   	   	     <div class="center" v-if="show">抱歉，没有找到商品</div>
   	   <!--
          	作者：1206902591@qq.com
          	时间：2018-05-22
          	描述：spin加载中
          -->
     
   	     <Col class="demo-spin-col"  v-else>
		   	<Scroll class='scroll' :on-reach-bottom="handleReachBottom"  :height='scrollHeight'>
				<div class="product" ref="con">
						<div   class="spdetail"    v-for="(item, index) in productList" :key='index'>
							<router-link :to="{ path: '/sort/sortDetail',query:{id:item.id} }">
								<img  :src='imageSrc + item.model_img'>
							   <div class="right">	<p class="sP">{{item.model_name}}
								</p>
								<p class="font-14">{{item.type_name}}</p>
								<p >
									<span v-if="item.promotionTitle !=null" class="promotion">{{item.promotionTitle}}</span>
									<span v-else></span>
								</p>
								<p class="sh6">{{item.sale_price}}</p>
								</div>
							</router-link>
						</div>
				</div>
			</Scroll>
		      <Spin fix size="large" v-if="spinShow">
                <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
                <div>Loading</div>
            </Spin>
		</Col>
		<back-top :height="50" :bottom="100">
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
            	tshow:true,
            	scrollHeight:500,
				productList:[],
				imageSrc:this.global_.imgurl,
				startRow:0,
				pageSize:10,
				keyword:'',
				spinShow:false,
				isActive:false,
				show:false,
				    searchfilter:{
                	catalog:'',
                	type:'',
               		series:'',
                	brand:'',
                },
				
			}
			
		},
		name: 'scroll-top',
		methods:{
						  getParams () {
			  	if(this.$route.query.typeid!=undefined){
			        this.getList('type',this.$route.query.typeid,this.$route.query.typeindex)
			       }
		      },
            getTop(){
            	this.$axios({
					method: 'GET',
					url:'/product/catalog',
				}).then((res)=>{
					this.catalog = res;
				})
            	   this.$axios({
					method: 'GET',
					url:'/product/brand',
				}).then((res)=>{
					this.brand = res;
				})
				  this.$axios({
					method: 'GET',
					url:'/product/series',
				}).then((res)=>{
					this.series = res;
				})
				  this.$axios({
					method: 'GET',
					url:'/product/type',
				}).then((res)=>{
					this.type = res;
				})
				this.spinShow=false
            },
            	getList(type,value,index){
            		this.scrollHeight=window.screen.height;
				if(type=='catalog'){
					this.catalogindex=index;
					this.searchfilter.catalog=value
				}
				if(type=='type'){
					this.typeindex=index;
					this.searchfilter.type=value
				}
				if(type=='series'){
					this.seriesindex=index;
					this.searchfilter.series=value
				}
				if(type=='brand'){
					this.brandindex=index;
					this.searchfilter.brand=value
				}
                this.$axios({
					method: 'GET',
					url:'/product/search?catalog='+this.searchfilter.catalog+'&series='+this.searchfilter.series+'&type='+this.searchfilter.type+'&brand='+this.searchfilter.brand+'&startRow='+this.startRow+'&pageSize='+this.pageSize,
				}).then((res)=>{
					if(res.total>0){
					this.productList = res.itemsList;
					this.totalSize=res.total;
					}
				})
			},
//			getList(){
//				this.scrollHeight=window.screen.height;
//				this.spinShow=true;
//				 let routerParams = this.$route.params.keyword;
//				  this.productList=[];
//              // 将数据放在当前组件的数据内
//              if(routerParams!=""&&routerParams!=undefined){
//               this.keyword = routerParams;
//              }
//    
//              	  	this.$axios({
//					method: 'GET',
//					url:'/product/search?keyword='+this.keyword+'&startRow='+this.startRow+'&pageSize='+this.pageSize,
//				}).then((res)=>{
//					if(res.total>0){
//					this.productList = res.itemsList;
//					this.spinShow=false;
//					this.show=false;
//					}
//					else{
//						this.show=true;
//					}
//				})
//              
//			
//			},
			top(){
				document.querySelector(".ivu-scroll-container").scrollTop = 0; 
			},
			handleReachBottom (dir) {
				this.startRow=this.startRow+this.pageSize;
                return new Promise(resolve => {
                    this.$axios({
						method: 'GET',
						url:'/product/search?startRow='+this.startRow+'&pageSize='+this.pageSize,
						}).then((res)=>{
							var arr = this.productList.concat(res.itemsList);
							this.productList = arr;
						})
						resolve();
                });
			},
				async fetchData(val) {
				const res = await this.$axios({
					url: '/product/search?keyword='+this.keyword+'&startRow='+this.startRow+'&pageSize='+this.pageSize,
					method: 'GET',
				});
				this.productList = res.itemsList;
			},
		},
		watch: {
		//watch title change
			keyword() {
			delay(() => {
				this.fetchData();
			}, 600);
			},
		},
		 mounted(){
		 	this.getParams();
			  this.getList();
	      }
    }
</script>

<style lang="scss" scoped="scoped">

 header{
	 position:fixed;
	 top:0px;
	 left:0px;
	 z-index:10;
	 width:100%;
 }
.scroll {
	position: relative;
	height: 600px;
}
.code-row-bg{
	background: #fff;
	padding: 0.8rem 0;
	text-align: center;
	color:#333;
	font-size: 1.4rem;
	div{
		cursor: pointer;
	}
}
.top{
	   padding: 1rem;
        background: rgba(0, 153, 229, .7);
        color: #fff;
        text-align: center;
        border-radius: 0.2rem;
}
.center{
	margin: 3rem 0;
	text-align: center;
}


.fade-enter-active, .fade-leave-active {
  transition: background .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active 在低于版本 2.1.8 中 */ {
  background:red;
}
.fade-enter-to,fade-leave{
	  background: blue;
}
</style>