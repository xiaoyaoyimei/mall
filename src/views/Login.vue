<template>
	<div class="log-reg">
		<div class="m_header_bar bg-red">
			<span class="m_header_bar_back" @click="routerBack()">
            	<Icon type="ios-arrow-back"></Icon>
            </span>
			<span class="m_header_bar_title">账号登录</span>
		</div>
		<div class="log-forget">
			<Form ref="loginForm" autoComplete="off" :model="loginForm" :rules="loginRules">
				<Form-item prop="loginName">
					<Input type="text" v-model.trim="loginForm.loginName" placeholder="请输入用户名" autoComplete="on">
					</Input>
				</Form-item>
				<Form-item prop="passWord">
					<Input type="password" v-model.trim="loginForm.passWord" placeholder="请输入密码" @keyup.enter.native="handleLogin">
					</Input>
				</Form-item>
				<Button type="primary" @click="handleLogin('loginForm')" class="mt10 btn-red " :loading="loading" style="font-size: 16px;">登录</Button>
				<div class="opt">
					<p>
						<router-link :to="{path: '/register'}">没有账号?去注册></router-link>
					</p>
					<p>
						<router-link :to="{path: '/forget'}">忘记密码</router-link>
					</p>
				</div>
			</Form>
		</div>
		<router-link :to="{path: '/'}"> <img src="../assets/img/logo.png"></router-link>
	</div>
</template>

<script>
	import store from '@/store/store';
	import { validatePhone } from '@/utils/validate';
	import { setToken, setUserId } from '@/base/auth'
	export default {
		data() {
			const validateName = (rule, value, callback) => {
				if(value == undefined) {
					callback(new Error('手机号不能为空'));
				} else if(!validatePhone(value)) {
					callback(new Error('请输入正确的手机号'));
				} else {
					callback();
				}
			};
			const validatePass = (rule, value, callback) => {
				if(value.length < 1) {
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
					loginName: [{
						required: true,
						validator: validateName,
						trigger: 'blur'
					}, ],
					passWord: [{
						required: true,
						trigger: 'blur',
						validator: validatePass
					}]
				},
				loading: false,
				showDialog: false
			}
		},
		mounted() {
			this.getParams();
		},
		methods: {
			routerBack() {
				this.$router.go('-1');
			},
			getParams() {
				// 取到路由带过来的参数 
				this.loginForm.loginName = this.$route.query.loginName
			},
			handleLogin() {
				this.loading = true;
				this.$refs.loginForm.validate(valid => {
					if(valid) {
						this.$axios.post('customer/login', {
							loginName: this.loginForm.loginName,
							passWord: this.loginForm.passWord
						}).then(res => {
							let {
								code,
								object
							} = res;
							if(code !== 200) {
								this.$Message.error(object);
								this.loading = false;
							} else {
								this.loading = false;
								this.$Message.success('登录成功');
								let data = res;
								store.commit('SET_TOKEN', {
									token: data.object["token"],
									userId: data.object["userId"]
								})
								setToken(data.object["token"])
								setUserId(data.object["userId"]);
								//this.$router.push('/')
								this.$router.push(this.$route.query.redirect || '/')
							}
						}).catch(error => {
							this.loading = false
							this.loginBtn = "登录"
							this.$Message.error('系统异常');
						})
					} else {
						this.loading = false
						return false;
					}
				});
			},
		},
	}
</script>

<style>
	.log-reg .ivu-input {
		font-size: 1.6rem;
	}
</style>