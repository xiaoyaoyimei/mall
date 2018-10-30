<template>
	<div class="sort1 ">
	     <div class="m_header_bar">
			<router-link to="/index"  class="m_header_bar_back">
				<Icon type="ios-arrow-back"></Icon>
		    </router-link>
			<span class="m_header_bar_title">	
				<div class="new-search"> 	
					<img src="../../assets/img/search.png" > 
					<input   placeholder="请输入关键字搜索"  v-model="keyword" @click="gosearch()" type="text"></input>
				</div>
				
			</span>
				<Icon :type="styleshow?'android-menu':'android-apps'"  class="m_header_bar_menu"  @click.native="toggle()"></Icon>
			</div>
		 <Row type="flex" justify="space-between" class="code-row-bg">
	        <Col span="4" v-bind:class="{ active: isActive }">综合</Col>
	        <Col span="4" v-bind:class="{ active: isActive }">销量</Col>
	        <Col span="4" v-bind:class="{ active: isActive }">价格</Col>
	        <Col span="4" v-bind:class="{ active: isActive }"  @click.native="filterModal = true">筛选</Col>
   	   	</Row>
   	   	   <div class="flex-center" v-if="show">
   	   	   	<img src="../../assets/img/search_0.png">
   	   	   		<span class="font-15 mt15">没有符合该搜索条件的商品,请重新检索</span>
   	   	   	</div>
   	     <Col class="demo-spin-col"  v-else  style="top:82px">
		    	<Scroll class='scroll' :on-reach-bottom="handleReachBottom"  :height='scrollheight' >
					 <div  ref="con" :class="styleshow?'product':'column-style'">
						<div   class="spdetail"    v-for="(item, index) in productList" :key='index'>
							<router-link :to="{ path: '/sort/sortDetail',query:{id:item.id} }">
								<img  :src='imageSrc + item.model_img'>
							     <div class="right">	<p class="sP">{{item.model_name}}
								</p>
								<p class="font-14">{{item.model_no}}</p>
								<p >
									<span v-if="item.promotionTitle !=null" class="promotion">{{item.promotionTitle}}</span>
									<span v-else></span>
								</p>
								<p class="sh6">{{item.sale_price}}</p>
								</div>
							</router-link>
						</div>
					</div>
					<div class="center">{{bottomtext}}</div>
			  </Scroll>
		      <Spin fix size="large" v-if="spinShow">
                <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
                <div>Loading</div>
            </Spin>
		</Col>
			<Modal	v-model="filterModal"	title="筛选条件" >
				<div class="filter-tj">	
					<dl><dt>类型</dt><dd @click="selected(-1,'','catalog')" :class="{active: catalogindex == '-1'}">全部</dd>
						<dd  v-for="(item,index) in catalog"   @click="selected(index,item.catalogName,'catalog')" :class="{active: catalogindex ==index}">{{item.catalogName}}</dd></dl>
					<dl><dt>分类</dt><dd @click="selected(-1,'','type')" :class="{active: typeindex == '-1'}">全部</dd>
						<dd v-for="(item,index) in type" @click="selected(index,item.typeName,'type')" :class="{active: typeindex ==index}">{{item.typeName}}</dd></dl>
					<dl><dt>系列</dt><dd @click="selected(-1,'','series')" :class="{active: seriesindex == '-1'}">全部</dd>
						<dd v-for="(item,index) in series" @click="selected(index,item.seriesName,'series')" :class="{active: seriesindex ==index}">{{item.seriesName}}</dd></dl>
					<dl><dt>品牌</dt><dd @click="selected(-1,'','brand')" :class="{active: brandindex == '-1'}">全部</dd>
					<dd v-for="(item,index) in brand" @click="selected(index,item.brandName,'brand')" :class="{active: brandindex ==index}">{{item.brandName}}</dd></dl>
				</div>
				    <div slot="footer">
               <Button   @click="reset">重置</Button>
               <Button  class="bg-dx"   @click="ok">搜索</Button>
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
    export default {
        data () {
            return {
            	//总条数，控制是否再次请求后台数据
            	totalSize:0,
            	bottomtext:'',
				filterModal:false,
				productList:[],
				imageSrc:this.global_.imgurl,
				startRow:0,
				pageSize:10,
				keyword:'',
				spinShow:false,
				isActive:false,
				show:false,
				catalog:[],
                type:[],
                series:[],
                brand:[],
			    searchfilter:{
                	catalog:'',
                	type:'',
               		series:'',
                	brand:'',
                },
                catalogindex:-1,
                typeindex:-1,
                seriesindex:-1,
                brandindex:-1,
                scrollheight:0,
                styleshow:true,
			}
		},
		methods:{
			toggle(){
				this.styleshow=!this.styleshow;		
			},
			selected(i,value,t){
				if(t=='catalog'){
					this.catalogindex=i;
					this.searchfilter.catalog=value;
				}else if(t=='type'){
					this.typeindex=i;
					this.searchfilter.type=value;
				}else if(t=='series'){
					this.seriesindex=i;
					this.searchfilter.series=value;
				}else{
					this.brandindex=i;
					this.searchfilter.brand=value;
				}
			},
			//筛选搜索
			   ok(){
					this.getList();
					this.filterModal = false;
			    },
			    //筛选重置搜索条件
				reset(){
					this.catalogindex=-1;
					this.typeindex=-1;
					this.seriesindex=-1;
					this.brandindex=-1;
				},
			   getParams () {
			     	this.scrollheight= document.body.offsetHeight-131;
				  	 if(this.$route.query.type!=undefined){
				        this.getList('type',this.$route.query.type,this.$route.query.typeindex)
				       }
				  	  if(this.$route.query.keyword!=undefined){
				  	  	this.keyword=this.$route.query.keyword;
				        this.fetchData();
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
            getList(){
            		this.productList=[],
            		this.startRow=0;
	                this.$axios({
						method: 'GET',
						url:'/product/search?catalog='+this.searchfilter.catalog+'&series='+this.searchfilter.series+'&type='+this.searchfilter.type+'&brand='+this.searchfilter.brand+'&startRow='+this.startRow+'&pageSize='+this.pageSize,
					}).then((res)=>{
							this.searchfilter.catalog='';
							this.searchfilter.series='';
							this.searchfilter.type='';
							this.searchfilter.brand='';
							this.catalogindex=-1;
							this.typeindex=-1;
							this.seriesindex=-1;
							this.brandindex=-1;
						if(res.total>0){
							this.show=false;
							this.productList = res.itemsList;
							this.totalSize=res.total;
						}else{
							this.show=true;
						}
					})
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
                	 this.bottomtext='没有更多了';
                	 return;
                }
              
			},
				gosearch(){
        		this.$router.push('/search');  
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
				this.getTop();
	      }
    }
</script>

<style lang="scss" scoped="scoped">
.m_header_bar{
	position: fixed;
	width: 100%;
}
.code-row-bg{
	position: fixed;
	top: 44px;
	width: 100%;
	border-bottom: 1px solid #ccc;
}
.m_header_bar .m_header_bar_menu{
	font-size: 2.8rem;
}
.new-search{
	position: relative;
	img{
		width: 1.8rem;
		height: 1.8rem;
		position: absolute;
		left: 1rem;
		top:1.2rem;
	}
	input{
		height: 32px;
		line-height: 32px;
		width: 100%;
		padding-left: 3rem;
		font-size: 1.4rem;
	}
}
.scroll{
	  height: calc(100vh - 131px);     
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
.bg-dx{
	background: #0099ff;
	color:#fff;
	border-color:#0099ff;
}
.filter-tj  dt{
	margin-bottom: 0.5rem;
	font-size: 1.6rem;
}
.filter-tj dd{
	display: inline-block;
    margin-right: 10px;
    border: 1px solid #ccc;
    padding: 0.5rem;
    margin-bottom: 1rem;
    font-size: 1.4rem;
    cursor: pointer;
}
.filter-tj dd.active{
	border-color:#0099ff;
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
