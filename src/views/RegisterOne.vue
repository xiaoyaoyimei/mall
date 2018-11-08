<template>
	<div class="log-reg">
		<div class="m_header_bar bg-red bg-blue">
			<router-link to="/login" class="m_header_bar_back">
				<Icon type="ios-arrow-back"></Icon>
			</router-link>
			<span class="m_header_bar_title">手机快速注册</span>
		</div>
		<div class="content">
			<Form :model="regiForm" :rules="ruleValidate" ref="regiForm">
				<FormItem prop="loginName">
					<Input v-model.trim="regiForm.loginName" placeholder="请输入手机号" @on-blur="getTx()"></Input>
				</FormItem>
				<FormItem prop="verificationCode" class="clearfix">
					<div class="clearfix">
						<Input v-model.trim="regiForm.verificationCode" placeholder="图形验证码" class="logw12"></Input>
						<img :src="verimg" @click="getTx" class="tx" />
						<img src="../assets/img/refresh.png" @click="getTx">
					</div>
				</FormItem>
				<FormItem prop="shortMessage">
					<div class="clearfix">
						<Input v-model="regiForm.shortMessage" placeholder="短信验证码" class="logw12" style="width:12rem;" ></Input>
						<Button v-if="sendMsgDisabled" style="height: 4.4rem;">
						<span >{{time+'秒后获取'}}</span>
						</Button>
						<Button v-else @click.native="getDx" class="btn-44" style="height: 4.4rem;">
						<span>获取短信码</span>
					</Button>
					</div>
				</FormItem>
				<FormItem prop="passWord">
					<Input v-model.trim="regiForm.passWord" placeholder="请输入密码" type="password"></Input>
				</FormItem>
				<FormItem prop="confirmpassWord">
					<Input v-model.trim="regiForm.confirmpassWord" placeholder="请确认密码" type="password"></Input>
				</FormItem>
				<FormItem>
					<button class="btn-blue" @click="handleSubmit('regiForm')" type="button">点击注册</button>
				</FormItem>
				<div class="agree"><span>点击注册,即表示您同意并愿意遵守DXRacer公司
					<strong  class="color-blue"  @click="yhxymodal= true">《用户协议》</strong>和
					<strong @click="yszcmodal= true">《隐私政策》</strong></span>
				</div>

			</Form>
		</div>
		<Modal v-model="yhxymodal" width="300px">
			<p slot="header" style="color:#f60;text-align:center">
				<Icon type="information-circled"></Icon>
				<span>用户协议</span>
			</p>
			<fwtk></fwtk>
			<div slot="footer">
				<Button size="large" long @click="yhxymodal= false" type="primary" class="btn-blue">确定</Button>
			</div>
		</Modal>
		<Modal v-model="yszcmodal" width="300px">
			<p slot="header" style="color:#f60;text-align:center">
				<Icon type="information-circled"></Icon>
				<span>隐私政策</span>
			</p>
			<yszc></yszc>
			<div slot="footer">
				<Button size="large" long @click="yszcmodal= false" type="primary" class="btn-blue">确定</Button>
			</div>
		</Modal>
	</div>
</template>

<script>
	import { validatePhone } from '@/utils/validate';
	import Yszc from '@/components/Yszc'
	import Fwtk from '@/components/Fwtk'
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
			const validateYZM = (rule, value, callback) => {
				if(value == undefined) {
					callback(new Error('图形验证码不能为空'));
				} else {
					callback();
				}
			};
			var validatePass = (rule, value, callback) => {
				if(value === '') {
					callback(new Error('请再次输入密码'));
				} else if(value !== this.regiForm.passWord) {
					callback(new Error('两次输入密码不一致!'));
				} else {
					callback();
				}
			};
			return {
				yszcmodal: false,
				yhxymodal: false,
				fwtk: true,
				t: '',
				time: 90, // 发送验证码倒计时
				sendMsgDisabled: false,
				txv: 1,
				verimg: '',
				regiForm: {
					passWord: '',
					loginName: '',
					shortMessage: '',
					verificationCode: '',
					confirmpassWord: ''
				},
				ruleValidate: {
					passWord: [{
							required: true,
							message: '密码不能为空',
							trigger: 'blur'
						},
						{
							type: 'string',
							min: 6,
							message: '密码不能少于6位',
							trigger: 'blur'
						},
					],
					confirmpassWord: [{
						required: true,
						validator: validatePass,
						trigger: 'blur'
					}],
					loginName: [{
						required: true,
						validator: validateName,
						trigger: 'blur'
					}],
					verificationCode: [{
						required: true,
						validator: validateYZM,
						trigger: 'blur'
					}],
					shortMessage: [{
						required: true,
						message: '短信验证码不能为空',
						trigger: 'blur'
					}],
				},
			}
		},
		components: {
			Yszc,
			Fwtk
		},
		methods: {
			getDx() {
				let verificationCode = this.regiForm.verificationCode;
				if(verificationCode == null || verificationCode == '') {
					this.$Message.error('图形码不能为空!');
					this.loadingDx = false;
				} else {
					this.$axios({
						method: 'post',
						url: '/customer/register/shortmessage',
						data: {
							"mobile": this.regiForm.loginName,
							"verificationCode": this.regiForm.verificationCode
						},
					}).then((res) => {
						if(res.code == 200) {
							//短信验证码90秒倒计时
							this.sendMsgDisabled = true;
							this.startTime();
						} else {
							this.$Message.error(res.msg);
						}
					});
				}
			},
			startTime() {
				if(this.time == 0) {
					this.time = 90;
					this.sendMsgDisabled = false;
					clearTimeout(this.t);
					return;
				} else {
					this.time--;
				}
				let self = this;
				this.t = setTimeout(() => {
					self.startTime();
				}, 1000);
			},
			getTx() { //验证用户名是否存在
				if(this.regiForm.loginName == "") {
					this.$Message.error('手机号不能为空');
					return;
				}
				this.$axios({
					method: 'post',
					url: '/customer/validate?userName=' + this.regiForm.loginName,
				}).then((res) => {
					if(res.code == '200') {
						this.txv++;
						this.verimg = this.global_.originurl + '/mall/wap/customer/' + this.regiForm.loginName + '/verification.png?v=' + this.txv;
					} else {
						this.$Message.error(res.msg);
					}
				});

			},
			handleSubmit(name) {
				this.$refs[name].validate((valid) => {
					if(valid) {
						let para = Object.assign({}, this.regiForm);
						delete para['confirmpassWord']
						this.$axios({
							method: 'post',
							url: '/customer/register',
							data: para,
						}).then((res) => {
							let {
								code,
								msg
							} = res;
							if(code !== 200) {
								this.$Message.error(res.msg);
							} else {
								this.$router.push({
									path: '/login',
									query: {
										loginName: this.regiForm.loginName
									}
								});
							}
						});
					}
				})
			},
		},
		destroyed: function() {
			clearTimeout(this.t);
		},
	}
</script>

<style scoped="scoped" lang="scss">
	.log-reg {
		font-size: 1.6rem;
		height: 100vh;
		.logw12 {
			width: 12rem;
			float: left;
		}
		p {
			font-weight: normal;
			font-size: 2rem;
			margin-top: 1.5rem;
			margin-bottom: 1.5rem;
		}
		.content {
			padding: 3rem 2rem;
		}
		.tx,
		.dxm {
			height: 4.4rem;
		}
		.dxm {
			line-height: 32px;
			background: #333;
			color: #fff;
			border: 0 none;
			padding: 0 2px;
		}
	}
	
	.agree {
		padding: 0 1rem;
		font-size: 1.4rem;
		text-align: left;
	}
</style>
<style>
	.ivu-form .ivu-form-item-label {
		font-size: 1.4rem;
		color: #787878;
	}
	
	.log-reg .ivu-input {
		font-size: 1.6rem;
	}
</style>