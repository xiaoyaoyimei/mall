<template>
		<div class="order coupon">
		<div class="m_header_bar">
			<router-link to="/user"  class="m_header_bar_back"><Icon type="ios-arrow-back"></Icon></router-link>
			<span class="m_header_bar_title">账号设置</span>
			<span  class="m_header_bar_menu"></span>
		</div>
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
								     if (res.code !== 200) {
				                 		 this.$Message.error(res.msg);
				              		} 
				              		else{
										this.$store.commit('LOGOUT');  
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