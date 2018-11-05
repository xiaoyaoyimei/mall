<template>
	<div>
		<div class="wap_header">
			<router-link to="/user">
				<Icon type="ios-arrow-back"></Icon>我的收藏
			</router-link>
		</div>
		<div class="pt44" v-if="hasLove">
		<div class="like" v-for="(item, index) in likeList" :key='index'  >
			 <span @click="deletelike(item.id)"  class="xin">❤</span>
			<router-link :to="{ path: '/sort/sortDetail',query:{id:item.product_id} }">
				<img :src=' item.model_img | imgfilter'>
				<div>
					<p class="sP">{{item.model_name}}
					</p>
					<p class="font-14">{{item.model_no}}</p>
					<p>
						<span v-if="item.promotionTitle !=null" class="promotion">{{item.promotionTitle}}</span>
						<span v-else></span>
					</p>
					<p class="font-14">￥{{item.sale_price  | pricefilter}}</p>
				</div>
			</router-link>
		</div>
		</div>
				<div class="flex-center  empty" v-else>
			<img src="../../../assets/img/love_empty.png" style="max-width: 8rem;">
			<p>您还没有收藏任何商品</p>
				<router-link to="/" class="color-dx">去购物</router-link>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				likeList: [],
				hasLove:true
			}
		},
		methods: {
			getLike() {
				this.$axios({
					method: 'post',
					url: '/like',
				}).then((res) => {
					if(res.length>0){
						this.hasLove=true;
						this.likeList = res;
					}else{
						this.hasLove=false;
					}
					
				});
			},
			deletelike(v) {
				this.$axios({
					method: 'post',
					url: `/like/delete/${v}`,
				}).then((res) => {
					if(res.code = '200') {
						this.getLike();
					}
				});
			}

		},
		mounted() {
			this.getLike();
		},
	}
</script>
<style lang="scss" scoped="scoped">

.like{
	background: #fff;
	position: relative;
	width: 50%;
	float: left;
	border-bottom: 1px solid #eee;
	border-right:1px solid transparent;
	padding-bottom: 5px;
	.xin{
		position: absolute;
		color: red;
		font-size: 24px;
		left: 15px;
	}
	a{
		display: block;
		img{
		max-width: 100%;
		}
		div{
			padding-left:10px;
			padding-right: 10px;		
			}
	}
	.sP{
		height: 60px;
	}
	
}
.like:nth-child(2n+1){
	border-right: 1px solid #eee;
}
</style>
<style>
	.coupon .ivu-tabs-nav {
		width: 100%;
	}
	
	.coupon .ivu-tabs-nav .ivu-tabs-tab {
		width: 33.333%;
		text-align: center;
	}
</style>