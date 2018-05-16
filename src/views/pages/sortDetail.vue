<template>
<div>
	<div class="sortDetail">
		<span class='back'><Icon type="ios-arrow-left"></Icon></span>
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
    <div class="foot">
            <button    :loading="modal_loading" @click="modal2 = true">加入购物车</button>
    </div>
       	<!--选择商品尺寸颜色-->
    	 <Modal v-model="modal2"  class="chooseModal" :mask-closable="false">
         <div slot="header" >
         	 <div v-if="xiajia" class="xiajia"><Icon type="information-circled">
         	 </Icon>该商品已下架 </div>
            <div  v-if="!xiajia" class='choosesp'> <img :src="choosesp.img"> <span><strong>￥{{choosesp.price}}</strong>商品编号:{{choosesp.itemNo}}</span> </div>
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
									if(res.data.code=='200'){
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
            	   	    }else{
            	   	    	this.xiajia=false;
            	   	    }
            	   }
            		
            	},
    	      	getParams () {
	       			 // 取到路由带过来的参数 
			        let routerParams = this.$route.query.id
			        this.productId=routerParams;
			    },
			     getProduct(){
			     	    this.productId='294b040671dd4865915b77fc8fbbce99';
			     		this.$axios({
							    method: 'post',
							    url:'/product/'+this.productId,
								}).then((res)=>{
									if(res.data.code=='200'){
										this.product.productImageList=res.data.object.product;
										this.product.product=res.data.object.productImageList;
										this.product.productAttrList=res.data.object.productAttrList;
										this.product.productItemList=res.data.object.productItemList;
									}
							});
			     }
    	      	
    	     },
    	 mounted() {
				this.getParams();
				this.getProduct();
		}
    }
</script>
<style lang="scss">
 @import '@/styles/color.scss';
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
	  	padding: 3px 15px;
	  	margin-right: 10px;
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
}
</style>