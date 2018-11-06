<template>
		<div class="">
			<div class="m_header_bar">
			<span   class="m_header_bar_back" @click="goback()"><Icon type="ios-arrow-back"></Icon></span>
			<span class="m_header_bar_title">发票信息</span>
			<span  @click="addSubmit" class="m_header_bar_menu">保存</span>
		</div>
		<div class="P15 bg-white">
			<Form :label-width="100" :model="invoiceForm" ref="invoiceForm" :rules="ruleValidate"  style="background: #fff;"> 
			<FormItem label="订单编号" prop="orderNo">
	            <Input  placeholder="订单编号"  :value="invoiceForm.orderNo" disabled></Input>
	        </FormItem>
	        <FormItem label="发票抬头"  prop="invoiceTitle">
	        	 <Input  v-model="invoiceForm.invoiceTitle" ></Input>
	        </FormItem>
	        <FormItem label="发票类型" prop="invoiceType">
					  <RadioGroup v-model="invoiceForm.invoiceType" >
				        <Radio label="增值税普通发票">增值税普通发票</Radio>
				        <Radio label="增值税专用发票">增值税专用发票</Radio>
   					 </RadioGroup>
				</FormItem>
	         <FormItem label="收票人姓名" prop="receivePerson">
	            <Input v-model="invoiceForm.receivePerson" placeholder="收票人姓名" ></Input>
	        </FormItem>
	        <FormItem label="收票人手机" prop="receivePhone">
	            <Input v-model="invoiceForm.receivePhone" placeholder="收票人手机" ></Input>
	        </FormItem>
	       		<FormItem label="所在地区"  prop="selectedOptionsAddr">
				       <Cascader  v-model="invoiceForm.selectedOptionsAddr" :data="addressOption"></Cascader>
				</FormItem>
	        <FormItem label="详细地址" prop="receiveAddress">
	            <Input v-model="invoiceForm.receiveAddress" placeholder="详细地址" ></Input>
	        </FormItem>
	       <div v-if="invoiceForm.invoiceType=='增值税专用发票'">
	         <FormItem label="开户行名称" prop="bankName">
	            <Input v-model="invoiceForm.bankName" placeholder="开户行名称" ></Input>
	        </FormItem>
	        <FormItem label="银行账号" prop="bankNo">
	            <Input v-model="invoiceForm.bankNo" placeholder="银行账号" ></Input>
	        </FormItem>
	        <FormItem label="纳税人识别码" prop="invoiceCode">
	            <Input v-model="invoiceForm.invoiceCode" placeholder="纳税人识别码" ></Input>
	        </FormItem>
	        <FormItem label="注册地址" prop="registerAddress">
	            <Input v-model="invoiceForm.registerAddress" placeholder="注册地址" ></Input>
	        </FormItem>
	        </div>
	    </Form>
	    </div>
	</div>
</template>

<script>
	import { validatePhone } from '@/utils/validate';
	export default {
    data () {
    		 	 const validateName = (rule, value, callback) => {
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
			  					orderNo:this.orderNo,
			  					invoiceTitle:'',
								invoiceType:'增值税普通发票',
								receivePerson:'',
								receivePhone:'',
								selectedOptionsAddr:[],
		                   		bankName:'',
								bankNo:'',
								invoiceCode:'',
								receiveAddress:'',
								registerAddress:'',
		                },
		            ruleValidate: {
	                    invoiceTitle: [ { required: true, message: '发票抬头不能为空', trigger: 'blur' }],
	                    receiveAddress:[ { required: true, message: '详细地址不能为空', trigger: 'blur' }],
	                    receivePhone:[{ required: true, validator: validateName, trigger: 'blur'}],
	                    receivePerson:[{ required: true, message: '收票人姓名不能为空', trigger: 'blur' }],
	                    selectedOptionsAddr: [ { required: true, type: 'array',message: '请选择省市区', trigger: 'change' }],
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
					        	 this.invoiceForm.invoiceCode=old.invoiceCode;
					        	 this.invoiceForm.receiveAddress=old.receiveAddress;
					        	 this.invoiceForm.registerAddress=old.registerAddress;
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
	.bg-white{
		background: #fff;
	}
	.P15{
		padding: 15px ;
	}
</style>