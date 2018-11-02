<template>
    <div>
    		<div class="m_header_bar">
			<router-link to="/user" class="m_header_bar_back">
				<Icon type="ios-arrow-back"></Icon>
			</router-link>
			<span class="m_header_bar_title">建议反馈</span>
			<span class="m_header_bar_menu"></span>
		</div>
        <div class="advice">
                <Form ref="tousuForm" class="form" :model="tousuForm"   :rules="ruleInline" >
                <h6>对于您给的支持和帮助，深表感谢</h6>
                <FormItem   prop="userId">
                <input type="text" placeholder="姓名" class="input" v-model="tousuForm.userId">
                	</FormItem>
                <FormItem   prop="mobile">
                    <input type="text" class="input" placeholder="手机号"  v-model.trim="tousuForm.mobile">
                </FormItem>
                <FormItem   prop="content">
                    <textarea  style="width:100%;height:10rem;" type="textarea"   placeholder="在这里描述您遇到的问题"  v-model="tousuForm.content"></textarea>
                </FormItem>
                <FormItem>
                    <div>
                    <div class="demo-upload-list" style="width:260px;text-align:left" v-for="item in uploadList">
                        <template v-if="item.status === 'finished'">
                            <img width="100px;" :src="item.url  | imgfilter">
                        </template>
                        <template v-else>
                            <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
                        </template>
                    </div>
                    <Upload ref="evaupload" :show-upload-list="false" 
                        :default-file-list="defaultList" 
                        :on-success="evauploadhandleSuccess" :format="['jpg','jpeg','png']" 
                        :max-size="2048" :on-format-error="handleFormatError" 
                        :on-exceeded-size="handleMaxSize" 
                        :before-upload="evahandleBeforeUpload" multiple type="drag" :action="uploadUrl" v-if="showFile" style="display: inline-block;width:80px;">
                        <div style="width: 78px;height:78px;line-height: 78px;">
                            <Icon type="ios-camera" size="20"></Icon>
                        </div>
                    </Upload>
                    </div>
                </FormItem>
             <Button  class="btn" long :loading="loading"  @click="toususubmit()">提交</Button>
            </Form>
        </div>
    </div>
</template>
<script>
    import store from '@/store/store';
	import { validatePHONE } from '@/assets/js/validate';
    export default {
      name: 'login',
      data() {
      	 const validatePhone = (rule, value, callback) => {
      	 	if(value==undefined){
      	 		 callback(new Error('手机号不能为空'));
      	 	}
          else if (!validatePHONE(value)) {
            callback(new Error('请输入正确的手机号'));
          } else {
          	
            callback();
          }
        };
        return {
            uploadUrl: this.$axios.defaults.baseURL + '/upload/upload?path=account',
            tousuForm:{
                userId: '',
                mobile: '',
                content: '',
                imageUrl: '',
},
uploadList: [],
	defaultList: [],
	ruleInline: {
		userId: [	{
					required: true,
					message:'请输入姓名', trigger: 'blur' },
                    ],
                    mobile: [
                                { required: true,  trigger: 'blur',  validator: validatePhone }
                            
                    ],
                    content: [
                            { required: true, message: '请输入内容', trigger: 'blur' },
                    ],
            },
          loading: false,
          showDialog: false,
          showFile:true
        }
      },
    methods: {
        toususubmit() {
        var _this=this;
        this.loading = true;
            _this.$refs.tousuForm.validate(valid => {
                if (valid) {
                    let tousuForm=this.tousuForm;
                    tousuForm.imageUrl = this.uploadList[0].url;
                    this.$axios({
                        method: 'post',
                        url: '/advice/insert',
                        data:tousuForm
                    }).then((res) => {
                        if(res.code == '200') {
                            this.$Message.success('投诉成功');
                            this.$router.push( '/index' );
                        
                        }else{
                            this.loading = false
                            this.$Message.success('投诉失败');
                        }
                    });                    
                    }
                })
                setTimeout(() => {
                     this.loading = false;
                }, 2000);
        },
        evauploadhandleSuccess(res, file){
					if(res.code == '200') {
					file.url = res.msg;
                    file.name = res.msg;
                    this.showFile =false;
				}
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
        evahandleBeforeUpload(){
            let checkeva = this.uploadList.length < 5;
                    if(!checkeva) {
                            this.$Notice.warning({
                                title: '最多可上传5张图片.'
                            });
                        }
                        return checkeva;
        },
      },
    mounted() {
        this.uploadList=this.$refs.evaupload.fileList;
	}
    }
</script>
<style scoped="scoped" lang="scss">
.advice{
	background: #fff;
	margin-top: 1rem;
	padding:  2rem 2rem 5rem; 
	h6{
		font-size: 1.6rem;
		color: #666;
		font-weight: normal;
		margin-bottom: 1rem;
	}
	input{
		width:70%;
	}
	input,textarea{
		padding-left: 0.5rem;
		border:1px solid #eee
		
	}
}
.btn{
	width: 16rem;
	text-align: center;
	background: red;
	color: #fff;
	font-size: 1.6rem;
	height: 4rem;
	
}
</style>
<style>
	.ivu-btn{
		border: 0 none;
	}
</style>

