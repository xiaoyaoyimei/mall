<template>
	<div class="order">
		<router-link tag="h2" to="user/address"><Icon type="ios-arrow-thin-left"></Icon>编辑地址</router-link>
	<Form :model="formValidate" label-position="left" :label-width="100" :rules="ruleValidate" ref="formValidate"> 
        <FormItem label="收货人" prop="name">
            <Input v-model="formValidate.name" placeholder="收货人"></Input>
        </FormItem>
        <FormItem label="联系电话" prop="mobile">
            <Input v-model="formValidate.mobile" placeholder="联系电话"></Input>
        </FormItem>
        <FormItem label="所在地区" prop="city">
            <Input v-model="formValidate.city" placeholder="所在地区"></Input>
        </FormItem>
         <FormItem label="详细地址" prop="input4">
            <Input v-model="formValidate.input4" placeholder="详细地址"></Input>
        </FormItem>
    </Form>
		<div class="addaddress">保存</div>
	</div>
</template>

<script>
   export default {
    data () {
        return {
			  formValidate: {
		                    name: '',
		                    mobile: '',
		                    city: '',
		                    input4:''
		                    
		                },
		            ruleValidate: {
	                    name: [
	                        { required: true, message: '收货人不能为空', trigger: 'blur' }
	                    ],
	                    mobile: [
	                        { required: true, message: 'Mobile cannot be empty', trigger: 'blur' },
	                        { type: 'phone', message: 'Incorrect mobile format', trigger: 'blur' }
	                    ],
                    city: [
                        { required: true, message: 'Please select the city', trigger: 'change' }
                    ]
                   },
			  }
       }
   }
</script>

<style scoped="scoped"  lang="scss">
 @import '@/styles/color.scss';
  .addaddress{
  	position: fixed;
  	bottom:0;
  	background: #ed1844;
  	width: 100%;color:#fff;
  	text-align: center;
  	padding:10px 0;
  	cursor: pointer;
  }
  .address{
  	text-align: center;
  	color:#666;
  	margin-top:60px;
  }
  .ivu-form-item{
  	border-bottom: 1px solid #eee;
  	padding: 10px;
  	margin-bottom:0;
  }
</style>