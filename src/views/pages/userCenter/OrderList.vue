<template>
	<div class="order">
	<h2>	<router-link  to="/user"><Icon type="ios-arrow-back"></Icon></router-link>我的订单</h2>
  <ul>
  			<i-col  class='cartCol' span="24" v-for="(x,index) in cartList" :key="index">
  				<i-col v-for="(child,index) in x.orderItems" :key="index">
					<i-col span="6"><img class='cartImg' :src="imageSrc+child.productItemImg"></i-col>
					<i-col span="18">
						<p class='cart_black'>{{child.productAttrs}}</p>
						<p class='cart_gray'>{{child.productTitle}}</p>
						<p class='cart_price'>￥{{child.orderFee}}*{{child.quantity}}</p>
					</i-col>
					</i-col>
				</i-col>
  </ul>
	</div>
</template>

<script>
export default {
    data () {
      return {
        cartList:[],
        imageSrc:this.global_.imgurl,
      }
    },
    methods: {
      getOrder(){
      			this.$axios({
					    method: 'get',
					    url:'/order/list',
					}).then((res)=>{
						if(res.code=='200'){
						this.cartList = res.object;
						}
						
					});
      }
    },
         mounted() {
				this.getOrder();
		}
  }
</script>

<style scoped="scoped" lang="scss">

</style>