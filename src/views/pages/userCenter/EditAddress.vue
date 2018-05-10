<template>
	<div class="order">
		<router-link tag="h2" to="/user/address"><Icon type="ios-arrow-thin-left"></Icon>添加新地址</router-link>
		<span>保存</span>
	<Form :model="formValidate" label-position="left" :label-width="100" :rules="ruleValidate" ref="formValidate" style="background: #fff;"> 
        <FormItem label="收货人" prop="person">
            <Input v-model="formValidate.person" placeholder="收货人"></Input>
        </FormItem>
        <FormItem label="联系电话" prop="phone">
            <Input v-model="formValidate.phone" placeholder="联系电话"></Input>
        </FormItem>
        <FormItem label="所在地区" prop="city">
        	 <Cascader  v-model="addressOption"></Cascader>
        </FormItem>
         <FormItem label="详细地址" prop="address">
            <Input v-model="formValidate.address" placeholder="详细地址"></Input>
        </FormItem>
    </Form>
	</div>
</template>

<script>
   export default {
    data () {
        return {
        	addressOption: [],
			  formValidate: {
		                    person: '',
		                    phone: '',
		                    
		                    address:''
		                    
		                },
		            ruleValidate: {
	                    name: [
	                        { required: true, message: '收货人不能为空', trigger: 'blur' }
	                    ],
	                    mobile: [
	                        { required: true, message: 'Mobile cannot be empty', trigger: 'blur' },
	                        { type: 'number', message: 'Incorrect mobile format', trigger: 'blur' }
	                    ],
                    city: [
                        { required: true, message: 'Please select the city', trigger: 'change' }
                    ]
                   },
			  }
		
      	},
    	      methods: {
    	      	getAddressOption(){
    	      		  	this.$axios({
						    method: 'post',
						    url:'/common/address',
						}).then((res)=>{
							console.log(res);
							 this.addressOption=res;
							 
						});
    	      	}
			      },
			         mounted() {
			this.getAddressOption();
		}
   }
</script>

<style scoped="scoped"  lang="scss">
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