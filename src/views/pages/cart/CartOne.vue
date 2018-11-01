<template>
	<div class='cart1'>
		<div class="m_header_bar bg-red">
			<router-link to="/sort"  class="m_header_bar_back"><Icon type="ios-arrow-back"></Icon></router-link>
			<span class="m_header_bar_title">购物车</span>
			<span  @click="edit" v-show="editface" class="m_header_bar_menu" v-if="hasShow">编辑</span>
			<span  @click="edit" v-show="!editface"  class="m_header_bar_menu">完成</span>
		</div>
		<div v-if="hasShow">
		<Row class="P15">
		    <Checkbox-group v-model="checkAllGroup" @on-change="checkAllGroupChange">
		 		<Col  class='cartCol' span="24" v-for="(x,index) in cartList" :key="index">
        			<Col class='cartcheckbok' span="2">
        			<Checkbox  :label="index" :key="index"></Checkbox></Col>
					<Col span="6" ><img class='cartImg' :src="imageSrc+x.image"></Col>
					<Col span="16">
						<p class='cart_black'>{{x.itemNo}}</p>
						<p class='cart_black'>{{x.productName}}</p>
						<p class='cart_gray'>{{x.productAttr}}</p>
						<p><label v-if="x.promotionTitle !=null" class="promotion">{{x.promotionTitle}}</label></p>
						<div class='cart_price'>
							￥{{x.salePrice |pricefilter}}
							<div class="min-add">
						    	<!-- <span @click="jian(x,index)" class="min">-</span>-->
						    	 <img src="../../../assets/img/minus.png" @click="jian(x,index)" class="min">
						     	 <input class="text-box" name="pricenum"  type="text" v-model.lazy="x.quantity" v-on:blur="changeNumber($event,x,index)" placeholder="数量" data-max="50" />
						 		 <Icon type="md-add" @click.native="jia(x,index)" class="add"/>
							</div>
						</div>
					</Col>
				</Col>
			</Checkbox-group>
		</Row>
			<div class='cartfoot'>
				<Row>
					<Col   span="24">
						<Col  span="6" class="center">
							<Checkbox :indeterminate="indeterminate"  :value="checkAll"   @click.prevent.native="handleCheckAll">全选</Checkbox>
						</Col>
						<Col  span="12">
							<P class='color-dx'>总计：￥{{totalPrice |pricefilter}}</P>
						</Col>
						<Col class='cartButton1' span="6">
							<button class='cartButton'  @click="paymoney"  v-show="editface">
								结算({{zslcount}})
							</button>
							 <button   @click="remove" v-show="!editface" class="btn-del">删除</button>
						</Col>
					</Col>
				</Row>
			</div>
			<Spin size="large" fix v-if="spinShow"></Spin>
			</div>
			<div class="flex-center  empty"  v-if="!cartnologin&&!hasShow">
			<img src="../../../assets/img/cart_empty.png" style="max-width: 8rem;">
			<p>您还没有加入任何商品</p>
				<router-link to="/" class="color-dx">去购物</router-link>
			</div>
				<div class="cart-empty" v-if="cartnologin" >
			<img src="../../../assets/img/cart_empty.png">
			<p>登录后可同步购物车中商品</p>
			<br/>
			<router-link to="/login" class="color-dx">登录</router-link>
			</div>
			<!--加载中-->
	</div>
</template>

<script>
	import store from '@/store/store'
export default {
        data () {
            return {
            	 spinShow:false,
            	cartnologin:true,
            	imageSrc:this.global_.imgurl,
                indeterminate: false,
                checkAll: false,
				checkAllGroup:[],
				totalPrice:0,
				cartList:[],
				editface:true,
				zslcount:0,
				temp:[],
				hasShow:true,
            }
		},
			         computed: {
            token() {
            	//获取store里面的token
                return store.state.token;
            },
        },
        methods: {
			addcart(x) {
				this.$axios({
					method: 'post',
					url: '/order/shopping/add',
					data: {
						productItemIds: [x.id],
						quantity: x.quantity
					}
				}).then((res) => {
					if(res.code == '200') {
						Bus.$emit('cartmsg', "again");
					} else {
						this.$Message.warning(res.object);
					}
				});
			},
        	changeNumber: function(event,x,index){
					var obj=event.target;
					 let n = /^[1-9]\d*$/; 
			        if(!n.test(obj.value)){
			            this.$Message.warning('商品数量须大于0个，请输入正整数');
			            obj.value=1
			            return ;
			        }
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
        				let _this = this;
					this.cartnologin = false;
					this.cartList = [],
						this.$axios({
							method: 'post',
							url: '/order/shopping/list',
						}).then((res) => {
							if(res.code == '200') {
								this.hasShow=true;
								this.cartList = res.object;
								this.totalnum = 0;
								this.sale = 0;
								this.cartList.forEach((item, index) => {
									_this.totalnum += parseInt(item.quantity);
									_this.sale += parseInt(item.originSalePrice - item.salePrice) * 100 * parseInt(item.quantity)
								});
								_this.sale = (_this.sale / 100).toFixed(2)
								this.handleCheckAll();
							}
							else{
								this.hasShow=false;
							}
						});
				
        	},
			edit(){
				this.editface=!this.editface;
				this.handleCheckAll();
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
					if(this.token!=null&&this.token!=""&&this.token!=undefined){
			this.getCartList();
			}else{
					this.cartnologin = true;
					return false;
			}
		}
    }
</script>

<style  lang="scss"  scoped="scoped">
.min{
	    width: 1.2rem;
    position: relative;
    top: 0.2rem;
}
.P15{
			font-size: 1.6rem;
}
	.cart1{
		margin-bottom:55px;
		.center{
			text-align: center;
		}
		.cartCol{
			padding: 1rem;
			background-color:#fff;
		  border-top: 1px solid #eee;
		  border-bottom: 1px solid #eee;
		  margin-top:1rem;
			.cartcheckbok{
				padding-left: 0.5rem;
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
			}
			.cart_black{
				color:#333;
				text-align: left;
			    box-sizing: border-box;
			    font-size: 1.6rem;
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
				color:#ff0000;
				font-weight: bold;
			}
			.color-dx{
				text-align:left;
			}
			.cartButton1{
				text-align:right;
				button{
					border: 0 none;
					padding-left:2rem;
					padding-right: 2rem;
				}
				.btn-del{
					background: #fff;
					color:#333;
					border:1px solid #ccc;
					height: 3rem;
					line-height: 3rem;
					margin-right: 1rem;
					border-radius: 1.5rem;
				}
				.btn-del:hover{
					background: #f5f5f5;
				}
			}

		}
		.cartfoot{
			    background: #fff;
				border-top: 1px solid #eee;
				position: fixed;
				height: 4.9rem;
				line-height:4.9rem;
				z-index: 31;
				bottom:4.9rem;
				left: 0;
				width: 100%;
				font-size: 1.6rem;
		}
		.cartButton{
				background: #ff0000;
		}
		.btn-del{
			background:#333
		}
		.cartButton,.btn-del{
			color:#fff;
		
			border: 0 none;
			padding: 0 1.5rem;
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
			color:#ff0000;
			margin-left: 1.5rem;
			text-decoration: underline;
		}
	}
</style>
