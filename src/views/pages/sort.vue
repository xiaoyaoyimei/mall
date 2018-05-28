<template>
	<div class="sort1 ">
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
            	scrollHeight:500,
				productList:[],
				imageSrc:this.global_.imgurl,
				startRow:0,
				pageSize:10,
				keyword:'',
				spinShow:false,
				isActive:false,
				show:false
			}
			
		},
		name: 'scroll-top',
		methods:{
			getList(){
				this.scrollHeight=window.screen.height;
				this.spinShow=true;
				 let routerParams = this.$route.params.keyword;
				  this.productList=[];
                // 将数据放在当前组件的数据内
                if(routerParams!=""&&routerParams!=undefined){
                 this.keyword = routerParams;
                }
      
                	  	this.$axios({
					method: 'GET',
					url:'/product/search?keyword='+this.keyword+'&startRow='+this.startRow+'&pageSize='+this.pageSize,
				}).then((res)=>{
					if(res.total>0){
					this.productList = res.itemsList;
					this.spinShow=false;
					this.show=false;
					}
					else{
						this.show=true;
					}
				})
                
			
			},
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
			  this.getList();
	      }
    }
</script>

<style lang="scss" scoped="scoped">
 .promotion{
 	    border: 1px solid #f48940;
    display: inline-block;
    padding: 0.2rem 0.5rem;
    border-radius: 0.5rem;
    margin-top: 5px;
    color: #f48940;
    font-size: 1.4rem;
 }
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

</style>