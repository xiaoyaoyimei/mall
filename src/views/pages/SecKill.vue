<template>
	<div>
		<div class="m_header_bar">
			<router-link to="/index"  class="m_header_bar_back"><Icon type="ios-arrow-back"></Icon></router-link>
			<span class="m_header_bar_title">秒杀</span>
		</div>
			<div  class="flex-center" v-if="show">
			<img src="../../assets/img/lightning.png">
			<p>暂无秒杀活动 敬请期待</p>
		</div>
		<div class="product" v-else>
				<div   class="spdetail"    v-for="(item, index) in pro" :key='index'>
							<router-link :to="{ name: '/secdetail',query:{skuId:item.skuId} }">
							<img  :src='item.productItem.listImg |imgfilter'>
							   <div class="right">	
							   	<p class="sP">{{item.product.modelName}}</p>
							   	<div class="time"> 
							   		<p class="color-dx">开始时间:{{item.crush.startTime}}
							   		</p>
							   		<p>结束时间:{{item.crush.endTime}}
							   		</p>
							   	</div>
								<div class="crush">
									<div class="left">
										<span>￥{{item.crush.salePrice}}</span>
										<em>￥{{item.product.salePrice}}</em>
									</div>
									<div class="r">
									</div>
								</div>
								<div>
										  <Progress :percent="100" v-if="item.saledshow">
									        <span>已售完</span>
									    </Progress>
									<Progress  :percent="percent(item.crush)" v-else>  
									</Progress></div>
								</div>
							</router-link>
						</div>
	    </div>
		
    </div>
</template>
<script>
export default {
    data () {
	return {
		t:'',
		   pro:[],
            active: 'tab-container1',
            show:false,
            list: [],
    	}
      },

    mounted() {
      this.getNewChannel()
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
							else{
								this.show=true;
							}
						});
						
    	      	},
    	      	percent(v){
    	      		return v.usedQuantity/v.totalQuantity*100
    	      	},
    },
     
}
</script>
<style scoped="scoped" lang="scss">
.center{
	text-align: center;
	margin-top:1rem;
}
.crush{
	display: flex;
	.left{
		flex:1;
		span{
		color:#0099ff;
		font-weight: 600;
		font-size: 1.4rem;
			}
	 em{
		text-decoration: line-through;
		font-size: 0.8rem;
		color:#999
	}
	}
	.r{
		text-align: right;
	}
}
.time{
	color:#d32122;
	margin-top:1rem;
	margin-bottom: 1rem;
}
.nostart,.start{
	
	color:#fff;
	padding: 0.2rem;
}
.nostart{
	background: green;
}
.start{
	background: red;
}
</style>