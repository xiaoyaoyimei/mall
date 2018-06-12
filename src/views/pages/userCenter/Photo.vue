<template>
	<div class="order photo">

       	<div class="m_header_bar">
			<router-link to="/user/myinfo"  class="m_header_bar_back"><Icon type="ios-arrow-back"></Icon></router-link>
			<span class="m_header_bar_title">修改头像  </span>
			 <span  @click="handlePhoto" class="m_header_bar_menu">保存</span>
		</div>
		<div class="flex-center">
			 <div class="demo-upload-list" v-for="item in uploadList">
						    <template v-if="item.status === 'finished'">
						            <img :src="item.url"  class="origin_tx"/>
						            <div class="demo-upload-list-cover">
						                <Icon type="ios-eye-outline" @click.native="handleView(item)"></Icon>
						            </div>
						        </template>
						        <template v-else>
						            <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
						        </template>
						    </div>
						    <Upload
						        ref="upload"
						         :default-file-list="uploadList"
						        :show-upload-list="false"
						        :on-success="handleSuccess"
						        :format="['jpg','jpeg','png']"
						        :max-size="5120"
						        :on-format-error="handleFormatError"
						        :on-exceeded-size="handleMaxSize"
						        type="drag"
						        :action="uploadUrl"
						         style="display: inline-block;width:5.8rem;">
						        <div style="width:5.8rem;height:5.8rem;line-height:5.8rem;">
						            <Icon type="camera" size="20"></Icon>
						        </div>
						    </Upload> 
						<modal title="查看 头像大图" v-model="visible">
       				 <img :src="bigimg " v-if="visible" style="width: 100%">
   					 </modal>
   					 </div>
</div>
</template>
<script>
 export default {
        data () {
            return {
            	visible:false,
            	   	uploadList: [
	        	 {'url':''}
	        	 ],
                 iconUrl:'',
                 uploadUrl:this.$axios.defaults.baseURL+'upload/upload?path=account'
            }
        },
        methods: {
        	  	handleView (item) {
                this.bigimg = item.url;
                this.visible = true;
            },
        	handleFormatError (file) {
                this.$Notice.warning({
                    title: '文件格式不符要求',
                    desc: '该 ' + file.name + ' 文件不正确, 请选择 .jpg 或者.png文件'
                });
            },
               handleMaxSize (file) {
                this.$Notice.warning({
                    title: '文件过大',
                    desc: '该  ' + file.name + ' 文件过大, 请小于 5M.'
                });
            },
        	handleSuccess(res){
            if(res.code == '200'){
				this.uploadList[0].url=this.global_.imgurl+res.msg
              }          
          	},
          handlePhoto(){
          		this.$axios({
						    method: 'post',
						    url:'/account/update',
						    data:{'iconUrl':this.iconUrl}
						}).then((res)=>{
							if(res.code=='200'){
							 this.$Message.success('修改头像成功');
							}
						});
          },
          getParams () {
                // 取到路由带过来的参数 
                let routerParams = this.$route.query.iconUrl;
                // 将数据放在当前组件的数据内
                this.iconUrl = routerParams;
               	this.uploadList[0].url=this.iconUrl;
          },
        },
         mounted() {
               this.getParams();
          }
    }

</script>

<style scope='scope'>
 .demo-upload-list{
        display: inline-block;
        width: 60px;
        height: 60px;
        text-align: center;
        line-height: 60px;
        border: 1px solid transparent;
        border-radius: 4px;
        overflow: hidden;
        background: #fff;
        position: relative;
        box-shadow: 0 1px 1px rgba(0,0,0,.2);
        margin-right: 4px;
    }
    .demo-upload-list img{
        width: 100%;
        height: 100%;
    }
    .demo-upload-list-cover{
        display: none;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0,0,0,.6);
    }
    .demo-upload-list:hover .demo-upload-list-cover{
        display: block;
    }
    .demo-upload-list-cover i{
        color: #fff;
        font-size: 20px;
        cursor: pointer;
        margin: 0 2px;
    }
</style>