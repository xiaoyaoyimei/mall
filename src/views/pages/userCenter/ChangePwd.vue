<template>
		<div class="order">
			<div class="m_header_bar">
				<router-link to="/user/myinfo"  class="m_header_bar_back"><Icon type="ios-arrow-back"></Icon></router-link>
				<span class="m_header_bar_title">修改密码 </span>
				<span  @click="handleOk" class="m_header_bar_menu">保存</span>
			</div>
				<Form ref="pwd" :model="pwd"  :label-width="100"  :rules="pwdValidate"  class="P15">
					<FormItem label="新密码:" prop="newpass">
						<i-input v-model="pwd.newpass" placeholder="请输入新密码" type="password"></i-input>
					</FormItem>
					<FormItem label="确认密码:" prop="newpassagian">
						<i-input v-model="pwd.newpassagian" placeholder="请确认新密码" type="password"></i-input>
					</FormItem>
					<FormItem>
					</FormItem>
				</Form>
   			 </modal>
		</div>
</template>

<script>
		export default {
	    data () {
	        return {
				pwd: {
                    newpass: '',
                    newpassagian: '',
                },
                pwdValidate: {
                    newpass: [
                        { required: true, message: '请输入新密码', trigger: 'blur' },
					    { type: 'string', min: 6, message: '新密码不能少于6位', trigger: 'blur' }
                    ],
                    newpassagian: [
                       { required: true, message: '请输入确认密码', trigger: 'blur' },
					    { type: 'string', min: 6, message: '确认密码不能少于6位', trigger: 'blur' }
                    ],

                },
			}
	      },
	      methods:{
            handleOk() {
            	if(this.pwd.newpass!=this.pwd.newpassagian){
            		 this.$Message.error('两次密码不一致,请重新输入');
            		 return;
            	}
            	this.$refs['pwd'].validate((valid) => {
                    if (valid) {
            	      	this.$axios({
						    method: 'post',
						    url:'/customer/update/password?password='+this.pwd.newpass,
						}).then((res)=>{
							if(res.code=='200'){
							 this.$Message.success('密码修改成功');
							 this.$router.push('/user');
							}
						});
					}
                })
		 	 },
		},
	}

</script>

<style scoped="scoped" lang="scss">
   .P15{
   	padding: 1.5rem;
   }
</style>
