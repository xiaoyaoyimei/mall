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
		<button class="search-button"  @click="getList()" type="button">搜索</button>
		</div>
		 <Row type="flex" justify="space-between" class="code-row-bg">
	        <Col span="4" v-bind:class="{ active: isActive }">综合</Col>
	        <Col span="4" v-bind:class="{ active: isActive }">销量</Col>
	        <Col span="4" v-bind:class="{ active: isActive }">价格</Col>
	        <Col span="4" v-bind:class="{ active: isActive }">筛选</Col>
   	   	</Row>
   	   <!--
          	作者：1206902591@qq.com
          	时间：2018-05-22
          	描述：spin加载中
          -->
   	     <Col class="demo-spin-col" >
		   	<Scroll class='scroll scrollheight' :on-reach-bottom="handleReachBottom"  >
				<div class="product">
						<div   class="spdetail"    v-for="(item, index) in productList" :key='index'>
							<router-link :to="{ path: '/sort/sortDetail',query:{id:item.id} }">
								<img  :src='imageSrc + item.model_img'>
							   <div>	<p class="sP">{{item.model_name}}
								</p>
								<p>{{item.type_name}}</p>
								<p>
									<span v-if="item.promotionTitle !=null" class="promotion">{{item.promotionTitle}}</span>
									<span v-else></span>
								</p>
								<h6 class="sh6">{{item.sale_price}}</h6>
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
				productList:[],
				imageSrc:this.global_.imgurl,
				startRow:0,
				pageSize:10,
				keyword:'',
				spinShow:false,
				isActive:false,
			}
			
		},
		name: 'scroll-top',
		methods:{
			getList(){
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
					this.productList = res.itemsList;
					this.spinShow=false;
				})
                
			
			},
			top(){
				document.querySelector(".ivu-scroll-container").scrollTop = 0; 
			},
			handleReachBottom (dir) {
				this.startRow=this.startRow+10;
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
 @import '@/styles/color.scss';
 .promotion{
 	    border: 1px solid #d32122;
    display: inline-block;
    padding: 2px 10px;
    border-radius: 5px;
    margin-top: 5px;
    color: #d32122;
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
	min-height: 90vh;
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

</style>