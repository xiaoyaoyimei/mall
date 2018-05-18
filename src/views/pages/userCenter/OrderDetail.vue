<template>
<div class="order">
		<h2><router-link to="/user"><Icon type="ios-arrow-left"></Icon></router-link>订单详情</h2>
		<div>
		  	<ul class="address" v-if="youdizhi">
			<li>
				<!--<p><strong>{{addressList.person}} <label>{{addressList.phone}}</label></strong>
				<span>{{addressList.receiveProvince}}{{addressList.receiveCity}}{{addressList.receiveDistrict}}{{addressList.address}}</span></p>
					<Icon type="chevron-right"  @click.native="addAdd"></Icon>-->
			</li>
		   </ul>
		</div>
	</div>
</template>

<script>
	export default {
    data () {
      return {
      	 orderdeatil:{},
        imageSrc:this.global_.imgurl,
      }
    },
    methods: {
      getOrder(){
      	let orderNo="";
      			this.$axios({
					    method: 'get',
					    url:'/order/'+orderNo,
					}).then((res)=>{
						if(res.code=='200'){
						this.orderdeatil = res.object;
						}
						
					});
     	 }
    },
         mounted() {
				this.getOrder();
		}
  }
</script>

<style>
</style>