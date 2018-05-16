<template>
	<div class='cart1 order'>
		<h2><router-link to="/sort"><Icon type="ios-arrow-back"></Icon></router-link>购物车<span  @click="edit" v-show="editface">编辑</span><span  @click="edit" v-show="!editface">完成</span></h2>
		<div class='cartfoot'>
				<Row>
					<i-col  class='cartCol ' span="24">
						<i-col class='' span="4">
								<div style="padding-bottom:6px;margin-bottom:10px;padding-left:10px;">
									<Checkbox :indeterminate="indeterminate"  :value="checkAll"   @click.prevent.native="handleCheckAll">全选</Checkbox>
								</div>
						</i-col>
						<i-col class='' span="8">
							<P class='color-dx'>总计：￥{{totalPrice}}</P>
						</i-col>
						<i-col class='cartButton1' span="12"> 
							<i-button class='cartButton'  @click.prevent.native="paymoney" type="error" v-show="editface"> 
								<router-link class='font-dx' :to="{ path: 'paymoney' }" > 结算</router-link>
							</i-button>
							 <Button  type="ghost" shape="circle"  @click.prevent.native="remove" v-show="!editface">删除</Button>
						</i-col>
					</i-col>
				</Row>
			</div>
		<Row>
		    <Checkbox-group v-model="checkAllGroup" @on-change="checkAllGroupChange">
		 		<i-col  class='cartCol' span="24" v-for="(item,index) in cartList" :key="index"> 
        			<i-col class='cartcheckbok' span="2">
        				<Checkbox  :label="index"></Checkbox></i-col>
					<i-col span="5"><img class='cartImg' :src="imageSrc+item.image"></i-col>
					<i-col span="13">
						<p class='cart_black'>{{item.productName}}</p>
						<p class='cart_gray'>{{item.productAttr}}</p>
						<p class='cart_price'>￥{{item.salePrice}}</p>
					</i-col>
					<i-col span="4">
						<p class='cart_qua'>
							<InputNumber  :min="1" v-model="item.quantity*1" ></InputNumber></p>
					</i-col>
				</i-col>
			</Checkbox-group>
				
		</Row>
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
				editface:true
            }
		},
        methods: {
        	getCartList(){
        			this.$axios({
							    method: 'post',
							    url:'/order/shopping/list',
								}).then((res)=>{
									if(res.data.code=='200'){
										this.cartList=res.data.object;
									}
							});
        	},
			edit(){
				this.editface=!this.editface;
			},
			edit1(){
			},
			paymoney(){
				
			},
			remove(){

			},
            handleCheckAll () {
                if (this.indeterminate) {
                    this.checkAll = false;
                } else {
                    this.checkAll = !this.checkAll;
                }
                this.indeterminate = false;
                if (this.checkAll) {
                	var _this=this;
	                	_this.checkAllGroup=[];
	                    _this.cartList.forEach(function(item,index) {
	                    	console.log(item);
					    _this.checkAllGroup.push(index);
					    _this.totalPrice+=item.salePrice*item.quantity;
				      });
                } else {
					this.checkAllGroup = [];
					this.totalPrice=0;
                }
			},
            checkAllGroupChange (data) {
                if (data.length === this.cartList.length) {
                    this.indeterminate = false;
                    this.checkAll = true;
                } else if (data.length > 0) {
                    this.indeterminate = true;
                    this.checkAll = false;
                } else {
                    this.indeterminate = false;
                    this.checkAll = false;
				}
                 this.totalPrice=0;
                 data.forEach((i) => {
				   this.totalPrice += parseFloat(this.cartList[i].salePrice) * parseFloat(this.cartList[i].quantity);
				});
            }
        },
         mounted() {
				this.getCartList();
		}
    }
</script>

<style scoped="scoped" lang="scss" >
 	@import '@/styles/color.scss';
	.cart1{
		margin-bottom:55px;
		
		.cartCol{
			background-color:$color-white;
			margin-bottom:5px;
			padding-bottom:10px;
			.cartcheckbok{
				height:16px;
				margin-top:5%;
				padding-left:10px;
				overflow:hidden;
				.ivu-checkbox-wrapper{
					width:16px;
					overflow:hidden;
				}
			}
			.cart_qua{
				font-size:14px;
				padding-top:50px;
				
			}
			.cartImg{
				max-width:100%;
				padding-top:15px;
			}
			.cart_black{
				color:$color-default;
				text-align: left;
			    padding-left: 20px;
			    box-sizing: border-box;
			    font-size: 14px;
			    padding-top: 15px;
			    text-overflow: ellipsis;
			    white-space: nowrap;
			    overflow: hidden;
			}
			.cart_gray{
				text-align:left;
				color:$color-gray;
				padding-left:20px;
				box-sizing:border-box;
				font-size:12px;
			}
			.cart_price{
		margin-top:5px;
				color:$color-dx;
				padding-left:20px;
			}
			.color-dx{
				color:$color-dx;
				text-align:left;
			}
			.cartButton1{
				text-align:right;
			}
			.cartButton{
				border-radius:0px;
				padding:15px 25px;
				.font-dx{
					color:$color-white;
				}
			}
			.cartButton:nth-of-type(2n){
				margin-left:-5px;
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
		}
	}
</style>