<template>
    <div>
        <div class="m_header_bar">
			<router-link to="/user/orderlist" class="m_header_bar_back">
				<Icon type="ios-arrow-back"></Icon>
			</router-link>
			<span class="m_header_bar_title">商品评价</span>
			<span class="m_header_bar_menu"></span>
		</div>
        <div class="evaluation">
            <div class="refund clearfix">
                <p>商品名称</p>
                <div class="refundImg">
                    <img :src="evaItem.productItemImg | imgfilter" alt="">
                    <div class="evaluationText">
                        <p class="p">{{evaItem.productTitle}}</p>
                        <p class="p">{{evaItem.productAttrs}}</p>
                    </div>
                </div>
            </div>
            <div class="refund ">
                <p>商品评价</p>
                <i-input class="evaluationreason" v-model="evaluationreason" type="textarea"></i-input>
            </div>
            <div class="refund">
                <p>上传图片</p>
                <div>
                    <div class="demo-upload-list" v-for="item in evauploadList">
                        <template v-if="item.status === 'finished'">
                            <img :src="item.url  | imgfilter">
                            <div class="demo-upload-list-cover">
                                <Icon type="ios-eye-outline" @click.native="handleView(item.name)"></Icon>
                                <Icon type="ios-trash-outline" @click.native="evahandleRemove(item)"></Icon>
                            </div>
                        </template>
                        <template v-else>
                            <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
                        </template>
                    </div>
                    <Upload ref="evaupload" :show-upload-list="false" :default-file-list="evaluationList" :on-success="evauploadhandleSuccess" :format="['jpg','jpeg','png']" :max-size="2048" :on-format-error="handleFormatError" :on-exceeded-size="handleMaxSize" :before-upload="evahandleBeforeUpload" multiple type="drag" :action="uploadUrl" style="display: inline-block;width:78px;">
                        <div style="width: 78px;height:78px;line-height: 78px;">
                            <Icon type="ios-camera" size="20"></Icon>
                        </div>
                    </Upload>
                </div>
            </div>
            <div slot="footer">
				<Button type="primary" long @click="evaluation">提交</Button>
			</div>
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
                evauploadList:[],
                evaluationList: [],
                uploadUrl: this.$axios.defaults.baseURL + '/upload/upload?path=account',
                evaluationreason: '',
				//评论图片
				evauploadList: [],
				evaImgs: [],
                evaItem: {}, 
                orderNo:'',
                //评论弹窗
                index:'',
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
			evauploadhandleSuccess(res, file) {
				if(res.code == '200') {
					file.url = res.msg;
					file.name = res.msg;
				}
            },
            evahandleBeforeUpload() {
				let checkeva = this.evauploadList.length < 5;
				if(!checkeva) {
					this.$Notice.warning({
						title: '最多可上传5张图片.'
					});
				}
				return checkeva;
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
			getOrder() {
				this.$axios({
					method: 'get',
					url: '/order/'+this.orderNo,
				}).then((res) => {
                    this.evaItem = res.shippingOrderItems[this.index];
                    console.log(evaItem)
				});
			},
			getParams() {
				// 取到路由带过来的参数 
                this.orderNo = this.$route.query.rforder;
                this.index = this.$route.query.index
			},
						//提交评价
			evaluation() {
				let isimgs = 0;
				if(this.evauploadList.length > 0) {
					isimgs = 1
				} else {
					isimgs = 0;
				}
				this.evauploadList.forEach((item, index) => {
					this.evaImgs[index] = item.url + ','
				})
				//将提交的图片数组转成字符串
				var imgs = "";
				this.evaImgs.forEach((item, index) => {
					imgs += item
				})
				imgs = (imgs.slice(imgs.length - 1) == ',') ? imgs.slice(0, -1) : imgs;
				let _this = this;
				this.$axios({
					method: 'post',
					url: `/comment/create`,
					data: {
						commentContent: _this.evaluationreason,
						commentPics: imgs,
						orderItemsId: _this.evaItem.orderItemsId,
						productId: _this.evaItem.productItemId,
						isImg: isimgs
					}
				}).then((res) => {
					if(res.code == '200') {
						this.$Message.info(res.msg);
						this.evaluationModal = false;
						this.getOrder();
					} else {
						this.$Message.error(res.msg);
						this.evaluationModal = false;
						this.getOrder();
					}
				});
			},
		},
		mounted() {
            this.getParams();
			this.getOrder();
			
			this.evauploadList = this.$refs.evaupload.fileList;
		}
	}
</script>
<style scoped="scoped">
.evaluation .ivu-form-item:not(:last-child) {
    	border-bottom: 1px solid #eee;
	}
	.ivu-form-item {
		padding: 0.5rem 1rem;
		margin-bottom: 0;
	}
	.evaluation{
		background-color: #fff;
		margin-bottom: 2rem;
	}
	.orderNo{
		padding-left:0.5rem; 
		display: block;
		height: 5rem;
		line-height:5rem;
	}
	.evaluation .refundFormPro{
		margin-top: 01rem;
		padding-bottom: 0.5rem;
		border: none!important;
    }
    .refund  >p{
        float: left;
        width: 7rem;
        height: 10rem;
        padding-top:1.5rem;
        text-align: right;
        padding-right: 1rem;
    }
    .refundImg{
        float: left;
        width: calc(100% - 7rem);
        margin-top: 1.5rem;
    }
    .refundImg img{
        width: 3rem;
    }
    .evaluationText{
        float: right;
        width:calc(100% - 3rem);
    }
</style>
