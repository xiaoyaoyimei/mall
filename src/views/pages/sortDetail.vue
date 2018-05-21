<template>
<div>
	<div class="sortDetail">
		<router-link to="/sort" tag='span' class='back'> <Icon type="ios-arrow-left"></Icon></router-link>
		<Carousel v-model="value3" :autoplay="setting.autoplay" :autoplay-speed="setting.autoplaySpeed" :dots="setting.dots"
            :radius-dot="setting.radiusDot" :trigger="setting.trigger" :arrow="setting.arrow">
                <CarouselItem v-for="(item, index) in product.product"  :key="index">
                        <div class="demo-carousel" ><img :src="imageSrc+item.listImg"></div>
                </CarouselItem>
    	</Carousel>
    	<div class="xiangqiang">
    		<h6>{{product.productImageList.modelName}}</h6>
    		<strong>￥{{product.productImageList.salePrice}}</strong>
    	</div>
    	<div class="choose" @click="modal2 = true">
    		<span>已选<i v-if="!xiajia">{{bigchoose}}</i></span><Icon type="ios-more"></Icon>
    	</div>
    </div>
       <Tabs class="spjs">
        <TabPane label="商品介绍">
        	<ul><li v-for="(item, index) in productimg"  :key="index"><img :src="imageSrc+item.imgUrl"></li></ul>
        </TabPane>
        <TabPane label="规格参数" >
        		<ul class="gk">
        			<li v-for="(item, index) in productDesc"  :key="index">
        			<span class="title">{{item.attrCode}}:</span> <span class="neirong">{{item.attrValue}}</span></li></ul>
        	</TabPane>
    </Tabs>
    <div class="foot"> <button    :loading="modal_loading" @click="modal2 = true">加入购物车</button>
    	  <router-link :to="{ path: '/cart' }" class="cart">    <Icon type="android-cart"></Icon>购物车</router-link>
         
    </div>
       	<!--弹窗选择商品尺寸颜色-->
    	 <Modal v-model="modal2"  class="chooseModal" :mask-closable="false">
         <div slot="header" >
         	 <div v-if="xiajia" class="xiajia"><Icon type="information-circled">
         	 </Icon>该商品已下架
         	 </div>
       	 <div v-if="!xiajia&&!firstshow" class="xiajia"><Icon type="information-circled">
         	</Icon>请选择商品 
         	 </div>
            <div  v-if="firstshow" class='choosesp'>
             	<img :src="choosesp.img"> <span><strong>￥{{choosesp.price}}</strong>商品编号:{{choosesp.itemNo}}</span> 
            </div>
         </div>
        <dl v-for="(item, index) in product.productAttrList"  :key="index">
          <dt>{{item.attrKey.catalogAttrValue}}</dt>
          <dd v-for="(child, index) in item.attrValues"  :key="index" @click="chooseSP($event,item,child)"   ref="dditem" :title="child.id">
          	{{child.modelAttrValue}}
          </dd>
        </dl>
        <div>数量 <InputNumber  :min="1" v-model="quantity"></InputNumber></div>
        <div slot="footer">
          <Button  size="large" long    disabled="disabled" v-if="xiajia">加入购物车</Button>
            <Button  size="large" long :loading="modal_loading" @click="atc" type="error"  v-if="!xiajia">加入购物车</Button>
        </div>
    </Modal>
</div>
</template>
<script>
    	export default {
        data () {
            return {
            	xiajia:false,
            	firstshow:false,
            	selectedId:-1,
            	modal2: false,
            	modal_loading:false,
            	imageSrc:this.global_.imgurl,
            	product:{
            		productImageList:{},
            		product:[],
            		productAttrList:{},
            		productItemList:[]
            	},
            	productDesc:[],
            	productimg:[],
            	bigchoose:'',
            	choosesp:{
            		img:'',
            		itemNo:'',
            		price:''
            	},
            	productItemId:'',
            	quantity:1,
            	productId:'',
                value3: 0,
                setting: {
                    autoplay: false,
                    autoplaySpeed: 2000,
                    dots: 'inside',
                    radiusDot: false,
                    trigger: 'click',
                    arrow: 'hover'
                },
            }
        },
          methods: {
          	//加入购物车
          	   atc () {
                this.modal_loading = true;
                	this.$axios({
							    method: 'post',
							    url:'/order/shopping/add',
							    data:{
							    	productItemId:this.productItemId,
							    	quantity:this.quantity
							    }
								}).then((res)=>{
									if(res.code=='200'){
										this.modal_loading = false;
										this.$router.push('/cart')  
									}
							});
            	},
            	chooseSP(e,pa,ch){
            		var chooseId="",jishu=0;
       	            let  p=e.target.parentNode.children;
       	            for(let i =1;i<p.length;i++) {
       	            	p[i].className="";
					}
       	             e.target.className="active"; 
            		if(pa.attrKey.isColorAttr=='Y'){
            			this.choosesp.img=this.imageSrc+ch.listImg;
            		}
            		let dditem=this.$refs['dditem'];
            		 this.bigchoose="";
            		for(let n=0;n<dditem.length;n++){
            			if(dditem[n].getAttribute("class")=='active'){
            				chooseId+=dditem[n].getAttribute("title")+',';
            				this.bigchoose +=dditem[n].innerHTML+',';
            				jishu++
            			}
            		}
            	   chooseId=(chooseId.slice(chooseId.length-1)==',')?chooseId.slice(0,-1):chooseId;
            	   this.bigchoose=(this.bigchoose.slice(this.bigchoose.length-1)==',')?this.bigchoose.slice(0,-1):this.bigchoose;
            	   
            	   var flag= false;
            	   if(jishu==this.product.productAttrList.length){
            	   	    for (var chooseItem of this.product.productItemList) {
							   if(chooseItem.productModelAttrs==chooseId){
							   	this.choosesp.itemNo=chooseItem.itemNo,
							   	this.choosesp.price=chooseItem.salePrice,
							   	this.productItemId=chooseItem.id;
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
            		
            	},
    	      	getParams () {
	       			 // 取到路由带过来的参数 
			        let routerParams = this.$route.query.id
			        this.productId=routerParams;
			    },
			     getProduct(){
			     		this.$axios({
							    method: 'post',
							    url:'/product/'+this.productId,
								}).then((res)=>{
									if(res.code=='200'){
										this.product.productImageList=res.object.product;
										this.product.product=res.object.productImageList;
										this.product.productAttrList=res.object.productAttrList;
										this.product.productItemList=res.object.productItemList;
										//this.setdefault();
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
			     setdefault(){
			     		//找出默认选中
//										var result=this.product.productItemList[0].productModelAttrs.split(",");
//									    let dditem=this.$refs['dditem'];
//									     this.bigchoose="";
//										for(let i=0;i<result.length;i++){
//												for(let n=0;n<dditem.length;n++){
//						            			if(dditem[n].getAttribute("title")==result[i]){
//						            				dditem[n].setAttribute("class",'active');
//						            				this.bigchoose +=dditem[n].innerHTML+',';
//						            			}
//						            		}
//										}
			     }
    	      	
    	     },
    	     
    	 mounted() {
				this.getParams();
				this.getProduct();
				this.getProductDesc();
				this.setdefault();
		}
    }
</script>
<style lang="scss" scoped="scoped">
 @import '@/styles/color.scss'; 
 .spjs{
 	background: #fff;
 }
 .spjs img{
 	max-width:100%;
 }
 .spjs li{
 	
 }
 .gk li{
 	display: flex;
 	padding: 5px 10px;
 	.title{
 		width:40%;
 		float: left;
 	}
 	.neirong{
 		width:60%;
 	}
 }
 .xiajia{
     min-height: 65px;
    font-size: 16px;
    display: flex;
    align-items: center;
    i{
    	margin-right:10px;
    }
 }
 .choosesp{
 	display: flex;
 }
  .choosesp span {
  	margin-left:10px;
  	color:#999;
  	margin-top:20px;
  }strong{
  	margin-bottom: 5px;
  	color:$color-dx;
  	display: block;
  	font-size: 14px;
  }
 .back{
 	    background: rgba(64, 64, 64, 0.6);
    width: 32px;
    height: 32px;
    border-radius: 32px;
    display: inline-block;
    text-align: center;
    font-size: 2em;
    color: #fff;
    position: absolute;
    left: 10px;
    top: 10px;
    z-index: 1;
    cursor: pointer;
 	}
 .xiangqiang{
 	background: #fff;
 	padding: 15px 10px;
 	font-size: 1rem;
 	h6{
 		margin-bottom:10px;
 		color: #222;
 	}
 	strong{
 		color:$color-dx;
 		font-size: 1.1rem;
 	}
 }
 .choose{
 	margin-top:10px;
 	margin-bottom: 10px;
 	background: #fff;
 	padding: 15px 10px;
 	display: flex;
 	cursor: pointer;
 	span{
 		flex: 1;
 	}
 	i{
 		color:#222;
 		font-size:14px;
 		font-weight: bold;
 		font-style: normal;
 		margin-left:10px
 	}
 }
 .chooseModal dl{
 	overflow: hidden;
 	margin-bottom: 15px;
 	dt{
 	margin-bottom:10px
 	}
	 dd{
	  	border:1px solid $color-border;
	  	float: left;
	  	padding: 3px 10px;
	  	margin-right: 10px;
	  	margin-bottom: 3px;
	  	border-radius: 3px;
	  	color: #222;
	  	cursor: pointer;
	  }
	  dd.active{
	  	color:$color-dx;
	  	border-color:$color-dx;
	  }
 }
 .choosesp img{
 	width: 65px;
    height: 65px;
    background: #fff;
    position: relative;
    top: -25px;
    border-radius: 5px;
    padding: 5px;
 }

    .foot {
		background: #fff;
		border-top:1px solid #eee;
		position: fixed;
		height: 50px;
		z-index: 31;
		bottom: 0;
		left: 0;
        width:100%;
        text-align:center;
          button{
          	float: right;
          	background: $color-dx;
          	color:#fff;
          	height: 100%;
          	border:0 none;
          	padding-left:15px ;
          	padding-right: 15px;
          	cursor: pointer;
          }
          .cart{
          	color:#666;
          	text-align: center;
          	margin-left: 20px;
          	font-size: 10px;
          	float: left;
          	margin-top: 5px;
          	i{
          		display: block;
          		font-size: 20px;
          	}
          }
}
.demo-carousel img{
	max-width: 100%;
}
</style>