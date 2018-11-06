<template>
	<div class="order">
		<div class="wap_header">
			<router-link to="/user/address">
				<Icon type="ios-arrow-back"></Icon>新增地址
			</router-link>
		</div>
		<Form :model="addForm" ref="addForm" :rules="ruleValidate" class="form_wrap adrr pt44">
			<FormItem prop="person">
				<Input v-model="addForm.person" placeholder="收货人姓名"></Input>
			</FormItem>
			<FormItem prop="phone">
				<Input v-model="addForm.phone" placeholder="手机号码"></Input>
			</FormItem>
			<FormItem prop="selectedOptionsAddr">
				<Cascader v-model="addForm.selectedOptionsAddr" :data="addressOption"></Cascader>
			</FormItem>
			<FormItem prop="address">
				<Input v-model="addForm.address" placeholder="详细地址"></Input>
			</FormItem>
		
		</Form>
				<div class="btn-wrap"><Button type="primary" @click="addSubmit" long class="btn-red">保存</Button></div>
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
				addressOption: [],
				addForm: {
					person: '',
					phone: '',
					selectedOptionsAddr: [],
					address: '',
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
			getAddressOption() {
				this.$axios({
					method: 'post',
					url: '/common/address',
				}).then((res) => {
					this.addressOption = res;
				});
			},
			addSubmit() {
				this.$refs['addForm'].validate((valid) => {
					if(valid) {
						let temp = this.addForm;
						temp.receiveProvince = this.addForm.selectedOptionsAddr[0];
						temp.receiveCity = this.addForm.selectedOptionsAddr[1];
						temp.receiveDistrict = this.addForm.selectedOptionsAddr[2];
						delete temp['selectedOptionsAddr']
						let para = Object.assign({}, temp);
						this.$axios({
							method: 'post',
							url: '/address/insert',
							data: para,
						}).then((res) => {
							if(res.code == '200') {
								this.$Message.success('提交成功');
								this.$refs['addForm'].resetFields();
								this.$router.push('/user/address')
							} else if(res.code == '401') {
								this.$Message.error(res.msg);
								return;
							} else {
								this.$Message.error(res.msg);
								return;
							}
						});
					}
				});
			}
		},
		created() {
			this.getAddressOption();
		}
	}
</script>

<style scoped="scoped" lang="scss">
	.addaddress {
		position: fixed;
		bottom: 0;
		background: #d32122;
		width: 100%;
		color: #fff;
		text-align: center;
		padding: 1rem 0;
		cursor: pointer;
	}

</style>
<style>
	.adrr .ivu-form-item{
		padding-top: 10px!important;
		padding-bottom: 20px!important;
	}
</style>