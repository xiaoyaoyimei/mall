<template>
	<div class="order">
		<router-link tag="h2" to="/user/myinfo"><Icon type="ios-arrow-thin-left"></Icon>修改昵称 </router-link>
		<span  @click="handleNick">保存</span>
		<div>
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
						    data:{"nickName":this.name}
						}).then((res)=>{
							if(res.data.code=='200'){
							 this.$Message.success('昵称修改成功');
							 this.$router.push('/user/myinfo')  
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
