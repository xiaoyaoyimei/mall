<template>
		<div class="reg">
          <div class="m_header_bar">
            <router-link to="/login"  class="m_header_bar_back"><Icon type="ios-arrow-back"></Icon></router-link>
			<span class="m_header_bar_title">找回密码</span>
		</div>
		<div class="content">
	   <Form :model="regiForm" label-position="left" :label-width="100" :rules="ruleValidate" ref="regiForm">
           <FormItem label="手机号" prop="mobile">
            <Input v-model.trim="regiForm.mobile" placeholder="请输入手机号"  @blur.native="getTx()" v-bind:value='regiForm.mobile'></Input>
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
					<Button   v-if="sendMsgDisabled">
						<span>{{time+'秒后获取'}}</span>
						</Button>
						<Button    v-else  @click.native="getDx">
						<span>获取短信码</span>
					</Button>
             </div>
        </FormItem>
     <FormItem label="密码" prop="passWord">
            <Input v-model="regiForm.passWord" placeholder="请输入新密码"></Input>
        </FormItem>
         <FormItem>
            <Button type="primary" @click="handleSubmit()" >找回密码</Button>
            <Button type="ghost" @click="handleReset()" style="margin-left: 8px">重置</Button>
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
            	t:'',
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
                        { type: 'string', min: 6, message: '密码不能少于6位', trigger: 'blur' }
                    ],
                    mobile:[
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
            handleReset (name) {
                this.$refs[name].resetFields();
            }
        },
        destroyed: function () {
          	clearTimeout( this.t );
		},
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
		padding: 1.5rem;
	}
	.txm{
		width:11rem;
	float: left;
	margin-right:1rem;
	}
	.tx,.dxm{
		height: 32px;
	}
	.dxm{
		cursor:pointer;
		line-height: 32px;
		background: #333;
		color:#fff;
		border: 0 none;
		padding: 0 2px;
	}
}
</style>