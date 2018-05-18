<template>
	<div class='cart1 order'>
		<h2><router-link to="/sort"><Icon type="ios-arrow-back"></Icon></router-link>购物车<span  @click="edit" v-show="editface">编辑</span><span  @click="edit" v-show="!editface">完成</span></h2>
		<div class='cartfoot'>
				<Row>
					<Col  class='cartCol' span="24">
						<Col  span="4" class="center">
								<div style="padding-bottom:6px;margin-bottom:10px;padding-left:10px;">
									<Checkbox :indeterminate="indeterminate"  :value="checkAll"   @click.prevent.native="handleCheckAll">全选</Checkbox>
								</div>
						</Col>
						<Col  span="8">
							<P class='color-dx'>总计：￥{{totalPrice}}</P>
						</Col>
						<Col class='cartButton1' span="12"> 
							<i-button class='cartButton'  @click.prevent.native="paymoney" type="error" v-show="editface"> 
								结算({{zslcount}})
							</i-button>
							 <Button  type="ghost" shape="circle"  @click.prevent.native="remove" v-show="!editface">删除</Button>
						</Col>
					</Col>
				</Row>
			</div>
		<Row>
		    <Checkbox-group v-model="checkAllGroup" @on-change="checkAllGroupChange">
		 		<Col  class='cartCol' span="24" v-for="(x,index) in cartList" :key="index"> 
        			<Col class='cartcheckbok' span="2">
        			<Checkbox  :label="index"></Checkbox></Col>
					<Col span="4" ><img class='cartImg' :src="imageSrc+x.image"></Col>
					<Col span="11">
						<p class='cart_black'>{{x.productName}}</p>
						<p class='cart_gray'>{{x.productAttr}}</p>
						<p class='cart_price'>￥{{x.salePrice}}</p>
					</Col>
					<Col span="7">
						<p class='cart_qua'>
							<div class="min-add">
						    <Icon type="minus-round" @click.native="jian(x,index)" class="min"  ></Icon>
						     <input class="text-box" name="pricenum"  type="tel" v-model="x.quantity*1" v-on:input="changeNumber($event,x)" placeholder="数量" data-max="50" />
						  <Icon type="plus-round" @click.native="jia(x,index)" class="add"></Icon>
						</div>
					</Col>
				</Col>
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
				editface:true,
				zslcount:0,
				temp:[],
            }
		},
        methods: {

        	changeNumber: function(event,x){
					var obj=event.target;
					x.quantity = parseInt(obj.value);
					},
					//添加
					jia:function(x,index){
					
						if(x.quantity>=x.max){
						x.quantity=x.max
						}else{
						x.quantity=parseInt(x.quantity)+1; 
							 if(this.temp.indexOf(index)<0){
					     		this.temp.push(index)
					     	}
					     	   this.checkAllGroup=this.temp;
							this.checkAllGroupChange(this.temp);
						  }
					},
					
					//减
					jian:function(x,index){
                           //删除的时候库存最小为1。所以无需删去选中的index
//						   if(this.temp.indexOf(index)>0){
//					     	this.temp.splice(index,1)
//						  }
						if(x.quantity==1){
						x.quantity==1
						}else{
						x.quantity=parseInt(x.quantity)-1; 
				 		this.checkAllGroup=this.temp;
						this.checkAllGroupChange(this.temp);
						}
					},
        	getCartList(){
        			this.$axios({
							    method: 'post',
							    url:'/order/shopping/list',
								}).then((res)=>{
									if(res.code=='200'){
										this.cartList=res.object;
									}
							});
        	},
			edit(){
				this.editface=!this.editface;
			},
			edit1(){
			},
			paymoney(){
				console.log(this.checkAllGroup);
				var goumai=[];
				this.checkAllGroup.forEach((i) => {
				  goumai.push(this.cartList[i])
				 // this.cartList.splice(i, 1);
				});
				 sessionStorage.removeItem('cart'); 
		         sessionStorage.setItem('cart', JSON.stringify(goumai)); 
				 this.$router.push({ name:'/paymony'});
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
                var _this=this;
                if (_this.checkAll) {
	                	_this.checkAllGroup=[];
	                	 _this.temp=[];
	                    _this.cartList.forEach(function(item,index) {
					    _this.checkAllGroup.push(index);
					    _this.temp.push(index);
					    _this.totalPrice+=item.salePrice*item.quantity;
					    _this.zslcount+=parseInt(item.quantity)
				      });
                } else {
					_this.checkAllGroup = [];
					_this.temp=[];
					_this.totalPrice=0;
					_this.zslcount=0;
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
                 this.zslcount=0;
                 data.forEach((i) => {
				   this.totalPrice += parseFloat(this.cartList[i].salePrice) * parseFloat(this.cartList[i].quantity);
				   this.zslcount+=parseInt(this.cartList[i].quantity)
				});
            }
        },
         mounted() {
				this.getCartList();
		}
    }
</script>

<style  lang="scss" >
 	@import '@/styles/color.scss';
 	.min-add .min,.min-add .add{
 		    color: #333;
    font-weight: bold;
    cursor: pointer;
    margin-right:5px;
    font-size: 14px;
    margin-left:5px;
 	}
 	.min-add .min,.min-add .add,.min-add input{
 		display: inline-block;
 	}
 	.min-add input{
 		width:50px;
 		text-align: center;
 		background: #f5f5f5;border:0 none;
 		height:26px;
 	}
	.cart1{
		margin-bottom:55px;
		.center{
			text-align: center;
		}
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