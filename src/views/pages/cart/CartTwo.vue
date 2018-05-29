<template>
    <div class='paymoney'>
    	<div class="m_header_bar">
			<router-link to="/cart"  class="m_header_bar_back"><Icon type="ios-arrow-back"></Icon></router-link>
			<span class="m_header_bar_title">填写订单</span>
			<span  class="m_header_bar_menu"></span>
		</div>
            <div class="chooseAddress">
            	<ul class="address" v-if="youdizhi">
				<li>
					<p><strong>{{addressList.person}} <label>{{addressList.phone}}</label></strong>
					<span>{{addressList.receiveProvince}}{{addressList.receiveCity}}{{addressList.receiveDistrict}}{{addressList.address}}</span></p>
						<Icon type="chevron-right"  @click.native="addAdd"></Icon>
				</li>
			   </ul>
                <div  class="zeroAddress" v-else >
                	<div @click="addAdd">
                		请选择收货地址
                	<Icon class='float float1' type="ios-arrow-right"></Icon>
                  </div>
                </div>
            </div>
            <div class="carttwo">
		 		<Row  class='cartCol' span="24" v-for="(x,index) in cartList" :key="index" :gutter="16"> 
					<i-col span="6"><img class='cartImg' :src="imageSrc+x.image"></i-col>
					<i-col span="18">
						<p class='cart_black'>{{x.productName}}</p>
						<p  class='cart_attr'>
								{{x.productAttr}} 		
								</p >
						<div class="cart_gray">
						   <p>
						   	<label class="promotion" v-if="x.promotionTitle !=null">{{x.promotionTitle}}</label>
					        <span >￥{{x.salePrice | pricefilter}}x{{x.quantity}}</span>
					       	<!--<em class="oldprice">￥{{x.salePrice | pricefilter}}</em>-->
					       	 <span v-if="x.promotionTitle ==null&&xscoupon" class="color-dx">
					       	 	￥{{couponprice(x.salePrice) | pricefilter}}x{{x.quantity}}
					       	 </span>
					       </p>
						  </div>
					</i-col>
				</Row>
			</div>
			<div class="yhm"  v-show="couponshow">
				<span>优惠券</span><input type="text" placeholder="优惠券" v-model.trim="couponCode"/>
				<span @click='usecoupon'>使用</span>
			</div>
         <div class='cartfoot'>
			<strong><span>￥{{totalPrice  | pricefilter }}</span></strong>
           <button  @click="confirm"  type="button"> 
				提交订单
			</button>
		</div>
    </div>
</template>
<script>
    export default {
        data () {
            return {
            	xscoupon:false,
            	jisuanmode:'',
            	couponCode:'',
                imageSrc:this.global_.imgurl,
                 indeterminate: true,
                checkAll: false,
				checkAllGroup: [],
				totalPrice:0,
				cartList:[],
				editface:true,
				zslcount:0,
				temp:[],
				addressList:{},
				youdizhi:false,
				tempcart:[],
				productItemIds:[],
				couponshow:true,
				couponmsg:{
					availableSku:'',
					availableCatalog:'',
					modeValue:'',
					couponMode:''
				}
            }
        },
        methods: {
        	//总价计算
        	jisuan(value){
        		  let _this=this;
        		  _this.jisuanmode=value;
        		  _this.totalPrice=0;
        		  if(_this.jisuanmode=='normol'){
        		    this.cartList.forEach(function(item,index) {
					    _this.totalPrice +=item.salePrice*item.quantity;
				   });
        		  }else if(_this.jisuanmode=='rate'){
        		  	    this.cartList.forEach(function(item,index) {
        		  	    	if(item.promotionTitle!=''&&item.promotionTitle!=null&&item.promotionTitle!=undefined){
        		  	    		_this.totalPrice +=item.salePrice*item.quantity;
        		  	    	}else{
        		  	    		_this.totalPrice +=item.salePrice*(1-_this.couponmsg.modeValue)*item.quantity
        		  	    	}
				   });
        		  }else{
        		  	    this.cartList.forEach(function(item,index) {
        		  	    	if(item.promotionTitle!=''&&item.promotionTitle!=null&&item.promotionTitle!=undefined){
        		  	    		_this.totalPrice +=item.salePrice*item.quantity;
        		  	    	}else{
        		  	    		_this.totalPrice +=(item.salePrice-_this.couponmsg.modeValue)*item.quantity
        		  	    	}
				   });
        		  }
        	},
        	getDD(){
                let routerParams = this.$route.params.address;
                if(routerParams!=undefined){
                	this.addressList=routerParams;
                	this.youdizhi=true
                }
        	},
		      getCartList(){
		        this.cartList =  JSON.parse(sessionStorage.getItem('cart')); 
		        var _this=this;
		         _this.productItemIds=[];
		          let n=0;
		          this.cartList.forEach(function(item,index) {
		          	   if(item.promotionTitle!=''&&item.promotionTitle!=null){
		          	     n+=1;
		          	   }
					    _this.productItemIds.push(item.id);
				   });
				      if(this.cartList.length==n){
				      	this.couponshow=false
				      }else{
				      		this.couponshow=true
				      }
		      },
		     addAdd(){
        		 localStorage.setItem('fromc','dingdan')
        		 this.$router.push({name: '/user/address'}) ;
        	},
		      getAddress(){
		      	var _this=this;
		      	  	this.$axios({
						    method: 'post',
						    url:'/address',
						}).then((res)=>{
							 if(res.length>0){
							 	res.map(function (i) {
							 		if(i.isDefault=='Y'&&JSON.stringify(_this.addressList) == "{}"){
							 			_this.addressList=i;
							 			 _this.youdizhi=true
							 		}
							 	});
								
							}
						});
		      },
            confirm(){
	          	let para={
						addressId:this.addressList.id,
	                    productItemIds:this.productItemIds,
	                     couponCode:this.couponCode
	          	};
    	   	  	this.$axios({
				    method: 'post',
				    url:'/order/shopping/confirm',
				    data:para
				}).then((res)=>{
					if(res.code=='200'){
						 this.$router.push({name:'/cartthree',params: { orderNo: res.msg}});  
					}else{
						 this.$Message.error(res.msg);
					}
				});
           },
           usecoupon(){
           	this.xscoupon=false
           	if(this.couponCode==''){
           		this.$Message.error('优惠码不能为空');
           		return;
           	}
           	    let para={
						addressId:this.addressList.id,
	                    productItemIds:this.productItemIds,
	                    couponCode:this.couponCode
	          	};
           	  	this.$axios({
				    method: 'post',
				    url:'/promotion/coupon',
				     data:para
				}).then((res)=>{
					if(res.code=='200'){
						this.xscoupon=true;
						this.couponmsg=Object.assign({}, res.object);
						this.jisuan(this.couponmsg.couponMode)
					}else{
						this.xscoupon=false;
						 this.$Message.error(res.object);
					}
				});
          },
          couponprice(value){
          	let couponmsg=this.couponmsg;
          	if(couponmsg.couponMode=='rate'){
          		return value*(1-couponmsg.modeValue)
          	}
          	else{
          		return value-couponmsg.modeValue
          	}
          }
        },
         mounted() {
         	this.getAddress();
         	this.getCartList();
         	this.getDD();
         	this.jisuan('normol');
		}
    }
</script>
<style lang="scss" scoped="scoped">
 @import '@/styles/color.scss';
 .paymoney{
 	margin-bottom: 6rem;
 }
 .oldprice{
 	text-decoration: line-through;
 	font-style: normal;
 	font-size: 1.4rem;
 }
 .carttwo, .yhm{
 	margin-top:1rem;
 	padding: 1rem;
 	background: #fff;
 }
 .yhm{
 	margin-bottom:1rem;
 	input{
 		margin-left: 1rem;
 		margin-right: 1rem;
 		width:10rem
 	}
 }
 .cart_attr{
 	font-size: 1.4rem;
 }
 .cartCol{
 	padding:1rem 0;
 	width:100%;
 	overflow:hidden;
 	border-bottom:1px solid #eee;
 	img{
 		max-width: 100%;
 	}
 }

  .cart_gray span{
  	display: block;
	   strong{ 
	  	color:$color-dx;
	  	font-size: 1.6rem;
	  }
  }
   		.cartfoot{
   				position: fixed;
			    background: #fff;
				border-top: 1px solid #eee;
				height: 4.9rem;
				line-height:4.9rem;
				bottom: 0px;
				width: 100%;
				padding-left:1rem;
				strong{
					color:$color-dx;
					font-size: 1.2rem;
					display:inline-block;
					span{
						font-size: 1.6rem;
					}
				}
				button{
					float: right;
					height: 100%;
					background: $color-dx;
					color:#fff;
					border:0 none;
					padding-left: 15px;
					padding-right: 15px;
					cursor: pointer;
				}
		}
	
</style>