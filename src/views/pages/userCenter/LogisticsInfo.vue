<template>
	<div class="order">
		<div class="m_header_bar">
			<router-link to="/user/rufundlist" class="m_header_bar_back">
				<Icon type="ios-arrow-back"></Icon>
			</router-link>
			<span class="m_header_bar_title">填写物流单号</span>
			<span class="m_header_bar_menu"></span>
		</div>
		<Form :model="addForm" ref="addForm" :rules="ruleValidate" style="background: #fff;" :label-width="100">
			<FormItem label="退款退货订单号" prop="refundOrderNo">
				<span>{{addForm.refundOrderNo}}</span>
			</FormItem>
			<FormItem label="物流单号" prop="expressNo">
				<Input v-model="addForm.expressNo"  placeholder="物流单号"></Input>
			</FormItem>
			<FormItem label="物流公司" prop="logistics">
				<Input v-model="addForm.logistics "  placeholder="物流公司"></Input>
			</FormItem>
			<FormItem>
				<Button type="primary" @click="handleSubmit('addForm')">提交</Button>
			</FormItem>
		</Form>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				addForm: {
					refundOrderNo: '',
					expressNo: '',
					logistics: [],
				},
				ruleValidate: {
					expressNo: [{
						required: true,
						message: '请填写物流单号',
						trigger: 'trigger' 
					}],
					logistics: [{
						required: true,
						message: '请填写物流公司',
						trigger: 'trigger' 
					}],
				},
			}
		},
		methods: {
			
			getStatusEnum() {
				this.$axios({
					method: 'get',
					url: '/refund/getRefundCauseList',
				}).then((res) => {
					this.reasonList = res;
				});
			},
			getParams() {
				// 取到路由带过来的参数 
				this.addForm.refundOrderNo = this.$route.query.rforder;
			},
			handleSubmit(name) {
				this.$refs[name].validate((valid) => {
					if(valid) {
							var _this = this;
							_this.$axios({
								method: 'post',
								url: `/refund/submitLogisticsInfo?refundOrderNo=${_this.addForm.refundOrderNo}&expressNo=${_this.addForm.expressNo}&logistics=${_this.addForm.logistics}`,
							}).then((res) => {
								if(res.code == '200') {
									_this.$Message.info(res.msg);
									this.$router.go(-1)
								} else {
									_this.$Message.error(res.msg);
								}
							});
					} else {
						return
					}
				})
			}
		},
		mounted() {
			this.getStatusEnum();
			this.getParams();
		}
	}
</script>

<style scoped="scoped">
.demo-upload-list {
		display: inline-block;
		width: 80px;
		height: 80px;
		text-align: center;
		line-height: 80px;
		border: 1px solid transparent;
		border-radius: 4px;
		overflow: hidden;
		background: #fff;
		position: relative;
		box-shadow: 0 1px 1px rgba(0, 0, 0, .2);
		margin-right: 4px;
	}
	
	.demo-upload-list img {
		width: 100%;
		height: 100%;
	}
	
	.demo-upload-list-cover {
		display: none;
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		background: rgba(0, 0, 0, .6);
	}
	
	.demo-upload-list:hover .demo-upload-list-cover {
		display: block;
	}
	
	.demo-upload-list-cover i {
		color: #fff;
		font-size: 20px;
		cursor: pointer;
		margin: 0 2px;
	}
</style>