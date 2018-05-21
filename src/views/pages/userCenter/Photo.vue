<template>
	<div class="order photo">
       	<div class="m_header_bar">
			<router-link to="/user/myinfo"  class="m_header_bar_back"><Icon type="ios-arrow-back"></Icon></router-link>
			<span class="m_header_bar_title">修改头像  </span>
			 <span  @click="handlePhoto" class="m_header_bar_menu">保存</span>
		</div>
		<div class="user-con-wrap">
         <div class="demo-upload-list" v-for="item in uploadList">
        <template v-if="item.status === 'finished'">
            <img :src="item.url">
            <div class="demo-upload-list-cover">
                <Icon type="ios-eye-outline" @click.native="handleView(item.name)"></Icon>
                <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
            </div>
        </template>
        <template v-else>
            <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
        </template>
    </div>
        <Upload
        ref="upload"
        :show-upload-list="false"
        :on-success="handleSuccess"
        :format="['jpg','jpeg','png']"
        :max-size="2048"
        :on-format-error="handleFormatError"
        :on-exceeded-size="handleMaxSize"
        multiple
        type="drag"
       :action="uploadUrl"
        style="display: inline-block;width:58px;">
        <div style="width: 58px;height:58px;line-height: 58px;">
            <Icon type="camera" size="20"></Icon>
        </div>
           </Upload> 
	</div>
	</div>
</template>
<script>
 export default {
        data () {
            return {
            	uploadList: [],
                 iconUrl:'',
                 imageSrc:this.global_.imgurl,
                 uploadUrl:this.$axios.defaults.baseURL+'upload/upload?path=account'
            }
        },
        methods: {
        	handleFormatError (file) {
                this.$Notice.warning({
                    title: '文件格式不符要求',
                    desc: '该 ' + file.name + ' 文件不正确, 请选择 .jpg 或者.png文件'
                });
            },
               handleMaxSize (file) {
                this.$Notice.warning({
                    title: '文件过大',
                    desc: '该  ' + file.name + ' 文件过大, 请小于 2M.'
                });
            },
          handleSuccess(res){
            if(res.code == '200'){
                this.iconUrl=this.imageSrc + res.msg;
              }          
          },
          handlePhoto(){
          	let self=this;
            this.fang_.editUser(self,{"iconUrl":this.iconUrl});
          },
          getParams () {
                // 取到路由带过来的参数 
                let routerParams = this.$route.query.iconUrl;
                // 将数据放在当前组件的数据内
                this.iconUrl = routerParams;
          },
        
         
        },
         mounted() {
               this.getParams();
          }
    }

</script>

<style scope='scope'>
.series1 img{
	margin-left:10px;
  width:62px;
}

</style>