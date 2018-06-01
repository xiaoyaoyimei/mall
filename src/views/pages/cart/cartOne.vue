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
						<p><label v-if="x.promotionTitle !=null" class="promotion">{{x.promotionTitle}}</label></p>
						<div class='cart_price'>
							￥{{x.salePrice |pricefilter}}	
							<div class="min-add">
						    	<Icon type="minus-round" @click.native="jian(x,index)" class="min"  ></Icon>
						     	 <input class="text-box" name="pricenum"  type="tel" v-model="x.quantity*1" v-on:input="changeNumber($event,x,index)" placeholder="数量" data-max="50" />
						 		 <Icon type="plus-round" @click.native="jia(x,index)" class="add"></Icon>
							</div>
						</div>
					</Col>
				</Col>
			</Checkbox-group>
		</Row>
			<div class='cartfoot'>
				<Row>
					<Col  class='cartCol' span="24">
						<Col  span="6" class="center">
									<Checkbox :indeterminate="indeterminate"  :value="checkAll"   @click.prevent.native="handleCheckAll">全选</Checkbox>
						</Col>
						<Col  span="10">
							<P class='color-dx'>总计：￥{{totalPrice |pricefilter}}</P>
						</Col>
						<Col class='cartButton1' span="8"> 
							<i-button class='cartButton'  @click.prevent.native="paymoney" type="error" v-show="editface"> 
								结算({{zslcount}})
							</i-button>
							 <Button  type="ghost" shape="circle"  @click.prevent.native="remove" v-show="!editface" style="margin-right: 1rem;">删除</Button>
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
              addcart(x){
              		this.$axios({
							    method: 'post',
							    url:'/order/shopping/add',
							    data:{
							    	productItemId:x.id,
							    	quantity:x.quantity
							   	 }
								}).then((res)=>{
									if(res.code=='200'){
										this.getCartList();
									}else{
										 this.$Message.warning(res.object);
									}
							});
              },
        	changeNumber: function(event,x,index){
					var obj=event.target;
					x.quantity = parseInt(obj.value);
					 if(this.temp.indexOf(index)<0){
					     		this.temp.push(index)
					     	}
					        this.checkAllGroup=this.temp;
							this.checkAllGroupChange(this.temp);
							this.addcart(x)
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
						this.addcart(x)
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
						this.addcart(x)
						}
					},
        	getCartList(){
        		if(localStorage.getItem('token')!=undefined){
        			this.nologin=false;
        			this.cartList=[];
        			this.$axios({
							    method: 'post',
							    url:'/order/shopping/list',
								}).then((res)=>{
									if(res.code=='200'){
										this.cartList=res.object;
									}else if(res.code=='401'){
										alert(res.msg)
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
				});
				 sessionStorage.removeItem('cart'); 
		         sessionStorage.setItem('cart', JSON.stringify(goumai)); 
				 this.$router.push({ name:'/carttwo'});
			},
			remove(){
					 let length=this.checkAllGroup.length;
				 if(length==0){
				 	 this.$Message.info('请选择您想要删除的商品');
				 	 return;
				 }
				var ids=[];
				this.checkAllGroup.forEach((i) => {
				  ids.push(this.cartList[i].id)
				});
			
				  this.$Modal.confirm({
                    title: '删除提示',
                    content: '<p><strong>确定要删除这'+length+'种商品？</strong></p>',
                    cancelText: '取消',
                     onOk: () => {
                       	this.$axios({
							    method: 'post',
							    url:'/order/shopping/deleByIds',
							    data:ids
								}).then((res)=>{
									if(res.code==200){
									this.$Message.info(res.object);
									this.getCartList()
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

<style  lang="scss"  scoped="scoped">
	.cart1{
		margin-bottom:55px;
		.center{
			text-align: center;
		}
		.cartCol{
			background-color:#fff;
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
				color:#565656;
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
				color:#999;
				box-sizing:border-box;
				font-size:12px;
			}
			.cart_price{
		    margin-top:5px;
				color:#d32122;
			}
			.color-dx{
				color:#d32122;
				text-align:left;
			}
			.cartButton1{
				text-align:right;
			}
			.cartButton{
				border-radius:0px;
				padding:1.5rem 2.5rem;
				.font-dx{
					color:#d32122;
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
			color:#d32122;
			margin-left: 1.5rem;
			text-decoration: underline;
		}
	}
</style>