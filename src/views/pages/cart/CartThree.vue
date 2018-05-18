<template>
	<div class="order">
		<h2><span><Icon type="ios-arrow-left"></Icon></span>支付方式<router-link  to="/user/orderlist" tag="span">订单中心</router-link></h2>
		
		  <Form ref="formValidate" :model="formValidate" :rules="ruleValidate">
		  	 <FormItem  prop="payType">
			  <ul class="order-list">
			  	<li><img  src="../../../assets/img/we.png">微信支付<i><input type="radio" name="zffs" v-model="formValidate.payType" value="wepay"> </i></li>
			  	<li><img  src="../../../assets/img/alipay.png">支付宝支付<i><input type="radio" name="zffs"  v-model="formValidate.payType" value="alipay" > </i></li>
			  </ul>
		  </FormItem>
		    <Button type="success" long  @click="handleSubmit('formValidate')">去支付</Button>
    	</Form>
    	<!--<form ref="formValidate"  action='/order/'>
			  <ul class="order-list">
			  	<li><img  src="../../../assets/img/we.png">微信支付<i><input type="radio" name="zffs" v-model="formValidate.payType" value="wepay"> </i></li>
			  	<li><img  src="../../../assets/img/alipay.png">支付宝支付<i><input type="radio" name="zffs"  v-model="formValidate.payType" value="alipay" > </i></li>
			  </ul>
		    <button type="submit" >去支付</button>
    	</form >-->
    	<div id="zhifu" ref="zhifu"></div>
     </div>
</template>

<script>
	 export default {
        data () {
            return {
            	orderNo:'',
            	formValidate:{
            			payType:'',
            	},
            	ruleValidate: {
                    payType: [
                        { required: true, message: '请选择支付方式', trigger: 'blur' }
                    ],
                   }
            }
        },
        methods:{
	    	getParams () {
	                // 取到路由带过来的参数 
	                let routerParams = this.$route.params.orderNo;
	                console.log(routerParams);
	                // 将数据放在当前组件的数据内
	                this.orderNo = routerParams;
	          },
         handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.$axios({
						    method: 'post',
						    url:'/order/'+this.formValidate.payType+'/'+this.orderNo,
						}).then((res)=>{
							this.$refs['zhifu'].innerHTML=res;
							document.getElementsByName('punchout_form')[0].submit()
						});
                    } else {
                        this.$Message.error('Fail!');
                    }
                })
            },
        },
           mounted() {
               this.getParams();
          }
       }
</script>

<style scoped="scoped" lang="scss">
	 @import '@/styles/color.scss';
	 .order-list{
	 	margin-bottom: 10px;
	 }
</style>