<template>
	<div>
		<div class="m_header_bar bg-red">
            <router-link to="/login"  class="m_header_bar_back"><Icon type="ios-arrow-back"></Icon></router-link>
			<span class="m_header_bar_title">重置密码</span>
		</div>
		<div class="log-forget">
		<Form :model="forgetForm"  :rules="ruleValidate" ref="forgetForm" class="form_wrap">
			     <FormItem  >
        <span class="font-16 text-center"> {{mobile}}</span>
        </FormItem>
     <FormItem  prop="passWord">
            <Input v-model="forgetForm.passWord" placeholder="请输入新密码" type="password"></Input>
        </FormItem>
             <FormItem  prop="confirmpassWord">
            <Input v-model="forgetForm.confirmpassWord" placeholder="请确认新密码" type="password"></Input>
        </FormItem>
         <FormItem>
            <Button type="primary" @click="handleSubmit()" class="btn-red" >确定</Button>
        </FormItem>
    </Form>
    </div>
	</div>
</template>

<script>
	  export default {
        data () {
        			var validatePass = (rule, value, callback) => {
				if(value === '') {
					callback(new Error('请再次输入密码'));
				} else if(value !== this.forgetForm.passWord) {
					callback(new Error('两次输入密码不一致!'));
				} else {
					callback();
				}
			};
            return {
            	mobile:'',
                forgetForm: {
                    passWord: '',
                    confirmpassWord:''
                },
                ruleValidate: {
                    passWord:[
                      { required: true, message: '新密码不能为空', trigger: 'blur' },
                        { type: 'string', min: 6, message: '新密码不能少于6位', trigger: 'blur' }
                    ],
                    confirmpassWord: [{
						required: true,
						validator: validatePass,
						trigger: 'blur'
					}]
               },
          }
        },
          methods:{
          	getDx(){
          	   let verificationCode=this.regiForm.verificationCode;
          		if(verificationCode==null||verificationCode==''){
          			this.$Message.error('图形码不能为空!');
          		}else{
          		this.$axios({
					    method: 'post',
					    url:'/customer/register/shortmessage',
					    data:{
					    		 "mobile":this.regiForm.mobile,
					    		  "verificationCode":this.regiForm.verificationCode
					    	},
					}).then((res)=>{
						     if (res.code == 200) {
						     		  		//短信验证码180秒倒计时
					      			let _this = this;
								    _this.sendMsgDisabled = true;   
								    _this.startTime();
		              		} else{
		              			 this.$Message.error(res.msg);
		              		}
					});
					}
          	},
          	 startTime(){
          	 	if(this.time==0){
          	 		  this.time = 180;
				      this.sendMsgDisabled = false;
				      clearTimeout(this.t);
          	 		}
					else{
					    this.time--;
					 }
					 let self=this;
                      this.t= setTimeout(() => {
                                self.startTime();
                        }, 	1000);
				},
          	getTx(){
          		//验证用户名是否存在
          		if(this.forgetForm.mobile==""||this.forgetForm.mobile==null){
          			  this.$Message.error('手机号不能为空');
          			  return ;
          		}
          		 	this.$axios({
							    method: 'post',
							    url:'/customer/validate?userName='+this.regiForm.mobile,
							}).then((res)=>{
								if(res.code!=='200'){
									this.txv++;
									let urlo=window.location.origin;
          							//this.verimg=urlo+'/mall/wap/customer/'+this.regiForm.mobile+'/verification.png?v='+this.txv;
          						 this.verimg=this.$axios.defaults.baseURL+'/customer/'+this.regiForm.mobile+'/verification.png?v='+this.txv;
								}else{
									  this.$Message.error('该手机号不存在，请注册');
								}
							});
          			
          	},
            handleSubmit () {
            	if(this.forgetForm.mobile==""){
          			  this.$Message.error('手机号不能为空');
          			  return ;
          		}
                this.$refs['forgetForm'].validate((valid) => {
                	var mobile=this.mobile;
                    if (valid) {
                    	let para = {
                    		mobile:mobile,
                    		password:this.forgetForm.passWord,
                    	}
		                    	this.$axios({
							    method: 'post',
							    url:'/customer/reset/password',
							    data:para,
							}).then((res)=>{
									    			if(res.code == 200) {
								     this.$Message.success({
						                content: '找回密码成功,2秒后自动跳往登录页',
						                duration: 2
						            });
						           		setTimeout(() => {
											this.$router.push({
												path: '/login',
												params: {
													loginName: mobile
												}
											});
										}, 3000);


							} else {
								this.$Message.error(res.object);
							}
							});
						}
                     })
            },
        },
        mounted(){
        	this.mobile=this.$route.query.mobile
        }
       }
</script>

<style scoped="scoped">
	.text-center{
		text-align: center;
		display: block
	}
</style>