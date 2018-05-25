<template>
	<div>
		<div class="m_header_bar">
			<router-link to="/index"  class="m_header_bar_back"><Icon type="ios-arrow-back"></Icon></router-link>
			<span class="m_header_bar_title">秒杀</span>
		</div>
		<div class="floor">
		
				<div   class="spdetail"    v-for="(item, index) in pro" :key='index'>
							<router-link :to="{ path: '/seckill',query:{id:item.id} }">
								<img  :src='item.productItem.listImg |imgfilter'>
							   <div class="right">	
							   	<p class="sP">{{item.product.modelName}}</p>
							   	<div> 
							   		<span  >{{shijian}}{{czitem(item,item.crush.endTime)}}</span>
							   		<!--	<count-down v-bind:endTime="Date(item.crush.endTime).getTime()" :callback="callback" endText="已经结束了"></count-down>-->
							   	</div>
								<div class="crush">
									<div class="left">
										<span>￥{{item.crush.salePrice}}</span>
										<em>￥{{item.product.salePrice}}</em>
									</div>
									<div class="r"><button class="btn-dx">立即抢购</button>
										  <Progress  :percent="percent(item.crush)"></Progress>
									</div>
								</div>
								</div>
							</router-link>
						</div>
	    </div>
	</div>
</template>
	
<script>
	import countDown from '@/components/SecDao'
	export default {
        data () {
            return {
                pro:[],
                nowtime:new Date(),
                shijian:''
            }
        },
           components:{
        	countDown
        },
        computed: {
//		    percent: function () {
//		    	return this.pro.map(item => item.crush.usedQuantity/item.crush.totalQuantity);
//		     // return this.pro.crush.usedQuantity/this.pro.crush.totalQuantity
//		    }
  			},
  		
        methods: {
    	     getNewChannel(){
    	     	this.$axios({
						    method: 'GET',
						    url:'/promotion/crush',
						}).then((res)=>{
							if(res.code=='200'){
							 this.pro=res.object;
							}
						});
						
    	      	},
    	      	percent(v){
    	      		return v.usedQuantity/v.totalQuantity
    	      	},
    	      	czitem(item,v){
    	      		let timer = setInterval(function(){
    	      			 var date1= new Date(v).getTime();  //结束时间
								    var date2 = new Date();    //当前时间
								    var date3 =date1- date2.getTime() ;   //时间差的毫秒数        
								    //计算出相差天数  
								   // var days=Math.floor(date3/(24*3600*1000))  
								   if(date3>0){
								    //计算出小时数  
								    var leave1=date3%(24*3600*1000)    //计算天数后剩余的毫秒数  
								    var hours=Math.floor(date3/(3600*1000))  
								    //计算相差分钟数  
								    var leave2=leave1%(3600*1000)        //计算小时数后剩余的毫秒数  
								    var minutes=Math.floor(leave2/(60*1000))  
								    //计算相差秒数  
								    var leave3=leave2%(60*1000)      //计算分钟数后剩余的毫秒数  
								    var seconds=Math.round(leave3/1000)  
								      hours+"小时 "+minutes+" 分钟"+seconds+" 秒";
								   }
								   else{
								   	 clearInterval(timer);
								     }
    	      			   },2000);
                       
                         
   // alert(" 相差 "+days+"天 "+hours+"小时 "+minutes+" 分钟"+seconds+" 秒")
    	      	}
    	},
        mounted() {
			this.getNewChannel();
		}
    }
</script>
<style scoped="scoped" lang="scss">
.crush{
	display: flex;
	.left{
		flex:1;
		span{
		color:#D32112;
		display: block;
		font-weight: 600;
			}
	 em{
		text-decoration: line-through;
		font-size: 0.8rem;
		color:#999
	}
	}
}
</style>