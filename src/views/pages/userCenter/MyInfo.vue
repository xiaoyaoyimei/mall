<template>
		<div class="order">
		<router-link tag="h2" to="/user"><Icon type="ios-arrow-thin-left"></Icon>个人信息</router-link>
		<ul class="flex-ul">
			<li><span>头像</span><span >></span></li>
			<li><span>用户名</span><span ></span></li>
			<li><span>昵称</span> <router-link :to="{ path: '/user/editnick', query: { nickname: userinfo.nickName }}" tag="span"> {{userinfo.nickName}}  ></router-link></li>
			<li><span>性别</span><router-link :to="{ path: '/user/editsex', query: { sex: userinfo.sex }}" tag="span">
			<label v-if="userinfo.sex === 'M'">男</label>	<label  v-else-if="userinfo.sex === 'F'">女</label>	<label  v-else>保密</label>	  > </span></router-link></li>
			<li><span>出生日期</span> <span> {{userinfo.email}} ></span> </li>
		</ul>
		
		
		</div>
</template>

<script>
		export default {
	    data () {
	        return {
	        	userinfo:{
	        		birthday: "",
					sex: "",
					nickName: "",
					 iconUrl: "",
					  },
	        }
	      },
	      methods:{
	      	getUser(){
	      				this.$axios({
					    method: 'post',
					    url:'/account',
					}).then((res)=>{
						this.userinfo = Object.assign({},res.data);
					});
	      	}
	      },
	      mounted(){
	      	this.getUser()
	      }
    }
</script>

<style>
	.flex-ul li{
		display: flex;
		flex-direction: row;
		border-bottom: 1px solid #eee;
		height:45px;
		line-height: 45px;
		font-size: 14px;
		padding:0 10px;
	}
	.flex-ul li span:first-child{
		width:80%
	}
	.flex-ul li span:last-child{
		    position: fixed;
		    cursor: pointer;
	    right: 15px;
	    font-size: 16px;
	}
</style>