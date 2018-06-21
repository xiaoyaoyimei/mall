<template>
		<div class="order">
		<div class="m_header_bar">
			<router-link to="/user"  class="m_header_bar_back"><Icon type="ios-arrow-back"></Icon></router-link>
			<span class="m_header_bar_title">个人信息</span>
			<span  class="m_header_bar_menu"></span>
		</div>
		<ul class="flex-ul">
			<li><span>头像</span><router-link :to="{ path: '/user/photo', query: { iconUrl: userinfo.iconUrl }}" tag="span"> 
				<img :src='userinfo.iconUrl' style='vertical-align:middle;width:3.5rem;max-height:4rem'> ></router-link></li>
			<li><span>用户名</span><span ></span></li>
			<li><span>昵称</span> <router-link :to="{ path: '/user/editnick', query: { nickname: userinfo.nickName }}" tag="span"> {{userinfo.nickName}}  ></router-link></li>
			<li><span>性别</span><router-link :to="{ path: '/user/editsex', query: { sex: userinfo.sex }}" tag="span">
			<label v-if="userinfo.sex === 'M'">男</label>	<label  v-else-if="userinfo.sex === 'F'">女</label>	<label  v-else>保密</label>	  > </span></router-link></li>
				<li><span>出生日期</span> 
					<span> 
		   <label v-if="!show">
		   	<DatePicker type="date" confirm placeholder="Select date" style="width: 200px"
		    @on-ok="handleOk"  :value="userinfo.birthday"  @on-change="handleChange"></DatePicker>
		   </label>
		   <label @click="xshow">	<span  v-if="show" >{{userinfo.birthday}}</span> ></label>
			</span> 
				</li>
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
					 show:true
	        	}
	      },
	      methods:{
	       xshow(){
	      		this.show=!this.show;
	      	},
	      	getUser(){
	      				this.$axios({
					    method: 'post',
					    url:'/account',
					}).then((res)=>{
						this.userinfo =res;
					});
	      	},
	      	 handleChange(date) {
                this.userinfo.birthday = date;
            },
	      	//日期插件事件
	      	 handleClick() {
                this.open = !this.open;
            },
	      	handleClear() {
                this.open = false;
                  this.show=!this.show;
            },
            handleOk() {
            	let self=this;
            	      	this.$axios({
						    method: 'post',
						    url:'/account/update',
						    data:{'birthday':this.userinfo.birthday}
						}).then((res)=>{
							if(res.code=='200'){
							 this.$Message.success('修改成功');
							  this.show=!this.show;
							}
						});
                this.open = false;
               
            }
	      },
	      mounted(){
	      	this.getUser()
	      }
    }
</script>

<style>
</style>