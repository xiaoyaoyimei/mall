<template>
		<div class="order coupon">
		<router-link tag="h2" to="/user"><Icon type="ios-arrow-thin-left"></Icon>账号设置</router-link>
			<ul class="flex-ul">
			<li><router-link :to="{ path: '/user/address'}" tag="span"> 地址管理</router-link><span >></span></li>
		</ul>
		<div  class="bottom-buttom" @click="logout">退出登录</div>
   </div>
</template>

<script>
		export default {
		methods:{
			logout: function () {
				var _this = this;
				   this.$Modal.confirm({
                    title: '提示',
                    content: '<p>确认退出吗?</p>',
                    onOk: () => {
		                    this.$axios({
							    method: 'post',
							    url:'/customer/logout',
							}).then((res)=>{
								     if (res.data.code !== 200) {
				                 		 this.$Message.error(res.data.msg);
				              		} 
				              		else{
										sessionStorage.removeItem('token');
				                       sessionStorage.removeItem('userId');
				    					_this.$router.push('/login');
			    					}
							});
		                       
                    },
                    onCancel: () => {
                        this.$Message.info('取消退出');
                    }
                });
			},
			}
		}
</script>

<style>
</style>