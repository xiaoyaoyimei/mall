<template>
	<div class="order">
		<div class="m_header_bar">
			<router-link to="/user/orderlist" class="m_header_bar_back">
				<Icon type="ios-arrow-back"></Icon>
			</router-link>
			<span class="m_header_bar_title">申请退货退款</span>
			<span class="m_header_bar_menu"></span>
		</div>
		<Form :model="refundForm" ref="refundForm" class="refundForm" :label-width="70">
					<FormItem label="订单编号:">
						<span class="orderNo">{{refundForm.orderNo}}</span>
					</FormItem>
					<FormItem label="售后原因:">
						<Select v-model="refundForm.refundCauseId" class='select' @on-change='img_must'>
							<Option v-for="item in reasonList" :value="item.causeId" :key="item.causeId"> {{ item.content }}</Option>
						</Select>
					</FormItem>
					<FormItem label="退款说明:">
						<i-input v-model="refundForm.refundreason" class="refundFormPro" placeholder="" type="textarea"></i-input>
					</FormItem>
					<FormItem label="上传图片:">
						<div class="user-con-wrap ">
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
						</div>
					</FormItem>
					<FormItem label="上传视频:">
						<Upload ref="video" :action="uploadUrl" :on-success="videoSuccess" :on-format-error="videohandleFormatError" style="display: inline-block;width:78px;">
							<div style="width: 78px;height:78px;line-height: 78px;">
								<Icon type="ios-camera" size="20"></Icon>
							</div>
						</Upload>
					</FormItem>
				</Form>
			<div  class="btn-wrap">
				<Button type="primary" size="large" class="btn-red" long @click="refund">提交</Button>
			</div>		

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
				uploadImgs:'',
				refundorder: '',
				uploadList: [],
				uploadUrl: this.$axios.defaults.baseURL + '/upload/upload?path=account',
				//refundenums:[],
				refundForm: {
					orderNo:'',
					refundCauseId: '',
					refundImgs: '',
					remarks: '',
					refundVideo: ''
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
			
			videoSuccess(res, file) {
				if(res.code == '200') {
					file.url = res.msg;
					this.refundForm.refundVideo = res.msg
				}
			},
			handleSuccess(res, file) {
				if(res.code == '200') {
					file.url = res.msg;
					file.name = res.msg;
					
				}
			},
			handleFormatError(file) {
				this.$Notice.warning({
					title: '文件格式不正确',
					desc: '文件格式不正确,请选择 jpg 或 png.'
				});
			},
			handleFormatError(file) {
				this.$Notice.warning({
					title: '文件格式不正确',
					desc: '文件格式不正确,请选择 jpg 或 png.'
				});
			},
			videohandleFormatError(file) {
				this.$Notice.warning({
					title: '文件格式不正确',
					desc: '文件格式不正确,请选择 mp4 或 avi 或flv.'
				});
			},
			handleMaxSize(file) {
				this.$Notice.warning({
					title: '文件大小超过限制',
					desc: '上传文件 太大，不超过2M.'
				});
			},
			
			handleBeforeUpload() {
				const check = this.uploadList.length < 5;
				if(!check) {
					this.$Notice.warning({
						title: '最多可上传9张图片.'
					});
				}
				return check;
			},
			videohandleFormatError(file) {
				this.$Notice.warning({
					title: '文件格式不正确',
					desc: '文件格式不正确,请选择 mp4 或 avi 或flv.'
				});
			},
			videoSuccess(res, file) {
				if(res.code == '200') {
					file.url = res.msg;
					this.refundForm.refundVideo = res.msg
				}
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
				this.refundForm.orderNo = this.$route.query.rforder;
			},
			refund() {
				console.log(this.uploadList)
				if(this.imgmust == 'Y' && this.uploadList.length == 0) {
					this.$Message.warning('请上传退货凭证');
					return;
				} else {
					var imgs = "";
					for(var i = 0; i<this.uploadList.length;i++){
						imgs += this.uploadList[i].url + ','
					}
					imgs = (imgs.slice(imgs.length - 1) == ',') ? imgs.slice(0, -1) : imgs;
					let _this = this;
					this.$axios({
						method: 'post',
						url: `/refund/create`,
						data: {
							orderNo: _this.refundForm.orderNo,
							refundCauseId: _this.refundForm.refundCauseId,
							refundImgs: imgs,
							remarks: _this.refundForm.refundreason,
							refundVideo: _this.refundForm.refundVideo
						}
					}).then((res) => {
						if(res.code == '200') {
							this.$Message.info(res.object);
							this.refundModal = false;
							this.$router.push('/user/aftersales')
						} else {
							this.$Message.error(res.msg);
							this.refundModal = false;
							this.$router.push('/user/aftersales')
						}
					});
				}
			},
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
	.order .ivu-form-item:not(:last-child) {
    	border-bottom: 1px solid #eee;
	}
	.ivu-form-item {
		padding: 0.5rem 1rem;
		margin-bottom: 0;
	}
	.refundForm{
		background-color: #fff;
		margin-bottom: 2rem;
	}
	.orderNo{
		padding-left:0.5rem; 
		display: block;
		height: 5rem;
		line-height:5rem;
	}
	.order .refundFormPro{
		margin-top: 01rem;
		padding-bottom: 0.5rem;
		border: none!important;
    }
</style>
<style>
.order .ivu-select-selection{
		border: none!important;
		box-shadow: none!important;
	}
.order .ivu-select-placeholder, .order .ivu-select-selected-value{
	height: 5rem!important;
	line-height:5rem!important;
}
.order .ivu-form-item-label{
	height: 5rem!important;
	line-height:5rem!important;
	padding:0rem;
	padding-right:0.5rem;
}
.order textarea.ivu-input, .order .ivu-input:focus{
	border: none!important;
	box-shadow: none!important;
}
.order .ivu-upload-select{
	border: 1px dashed #dcdee2;
	text-align:center;
}
</style>
