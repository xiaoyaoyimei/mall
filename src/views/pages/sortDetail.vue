<template>
<div>
		<div class="sortDetail">
			<router-link to="/sort" tag='span' class='back'> <Icon type="ios-arrow-left"></Icon></router-link>
					<div class="video-wrap" >
						<div  ref="video-wrap"  v-show=" 0== num"  class="video-height">
								<div  v-show="videoshow" class="video">
								  <iframe  ref="video" frameborder=0 allowfullscreen ></iframe>  
						    </div>
						</div>
					<div v-show=" 1== num"  class="swiper" >
					<wc-swiper  v-if="shangp.productImageList.length" :autoplay='false'>
					   <wc-slide v-for="(item, index) in shangp.productImageList" :key="index">
					  	<img :src="item.listImg |imgfilter">
					   </wc-slide>
					</wc-swiper>
					</div>
					<div class="controls">
						<button :class="num==1?'active':''" @click="toggletab(1)">图片</button>
						<button  v-show="videoshow" :class="num==0?'active':''" @click="toggletab(0)">视频</button></div>
					</div>
				
	    		<div class="xiangqiang">
	    		<div>{{shangp.product.modelName}}</div>
	    	   <strong><label class="price">￥{{shangp.product.salePrice | pricefilter}}</label></strong>
	    	</div>
	    	<div class="choose" @click="modal2 = true">
	    		<span>选择规格<i v-if="!xiajia">{{bigchoose}}</i></span>
	    		<Icon type="ios-more"></Icon>
	    	</div>
	    </div>
	       <Tabs class="spjs">
	        <TabPane label="商品介绍">
	        	<ul><li v-for="(item, index) in productimg"  :key="index"><img :src="item.imgUrl |imgfilter"></li></ul>
	        </TabPane>
	        <TabPane label="规格参数" >
	        		<ul class="gk">
	        			<li v-for="(item, index) in productDesc"  :key="index">
	        			<span class="title">{{item.attrCode}}:</span> <span class="neirong">{{item.attrValue}}</span></li></ul>
	        </TabPane>
	    </Tabs>
	    <div class="foot"> 
	    	<button     @click="modal2 = true" class="jrgwc">加入购物车</button>
	    	<router-link :to="{ path: '/cart' }" class="cart">    <Icon type="android-cart"></Icon>购物车</router-link>
	    </div>
       	<!--弹窗选择商品尺寸颜色-->
    	 <Modal v-model="modal2"  class="chooseModal cartModal" :mask-closable="false">
         <div slot="header" >
         	 <div v-if="xiajia" class="xiajia">
         	 	<Icon type="information-circled"></Icon>该商品已下架
         	 </div>
       	 <div v-if="!xiajia&&!firstshow" class="xiajia">
       	 	<Icon type="information-circled"></Icon>请选择商品 
         	 </div>
            <div  v-if="firstshow" class='chooseproduct'>
             	<img :src="choosesp.img |imgfilter">
             	<div class="small-xq"><strong>￥{{choosesp.price | pricefilter}}</strong>
             		商品编号:{{choosesp.itemNo}}
             	<em>库存:{{choosesp.kucun}}</em> 
             	<!--促销-->
             	<span class="cx" v-if="cxshow">
             		<strong>￥{{choosesp.cuxiaoprice}}</strong>
             		<label>{{choosesp.activityName}}</label>
             		</span>
             	</div>
            </div>
         </div>
        <dl v-for="(item, index) in shangp.productAttrList"  :key="index">
          <dt>{{item.attrKey.catalogAttrValue}}</dt>
          <dd v-for="(child, index) in item.attrValues"  :key="index" @click="chooseSP($event,item,child)"   ref="dditem" :title="child.id">
          	{{child.modelAttrValue}}
          </dd>
        </dl>
        <div>
        	<p>数量</p>
        		<div class="min-add">
			    	<Icon type="minus-round" @click.native="jian()" class="min"></Icon>
			     	<input class="text-box" name="pricenum"  type="tel" v-model="quantity" v-on:blur="changeNumber($event)" placeholder="数量" data-max="50" />
			 		 <Icon type="plus-round" @click.native="jia()" class="add"></Icon>
				</div>
		</div>
        <div slot="footer">
        	<Button v-if="kucunshow" size="large"   long  disabled="disabled">暂时无货，到货通知</Button>
            <Button  size="large"   long  disabled="disabled" v-if="xiajia">该商品已下架</Button>
            <Button  size="large"  long  @click="atc" class="btn-dx"  v-if="!xiajia&&!kucunshow">加入购物车</Button>
        </div>
    </Modal>
    </div>
</template>
<script>
    	export default {
        data () {
            return {
            	//库存是否为0添加购物车显示按钮
            	num:1,
            	kucunshow:false,
            	videoshow:false,
            	xiajia:false,
            	firstshow:false,
            	selectedId:-1,
            	modal2: false,
            	//商品最原始数据
            	oldshangp:{
            		product:{},
            		promotions:[],
            		productImageList:[],
            		productItemList:[],
            		inventory:[],
            		productAttrList:[],
            	},
            	//请求product之后的商品数据
            	shangp:{
            		product:{salePrice:0},
            		promotions:[],
            		productImageList:[],
            		productItemList:[],
            		inventory:[],
            		productAttrList:[],
            	},
            	productDesc:[],
            	productimg:[],
            	bigchoose:'',
            	cxshow:false,
            	choosesp:{
            		img:'',
            		itemNo:'',
            		price:'',
            		cuxiaoprice:'',
            		activityName:'',
            		startTime:'',
            		endTime:'',
            		kucun:'',
            	},
            	productItemId:'',
            	quantity:1,
            	max:100,
            	productId:'',
            }
        },
          methods: {
          	        	//切换num的值切换支付方式
		        	toggletab(num){
		        		this.num=num;
		        		if(this.num==0){
		        			this.$refs.video.src = 'http://player.youku.com/embed/' + this.shangp.product.video;
		        			this.$refs.video.flashvars ="isAutoPlay=true";
		        		}
		        	},
		          	    changeNumber: function(event){
						var obj=event.target;
						 let n = /^[1-9]\d*$/; 
				        if(!n.test(obj)){
				            this.$Message.warning('商品数量须大于0个，请输入正整数');
				            obj.value=1
				            return ;
				        }
						this.quantity = parseInt(obj.value);
					},
					//添加
					jia:function(){
						if(this.quantity>=this.max){
						this.quantity=this.max
						}else{
						this.quantity=parseInt(this.quantity)+1; 
						  }
					},
					//减
					jian:function(){
						if(this.quantity==1){
						this.quantity==1
						}else{
						this.quantity=parseInt(this.quantity)-1; 
						}
					},
          	//加入购物车
          	   atc () {
                 if(this.productItemId==""){
                 	this.$Message.error('请选择商品属性');
                 	return ;
                 }
	                if(localStorage.getItem('token')!=null&&localStorage.getItem('token')!=undefined){
	                	this.$axios({
								    method: 'post',
								    url:'/order/shopping/add',
								    data:{
								    	productItemId:this.productItemId,
								    	quantity:this.quantity
								    }
									}).then((res)=>{
										if(res.code=='200'){
											this.$router.push('/cart')  
										}
										else{
											this.$Message.error(res.msg);
											return ;
										}
							})
						}else{
							this.$router.push({  path: '/login', query: {redirect: this.$route.fullPath} })  
						}
            	},
            	//选择商品
            	chooseSP(e,pa,ch){
            		this.kucunshow=false;
            		this.cxshow=false;
            		var chooseId="",jishu=0;
       	            let  p=e.target.parentNode.children;
       	            for(let i =1;i<p.length;i++) {
       	            	p[i].className="";
					}
       	            //商品属性高亮
       	             e.target.className="active"; 
            		let dditem=this.$refs['dditem'];
            		 this.bigchoose="";
            		for(let n=0;n<dditem.length;n++){
            			if(dditem[n].getAttribute("class")=='active'){
            				chooseId+=dditem[n].getAttribute("title")+',';
            				this.bigchoose +=dditem[n].innerHTML+',';
            				jishu++
            			}
            		}
            		//显示促销信息
            		if(this.shangp.promotions)
            		//商品详情页已选显示
            	   chooseId=(chooseId.slice(chooseId.length-1)==',')?chooseId.slice(0,-1):chooseId;
            	   this.bigchoose=(this.bigchoose.slice(this.bigchoose.length-1)==',')?this.bigchoose.slice(0,-1):this.bigchoose;
            	   var flag= false;
            	   //只有选择完属性才可以 读出选中商品的促销价格+促销类目
            	   if(jishu==this.shangp.productAttrList.length){
            	   	//通过选择属性读出productItemId
            	   	    for (let chooseItem of this.shangp.productItemList) {
							   if(chooseItem.productModelAttrs==chooseId){
							   	this.choosesp.img=chooseItem.listImg;
							   	this.choosesp.itemNo=chooseItem.itemNo,
							   	this.choosesp.price=chooseItem.salePrice,
							   	this.productItemId=chooseItem.id;
							   	if(this.shangp.promotions.length>0){
							   		 for (let cxitem of this.shangp.promotions) {
				            	   	 	if(cxitem.productItemId==this.productItemId){
				            	   	 		this.cxshow=true;
				            	   	 		this.choosesp.cuxiaoprice=cxitem.onSalePrice;
				            	   	 		this.choosesp.activityName=cxitem.activityName;
				            	   	 		this.choosesp.startTime=cxitem.startTime;
				            	   	 		this.choosesp.endTime=cxitem.endTime;
				            	   	 	}
				            	   	 }
							   		}
							   	flag= true;
							   	break;
							   }else{
							   		flag= false
							   }

							}
            	   	    if(flag == false){
            	   	    	this.choosesp.itemNo="";
            	   	    	this.choosesp.price="";
            	   	    	this.xiajia=true
            	   	    	this.firstshow=false
            	   	    }else{
            	   	    	this.xiajia=false;
            	   	    	this.firstshow=true
            	   	    }
            	   }
            	    //计算库存（库存需大于0才显示）
            	   if(this.shangp.inventory.length>0){
              						for(let kucunitem of this.shangp.inventory){
							   	      if(kucunitem.skuId==this.productItemId){
							   	      	 this.choosesp.kucun=kucunitem.quantity-kucunitem.lockQuantity
							   	      }
							       }
              					}
              						if(this.choosesp.kucun<=0){
              							this.kucunshow=true;
              						}
            	},
    	      	getParams () {
	       			 // 取到路由带过来的参数 
			        let routerParams = this.$route.query.id
			        this.productId=routerParams;
			    },
			     getProduct(){
			     	let _this=this;
			     	_this.videoshow=false;
			     		this.$axios({
							    method: 'post',
							    url:'/product/'+this.productId,
								}).then((res)=>{
									if(res.code=='200'){
										this.shangp= Object.assign({},this.oldshangp,res.object);
										 if(res.object.product.video!=""){
										 	_this.videoshow=true;
										 	_this.$refs['video-wrap'].style.width=window.innerWidth+'px';
										    _this.$refs['video-wrap'].style.height=	window.innerWidth+'px';
										    _this.$refs.video.width=window.innerWidth;
											_this.$refs.video.height=window.innerWidth;
						                }
									}else{
										_this.videoshow=false;
									}
							});
			     },
			     getProductDesc(){
			     		this.$axios({
							    method: 'post',
							    url:'/product/desc/'+this.productId,
								}).then((res)=>{
										this.productDesc=res;
							});
								this.$axios({
							    method: 'post',
							    url:'/product/img/'+this.productId,
								}).then((res)=>{
										this.productimg=res;
							});
			     },
    	      	
    	     },
    	     
    	 mounted() {
				this.getParams();
				this.getProduct();
				this.getProductDesc();
		}
    }
</script>
<style lang="scss" scoped="scoped">
 .sortDetail{
 	margin-bottom: 1rem;
 	overflow: hidden;
 	font-size: 1.6rem;
 }
 .xiajia{
    min-height: 6.5rem;
    font-size: 1.6rem;
    display: flex;
    align-items: center;
    i{
    	margin-right:1rem;
    }
 }
 .chooseproduct{
 	display: flex;
 	.cx{
 		margin-top:1rem;
 		label{
 			 background: #fcdadb;
 			   color: #0099ff;
 		}
 	}
 	.small-xq{
 		padding-left: 6rem;
 		em{
 			display: block;
 			color:red;
 			font-style: normal;
 			margin-top:0.5rem;
 		}
 	};
 	img{
 	width: 6rem;
    height: 6rem;
    background: #fff;
    position: absolute;
    top: -25px;
 }
 }

  strong{
  	margin-bottom: 0.5rem;
  	color:#0099ff;
  	display: block;
  	font-size: 1.4rem;
  }
 .back{
 	background: rgba(32, 32, 32, 0.6);
    width: 3.2rem;
    height: 3.2rem;
    line-height:3.2rem;
    border-radius: 3.2rem;
    display: inline-block;
    text-align: center;
    font-size: 2em;
    color: #fff;
    position: absolute;
    left: 1rem;
    top: 1rem;
    z-index: 11;
    cursor: pointer;
 	}
 .xiangqiang{
 	background: #fff;
 	padding:  1rem;
 	font-size: 1.6rem;
 	div{
 		margin-bottom:0.5rem;
 		color: #333;
 	}
 	strong{
 		color:#0099ff;
 		font-size: 1.1rem;
 	}
 }
 .choose{
 	margin-top:1rem;
 	margin-bottom: 1rem;
 	background: #fff;
 	padding: 1.5rem 1rem;
 	display: flex;
 	cursor: pointer;
 	span{
 		flex: 1;
 	}
 	i{
 		color:#333;
 		font-weight: bold;
 		font-style: normal;
 		margin-left:1rem
 	}
 }
 .chooseModal dl{
 	overflow: hidden;
 	margin-bottom: 1.5rem;
 	dt{
 	margin-bottom:1rem;
 	}
	 dd{
	  	border:1px solid #eee;
	  	float: left;
	  	padding: 0.3rem 0.5rem;
	  	margin-right: 1rem;
	  	color: #222;
	  	cursor: pointer;
	  	margin-bottom: 0.5rem;
	  }
	  dd.active{
	  	color:#0099ff;
	  	border-color:#0099ff;
	  }
 }

.demo-carousel img{
	max-width: 100%;
}
.cxtime{
	color:#999;
	margin-top: 1rem;
}
.cartModal{
	font-size:1.6rem
}
.foot{
	font-size: 1.6rem;
}
.video-wrap{
	position: relative;
	/*height: 38rem;*/
	.swiper{
		img{
			max-width: 100%;
		}
	}
	.controls{
		position:absolute;
		bottom: 3rem;
		left:10rem;
		z-index: 10;
		button{
			background: #fff;
			color:#666;
			border:1px solid #666;
			margin-left: 1.5rem;
			padding:0 0.7rem;
			font-size: 1.2rem;
			border-radius: 0.5rem;
		}
		.active{
			background: #0099ff;
			color:#fff;
			border-color:#0099ff;
		}
	}
}
.video{
	position: absolute;
	left: 0;
	top: 0;
	z-index:1;
}
</style>
<style>
	.spjs .ivu-tabs-nav{
		width:100%
	}
	.spjs .ivu-tabs-tab{
		font-size: 1.6rem;
		width:50%;
		text-align: center;
	}
	.cartModal .ivu-modal-footer{
		padding: 0;
	}
	.cartModal .ivu-modal-footer button{
		height: 4.4rem;
		float: left;
		border-radius: 0;
	}
	.cartModal .ivu-modal-footer{
		border-top:0;
		overflow: hidden;
	}
	.cartModal .ivu-modal-footer button + button{
		margin-left:0
	}
</style>