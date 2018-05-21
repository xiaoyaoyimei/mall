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
    			 <router-link :to="{name: '/sort',params:{keyword:child.linkUrl}}" tag="span" v-for="(child,index) in item.list"  :key="index">	
    			 	<img  :src="imageSrc+child.imgUrl"  :width="child.proportion | baifenhao" >
    				</router-link>
    			</li>			
    	</ul>
    	<div class="newpd">
    		<img src="../../assets/img/xppd.jpg"><img src="../../assets/img/xstq.jpg"></div>
    	<div class="activity-title">
    		<h2>618 瑞家节</h2>
    		<h6>预定抢半价    椅子超低价</h6>
    	</div>
     	<!--<div class="floor">
       		<h3><a href="#">更多></a><img src=""新品系列</h3>
	   		<Row  class="goodslist">
				<Col  :xs="12"  :md="6"  v-for="(item,index) in productNew" :key="index">
							<img  :src='imageSrc + item.model_img'>
						<a title="迪锐克斯（DXRACER）F01电脑椅子 可转办公椅 人体工学椅 电竞椅 红黑 游戏椅子">{{item.model_name}}</a>
						<h4 class="color-dx">￥{{item.sale_price}}</h4>
				</Col>
			</Row>
	    </div>-->
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
                productNew:[]
                
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
    	     	 if(sessionStorage.getItem("token")!=undefined&&sessionStorage.getItem("token")!=""){
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
						    url:'/index/product/new',
						}).then((res)=>{
							if(res.code=='200'){
							 this.productNew=res.object;
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
 .newpd img{
 	width: 50%;
 	cursor: pointer;
 }
  header{
	 position:fixed;
	 top:0px;
	 left:0px;
	 z-index:10;
	 width:100%;
 }
  /*.ad-list{
  	display: flex;
  }*/
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