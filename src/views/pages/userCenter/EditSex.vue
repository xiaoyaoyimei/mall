<template>
	<div class="order">
			<div class="m_header_bar">
			<router-link to="/user/setting"  class="m_header_bar_back"><Icon type="ios-arrow-back"></Icon></router-link>
			<span class="m_header_bar_title">修改性别</span>
			<span  @click="handleNick" class="m_header_bar_menu">保存</span>
		</div>
		<div class="sex">
			<p @click="handleNick('M')"><span>男</span><Icon type="md-checkmark"  v-if="'M'==this.sex"/> </p>
			<p @click="handleNick('F')"><span>女</span><Icon type="md-checkmark" v-if="'F'==this.sex"></Icon></p>
			<p @click="handleNick('S')"><span>保密</span><Icon type="md-checkmark" v-if="'S'==this.sex"></Icon></p>
		</div>
	</div>
</template>

<script>
		 export default {
    data () {
      return {
        sex: ''
      }
    },
    methods: {
      getParams () {
        // 取到路由带过来的参数 
        let routerParams = this.$route.query.sex
        // 将数据放在当前组件的数据内
        this.sex = routerParams
      },
      handleNick(value){
	      	this.$axios({
						    method: 'post',
						    url:'/account/update',
						    data:{"sex":value}
						}).then((res)=>{
							if(res.code=='200'){
							this.$Message.success('性别修改成功');
							 this.$router.push('/user/setting');
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

<style scoped="scoped">
.sex p{
	height:40px;
	background: #fff;
	border-bottom: 1px solid #eee;
	line-height: 40px;
	display: flex;
	padding:0 10px;
	cursor: pointer;
}
.sex p span{
	flex:1
}
.sex p i{
	position: relative;
	top: 15px;
	color: red;
	font-size: 2.5rem;
}
</style>