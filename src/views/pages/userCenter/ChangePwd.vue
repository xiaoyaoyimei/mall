<template>
		<div class="order">
			<div class="m_header_bar">
				<router-link to="/user/setting"  class="m_header_bar_back"><Icon type="ios-arrow-back"></Icon></router-link>
				<span class="m_header_bar_title">修改密码 </span>
			</div>
				<Form ref="pwd" :model="pwd"  :rules="pwdValidate" class="form_wrap">
					<FormItem  prop="newpass">
						<i-input v-model.trim="pwd.newpass" placeholder="请输入新密码" type="password"></i-input>
					</FormItem>
					<FormItem  prop="newpassagian">
						<i-input v-model.trim="pwd.newpassagian" placeholder="请确认新密码" type="password"></i-input>
					</FormItem>
				</Form>
				 <div class="btn-wrap"><Button  type="primary" @click="handleOk" long class="btn-red">保存</Button></div>
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
</style>
