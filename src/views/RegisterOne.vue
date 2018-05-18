<template>
		<div class="login">
			<router-link to="/login"><Icon type="ios-arrow-left"></Icon></router-link>
			<div class="ding">
			<h3>注册</h3>
            <h6>欢迎来到DXRACER</h6>
            </div>
	   <Form :model="regiForm" label-position="left" :label-width="100" :rules="ruleValidate" ref="regiForm">
           <FormItem label="手机号" prop="loginName">
            <Input v-model.trim="regiForm.loginName" placeholder="请输入手机号"  @blur.native="getTx()" v-bind:value='regiForm.loginName'></Input>
               <!--<Button type="primary" :loading="loadingtx"  @click="getTx">
	        <span v-if="!loadingtx">获取图形码</span>
	        <span v-else>Loading...</span>
   			 </Button>-->
          
        </FormItem>
           <FormItem label="图形验证码" prop="verificationCode">
      <Input v-model="regiForm.verificationCode" placeholder="请输入图形验证码"></Input>
             <img  :src="verimg"  @click="getTx"/>
                  <!--<Button type="primary" :loading="loadingDx"   @click="getDx">
	        <span v-if="!loadingDx">获取短信验证码</span>
	        <span v-else>Loading...</span>
   			 </Button>-->
        </FormItem>
        <FormItem label="短信验证码" prop="shortMessage">
            <Input v-model="regiForm.shortMessage" placeholder="请输入短信验证码"></Input>
        </FormItem>
     <FormItem label="密码" prop="passWord">
            <Input v-model="regiForm.passWord" placeholder="请输入密码"></Input>
        </FormItem>
         <FormItem>
            <Button type="primary" @click="handleSubmit('regiForm')">提交</Button>
            <Button type="ghost" @click="handleReset('regiForm')" style="margin-left: 8px">重置</Button>
        </FormItem>
    </Form>
    </div>
</template>

<script>
	    import { validatePhone } from '@/utils/validate';
	  export default {
        data () {
        	 const validateName = (rule, value, callback) => {
	          if (value.length < 1) {
	            callback(new Error('手机号不能为空'));
	          } else if (!validatePhone(value)) {
	                 callback(new Error('请输入正确的手机号'));
	          }else{
	          	callback(this.getTx());
	          }
	        };
	        const validateYZM=(rule, value, callback) => {
	          if (value.length < 1) {
	            callback(new Error('验证码不能为空'));
	          } else{
	          	callback(this.getDx());
	          }
	        };
            return {
            	loadingDx:false,
            	loadingtx:false,
            	txv:1,
            	verimg:'',
                regiForm: {
                    passWord: '',
                    loginName:'',
                    shortMessage: '',
                    verificationCode:''
                },
                ruleValidate: {
                    passWord:[
                      { required: true, message: 'The passWord cannot be empty', trigger: 'blur' }
                    ],
                    loginName:[
                      { required: true, validator: validateName, trigger: 'blur' }
                    ],
                    verificationCode:[
                     { required: true, validator: validateYZM, trigger: 'blur' }
                    ],
                    shortMessage:[
                     { required: true, message: 'The shortMessage cannot be empty', trigger: 'blur' }
                    ]
               },
          }
        },
          methods:{
          	getDx(){
          		this.loadingDx = true;
          		let loginName=this.regiForm.loginName;
          		if(loginName==null||loginName==''){
          			this.$Message.error('手机号不能为空!');
          			this.loadingDx = false;
          		}else{
          		this.$axios({
					    method: 'post',
					    url:'/customer/register/shortmessage',
					    data:{
					    		 "mobile":loginName,
					    		  "verificationCode":this.regiForm.verificationCode
					    	},
					}).then((res)=>{
						     if (res.code !== 200) {
		                 		 this.$Message.error(res.msg);
		              		} 
							this.loadingDx = false;
					});
					}
          	},
          	getTx(){
          			this.txv++;
          			this.verimg=this.$axios.defaults.baseURL+'customer/'+this.regiForm.loginName+'/verification.png?v='+this.txv;
          	},
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                    	let para = Object.assign({}, this.regiForm);
		                    	this.$axios({
							    method: 'post',
							    url:'/customer/register',
							    data:para,
							}).then((res)=>{
									this.loadingDx = false;
									      let { code, msg } = res;
								              if (code !== 200) {
								                this.$Message.error(res.msg);
								              } else {
								                this.$router.push({ path: '/Login' ,params: { loginName: this.regiForm.loginName }});
								              }
							});
							}
                      })
            },
            handleReset (name) {
                this.$refs[name].resetFields();
            }
        }
       }
</script>

<style scoped="scoped" lang="scss">
.login i{
	font-size: 1.25rem;
	color:#333;
	font-weight: bold;
}
</style>
<style>
		.ivu-form-item:not(:last-child) {
			border-bottom: 1px  solid #eee;
		}
		 .ivu-input{
			border:0 none;
		}
		.ivu-form .ivu-form-item-label{
			font-size: 14px;
		}
</style>