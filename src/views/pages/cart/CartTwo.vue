<template>
	<div class='paymoney'>
		<div class="wap_header" >
			<router-link to="/cart" >
				<Icon type="ios-arrow-back"></Icon>确认订单
			</router-link>
		</div>
		<div class="chooseAddress pt44" >
			<ul class="address" v-if="youdizhi">
				<li @click="addAdd">
					<img src="../../../assets/img/icon-address.png">
					<p><strong>{{addressList.person}} <label>{{addressList.phone}}</label></strong>
						<span>{{addressList.receiveProvince}}{{addressList.receiveCity}}{{addressList.receiveDistrict}}{{addressList.address}}</span></p>
					<Icon type="md-arrow-round-forward" />
				</li>
			</ul>
			<div class="zeroAddress" v-else>
				<div @click="addAdd">
					请选择收货地址>
					<Icon class='float float1' type="ios-arrow-right"></Icon>
				</div>
			</div>
		</div>
		<h6>商品及优惠</h6>
		<div class="carttwo">
			<Row class='cartCol' span="24" v-for="(x,index) in cartList" :key="index">
				<i-col span="6"><img class='cartImg' :src="imageSrc+x.image"></i-col>
				<i-col span="18">
					<p class='cart_black clearfix'>
						{{x.itemNo}}
						
						<span v-if="x.promotionTitle ==null&&xscoupon" style="float: right;color:#f00">
					      <label style="text-decoration: line-through;">￥{{x.originSalePrice|pricefilter}}</label> 	<label class="color-dx">￥{{x.salePrice|pricefilter}}</label>
					     </span>
					     <span v-else style="float: right;color:#f00">￥{{x.originSalePrice|pricefilter}}</span>
					    </p>
						<p ><span class='title'>{{x.productName}}</span><span class="num">x{{x.quantity}}
					       	 </span></p>
					</span>
					</p>
					<p class='cart_attr'>
						{{x.productAttr}}
					</p>
					<div class="cart_gray">
						<p v-if="x.promotionTitle !=null" class="promotion">
							{{x.promotionTitle}}
						</p>
					</div>
				</i-col>
			</Row>
		</div>
		<dl  class="yhm" v-show="couponshow"><dt>优惠券</dt><dd><input type="text" placeholder="优惠券" v-model.trim="couponCode" ref="couponValue"/>
			<span @click='usecoupon' class="use">使用</span>
			<span class="color-dx">已优惠:-￥{{(origintotal.price -total.price)|pricefilter}}</span>
		</dd></dl>
			<dl class="bd1"><dt>配送方式</dt><dd><span class="color-dx">快递费用￥{{freight | pricefilter}}</span></dd></dl>
			<dl class="bd1"><dt>发票信息</dt><dd><span class="color-dx spanBtn" @click="modaladdorderNo=true">编辑发票</span></dd></dl>
			<dl><dt>备注留言</dt><dd><textarea>{{beizhu}}</textarea></dd></dl>
		<div class='cartfoot'>
			<button @click="confirm" type="button"> 
				提交订单
			</button>
			<strong>合计:<span class="color-dx">￥{{total.price+freight|pricefilter}}</span></strong>
		</div>
		<Modal v-model="modaladdorderNo" class="modaladdorderNo" title="新增发票信息"  :loading="loading" :mask-closable='false'>
			<Form :model="addInvoice" ref="addInvoice" :rules="fpruleValidate">
				<FormItem  prop="invoiceType">
					<RadioGroup v-model="addInvoice.invoiceType">
						<Radio label="增值税普通发票">增值税普通发票</Radio>
						<Radio label="增值税专用发票">增值税专用发票</Radio>
					</RadioGroup>
				</FormItem>
				<div v-if="addInvoice.invoiceType=='增值税普通发票'">
					<FormItem  prop="headType">
						<RadioGroup v-model="addInvoice.headType">
						<Radio label="个人">个人</Radio>
						<Radio label="公司">公司</Radio>
					</RadioGroup>
					</FormItem>
						<div v-if="addInvoice.headType=='公司'">
					<FormItem  prop='invoiceCode'>
						<Input v-model="addInvoice.invoiceCode" placeholder="纳税人识别码" autocomplete="off"></Input>
					</FormItem>
					</div>
				</div>

				<FormItem  prop="invoiceTitle">
					<Input v-model="addInvoice.invoiceTitle" placeholder="发票抬头" autocomplete="off"></Input>
				</FormItem>
					<div v-if="addInvoice.invoiceType=='增值税专用发票'">
					<h5 class="color-blue">专用发票必填信息:</h5>
					<FormItem  prop="bankName">
						<Input v-model="addInvoice.bankName" placeholder="开户行名称" autocomplete="off"></Input>
					</FormItem>
					<FormItem  prop="bankNo">
						<Input v-model="addInvoice.bankNo" placeholder="银行账号" autocomplete="off"></Input>
					</FormItem>
					<FormItem  prop='invoiceCode'>
						<Input v-model="addInvoice.invoiceCode" placeholder="纳税人识别码" autocomplete="off"></Input>
					</FormItem>
					<FormItem  prop="registerAddress">
						<Input v-model="addInvoice.registerAddress" placeholder="注册地址"></Input>
					</FormItem>
							<FormItem prop="registerPhone">
						<Input v-model="addInvoice.registerPhone" placeholder="注册电话"></Input>
					</FormItem>
				</div>
				<FormItem  prop="receivePerson">
					<Input v-model="addInvoice.receivePerson" placeholder="收票人姓名" autocomplete="off"></Input>
				</FormItem>
				<FormItem  prop="receivePhone">
					<Input v-model="addInvoice.receivePhone" placeholder="收票人手机" autocomplete="off"></Input>
				</FormItem>
				<FormItem  prop="selectedOptionsAddr">
					<Cascader v-model="addInvoice.selectedOptionsAddr" placeholder="选择所在区域" :data="addressOption"></Cascader>
				</FormItem>
				<FormItem  prop='receiveAddress'>
					<Input v-model="addInvoice.receiveAddress" placeholder="详细地址" autocomplete="off"></Input>
				</FormItem>
			
			</Form>
			<div class="btn-wrap"><Button  type="primary" @click="addinvoice" long class="btn-red">保存</Button></div>
		</Modal>

	</div>
</template>
<script>
import { validatePhone } from '@/utils/validate';
	export default {
		data() {
			const validatename= (rule, value, callback) => {
				if(value === undefined) {
					callback(new Error('手机号不能为空'));
				} else if(!validatePhone(value)) {
					callback(new Error('请输入正确的手机号'));
				} else {
					callback();
				}
			};
			return {
				orderfail: false,
				xscoupon: false,
				couponCode: '',
				imageSrc: this.global_.imgurl,
				indeterminate: true,
				checkAll: false,
				checkAllGroup: [],
				totalPrice: 0,
				cartList: [],
				editface: true,
				zslcount: 0,
				temp: [],
				addressList: {},
				youdizhi: false,
				tempcart: [],
				productItemIds: [],
					modelIds:[],
				quantitys: [],
				couponshow: true,
				couponmsg: {
					availableSku: '',
					availableCatalog: '',
					modeValue: '',
					couponMode: ''
				},
				//商品原总价
				origintotal: {
					price: 0,
				},
				//使用优惠券以后的总价
				total: {
					price: 0,
					num: 0
				},
				freight: 0,
				orderfrom: 'B',
				useCouponMsg: '',
				beizhu: '',
				modaladdorderNo: false,
				loading: true,
				addressOption: [],
				orderInvoiceForm:{},
				addInvoice: {
					bankName: '',
					bankNo: '',
					invoiceCode: '',
					invoiceTitle: '',
					headType:'个人',
					invoiceType: '增值税普通发票',
					receiveAddress: '',
					receivePerson: '',
					registerAddress: '',
					receivePhone: '',
					selectedOptionsAddr: [],
					registerPhone:''
				},
				fpruleValidate: {
					selectedOptionsAddr: [{
						required: true,
						type: 'array',
						message: '请选择省市区',
						trigger: 'change'
					}],
					bankName: [{
						required: true,
						message: '开户行名称不能为空',
						trigger: 'blur'
					}],
					bankNo: [{
						required: true,
						message: '银行账号不能为空',
						trigger: 'blur'
					}],
					invoiceCode: [{
						required: true,
						message: '纳税人识别码不能为空',
						trigger: 'blur'
					}],
					invoiceTitle: [{
						required: true,
						message: '发票抬头不能为空',
						trigger: 'blur'
					}, ],
					invoiceType: [{
						required: true,
						message: '发票类型不能为空',
						trigger: 'change'
					}],
					receiveAddress: [{
						required: true,
						message: '详细地址不能为空',
						trigger: 'blur'
					}],
					receivePerson: [{
						required: true,
						message: '收票人姓名不能为空',
						trigger: 'blur'
					}],
					receivePhone: [{
						required: true,
						trigger: 'blur',
						validator: validatename,
					}],
					registerAddress: [{
						required: true,
						message: '注册地址不能为空',
						trigger: 'blur'
					}],
					
					},
			}
		},
		methods: {
			addinvoice() {
				this.loading = false;
				this.$nextTick(() => {
					this.loading = true;
					this.$refs['addInvoice'].validate((valid) => {
						if(valid) {
							let temp = this.addInvoice;
							temp.receiveProvince = this.addInvoice.selectedOptionsAddr[0];
							temp.receiveCity = this.addInvoice.selectedOptionsAddr[1];
							temp.receiveDistrict = this.addInvoice.selectedOptionsAddr[2];
							 this.orderInvoiceForm  = Object.assign({}, temp);
							 delete this.orderInvoiceForm['selectedOptionsAddr']
							 this.modaladdorderNo = false;
						}
					})
				}, 2000)
			},
			getAddressOption(){
    	      	this.$axios({
					method: 'post',
					url:'/common/address',
				}).then((res)=>{
					 this.addressOption=res;
				});
    	    },
			//总价计算
			jisuan(value) {
				let _this = this;
				
				if(this.cartList == null) {
					return
				} else {
					//刚进入购物车页面
					if(value == undefined) {
						_this.total.num = 0;
						this.cartList.forEach(function(item, index) {
							_this.origintotal.price += item.originSalePrice * item.quantity;
							_this.total.price += item.salePrice * item.quantity;
							_this.total.num += item.quantity;
						});
					}
					//使用优惠券
					else {
						_this.total.num = 0;
						this.cartList.forEach(function(item, index) {
							_this.total.num += item.quantity;
						});
						let couponmethod = value;
						if(couponmethod.availableSku == "" && couponmethod.availableCatalog == ""&&couponmethod.availableModel=="") {
							_this.total.price = 0;
							if(couponmethod.couponMode == 'rate') {
								this.cartList.forEach(function(item, index) {
									if(item.promotionTitle != '' && item.promotionTitle != null && item.promotionTitle != undefined) {
										_this.total.price += item.salePrice * item.quantity;
									} else {
										item.salePrice = item.salePrice * (1 - couponmethod.modeValue);
										_this.total.price += item.salePrice * item.quantity;
									}
								});
							} else {
								this.cartList.forEach(function(item, index) {
									if(item.promotionTitle != '' && item.promotionTitle != null && item.promotionTitle != undefined) {
										_this.total.price += item.salePrice * item.quantity;
									} else {
										item.salePrice = item.salePrice - couponmethod.modeValue;
										_this.total.price += item.salePrice * item.quantity;
									}
								});
							}
						} else if(couponmethod.availableSku != "") {
							_this.total.price = 0;
							if(couponmethod.couponMode == 'rate') {
								this.cartList.forEach(function(item, index) {
									if(item.id == couponmethod.availableSku) {
										item.salePrice = item.salePrice * (1 - couponmethod.modeValue);
										_this.total.price += item.salePrice * item.quantity
									} else {
										_this.total.price += item.salePrice * item.quantity;
									}
								});
							} else {
								this.cartList.forEach(function(item, index) {
									if(item.id == couponmethod.availableSku) {
										item.salePrice = item.salePrice - couponmethod.modeValue
										_this.total.price += item.salePrice * item.quantity
									} else {
										_this.total.price += item.salePrice * item.quantity;
									}

								});
							}
						} else if(couponmethod.availableModel != "") {
							_this.total.price = 0;
							if(couponmethod.couponMode == 'rate') {
								this.cartList.forEach(function(item, index) {
									if(item.productId == couponmethod.availableModel) {
										item.salePrice = item.salePrice * (1 - couponmethod.modeValue);
										_this.total.price += item.salePrice * item.quantity
									} else {
										_this.total.price += item.salePrice * item.quantity;
									}
								});
							} else {
								this.cartList.forEach(function(item, index) {
									if(item.productId == couponmethod.availableModel) {
										item.salePrice = item.salePrice - couponmethod.modeValue
										_this.total.price += item.salePrice * item.quantity
									} else {
										_this.total.price += item.salePrice * item.quantity;
									}

								});
							}
						} 
						else {
							_this.total.price = 0;
							if(couponmethod.couponMode == 'rate') {
								this.cartList.forEach(function(item, index) {
									if(item.productType == couponmethod.availableCatalog) {
										item.salePrice = item.salePrice * (1 - couponmethod.modeValue);
										_this.total.price += item.salePrice * item.quantity
									} else {
										_this.total.price += item.salePrice * item.quantity;
									}
								});
							} else {
								this.cartList.forEach(function(item, index) {
									if(item.productType == couponmethod.availableCatalog) {
										item.salePrice = item.salePrice - couponmethod.modeValue;
										_this.total.price += item.salePrice * item.quantity
									} else {
										_this.total.price += item.salePrice * item.quantity;
									}
								});
							}
						}
					}
				}
			},
			getDD() {
				let routerParams = this.$route.params.address;
				var province='';
				if(routerParams != undefined) {
					this.addressList = routerParams;
					this.youdizhi = true
					province=routerParams.receiveProvince;
				}
				
				var price = [],
					quantity = [],
					typeIds = [];

				this.cartList.forEach(function(item, index) {
					price.push(item.salePrice);
					quantity.push(item.quantity);
					typeIds.push(item.productCatalog);
				});
				this.$axios({
					method: 'post',
					url: '/order/getShipPrice',
					data: {
						"price": price,
						"province": province,
						"quantity": quantity,
						"typeIds": typeIds
					}
				}).then((res) => {
					if(res.code == 200) {
						this.freight = res.object;
						//						this.total.price+=this.freight
					}

				});
			},
			getCartList() {
				this.cartList = JSON.parse(sessionStorage.getItem('cart'));
				if(this.cartList != null) {
					var _this = this;
					_this.productItemIds = [];
					_this.quantitys = [];
					let n = 0;
					this.cartList.forEach(function(item, index) {
						if(item.promotionTitle != '' && item.promotionTitle != null) {
							n += 1;
						}
						_this.productItemIds.push(item.id);
						_this.quantitys.push(item.quantity)
						_this.modelIds.push(item.productId)
						
					});
					if(this.cartList.length == n) {
						this.couponshow = false
					} else {
						this.couponshow = true
					}
					}
			},
			addAdd() {
				localStorage.setItem('fromc', 'dingdan')
				this.$router.push({
					name: '/user/address'
				});
			},
			getAddress() {
				var _this = this;
				this.$axios({
					method: 'post',
					url: '/address',
				}).then((res) => {
					if(res.length > 0) {
						res.map(function(i) {
							if(i.isDefault == 'Y' && JSON.stringify(_this.addressList) == "{}") {
								_this.addressList = i;
								_this.youdizhi = true
							}
						});

					}
				});
			},
			confirm() {
				if(this.addressList.id == undefined) {
					this.$Modal.error({
						content: '收货地址不能为空',
					});
					return;
				}
				let para = {
					addressId: this.addressList.id,
					productItemIds: this.productItemIds,
					couponCode: this.couponCode,
					remark: this.beizhu,
					type: this.orderfrom,
					quantity: this.quantitys,
					modelIds:this.modelIds,
					orderInvoiceForm:this.orderInvoiceForm,
				};
				this.$axios({
					method: 'post',
					url: '/order/shopping/confirm',
					data: para
				}).then((res) => {
					if(res.code == '200') {
						//订单提交以后清空列表
						sessionStorage.removeItem("cart")
						this.$router.push({
							name: '/cartthree',
							query: {
								orderNo: res.object.orderAddress.orderNo
							}
						});
					} else {
						this.$Modal.error({
							title: '失败提示',
							content: res.msg,
						});
					}
				});
			},
			//使用优惠券
				usecoupon() {
				this.xscoupon = false;
				let _this = this;
				_this.couponCode = this.$refs['couponValue'].value;
				if(this.couponCode == '') {
					this.$Message.error('优惠码不能为空');
					return;
				}
				let para = {
					modelIds:this.modelIds,
					productItemIds: this.productItemIds,
					couponCode: this.couponCode,
					quantity: this.quantitys
				};
				this.$axios({
					method: 'post',
					url: '/promotion/coupon',
					data: para
				}).then((res) => {
					this.cartList = JSON.parse(sessionStorage.getItem('cart'));
					if(res.code == '200') {
						this.xscoupon = true;
						this.couponmsg = Object.assign({}, res.object);
						this.jisuan(this.couponmsg);
						this.useCouponMsg=''
					} else {
						this.xscoupon = false;
						this.useCouponMsg = res.object;
						this.$Message.error(res.object);
					}
				});
			},
		},
		mounted() {
			//获取from类型A为立即下单，B为来自购物车1
			this.orderfrom = localStorage.getItem('orderfrom');
			this.cartList = JSON.parse(sessionStorage.getItem('cart'));
			if(this.cartList == null) {
				this.$router.push({
					name: '/cart'
				});
			} else {
					this.getDD();
				this.getAddress();
				this.getCartList();
				this.jisuan();
				this.getAddressOption()
			}
		}
	}
</script>
<style lang="scss" scoped="scoped">
 .wap_header{
 	background: red;
 	a{
 		color: #fff;
 	}
 }
	h6 {
		border-top: 1px solid #ddd;
		font-size: 1.6rem;
		color: #333;
		padding-top: 1rem;
		padding-left: 1.5rem;
	}
	
	.paymoney {
		padding-bottom:6rem;
		font-size: 1.6rem;
	}
	
	.oldprice {
		text-decoration: line-through;
		font-style: normal;
		font-size: 1.4rem;
	}
	.carttwo{
			margin-top: 1rem;
		padding: 1rem 1rem 0;
		background: #fff;
		border-top: 1px solid #ddd;
	}
	dl{
		display: flex;
		padding: 1rem 1.5rem;
		dt{
			color: #333;
			margin-right: 1.5rem;
			font-size: 1.6rem;
		}
		dd{
			flex: 1;
			 textarea{
			 	width: 100%;
			 	border: 1px solid #ddd;
			 }
			 .color-dx{
			 	float: right;
			 	
			 }
		}
		
	}
	.yhm {
		margin-bottom: 1rem;
		border-bottom: 1px solid #ddd;
		input {
			margin-left: 1rem;
			margin-right: 1rem;
			width: 10rem
		}
	}
	
	.cart_attr {
		font-size: 1.4rem;
	}
	.cartCol:not(:last-child){
			border-bottom: 1px solid #eee;
	}
	.cartCol {
		padding: 1rem 0;
		width: 100%;
		overflow: hidden;
	
		img {
			max-width: 100%;
		}
	}
	
	.cart_gray span {
		display: block;
		strong {
			color: red;
			font-size: 1.6rem;
		}
	}
	.num{
		color: #333;
	}
	.carttwo .color-dx,.num{
		float: right;
	}
	.cartfoot {
		position: fixed;
		background: #fff;
		border-top: 1px solid #eee;
		height: 4.9rem;
		line-height: 4.9rem;
		bottom: 0px;
		width: 100%;
		strong {
			margin-right: 1rem;
				float: right;
			font-size: 1.2rem;
			display: inline-block;
			span {
				font-size: 1.8rem;
			}
		}
		button {
			float: right;
			height: 100%;
			background: red;
			color: #fff;
			border: 0 none;
			padding-left: 15px;
			padding-right: 15px;
			cursor: pointer;
		}
	}
	
	.yhm input {
		font-size: 1.2rem;
		padding-left: 0.3rem;
		padding-top: 0.5rem;
		padding-bottom: 0.5rem;
		border: 1px solid #ccc;
		width: 16rem;
	}
	
	.use {
		    color: #333;
    border: 1px solid #333;
    padding: 0.2rem;
    float: right;
	}
	.bd1{
		border-bottom: 1px solid #ddd;
	}
	.spanBtn{
		padding-left: 1.5rem;
		padding-right: 1.5rem;
		padding-top: 0.5rem;
		height: 3rem;
		font-weight: 400;
		font-size: 1.4rem;
		background-color: #FFFFFF;
		border: 0.1px solid red;
		color: #FF0000;
	}
	.color-blue{
		color: #0099ff;
	}
</style>
<style>
.paymoney .ivu-scroll-container{
	height: 100vh!important;
}
.modaladdorderNo .ivu-modal-footer{
	display: none!important;
}
</style>
