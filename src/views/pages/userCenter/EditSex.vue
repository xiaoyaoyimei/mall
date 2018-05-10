<template>
	<div class="order">
		<h2><router-link to="/user/myinfo"><Icon type="ios-arrow-thin-left"></Icon> </router-link>修改性别</h2>
		<span  @click="handleNick">保存</span>
		<div>
	    <RadioGroup v-model="sex" vertical>
        <Radio label="M">
            <span>男</span>
        </Radio>
        <Radio label="F">
            <span>女</span>
        </Radio>
        <Radio label="S">
            <span>保密</span>
        </Radio>
    </RadioGroup>
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
      handleNick(){
	      	this.$axios({
						    method: 'post',
						    url:'/account/update',
						    data:{"sex":this.sex}
						}).then((res)=>{
							if(res.data.code=='200'){
							 this.$Message.success('性别修改成功');
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

<style scoped="scoped">
	.order >span{
	    position: fixed;
    right: 15px;
    top: 15px;
    color: #fff;
    cursor: pointer;
}
.color-gray{
	color:#999;
}
</style>