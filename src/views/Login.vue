<template>
    <div class="login-container" style="background-color: #fff;margin: 0px;overflow: hidden;">
    <div id="canvascontainer" ref='can'></div>
    <Form ref="loginForm" autoComplete="on" :model="loginForm" :rules="loginRules"  class="card-box login-form">
        <Form-item prop="loginName" label="账号">
            <Input type="text" v-model="loginForm.loginName" placeholder="loginName" autoComplete="on">
            </Input>
        </Form-item>
        <Form-item prop="passWord" label="密码">
            <Input type="password" v-model="loginForm.passWord" placeholder="passWord" @keyup.enter.native="handleLogin">
            </Input>
        </Form-item>
        <Form-item>
            <Button type="primary" @click="handleLogin('loginForm')" long>登录</Button>
        </Form-item>
           </Form>

    </div>
</template>

<script>
	import store from '@/store/store';
    export default {
      name: 'login',
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
            loginName: '18811996471',
            passWord: '1'
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
         watch: {
    // 监测路由变化,只要变化了就调用获取路由参数方法将数据存储本组件即可
      '$route': 'getParams'
    },
    mounted() {
			this.getParams();
		},
      methods: {
      	     getParams () {
        // 取到路由带过来的参数 
        let routerParams = this.$route.params.loginName
        // 将数据放在当前组件的数据内
        this.loginName = routerParams
     	 },
        handleLogin() {
          this.$refs.loginForm.validate(valid => {
            if (valid) {
				this.$axios.post('customer/login', {  
				loginName: this.loginForm.loginName,  
				passWord: this.loginForm.passWord  
				}).then(res => {  
					this.logining = false;
	               	let { code, msg } = res.data;
		              if (code !== 200) {
		                  this.$Message.error(msg);
		              } else {
					        this.$Message.success('登录成功');
							let data = res.data;  
							//根据store中set_token方法将token保存至localStorage/sessionStorage中，data["Authentication-Token"]，获取token的value值  
							this.$store.commit('set_token', data.object["token"]);  
							if (store.state.token) {  
								this.$router.push('/index')  
								console.log(store.state.token)  
							} else {  
								this.$router.replace('/login');  
							}  
		              }
				}).catch(error => {  
						this.loading = false  
						this.loginBtn = "登录"  
						  this.$Message.error('登录失败');
				})  
            } 
            else {
              console.log('error submit!!');
              return false;
            }
          });
        },
      },
    }
</script>
<style>
    .login-container {
        height: 100vh;
        background-color: #2d3a4b;

        input:-webkit-autofill {
            -webkit-box-shadow: 0 0 0px 1000px #293444 inset !important;
            -webkit-text-fill-color: #fff !important;
        }
        input {
            background: transparent;
            border: 1px solid #2d8cf0;
            -webkit-appearance: none;
            border-radius: 3px;
            padding: 12px 5px 12px 15px;
            color: #eeeeee;
            height: 47px;
        }
        .el-input {
            display: inline-block;
            height: 47px;
            width: 85%;
        }
        .svg-container {
            padding: 6px 5px 6px 15px;
            color: #889aa4;
        }

        .title {
            font-size: 26px;
            font-weight: 400;
            color: #eeeeee;
            margin: 0px auto 40px auto;
            text-align: center;
            font-weight: bold;
        }

        .login-form {
            position: absolute;
            left: 0;
            right: 0;
            width: 400px;
            padding: 35px 35px 15px 35px;
            margin: 120px auto;
        }

        .el-form-item {
            border: 1px solid rgba(255, 255, 255, 0.1);
            background: rgba(0, 0, 0, 0.1);
            border-radius: 5px;
            color: #454545;
        }

        .forget-pwd {
            color: #fff;
        }
    }

</style>
