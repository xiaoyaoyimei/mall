<template>
	<div>
		<div class="m_header_bar">
			<router-link to="/index"  class="m_header_bar_back"><Icon type="ios-arrow-back"></Icon></router-link>
			<span class="m_header_bar_title">新品频道</span>
		</div>
			<div v-if='show' class="center">
				<img src="../../assets/img/new.png">
				<p>暂无任何新品,敬请期待</p></div>
		<div class="floor product" v-else>
				<div   class="spdetail"    v-for="(item, index) in productNew" :key='index'>
							<router-link :to="{ path: '/sort/sortDetail',query:{id:item.id} }">
								<img  :src='item.model_img |imgfilter'>
							   <div class="right">	<p class="sP">{{item.model_name}}
								</p>
								<p class="font-14">{{item.type_name}}</p>
								<p>
									<span v-if="item.promotionTitle !=null" class="promotion">{{item.promotionTitle}}</span>
									<span v-else></span>
								</p>
								<p class="sh6">￥{{item.sale_price | pricefilter}}</p>
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
                productNew:[],
                show:true
            }
        },
        methods: {
    	     getNewChannel(){
    	     	this.$axios({
						    method: 'GET',
						    url:'/index/product/new',
						}).then((res)=>{
							if(res.code=='200'){
							 this.productNew=res.object;
							}
							if( res.object.length>0){
								this.show=false
							}
						});
						
    	      	},
    	},
        mounted() {
			this.getNewChannel();
		}
    }
</script>
<style  scoped="scoped">
	.center{
		text-align: center;
	}
</style>