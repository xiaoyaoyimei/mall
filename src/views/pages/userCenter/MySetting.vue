<template>
	<div class="order coupon">
		<div class="wap_header">
			<router-link to="/user" >
				<Icon type="ios-arrow-back"></Icon>设置
			</router-link>
		</div>
		<ul class="flex-ul pt44">
			<li class="tx"><span>头像</span>
				<router-link :to="{ path: '/user/photo'}" v-if="userinfo.iconUrl==''" class="tximg">
					<img src="../../../assets/img/de-tx.jpg">
				</router-link>
				<router-link :to="{ path: '/user/photo', query: { iconUrl: userinfo.iconUrl }}" v-else class="tximg">
					<img :src='userinfo.iconUrl  | imgfilter'> </router-link>
			</li>

			<li><span>会员名</span>
				<router-link :to="{ path: '/user/editnick', query: { nickname: userinfo.nickName }}" tag="span"> {{userinfo.nickName}} </router-link>
			</li>
			<li><span class="color-gray">账号</span><span class="color-gray">{{userinfo.customerMobile}}</span></li>
			<li><span>性别</span>
				<router-link :to="{ path: '/user/editsex', query: { sex: userinfo.sex }}" tag="span">
					<label v-if="userinfo.sex === 'M'">男</label> <label v-else-if="userinfo.sex === 'F'">女</label> <label v-else>保密</label>
					<Icon type="ios-arrow-forward" />
					</span>
				</router-link>
			</li>
			<li><span>出生日期</span>
				<span> 
		   <label v-if="!show">
		   	<DatePicker type="date" confirm placeholder="Select date" style="width: 200px"
		    @on-ok="handleOk"  :value="userinfo.birthday"  @on-change="handleChange"></DatePicker>
		
		   </label>
		   <label @click="xshow">
		   	<span  v-if="show" >{{userinfo.birthday}}</span> 选择 </label>
				</span>
			</li>
			<li @click="addAdd">
				<span>地址管理</span>
				<span><Icon type="ios-arrow-forward" /></span></li>

			<router-link :to="{ path: '/user/changepwd'}" tag="li">
				<span>修改密码</span>
				<span><Icon type="ios-arrow-forward" /></span></router-link>
		</ul>
		<div class="btn-red-fixed" @click="logout">退出登录</div>
	</div>
</template>

<script>
	import store from '@/store/store';
	export default {
		data() {
			return {
				userinfo: {
					birthday: "",
					sex: "",
					nickName: "",
					iconUrl: '',
					customerMobile: ''
				},
				show: true
			}
		},
		methods: {
			addAdd() {
				localStorage.setItem('fromc', 'setting')
				this.$router.push({
					name: '/user/address'
				});
			},
			xshow() {
				this.show = !this.show;
			},
			getUser() {
				this.$axios({
					method: 'post',
					url: '/account',
				}).then((res) => {
					this.userinfo = Object.assign({}, res);
				});
			},
			handleChange(date) {
				this.userinfo.birthday = date;
			},
			//日期插件事件
			handleClick() {
				this.open = !this.open;
			},
			handleClear() {
				this.open = false;
				this.show = !this.show;
			},
			handleOk() {
				let self = this;
				this.$axios({
					method: 'post',
					url: '/account/update',
					data: {
						'birthday': this.userinfo.birthday
					}
				}).then((res) => {
					if(res.code == '200') {
						this.$Message.success('修改成功');
						this.show = !this.show;
					}
				});
				this.open = false;

			},
			logout: function() {
				var _this = this;
				this.$Modal.confirm({
					title: '登出',
					content: '<p>确认退出登录吗?</p>',
					onOk: () => {
						store.dispatch('LogOut').then(() => {
							window.location.href = this.global_.originurl + '/#/login'
							return false
						})
					},
				});
			},
		},
		mounted() {
			this.getUser()
		}
	}
</script>

<style scoped="scoped">
	.tximg {
		border: 1px solid #ddd;
		display: block;
		max-width: 5.5rem;
		max-height: 5.5rem;
		border-radius: 50%;
		padding:1rem;
	}
	
	.tximg img {
		width: 100%;
		height: 100%
	}
	
	
	.order .flex-ul .tx {
		padding-top: 2rem;
		height: 8rem;
	}
</style>