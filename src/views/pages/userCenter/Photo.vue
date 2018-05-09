<template>
	<div class="order photo">
		<router-link tag="h2" to="/user/myinfo"><Icon type="ios-arrow-thin-left"></Icon>修改头像 </router-link>
        <span  @click="handleNick">保存</span>
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
//	      	this.$axios({
//						    method: 'post',
//						    url:'/account/update',
//						    data:{"iconUrl":this.iconUrl}
//						}).then((res)=>{
//							if(res.data.code=='200'){
//             				this.$Message.success('头像修改成功');
//            				 this.iconUrl = "";
//							 this.$router.push('/user/myinfo');  
//							}
//						});
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