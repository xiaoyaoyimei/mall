<template>
    <div class="login-page">
    	<div class="m_header_bar">
            <span   class="m_header_bar_back" @click="routerBack()">
            	<Icon type="ios-arrow-back"></Icon>
            </span>
			<span class="m_header_bar_title">迪瑞克斯登录</span>
		</div>
		<div class="ding">		
	    	 <router-link :to="{path: '/'}"><img   src="../assets/img/de-tx.jpg" title="去首页"/></router-link>
		    <Form ref="loginForm" autoComplete="on" :model="loginForm" :rules="loginRules"   label-position="left" :label-width="100">
		        <Form-item prop="loginName" label="用户名">
		            <Input type="text" v-model="loginForm.loginName" placeholder="请输入用户名" autoComplete="on">
		            </Input>
		        </Form-item>
		        <Form-item prop="passWord" label="密码">
		            <Input type="password" v-model="loginForm.passWord" placeholder="请输入密码" @keyup.enter.native="handleLogin">
		            </Input>
		        </Form-item>
		             <Button type="primary" @click="handleLogin('loginForm')"  class="btn-login" :loading="loading">登录</Button>
		              <div class="opt"> 
		              	<router-link :to="{path: '/forget'}">忘记密码</router-link>
		             		 <router-link :to="{path: '/register'}" class="re">新用户注册</router-link>
		              </div>
		    </Form>
	    </div>
	    </div>
</template>

<script>
	  import { validatePhone } from '@/utils/validate';
    export default {
      data() {
      		 const validateName = (rule, value, callback) => {
	          if (value==undefined) {
	            callback(new Error('手机号不能为空'));
	          } else if (!validatePhone(value)) {
	                 callback(new Error('请输入正确的手机号'));
	          }else{
	          	callback();
	          }
	        };
        const validatePass = (rule, value, callback) => {
          if (value.length < 1) {
            callback(new Error('密码不能为空'));
          } else {
            callback();
          }
        };
        return {
          loginForm: {
            loginName: '',
            passWord: ''
          },
          loginRules: {
            loginName: [
                 { required: true, validator: validateName, trigger: 'blur' },
            ],
            passWord: [
                { required: true, trigger: 'blur', validator: validatePass }
            ]
          },
          loading: false,
          showDialog: false
        }
      },
    mounted() {
			this.getParams();
		},
      methods: {
      	routerBack(){
      		 this.$router.push('/');
      	},
      	 getParams () {
	        // 取到路由带过来的参数 
	        this.loginName = this.$route.query.loginName
     	 },
        handleLogin() {
          this.loading = true;
          this.$refs.loginForm.validate(valid => {
            if (valid) {
				this.$axios.post('customer/login', {  
				loginName: this.loginForm.loginName,  
				passWord: this.loginForm.passWord  
				}).then(res => {  
	               	let { code, object } = res;
		              if (code !== 200) {
		                  this.$Message.error(object);
		              	 this.loading = false;
		              } else {
		              		this.loading = false;
					        this.$Message.success('登录成功');
							let data = res;  
							this.$store.commit('LOGIN',{token:data.object["token"],userId:data.object["userId"]});  
							if (this.$store.state.token) {  
							this.$router.push(this.$route.query.redirect || '/')
							} else {  
								this.$router.replace('/login');  
							}  
		              }
				}).catch(error => {  
						this.loading = false  
						this.loginBtn = "登录"  
						this.$Message.error('系统异常');
				})  
            } 
            else {
              console.log('登录验证失败!');
              return false;
            }
          });
        },
      },
    }
</script>
<style lang="scss"  scoped="scoped">
 .login-page{
 	height: 100vh;
 	background: #fff;
 	font-size: 1.6rem;
 }
	.ding{
		padding:3rem 1.5rem;
		overflow: hidden;
		text-align: center;
		img{
			border-radius: 100%;
			width: 10rem;
			margin-bottom: 3rem;
		}
		h3{
			color:#0099ff;
		}
		.btn-login{
			width: 100%;
			border-radius: 5rem;
			padding:0.8rem 0;
			font-size: 1.4rem;
		}
		.opt{
			text-align: left;
			margin-top:1.5rem;
			font-size:1.2rem;
		}
		.re{
			float: right;
		}
	}
	</style>
