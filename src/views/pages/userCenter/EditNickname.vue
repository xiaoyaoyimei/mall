<template>
	<div class="order">
		<div class="m_header_bar">
			<router-link to="/user/setting"  class="m_header_bar_back"><Icon type="ios-arrow-back"></Icon></router-link>
			 <span class="m_header_bar_title">修改昵称  </span>
			 <span  @click="handleNick" class="m_header_bar_menu">保存</span>
		</div>
	<div class="user-con-wrap">
	     <Input type="text" v-model="name" placeholder="请输入昵称" >
	     </Input>
	     <span class="color-gray">2-40个字符，可由中英文、数字、"_"、"-"组成</span>
		</div>
	</div>
</template>

<script>
  export default {
    data () {
      return {
        name: ''
      }
    },
    methods: {
      getParams () {
        // 取到路由带过来的参数 
        let routerParams = this.$route.query.nickname
        // 将数据放在当前组件的数据内
        this.name = routerParams
      },
      handleNick(){
      		this.$axios({
						    method: 'post',
						    url:'/account/update',
						    data:{'nickName':this.name}
						}).then((res)=>{
							if(res.code=='200'){
							 this.$Message.success('修改成功');
							 this.$router.push('/user/myinfo');
							}
						});
      }
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
