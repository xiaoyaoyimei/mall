<template>
	<div class="font-16">
	<div  class="m_header_bar">
			<router-link to="/seckill"  class="m_header_bar_back"><Icon type="ios-arrow-back"></Icon></router-link>
			<span class="m_header_bar_title">秒杀详情</span>
		</div>
	 <div class="detail">
		<div class="tp">
		<img :src="detail.productItem.listImg | imgfilter"/>
		<div class="cursh-wrap">
		<p class="jg">
		<span class="color-dx">秒杀价:￥{{detail.crush.salePrice | pricefilter}}</span>
		<span class="yj">原价:￥{{detail.productItem.salePrice | pricefilter}}</span>	
		</p>
		<div class="djs" >
		 		<p v-if="detail.switch==0">距开始还有</p>
		 		<p v-else>距结束还剩</p>
		 		<span>{{ `${day}天 ${hr}:${min}:${sec}` }}</span>
	    </div>
	    </div>
		</div>
					 	
		  <div class="chooseAddress">
            	<ul class="address" v-if="youdizhi">
				<li>
					<p><strong>{{addressList.person}} <label>{{addressList.phone}}</label></strong>
					<span>{{addressList.receiveProvince}}{{addressList.receiveCity}}{{addressList.receiveDistrict}}{{addressList.address}}</span></p>
						<Icon type="chevron-right"  @click.native="addAdd"></Icon>
				</li>
			   </ul>
                <div  class="zeroAddress" v-else >
                	<div @click="addAdd">
                		请选择收货地址
                	<Icon class='float float1' type="ios-arrow-right"></Icon>
                  </div>
                </div>
            </div>
		<div class="xq">
		<p>{{detail.product.modelName}}</p>	
		 <div>数量 <InputNumber  :min="1"  v-model="quantity" :max="detail.crush.unitQuantity*1"></InputNumber></div>
		 </div>
	</div>
	       <Tabs class="spjs">
        <TabPane label="商品介绍">
        	<ul><li v-for="(item, index) in productimg"  :key="index"><img :src="item.imgUrl |imgfilter"></li></ul>
        </TabPane>
        <TabPane label="规格参数" >
        		<ul class="gk">
        			<li v-for="(item, index) in productDesc"  :key="index">
        			<span class="title">{{item.attrCode}}:</span> <span class="neirong">{{item.attrValue}}</span></li></ul>
        </TabPane>
    </Tabs>
	    <div class="foot"> 
	    	<button type="button" @click="confirm" class="miaoshagou" v-if="detail.switch==1" >马上抢</button>
	    	<button class="btn-disabled" type="button" v-else>尚未开始</button>
  		  </div>  
	</div>
</template>
<script>
		export default {
	    data () {
	        return {
	        	day: 0, hr: 0, min: 0, sec: 0,
	        	jsqtime:0,
	        	detail:{
	        		productItem:{salePrice:0},
	        		product:{},
	        		crush:{salePrice:0}
	        	},
	        	skuId:'',
	        	quantity:1,
	        	loading:true,
	        	youdizhi:false,
	        	proId:'',
	        	productDesc:[],
	        	productimg:[],
	        	temp:'',
	        	addressList:{},
	        	
	        }
	      },
	      methods:{
	      	//获取address中传来的数据
	      	       countdown: function () {
                const end = Date.parse(new Date(this.jsqtime));
                const now = Date.parse(new Date());
                const msec = end - now;
                //当秒杀开始时
                if(msec==0){
                	this.detail.switch=1;
                	this.jsqtime = this.detail.crush["endTime"];
                }
                let day = parseInt(msec / 1000 / 60 / 60 / 24);
                let hr = parseInt(msec / 1000 / 60 / 60 % 24);
                let min = parseInt(msec / 1000 / 60 % 60);
                let sec = parseInt(msec / 1000 % 60);
                this.day = day;
                this.hr = hr > 9 ? hr : '0' + hr;
                this.min = min > 9 ? min : '0' + min;
                this.sec = sec > 9 ? sec : '0' + sec;
                let self=this;
                  this.t= setTimeout(() => {
                                self.countdown();
                        }, 	1000);
               },
	      	getDD(){
                let routerParams = this.$route.params.address;
                if(routerParams!=undefined){
                	this.addressList=routerParams;
                	this.youdizhi=true
                }
        	},
	       addAdd(){
	       	     localStorage.setItem('fromc','miaosha')
        		 this.$router.push({name: '/user/address'}) ;
        	},
		    getAddress(){
		    		let token=localStorage.getItem('token');
		    		if(token!=undefined&&token!=null){
		      	var _this=this;
		      	  	this.$axios({
						    method: 'post',
						    url:'/address',
						}).then((res)=>{
							 if(res.length>0){
							 	res.map(function (i) {
							 		if(i.isDefault=='Y'&&JSON.stringify(_this.addressList) == "{}"){
							 			_this.addressList=i;
							 			 _this.youdizhi=true
							 		}
							 	});
								
							}
						});
						}
		      },
		      confirm(){
	          	let para={
						addressId:this.addressList.id,
						quantity:this.quantity,
	                    skuId:this.temp
	          	};
    	   	  	this.$axios({
				    method: 'post',
				    url:'/promotion/crush/confirm',
				    data:para
				}).then((res)=>{
					if(res.code=='200'){
						 localStorage.removeItem('skuId');
						 this.$router.push({name:'/cartthree',query: { orderNo: res.msg}});  
					}else{
						 this.$Message.error(res.object);
						 return;
					}
				});
           },
	      	getDetail(){
		      		if(this.$route.query.skuId!=null&&this.$route.query.skuId!=undefined){
		      			   this.temp=this.$route.query.skuId;
		      			   localStorage.setItem('skuId',this.temp);
		      		}
	      			this.$axios({
					    method: 'get',
					    url:'/promotion/crush/'+  localStorage.getItem('skuId'),
					}).then((res)=>{
						if(res.code=='200'){
						this.detail = res.object;
						if(this.detail.switch=='0'){
			            		this.jsqtime=this.detail.crush["startTime"]
			            	}
			            	else{
			                 	this.jsqtime = this.detail.crush["endTime"];
			                 }
			            	//计时器
			            	 this.countdown();
						this.proId=res.object.productItem.productId;
								this.$axios({
							    method: 'post',
							    url:'/product/desc/'+this.proId,
								}).then((res)=>{
								this.productDesc=res;
							});
								this.$axios({
							    method: 'post',
							    url:'/product/img/'+this.proId,
								}).then((res)=>{
										this.productimg=res;
							});
						}
					});
					
					}
			 },
	      mounted(){
	      	this.getAddress();
			  this.getDetail()
			  this.getDD();
	      },
	          destroyed () {
               clearTimeout(this.t)
        },
    }
</script>

<style scoped="scoped" lang="scss">
	.detail {
		.tp{
		 position:relative;
		img{
			display: block;
			width:100%;
			text-align: center;
		}
		}
	}
	.jg {
		background: #fff;
		padding: 1rem;
		flex: 1;
		span{
		display: block;
		}
		.yj{
			text-decoration:line-through;
			font-size: 1.2rem;
		}
	}
	.xq{
		padding: 1rem;
		margin-bottom: 1rem;
		margin-top: 1rem;
		background: #fff;
		p{
			margin-bottom: 1rem;
		}
	}
	.chooseAddress{
		margin-top: 10px;;
	}
.btn-disabled{
	width:100%;
	background: #f5f5f5;
	cursor: not-allowed;
	color:#787878;
}
.djs{
	background:#b92567;
	color: #fff;
	padding: 0.5rem;
}
.cursh-wrap{
	display: flex;
    border: 1px solid #b92567;
}
</style>
<style>
	.spjs .ivu-tabs-tab{
		font-size: 1.6rem;
		text-align: center;
	}
	</style>