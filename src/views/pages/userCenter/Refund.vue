<template>
	<div class="order">
		<div class="m_header_bar">
			<router-link to="/user/orderlist" class="m_header_bar_back">
				<Icon type="ios-arrow-back"></Icon>
			</router-link>
			<span class="m_header_bar_title">申请退货退款</span>
			<span class="m_header_bar_menu"></span>
		</div>
		<Form :model="addForm" ref="addForm" :rules="ruleValidate" style="background: #fff;" :label-width="100">
			<FormItem label="订单号" prop="orderNo">
				<span>{{addForm.orderNo}}</span>
			</FormItem>
			<FormItem label="退款退货原因" prop="refundCauseId">
				<Select v-model="addForm.refundCauseId" @on-change='img_must'>
					<Option v-for="item in reasonList" :value="item.causeId" :key="item.causeId"> {{ item.content }}</Option>
				</Select>
			</FormItem>
			<FormItem label="上传退货凭证" prop="refundImgs">
				<div class="demo-upload-list" v-for="item in uploadList">
					<template v-if="item.status === 'finished'">
						<img :src="item.url  | imgfilter">
						<div class="demo-upload-list-cover">
							<Icon type="ios-eye-outline" @click.native="handleView(item.name)"></Icon>
							<Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
						</div>
					</template>
					<template v-else>
						<Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
					</template>
				</div>
				<Upload ref="upload" :show-upload-list="false" :default-file-list="defaultList" :on-success="handleSuccess" :format="['jpg','jpeg','png']" :max-size="2048" :on-format-error="handleFormatError" :on-exceeded-size="handleMaxSize" :before-upload="handleBeforeUpload" multiple type="drag" :action="uploadUrl" style="display: inline-block;width:78px;">
					<div style="width: 78px;height:78px;line-height: 78px;">
						<Icon type="ios-camera" size="20"></Icon>
					</div>
				</Upload>
				<Modal title="查看大图" v-model="visible" class="imglarger">
					<img :src="imgName | imgfilter" v-if="visible" style="width: 100%">
				</Modal>
			</FormItem>
			<FormItem label="退款退货理由" prop="refundImgs">
				<Input v-model="addForm.remarks" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="退款退货理由"></Input>
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
				imgmust: 'N',
				reasonList: [],
				defaultList: [],
				imgName: '',
				visible: false,
				uploadList: [],
				uploadUrl: this.$axios.defaults.baseURL + '/upload/upload?path=account',
				//refundenums:[],
				addForm: {

					orderNo: '',
					refundCauseId: '',
					refundImgs: [],
					remarks: '',
				},
				ruleValidate: {
					refundCauseId: [{
						required: true,
						message: '请选择退款退货原因',
						trigger: 'change' 
					}],
				},
			}
		},
		methods: {
			handleView(name) {
				this.imgName = name;
				this.visible = true;
			},
			handleRemove(file) {
				const fileList = this.$refs.upload.fileList;
				this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
			},
			handleSuccess(res, file) {
				if(res.code == '200') {
					file.url = res.msg;
					file.name = res.msg;
				}
				console.log(this.uploadList)
			},
			handleFormatError(file) {
				this.$Notice.warning({
					title: '文件格式不正确',
					desc: '文件格式不正确,请选择 jpg 或 png.'
				});
			},
			handleMaxSize(file) {
				this.$Notice.warning({
					title: '文件大小超过限制',
					desc: '上传文件 太大，不超过2M.'
				});
			},
			handleBeforeUpload() {
				const check = this.uploadList.length < 9;
				if(!check) {
					this.$Notice.warning({
						title: '最多可上传9张图片.'
					});
				}
				return check;
			},
			img_must(v) {
				for(var i = 0; i < this.reasonList.length; i++) {
					if(this.reasonList[i].causeId == v) {

						this.imgmust = this.reasonList[i].isImg;
					}
				}
			},
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
				this.addForm.orderNo = this.$route.query.rforder;
			},
			handleSubmit(name) {
				this.$refs[name].validate((valid) => {
					if(valid) {
						if(this.imgmust == 'Y' && this.uploadList.length == 0) {
							this.$Message.warning('请上传退货凭证');
							return;
						} else {
							this.uploadList.forEach((item, index) => {
								this.addForm.refundImgs[index] = item.url
							})
							let _this = this;
							this.$axios({
								method: 'post',
								url: `/refund/creare`,
								data: {
									orderNo: _this.addForm.orderNo,
									refundCauseId: _this.addForm.refundCauseId,
									refundImgs: _this.addForm.refundImgs,
									remarks: _this.addForm.remarks,
								}
							}).then((res) => {
								if(res.code == '200') {
									this.$Message.info(res.object);
									this.$router.go(-1)
								} else {
									this.$Message.error(res.msg);
								}
							});

						}
					} else {
						return
					}
				})
			}
		},
		mounted() {
			this.getStatusEnum();
			this.getParams();
			this.uploadList = this.$refs.upload.fileList;
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