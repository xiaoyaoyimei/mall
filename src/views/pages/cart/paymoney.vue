<template>
    <div class='paymoney order'>
        <h2><router-link to="/cart"><Icon type="ios-arrow-back"></Icon></router-link>填写订单</h2>
            <div class="chooseAddress">
            	<ul class="address" v-if="youdizhi">
				<li>
					<p><strong>{{addressList.person}} <label>{{addressList.phone}}</label></strong>
					<span>{{addressList.receiveProvince}}{{addressList.receiveCity}}{{addressList.receiveDistrict}}{{addressList.address}}</span></p>
					<Icon type="chevron-right"></Icon>
				</li>
			   </ul>
                <div  class="zeroAddress" v-else >
                	<router-link :to="{ path: '/user/address' }">请选择收货地址
                	<Icon class='float float1' type="ios-arrow-right"></Icon>
                  </router-link>
                </div>
            </div>
            <div class="carttwo">
		 		<div  class='cartCol' span="24" v-for="(x,index) in cartList" :key="index"> 
					<i-col span="6"><img class='cartImg' :src="imageSrc+x.image"></i-col>
					<i-col span="18">
						<p class='cart_black'>{{x.productName}}</p>
						<p class='cart_gray'>{{x.productAttr}}</p>
						<p class='cart_price'>￥{{x.salePrice}}x{{x.quantity}}</p>
					</i-col>
				</div>
			</div>
         <div class='cartfoot'>
			<strong>￥<span>{{totalPrice}}</span></strong>
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
                imageSrc:this.global_.imgurl,
                 indeterminate: true,
                checkAll: false,
				checkAllGroup: [],
				totalPrice:0,
				cartList:[],
				editface:true,
				zslcount:0,
				temp:[],
				addressList:[],
				youdizhi:false,
				tempcart:[],
				productItemIds:[]
            }
        },
        methods: {
		      getCartList(){
		        this.cartList =  JSON.parse(sessionStorage.getItem('cart')); 
		        var _this=this;
		        _this.productItemIds=[];
		          this.cartList.forEach(function(item,index) {
					    _this.totalPrice +=item.salePrice*item.quantity;
					    _this.productItemIds.push(item.id);
				      });
		      },
		      getAddress(){
		      	  	this.$axios({
						    method: 'post',
						    url:'/address',
						}).then((res)=>{
							 if(res.length>0){
							 	 this.addressList=res[0];
								 this.youdizhi=true
							}
						});
		      },
            confirm(){
          	let para={
					addressId:this.addressList.id,
                    productItemIds:this.productItemIds
          	};
            	   	  	this.$axios({
						    method: 'post',
						    url:'/order/shopping/confirm',
						    data:para
						}).then((res)=>{
							if(res.code=='200'){
								 this.$Message.success('订单提交成功');
								 	this.$router.replace('/user/orderlist');  
							}else{
								 this.$Message.error(res.msg);
							}
							
						});
            }
        },
         mounted() {
         	this.getAddress();
         	this.getCartList();
		}
    }
</script>
<style lang="scss" scoped="scoped">
 @import '@/styles/color.scss';
 .carttwo{
 	margin-top:15px;
 	padding: 10px;
 	background: #fff;
 	
 }
 .cartCol{
 	padding:10px 0;
 	width:100%;
 	overflow:hidden;
 	border-bottom:1px solid #ddd;
 }
 .address li{
 	display: flex;
 	background:#fff;
 	padding:10px;
 	font-size: 1.2em;
 	cursor: pointer;
 }
  .address p{
  	flex:1;
  	strong{
  		display: block;
  		font-size: 1.125em;
  		color:#222
  	}
  }
   		.cartfoot{
			    background: #fff;
				border-top: 1px solid #eee;
				position: fixed;
				height: 49px;
				line-height:49px;
				z-index: 31;
				bottom: 0px;
				left: 0;
				width: 100%;
				strong{
					color:$color-dx;
					font-size: 1rem;
					span{
						font-size: 1.125rem;
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
		.chooseAddress{
			.zeroAddress{
				background: #fff;
				color:#fff;
				padding:10px
			}
		}
</style>