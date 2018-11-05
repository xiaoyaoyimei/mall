<template>
	<div class="order">
		<div class="wap_header">
			<router-link to="/user/address">
				<Icon type="ios-arrow-back"></Icon>编辑地址</router-link>
		</div>
		<Form :model="editForm" ref="editForm" :rules="ruleValidate" class="form_wrap pt44">
			<FormItem prop="person">
				<Input v-model="editForm.person" placeholder="收货人姓名"></Input>
			</FormItem>
			<FormItem prop="phone">
				<Input v-model="editForm.phone" placeholder="手机号码"></Input>
			</FormItem>

			<FormItem prop="selectedOptionsAddr">
				<Cascader v-model="editForm.selectedOptionsAddr" :data="addressOption"></Cascader>
			</FormItem>
			<FormItem prop="address">
				<Input v-model="editForm.address" placeholder="详细地址"></Input>
			</FormItem>
		</Form>
		<div class="btn-wrap">
			<Button type="primary" @click="addSubmit" long class="btn-red">保存</Button>
		</div>
	</div>
</template>

<script>
	import { validatePhone } from '@/utils/validate';
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
			return {
				old: [],
				addressOption: [],
				editForm: {
					person: '',
					phone: '',
					selectedOptionsAddr: [],
					address: '',
					tel: '',
				},
				ruleValidate: {
					person: [{
						required: true,
						message: '收货人不能为空',
						trigger: 'blur'
					}],
					phone: [{
						required: true,
						validator: validateName,
						trigger: 'blur'
					}, ],
					selectedOptionsAddr: [{
						required: true,
						type: 'array',
						message: '请选择省市区',
						trigger: 'change'
					}],
					address: [{
						required: true,
						message: '详细地址不能为空',
						trigger: 'blur'
					}, ]
				},
			}

		},
		methods: {
			getParams() {
				// 取到路由带过来的参数 
				let routerParams = JSON.parse(localStorage.getItem('old'))
				// 将数据放在当前组件的数据内
				this.old = routerParams
				this.editForm.id = this.old.id;
				this.editForm.person = this.old.person;
				this.editForm.phone = this.old.phone;
				this.editForm.tel = this.old.tel;
				this.editForm.selectedOptionsAddr = [this.old.receiveProvince, this.old.receiveCity, this.old.receiveDistrict];
				this.editForm.address = this.old.address;
			},
			getAddressOption() {
				this.$axios({
					method: 'post',
					url: '/common/address',
				}).then((res) => {
					this.addressOption = res;
				});
			},
			addSubmit() {
				this.$refs['editForm'].validate((valid) => {
					if(valid) {
						let temp = this.editForm;
						let id = temp.id;
						temp.receiveProvince = this.editForm.selectedOptionsAddr[0];
						temp.receiveCity = this.editForm.selectedOptionsAddr[1];
						temp.receiveDistrict = this.editForm.selectedOptionsAddr[2];
						delete temp['selectedOptionsAddr']
						delete temp['id']
						let para = Object.assign({}, temp);
						this.$axios({
							method: 'post',
							url: '/address/update?id=' + id,
							data: para,
						}).then((res) => {
							this.$Message.success('提交成功');
							this.$refs['editForm'].resetFields();
							this.$router.push('/user/address')
							localStorage.removeItem('old')
						});
					}
				});
			}
		},
		mounted() {
			this.getAddressOption();
			
			this.getParams();
		}
	}
</script>

<style scoped="scoped" lang="scss">
	.addaddress {
		position: fixed;
		bottom: 0;
		background: #ed1844;
		width: 100%;
		color: #fff;
		text-align: center;
		padding: 10px 0;
		cursor: pointer;
	}
	
	.address {
		text-align: center;
		color: #666;
		margin-top: 60px;
	}
	
	.ivu-form-item {
		padding: 0.5rem 1rem;
		margin-bottom: 0;
	}
</style>