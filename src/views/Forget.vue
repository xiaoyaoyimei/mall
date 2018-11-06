<template>
		<div class="log-reg">
          <div class="m_header_bar bg-red">
            <router-link to="/login"  class="m_header_bar_back"><Icon type="ios-arrow-back"></Icon></router-link>
			<span class="m_header_bar_title">重置密码</span>
		</div>
		<div class="log-forget">
			
	   <Form :model="regiForm"  :rules="ruleValidate" ref="regiForm">
           <FormItem  prop="mobile">
            <Input v-model.trim="regiForm.mobile" placeholder="请输入手机号"  @on-blur="getTx()" v-bind:value='regiForm.mobile'></Input>
        </FormItem>
           <FormItem  prop="verificationCode" class="clearfix">
            <div class="clearfix">
            	<Input v-model="regiForm.verificationCode" placeholder="请输入图形验证码" class="logw12"  ></Input>
               <img  :src="verimg"  @click="getTx"  class="tx"/>
               <img src="../assets/img/refresh.png" @click="getTx">
             </div>
      		  </FormItem>
        <FormItem  prop="shortMessage">
             <div class="clearfix">
             	<Input v-model="regiForm.shortMessage" placeholder="请输入短信验证码" class="logw12"></Input>
					<Button   v-if="sendMsgDisabled">
						<span>{{time+'秒后获取'}}</span>
						</Button>
						<Button    v-else  @click.native="getDx"  style="height: 4.4rem;">
						<span>获取短信码</span>
					</Button>
             </div>
        </FormItem>
         <FormItem>
            <Button type="primary" @click="next()" class="btn-red" >下一步</Button>
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
	          	callback();
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
                time: 90, // 发送验证码倒计时
            	sendMsgDisabled: false,
            	txv:1,
            	verimg:'',
                regiForm: {
                    loginName:'',
                    shortMessage: '',
                    verificationCode:''
                },
                ruleValidate: {
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
          				//重置密码第二步
			next() {
		    this.$refs.regiForm.validate(valid => {
            if (valid) {
				this.$axios({
					method: 'post',
					url: '/customer/reset/password/validate',
					data: {
						"mobile": this.regiForm.mobile,
						"shortMessage": this.regiForm.shortMessage
					},
				}).then((res) => {
					if(res.code == 200) {
						this.$router.push({name: '/forgettwo',query:{mobile:this.regiForm.mobile}})
					} else {
						this.$Message.error(res.object);
					}
				});
            }
                else {
             	this.loading = false  
                 return false;
            }
              })
			},
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
          	 		  this.time = 90;
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
          						 this.verimg=this.global_.originurl+'/mall/wap/customer/'+this.regiForm.mobile+'/verification.png?v='+this.txv;
								}else{
									  this.$Message.error('该手机号不存在，请注册');
								}
							});
          			
          	},

        },
        destroyed: function () {
          	clearTimeout( this.t );
		},
       }
</script>

<style scoped="scoped" lang="scss">
	.log-reg .logw12 {
			width: 12rem;
			float: left;
		}
</style>