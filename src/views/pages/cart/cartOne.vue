<template>
	<div class='cart1'>
		<div class="m_header_bar">
			<router-link to="/sort"  class="m_header_bar_back"><Icon type="ios-arrow-back"></Icon></router-link>
			<span class="m_header_bar_title">购物车</span>
			<span  @click="edit" v-show="editface" class="m_header_bar_menu" v-if="cartList.length>0">编辑</span>
			<span  @click="edit" v-show="!editface"  class="m_header_bar_menu">完成</span>
		</div>
		<div v-if="cartList.length>0">
		<Row>
		    <Checkbox-group v-model="checkAllGroup" @on-change="checkAllGroupChange">
		 		<Col  class='cartCol' span="24" v-for="(x,index) in cartList" :key="index"> 
        			<Col class='cartcheckbok' span="2">
        			<Checkbox  :label="index" :key="index"></Checkbox></Col>
					<Col span="4" ><img class='cartImg' :src="imageSrc+x.image"></Col>
					<Col span="18">
						<p class='cart_black'>{{x.productName}}</p>
						<p class='cart_gray'>{{x.productAttr}}</p>
						<div class='cart_price'>￥{{x.salePrice}}	
							<div class="min-add">
						    <Icon type="minus-round" @click.native="jian(x,index)" class="min"  ></Icon>
						     <input class="text-box" name="pricenum"  type="tel" v-model="x.quantity*1" v-on:input="changeNumber($event,x,index)" placeholder="数量" data-max="50" />
						  <Icon type="plus-round" @click.native="jia(x,index)" class="add"></Icon>
						</div></div>
					</Col>
				</Col>
			</Checkbox-group>
		</Row>
			<div class='cartfoot'>
				<Row>
					<Col  class='cartCol' span="24">
						<Col  span="4" class="center">
									<Checkbox :indeterminate="indeterminate"  :value="checkAll"   @click.prevent.native="handleCheckAll">全选</Checkbox>
						</Col>
						<Col  span="8">
							<P class='color-dx'>总计：￥{{totalPrice}}</P>
						</Col>
						<Col class='cartButton1' span="12"> 
							<i-button class='cartButton'  @click.prevent.native="paymoney" type="error" v-show="editface"> 
								结算({{zslcount}})
							</i-button>
							 <Button  type="ghost" shape="circle"  @click.prevent.native="remove" v-show="!editface">清空购物车</Button>
						</Col>
					</Col>
				</Row>
			</div>
			</div>
			<div class="cart-empty"   v-if="!nologin&&cartList.length==0">
			<img src="../../../assets/img/cartempty.png">
			<p>购物车是空的</p>
			<br/>
			<router-link to="/index"  >去首页</router-link>
			</div>
				<div class="cart-empty" v-if="nologin" >
			<img src="../../../assets/img/cartempty.png">
			<p>登录后可同步购物车中商品</p>
			<br/>
			<router-link to="/login"  > <button class="ghost-dx">登录</button></router-link>
			</div>
	</div>
</template>

<script>
export default {
        data () {
            return {
            	nologin:true,
            	imageSrc:this.global_.imgurl,
                indeterminate: true,
                checkAll: false,
				checkAllGroup:[],
				totalPrice:0,
				cartList:[],
				editface:true,
				zslcount:0,
				temp:[],
            }
		},
        methods: {

        	changeNumber: function(event,x,index){
					var obj=event.target;
					x.quantity = parseInt(obj.value);
					 if(this.temp.indexOf(index)<0){
					     		this.temp.push(index)
					     	}
					        this.checkAllGroup=this.temp;
							this.checkAllGroupChange(this.temp);
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
        		if(localStorage.getItem('token')!=undefined){
        			this.nologin=false;
        			this.$axios({
							    method: 'post',
							    url:'/order/shopping/list',
								}).then((res)=>{
									if(res.code=='200'){
										this.cartList=res.object;
									}
							});
					}
        	},
			edit(){
				this.editface=!this.editface;
			},
			paymoney(){
				if(this.checkAllGroup.length<1){
					 this.$Message.warning('您尚未选择任何商品');
					return false;
				}
				var goumai=[];
				this.checkAllGroup.forEach((i) => {
				  goumai.push(this.cartList[i])
				 // this.cartList.splice(i, 1);
				});
				 sessionStorage.removeItem('cart'); 
		         sessionStorage.setItem('cart', JSON.stringify(goumai)); 
				 this.$router.push({ name:'/carttwo'});
			},
			remove(){
				  this.$Modal.confirm({
                    title: '清空购物车提示',
                    content: '<p>您确定清空购物车</p>',
                    cancelText: '取消',
                     onOk: () => {
                       	this.$axios({
							    method: 'post',
							    url:'/order/shopping/clear',
								}).then((res)=>{
									if(res.code==200){
										this.cartList=[];
									}
							});
                    },
                    onCancel: () => {
                        this.$Message.info('取消成功');
                    }
                });
              	
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
 	 	.min-add{
 	    float: right;
 	    padding-right: 1rem;
 	    }
 	.min-add .min,.min-add .add{
 		    color: #333;
    font-weight: bold;
    cursor: pointer;
    margin-right:5px;
    font-size: 14px;
    margin-left:3px;
 	}
 	.min-add .min,.min-add .add,.min-add input{
 		display: inline-block;
 	}
 	.min-add input{
 		font-size: 14px;
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
			margin-bottom:0.5rem;
			padding-bottom:1rem;
			padding-left: 1rem;
			.cartcheckbok{
				height:16px;
				margin-top:5%;
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
				padding-top:1.5rem;
			}
			.cart_black{
				padding-right: 1rem;
				color:$color-default;
				text-align: left;
			    box-sizing: border-box;
			    font-size: 1.6rem;
			    padding-top: 1.5rem;
			    text-overflow: ellipsis;
			    white-space: nowrap;
			    overflow: hidden;
			}
			.cart_gray{
				text-align:left;
				color:$color-gray;
				box-sizing:border-box;
				font-size:12px;
			}
			.cart_price{
		    margin-top:5px;
				color:$color-dx;
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
				padding:1.5rem 2.5rem;
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
				height: 4.9rem;
				line-height:4.9rem;
				z-index: 31;
				bottom:5rem;
				left: 0;
				width: 100%;
		}
	}
	.cart-empty {
		padding-top:2rem;
		text-align: center;
		font-size: 1.6rem;
		img{
		max-width:8rem;
		}
		a{
			color:$color-dx;
			margin-left: 1.5rem;
			text-decoration: underline;
		}
	}
</style>