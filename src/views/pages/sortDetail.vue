<template>
<div>
	<div class="sortDetail">
		<router-link to="/sort" tag='span' class='back'> <Icon type="ios-arrow-left"></Icon></router-link>
	<Carousel v-model="value3" :autoplay="setting.autoplay" :autoplay-speed="setting.autoplaySpeed" :dots="setting.dots"
            :radius-dot="setting.radiusDot" :trigger="setting.trigger" :arrow="setting.arrow" ref="carousel">
              <CarouselItem>
              	  <iframe  ref="video" frameborder=0 allowfullscreen ></iframe>  
              </CarouselItem>
                <CarouselItem v-for="(item, index) in shangp.productImageList"  :key="index">
                        <div class="demo-carousel" ><img :src="item.listImg |imgfilter"></div>
                </CarouselItem>
    	</Carousel>
    		<div class="xiangqiang">
    		<div>{{shangp.product.modelName}}</div>
    	<strong><label class="price">{{shangp.product.salePrice | pricefilter}}</label></strong>
    	</div>
    	<div class="choose" @click="modal2 = true">
    		<span>选择规格<i v-if="!xiajia">{{bigchoose}}</i></span><Icon type="ios-more"></Icon>
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
    <div class="foot"> <button    :loading="modal_loading" @click="modal2 = true" class="jrgwc">加入购物车</button>
    	  <router-link :to="{ path: '/cart' }" class="cart">    <Icon type="android-cart"></Icon></router-link>
    </div>
       	<!--弹窗选择商品尺寸颜色-->
    	 <Modal v-model="modal2"  class="chooseModal cartModal" :mask-closable="false">
         <div slot="header" >
         	 <div v-if="xiajia" class="xiajia"><Icon type="information-circled">
         	 </Icon>该商品已下架
         	 </div>
       	 <div v-if="!xiajia&&!firstshow" class="xiajia"><Icon type="information-circled">
         	</Icon>请选择商品 
         	 </div>
            <div  v-if="firstshow" class='choosesp'>
             	<img :src="choosesp.img |imgfilter">
             	<div><span><strong>{{choosesp.price | pricefilter}}</strong>商品编号:{{choosesp.itemNo}}</span> 
             	<span class="cx" v-if="cxshow"><strong>{{choosesp.cuxiaoprice}}</strong>
             		<label>{{choosesp.activityName}}</label>
             		</span>
             	</div>
            </div>
            <!--<div class="cxtime" v-if="cxshow"> 促销时间：{{choosesp.startTime}}-{{choosesp.endTime}}</div>-->
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
			     	<input class="text-box" name="pricenum"  type="tel" v-model="quantity" v-on:input="changeNumber($event)" placeholder="数量" data-max="50" />
			 		 <Icon type="plus-round" @click.native="jia()" class="add"></Icon>
				</div>
		</div>
        <div slot="footer">
        	 <Button  size="large"  type="error"  v-if="!xiajia" class="btn-orange">立即购买</Button>
            <Button  size="large"     disabled="disabled" v-if="xiajia">加入购物车</Button>
            <Button  size="large"  :loading="modal_loading" @click="atc" type="error"  v-if="!xiajia">加入购物车</Button>
        </div>
    </Modal>
    </div>
</template>
<script>
//	var player = new YKU.Player('youkuplayer',{
//			styleid: '0',
//			client_id: 'YOUR YOUKUOPENAPI CLIENT_ID',
//			vid: 'XMzQ0MDIwMTAzMg==',
//			newPlayer: true
//});
    	export default {
        data () {
            return {
            	xiajia:false,
            	firstshow:false,
            	selectedId:-1,
            	modal2: false,
            	modal_loading:false,
            	shangp:{
            		product:{},
            		promotions:[],
            		productImageList:[],
            		productItemList:[],
            		productAttrList:[]
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
            		endTime:''
            	},
            	productItemId:'',
            	quantity:1,
            	max:100,
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
          	        changeNumber: function(event){
						var obj=event.target;
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
                 this.modal_loading = true;
                if(localStorage.getItem('token')!=null&&localStorage.getItem('token')!=undefined){
                	this.$axios({
							    method: 'post',
							    url:'/order/shopping/add',
							    data:{
							    	productItemId:this.productItemId,
							    	quantity:this.quantity
							    }
								}).then((res)=>{
									this.modal_loading = false;
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
            	chooseSP(e,pa,ch){
            		this.cxshow=false;
            		var chooseId="",jishu=0;
       	            let  p=e.target.parentNode.children;
       	            for(let i =1;i<p.length;i++) {
       	            	p[i].className="";
					}
       	             e.target.className="active"; 
            		if(pa.attrKey.isColorAttr=='Y'){
            			this.choosesp.img=ch.listImg;
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
            		//显示促销信息
            		if(this.shangp.promotions)
            		//商品详情页已选显示
            	   chooseId=(chooseId.slice(chooseId.length-1)==',')?chooseId.slice(0,-1):chooseId;
            	   this.bigchoose=(this.bigchoose.slice(this.bigchoose.length-1)==',')?this.bigchoose.slice(0,-1):this.bigchoose;
            	   
            	   var flag= false;
            	   if(jishu==this.shangp.productAttrList.length){
            	   	//读出选中商品的促销价格+促销类目
            	   	    for (let chooseItem of this.shangp.productItemList) {
							   if(chooseItem.productModelAttrs==chooseId){
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
										this.shangp=res.object;
										 if(res.object.product.video!="")
										 {
										 	this.$refs.video.width=window.innerWidth;
										 	this.$refs.video.height=window.innerWidth;
										 	  this.$refs.video.src = 'http://player.youku.com/embed/' + res.object.product.video;
						                }
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
 .choosesp{
 	display: flex;
 	.cx{
 		margin-top:1rem;
 		label{
 			color: #f58e1d;
 			padding: 0.2rem;
 		}
 	}
 }
  .choosesp span {
  	margin-left:1rem;
  	color:#999;
  	display: block;
  }
  strong{
  	margin-bottom: 0.5rem;
  	color:#d32122;
  	display: block;
  	font-size: 1.4rem;
  }
 .back{
 	background: rgba(64, 64, 64, 0.6);
    width: 3.2rem;
    height: 3.2rem;
    line-height:2.2rem;
    border-radius: 3.2rem;
    display: inline-block;
    text-align: center;
    font-size: 2em;
    color: #fff;
    position: absolute;
    left: 1rem;
    top: 1rem;
    z-index: 1;
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
 		color:#d32122;
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
	  	padding: 0.3rem 1rem;
	  	margin-right: 1rem;
	  	border-radius: 3rem;
	  	color: #222;
	  	cursor: pointer;
	  	margin-bottom: 0.5rem;
	  }
	  dd.active{
	  	color:#d32122;
	  	border-color:#d32122;
	  }
 }
 .choosesp img{
 	width: 6.5rem;
    height: 6.5rem;
    background: #fff;
    position: relative;
    top: -25px;
    border-radius: 0.5rem;
    padding: 0.5rem;
 }
.demo-carousel img{
	max-width: 100%;
}
.cxtime{
	color:#999;
	margin-top: 1rem;
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
		width:50%;
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