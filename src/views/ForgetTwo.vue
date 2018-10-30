<template>
	<div>
		<div class="m_header_bar bg-red">
            <router-link to="/login"  class="m_header_bar_back"><Icon type="ios-arrow-back"></Icon></router-link>
			<span class="m_header_bar_title">重置密码</span>
		</div>
		<Form :model="forgetForm"  :rules="ruleValidate" ref="forgetForm">
     <FormItem  prop="passWord">
            <Input v-model="forget.passWord" placeholder="请输入新密码"></Input>
        </FormItem>
             <FormItem  prop="confirmpassWord">
            <Input v-model="forget.confirmpassWord" placeholder="请输入新密码"></Input>
        </FormItem>
         <FormItem>
            <Button type="primary" @click="handleSubmit()" class="btn-red" >确定</Button>
        </FormItem>
    </Form>
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
                forgetForm: {
                    passWord: '',
                    confirmpassWord:''
                },
                ruleValidate: {
                    passWord:[
                      { required: true, message: '密码不能为空', trigger: 'blur' },
                        { type: 'string', min: 6, message: '密码不能少于6位', trigger: 'blur' }
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
          		if(this.regiForm.mobile==""||this.regiForm.mobile==null){
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
            	if(this.regiForm.mobile==""){
          			  this.$Message.error('手机号不能为空');
          			  return ;
          		}
                this.$refs['regiForm'].validate((valid) => {
                    if (valid) {
                    	let para = {
                    		mobile:this.regiForm.mobile,
                    		password:this.regiForm.passWord,
                    		shortMessage:this.regiForm.shortMessage,
                    	}
		                    	this.$axios({
							    method: 'post',
							    url:'/customer/reset/password',
							    data:para,
							}).then((res)=>{
									      let { code, msg } = res;
								              if (code !== 200) {
								                this.$Message.error(res.object);
								              } else {
								                this.$router.push({ path: '/login' ,query: { loginName: this.regiForm.mobile }});
								              }
							});
						}
                     })
            },
//          handleReset (name) {
//              this.$refs[name].resetFields();
//          }
        },
       }
</script>

<style>
</style>