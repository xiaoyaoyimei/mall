<template>
		<div class="reg">
          <div class="m_header_bar">
            <router-link to="/login"  class="m_header_bar_back"><Icon type="ios-arrow-back"></Icon></router-link>
			<span class="m_header_bar_title">手机快速注册</span>
		</div>
		<div class="content">
		<p class="color-dx">欢迎来到DXRACER</p>
	   <Form :model="regiForm" label-position="left" :label-width="100" :rules="ruleValidate" ref="regiForm">
           <FormItem label="手机号" prop="loginName">
            <Input v-model.trim="regiForm.loginName" placeholder="请输入手机号"  @blur.native="getTx()" v-bind:value='regiForm.loginName'></Input>
        </FormItem>
           <FormItem label="图形码" prop="verificationCode" class="clearfix">
            <div class="clearfix">
            	<Input v-model="regiForm.verificationCode" placeholder="请输入图形验证码" class="txm"  ></Input>
               <img  :src="verimg"  @click="getTx"  class="tx"/>
               <img src="../assets/img/refresh.png">
             </div>
      		  </FormItem>
        <FormItem label="短信码" prop="shortMessage">
             <div class="clearfix">
             	<Input v-model="regiForm.shortMessage" placeholder="请输入短信验证码" class="txm"></Input>
             		<Button>
						<span v-if="sendMsgDisabled">{{time+'秒后获取'}}</span>
						<span v-if="!sendMsgDisabled"  @click="getDx">获取短信码</span>
					</Button>
             </div>
        </FormItem>
     <FormItem label="密码" prop="passWord">
            <Input v-model="regiForm.passWord" placeholder="请输入密码"></Input>
        </FormItem>
         <FormItem>
            <Button type="primary" @click="handleSubmit('regiForm')" >提交</Button>
            <Button type="ghost" @click="handleReset('regiForm')" style="margin-left: 8px">重置</Button>
        </FormItem>
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
	          	callback(this.getTx());
	          }
	        };
	        const validateYZM=(rule, value, callback) => {
	           if (value==undefined) {
	            callback(new Error('图形验证码不能为空'));
	          } else{
	          	callback();
	          }
	        };
            return {
            	time: 180, // 发送验证码倒计时
            	sendMsgDisabled: false,
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
                      { required: true, message: '密码不能为空', trigger: 'blur' },
                      { type: 'string', min: 6, message: '密码不能少于6位', trigger: 'blur' },
                    ],
                    loginName:[
                      { required: true, validator: validateName, trigger: 'blur' }
                    ],
                    verificationCode:[
                     { required: true, validator: validateYZM, trigger: 'blur' }
                    ],
                    shortMessage:[
                     { required: true, message: '短信验证码', trigger: 'blur' }
                    ]
               },
          }
        },
          methods:{
          	getDx(){
          	let verificationCode=this.regiForm.verificationCode;
          		if(verificationCode==null||verificationCode==''){
          			this.$Message.error('图形码不能为空!');
          		}else{
          			  		//短信验证码180秒倒计时
      			let _this = this;
			    _this.sendMsgDisabled = true;
			    let interval = setInterval(function() {
			     if ((_this.time--) <= 0) {
			      _this.time = 180;
			      _this.sendMsgDisabled = false;
			   	   clearTimeout(interval);
			     }
			    }, 1000);
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
          		//验证用户名是否存在
          		if(this.regiForm.loginName==""){
          			  this.$Message.error('手机号不能为空');
          			  return 
          		}
      		 	this.$axios({
						    method: 'post',
						    url:'/customer/validate?userName='+this.regiForm.loginName,
						}).then((res)=>{
							if(res.code=='200'){
								this.txv++;
      							this.verimg=this.$axios.defaults.baseURL+'customer/'+this.regiForm.loginName+'/verification.png?v='+this.txv;
							}else{
								  this.$Message.error(res.msg);
							}
				});
          			
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
									      let { code, msg } = res;
								              if (code !== 200) {
								                this.$Message.error(res.msg);
								              } else {
								                this.$router.push({ path: '/Login' ,query: { loginName: this.regiForm.loginName}});
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
.reg{ 
	background: #fff;
	font-size: 1.6rem;
	height: 100vh;
	p{
		font-weight: normal;
		font-size:2rem;
		margin-top:1.5rem;
		margin-bottom: 1.5rem;
	}
	.content{
		padding: 1rem 0.5rem;
	}
	.txm{
		width:11rem;
	float: left;
	margin-right:1rem;
	}
	.tx,.dxm{
		height: 32px;
	}.dxm{
		line-height: 32px;
		background: #333;
		color:#fff;
		border: 0 none;
		padding: 0 2px;
	}
}
</style>
<style>
		 .ivu-input{
			border:0 none;
		}
		.ivu-form .ivu-form-item-label{
			font-size: 1.4rem;
			color:#787878;
		}
</style>