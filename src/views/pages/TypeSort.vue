<template>
	<div>
		<div class="m_header_bar">
			<router-link to="/index"  class="m_header_bar_back"><Icon type="ios-arrow-back"></Icon></router-link>
			<span class="m_header_bar_title">分类页</span>
		</div>
		<div class="floor">
				<div   class="spdetail"    v-for="(item, index) in productNew" :key='index'>
						<router-link :to="{ path: '/sort/sortDetail',query:{id:item.id} }">
								<img  :src='item.model_img |imgfilter'>
							    <div class="right">	<p class="sP">{{item.model_name}}
								</p>
									<p class="font-14">{{item.type_name}}</p>
								<p>
									<span v-if="item.promotionTitle !=null"  class="promotion">{{item.promotionTitle}}</span>
									<span v-else></span>
								</p>
								<p class="sh6">{{item.sale_price}}</p>
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
                startRow:0,
				pageSize:10,
            }
        },
        methods: {
    	     getNewChannel(){
    	     let type = this.$route.params.type;
    	     this.$axios({
						    method: 'GET',
						    url:'/product/type?id='+type+'&startRow='+this.startRow+'&pageSize='+this.pageSize,
						}).then((res)=>{
							 this.productNew=res.itemsList;
						});
						
    	      	},
    	},
        mounted() {
			this.getNewChannel();
		}
    }
</script>
<style>
</style>