<template>
    <div class="login-page">
    	<div class="m_header_bar">
            <span   class="m_header_bar_back" @click="routerBack()">
            	<Icon type="ios-arrow-back"></Icon>
            </span>
			<span class="m_header_bar_title">迪瑞克斯登录</span>
		</div>
	<div class="ding">		
	    	<img   src="../assets/img/de-tx.jpg"/>
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
	            <router-link :to="{path: '/register'}" class="re">新用户注册</router-link>
	    </Form>
	    </div>
	    </div>
</template>

<script>
    export default {
      data() {
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
                   { required: true, message: '用户名不能为空', trigger: 'blur' }
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
      		 this.$router.go(-1);
      	},
      	 getParams () {
	        // 取到路由带过来的参数 
	        let routerParams = this.$route.params.loginName
	        // 将数据放在当前组件的数据内
	        this.loginName = routerParams;
	        this.passWord=this.$route.params.passWord;
     	 },
        handleLogin() {
          this.loading = true;
          this.$refs.loginForm.validate(valid => {
            if (valid) {
            	this.global_.loginName=this.loginForm.loginName;
            	this.global_.passWord=this.loginForm.passWord;
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
			color:#d32122;
		}
		.btn-login{
			width: 100%;
			border-radius: 5rem;
			padding:0.8rem 0;
			font-size: 1.4rem;
		}
		.re{
			float: right;
			margin-top:1.5rem;
			font-size:1.2rem;
		}
	}
	</style>
