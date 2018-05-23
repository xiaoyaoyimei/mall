<template>
	<div class="index">
		<div class="header-home-wrapper home-box ">
			<div class="SearchBarWrapper ">
				<div class="search">
				<img src="../../assets/img/search.png" class="search-form-icon">
				<div class="inputwrap" @click="gosearch()">
				 <input   placeholder="搜索" class="search-form-input"></input>
				 </div>
				</div>
		    </div>
		<router-link :to="{path: '/login'}" tag="span" class="m_header_bar_menu"  v-if="loginflag">登录</router-link>
		</div>
		<Carousel  v-model="value3" :autoplay="setting.autoplay"    :autoplay-speed="setting.autoplaySpeed"
        :dots="setting.dots"  :radius-dot="setting.radiusDot"  :trigger="setting.trigger" :arrow="setting.arrow">
        	<CarouselItem  v-for="(item, index) in Items"  :key="index">
           		 	<div class="demo-carousel"><img :src="imageSrc+item.phoneUrl"></div>
        	</CarouselItem>
    	</Carousel>
        <ul class="ad-list">
  		 <li v-for="(item,index) in aditems" :key="index" >
    			 <router-link :to="{name: '/typesort',params:{type:child.linkUrl}}" tag="span" v-for="(child,index) in item.list"  :key="index">	
    			 	<img  :src="imageSrc+child.imgUrl"  :width="child.proportion | baifenhao" >
    				</router-link>
    			</li>			
    	</ul>
    	<div class="newpd">
    		<router-link :to="{path: '/newchannel'}"   >
    			<img src="../../assets/img/xppd.jpg" >
    				  </router-link>
    			<img src="../../assets/img/xstq.jpg">
    	  </div>
    	  <span class="xptj">为你推荐</span>
    	<Row  class="goodslist">
				<Col  :xs="12"  :md="6"  v-for="(item,index) in proList" :key="index">
					<label>{{item.promotionTitle}}</label>
					<router-link  tag="a" :title='item.model_name' :to="{ path: '/sort/sortDetail',query:{id:item.id} }"><img  :src='item.model_img |imgfilter'>
					<span>{{item.model_name}}</span>
					<h4 >￥{{item.sale_price}}</h4>
					</router-link>
				</Col>
			</Row>
    	  
	</div>
</template>

<script>
	export default {
        data () {
            return {
                value3: 0,
                imageSrc:this.global_.imgurl,
                loginflag:true,
                setting: {
                    autoplay: false,
                    autoplaySpeed: 2000,
                    dots: 'inside',
                    radiusDot: false,
                    trigger: 'click',
                    arrow: 'hover'
                },
                Items:[],
                aditems:[],
                productNew:[],
                proList:[]
                
            }
        },
        filters:{
        	baifenhao(val){
        		return val+'%'
        	}
        },
        methods: {
        	gosearch(){
        		this.$router.push('/sort');  
        	},
    	     getBanner(){
    	     	//判断是否已经登录
    	     	 if(localStorage.getItem("token")!=undefined&&localStorage.getItem("token")!=""){
    	     	 	this.loginflag=false;
    	     	 }
    	      		  	this.$axios({
						    method: 'GET',
						    url:'/index/poster',
						}).then((res)=>{
							if(res.code=='200'){
							 this.Items=res.object;
							}
						});
							this.$axios({
						    method: 'GET',
						    url:'/index/advert',
						}).then((res)=>{
							if(res.code=='200'){
							 this.aditems=res.object;
							}
						});
								this.$axios({
						    method: 'GET',
						    url:'/index/index/product',
						}).then((res)=>{
							if(res.code=='200'){
							 this.proList=res.object;
							}
						});
						
    	      	},
    	  
    	},
        mounted() {
			this.getBanner();
		}
        }
</script>

<style lang="scss"  scoped="scoped">
 @import '@/styles/color.scss';
 .index img{
 	max-width: 100%;
 }
 .m_header_bar_menu{
 	position: absolute;
    right: 8px;
    top: 10px;
    color: #fff;
    cursor: pointer;
 }
  .newpd {
  	overflow: hidden;
  	margin-bottom: 10px;
  }
 .newpd img{
 	width: 50%;
 	cursor: pointer;
 	float: left;
 }
  header{
	 position:fixed;
	 top:0px;
	 left:0px;
	 z-index:10;
	 width:100%;
 }
.xptj{
	color:$color-dx;
	text-align: center;
	padding: 0.5rem;
	display: block;
	letter-spacing:1rem;
	font-size: 1.6rem;
}
.activity-title{
	text-align: center;
	background: #fff;
	padding: 20px 0;
	h6{
		margin-top:10px;
		color:$color-gray;
		font-weight: 100;
	}
}
			.floor{ 
				margin-top:10px;
				background: #fff;
			   .goodslist div{
				padding:10px;
				}
				p{
					margin-top:8px;
					margin-bottom:8px;
				}
				h3{
				padding:10px 0;
				border-top:1px solid #eee;
				border-bottom:1px solid #eee;
					a{
						float: right;
						margin-right: 15px;
						color:$color-dx;
					}
			}
			}
		@media screen and (max-width: 767px) {
			.index {
			 .series{ 
		    	img{
		        	max-width:70px;
		   		 }
				}
			}
}
</style>
<style>
	.ivu-input{
		background: rgba(255,255,255,0.5)!important;
	}
</style>