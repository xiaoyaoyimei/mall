<template>
	<div class="order photo">
       	<div class="m_header_bar">
			<router-link to="/user/myinfo"  class="m_header_bar_back"><Icon type="ios-arrow-back"></Icon></router-link>
			<span class="m_header_bar_title">修改头像  </span>
			 <span  @click="handleNick" class="m_header_bar_menu">保存</span>
		</div>
        <div>
        	
        <Upload
            :action="uploadUrl"
            :on-success="handleSuccess"
            :show-upload-list='false' >
            <Row class="series1">
         		<Col span="15"><img  :src="iconUrl"></Col>
         		  <Col span="6"><Button class='btn' type="ghost" icon="ios-cloud-upload-outline">选择头像</Button></Col>
   		      </Row>  
        </Upload> 
    </div>
	</div>
</template>
<script>
 export default {
        data () {
            return {
                 iconUrl:'',
                 imageSrc:this.global_.imgurl,
                 uploadUrl:this.$axios.defaults.baseURL+'upload/upload?path=accout'
            }
        },
        methods: {
          handleSuccess(res){
            if(res.code == '200'){
                this.iconUrl=this.imageSrc + res.msg;
              }          
          },
          handleNick(){
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
          watch: {
            // 监测路由变化,只要变化了就调用获取路由参数方法将数据存储本组件即可
               '$route': 'getParams'
          },
         mounted() {
               this.getParams();
          }
    }

</script>

<style scope='scope' >
.photo .btn{
  margin-top:15px;
}
.photo .ivu-upload-select {
 
  width:100%;
}
.photo .ivu-col{
 text-align:left;
 padding-left:20px;
 box-sizing:border-box;
}
photo div ul{
  display:none!important;
}
.color-gray{
	color:#999;
}
.series1{
  margin-top:25px;
}
.series1 img{
  width:62px;
}
</style>