<template>
	<div >
			<div class="m_header_bar">
			 <span  class="m_header_bar_back" @click="cancelpay()"><Icon type="ios-arrow-back"></Icon></span>
			<span class="m_header_bar_title">支付方式</span>
			<router-link  to="/user/orderlist" tag="span" class="m_header_bar_menu">订单</router-link>
		</div>
		  <Form ref="formValidate" :model="formValidate" :rules="ruleValidate">
		  	 <FormItem  prop="payType">
			  <ul class="order-list">
			  	<li><img  src="../../../assets/img/we.png">微信支付<i><input type="radio" name="zffs" v-model="formValidate.payType" value="wepay"> </i></li>
			  	<li><img  src="../../../assets/img/alipay.png">支付宝支付<i><input type="radio" name="zffs"  v-model="formValidate.payType" value="alipay" > </i></li>
			  </ul>
		  </FormItem>
		   <div  class="button_submit"> <Button type="success" long  @click="handleSubmit()">去支付</Button></div>
    	</Form>
    	
    	<div id="zhifu" ref="zhifu"></div>
		    	   <Modal v-model="payshow" width="240" :mask-closable="false">
		        <div >
		            <p style="color:#f60;text-align:center;font-size: 1.6rem;">确认离开收银台？请尽快完成支付</p>
		        </div>
		        <div slot="footer" style="text-align:center">
		        	 <Button    @click="continueshow" class="mr10">继续支付</Button>
		              <Button type="error"  @click="level()">确认离开</Button>
		        </div>
		    </Modal>
		       <Modal v-model="weixinshow" width="240" :closable="false" :mask-closable="false">
		        <div >
		            <p style="text-align:center;font-size: 1.6rem;">请确认微信支付是否已完成</p>
		        </div>
		        <div slot="footer" style="text-align:center" class="weixin_btn">
		               <Button    @click="level()" type="success" class="mr10">已完成支付</Button>
		              <Button type="error"  @click="continueshow">支付遇到问题,重新支付</Button>
		        </div>
		    </Modal>
     </div>
</template>

<script>
	 export default {
        data () {
            return {
            	payshow:false,
            	weixinshow:false,
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
        	cancelpay(){
        		this.payshow=true;
        	},
        	continueshow(){
        		this.payshow=false;
        		this.weixinshow=false;
        	},
        	level(){
        		this.$router.push({name:'/order/detail',query:{orderNo:this.orderNo}});  
        	},
	    	getParams () {
	                // 取到路由带过来的参数 
	                let routerParams = this.$route.query.orderNo;
	                // 将数据放在当前组件的数据内
	                this.orderNo = routerParams;
	          },
        	 handleSubmit () {
                this.$refs['formValidate'].validate((valid) => {
                    if (valid) {
                    		if(this.formValidate.payType=='alipay'){
                        this.$axios({
						    method: 'post',
						    url:'/order/'+this.formValidate.payType+'/'+this.orderNo,
						}).then((res)=>{
							this.$refs['zhifu'].innerHTML=res;
							document.getElementsByName('punchout_form')[0].submit()
						});
						}else{
							  this.weixinshow=true;
							   this.$axios({
								    method: 'get',
								    url:'/order/weixin/h5/'+this.orderNo,
								}).then((res)=>{
									if(res.code=='200'){
										let urlo=window.location.origin;
										var redirect_url = encodeURIComponent(urlo+'/#/user/orderlist');
									    window.open(res.msg+'&redirect_url='+redirect_url);
									  }
								});
						}
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
.button_submit {
	margin: 0 1rem;
}
.weixin_btn button{
	margin-bottom: 15px;
}
.mr10{
	margin-right: 1rem;
}
</style>