<template>
		<div class="">
			<div class="wap_header">
				<span   class="m_header_bar_back" @click="goback()"><Icon type="ios-arrow-back"></Icon>发票信息</span>
			</div>
		<div class="P15 bg-white pt44">
			<Form :model="invoiceForm" ref="invoiceForm" style="padding: 15px;" :rules="fpruleValidate">
				<FormItem  prop="invoiceType">
					<RadioGroup v-model="invoiceForm.invoiceType">
						<Radio label="增值税普通发票">增值税普通发票</Radio>
						<Radio label="增值税专用发票">增值税专用发票</Radio>
					</RadioGroup>
				</FormItem>
				<div v-if="invoiceForm.invoiceType=='增值税普通发票'">
					<FormItem  prop="headType">
						<RadioGroup v-model="invoiceForm.headType">
						<Radio label="个人">个人</Radio>
						<Radio label="公司">公司</Radio>
					</RadioGroup>
					</FormItem>
						<div v-if="invoiceForm.headType=='公司'">
					<FormItem  prop='invoiceCode'>
						<Input v-model="invoiceForm.invoiceCode" placeholder="纳税人识别码" autocomplete="off"></Input>
					</FormItem>
					</div>
				</div>

				<FormItem  prop="invoiceTitle">
					<Input v-model="invoiceForm.invoiceTitle" placeholder="发票抬头" autocomplete="off"></Input>
				</FormItem>
					<div v-if="invoiceForm.invoiceType=='增值税专用发票'">
					<h5 class="color-blue">专用发票必填信息:</h5>
					<FormItem  prop="bankName">
						<Input v-model="invoiceForm.bankName" placeholder="开户行名称" autocomplete="off"></Input>
					</FormItem>
					<FormItem  prop="bankNo">
						<Input v-model="invoiceForm.bankNo" placeholder="银行账号" autocomplete="off"></Input>
					</FormItem>
					<FormItem  prop='invoiceCode'>
						<Input v-model="invoiceForm.invoiceCode" placeholder="纳税人识别码" autocomplete="off"></Input>
					</FormItem>
					<FormItem  prop="registerAddress">
						<Input v-model="invoiceForm.registerAddress" placeholder="注册地址"></Input>
					</FormItem>
							<FormItem prop="registerPhone">
						<Input v-model="invoiceForm.registerPhone" placeholder="注册电话"></Input>
					</FormItem>
				</div>
				<FormItem  prop="receivePerson">
					<Input v-model="invoiceForm.receivePerson" placeholder="收票人姓名" autocomplete="off"></Input>
				</FormItem>
				<FormItem  prop="receivePhone">
					<Input v-model="invoiceForm.receivePhone" placeholder="收票人手机" autocomplete="off"></Input>
				</FormItem>
				<FormItem  prop="selectedOptionsAddr">
					<Cascader v-model="invoiceForm.selectedOptionsAddr" placeholder="选择所在区域" :data="addressOption"></Cascader>
				</FormItem>
				<FormItem  prop='receiveAddress'>
					<Input v-model="invoiceForm.receiveAddress" placeholder="详细地址" autocomplete="off"></Input>
				</FormItem>
			
			</Form>
	     <div class="btn-wrap"><Button  type="primary" @click="addSubmit" long class="btn-red">保存</Button></div>
	    </div>
	</div>
</template>

<script>
	import { validatePhone } from '@/utils/validate';
	export default {
    data () {
    		 	 const validatename = (rule, value, callback) => {
	          if (value==undefined) {
	            callback(new Error('手机号不能为空'));
	          } else if (!validatePhone(value)) {
	                 callback(new Error('请输入正确的手机号'));
	          }else{
	          	callback();
	          }
	        };
        return {
        	 orderNo:'',
        	 addressOption: [],
        	 tempinvoice:{},
			 invoiceForm: {
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
					registerPhone: [{
							required: true,
						message: '注册电话不能为空',
						trigger: 'blur'
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
    	      	goback(){
    	      		this.$router.back(-1)
    	      	},
    	      	getParams () {
				        // 取到路由带过来的参数 
			        this.invoiceForm.orderNo=this.$route.query.orderNo;
			        this.getInvoice(this.$route.query.orderNo);
				},
				getInvoice(value){
					  	this.$axios({
						    method: 'get',
						    url:'/order/'+value,
						}).then((res)=>{
							if(res.shippingInvoice!=""){
								let old=res.shippingInvoice;
								this.invoiceForm.invoiceTitle=old.invoiceTitle;
						         this.invoiceForm.invoiceType=old.invoiceType;
						         this.invoiceForm.receivePerson=old.receivePerson;
						         this.invoiceForm.receivePhone=old.receivePhone;
						         this.invoiceForm.selectedOptionsAddr=[old.receiveProvince,old.receiveCity,old.receiveDistrict];
					        	 this.invoiceForm.bankName=old.bankName;
								 this.invoiceForm.bankNo=old.bankNo;
								 this.invoiceForm.headType = old.headType
					        	 this.invoiceForm.invoiceCode=old.invoiceCode;
					        	 this.invoiceForm.receiveAddress=old.receiveAddress;
								 this.invoiceForm.registerAddress=old.registerAddress;
								 this.invoiceForm.registerPhone=old.registerPhone;
			        		}
						});
				},
    	      	getAddressOption(){
    	      		  	this.$axios({
						    method: 'post',
						    url:'/common/address',
						}).then((res)=>{
							 this.addressOption=res;
						});
    	      	},
    	      	addSubmit(){
	    	      		this.$refs['invoiceForm'].validate((valid) => {
						     if (valid) {
						     		let temp=this.invoiceForm;
									temp.receiveProvince=this.invoiceForm.selectedOptionsAddr[0];
									temp.receiveCity=this.invoiceForm.selectedOptionsAddr[1];
									temp.receiveDistrict=this.invoiceForm.selectedOptionsAddr[2];
									delete temp['selectedOptionsAddr'];
									this.$axios({
								    method: 'post',
								    url:'/order/invoice/save',
								    data: temp,
									}).then((res)=>{
										if(res.code=='200'){
									        this.$Message.success('提交成功');
									        this.$router.push({path: '/order/detail',query:{orderNo:this.invoiceForm.orderNo}});
										}else {
											this.$Message.error(res.msg);
											return ;
										}
								});
						}
					});
    	      },
		},
		mounted() {
			this.getParams();
			this.getAddressOption();
		}
   }
</script>

<style scoped="scoped">
	.color-blue{
		color: #0099ff;
	}
	.bg-white{
		background: #fff;
	}
	.P15{
		padding: 15px ;
	}
</style>