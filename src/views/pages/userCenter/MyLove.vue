<template>
	<div>
		<div class="m_header_bar">
			<router-link to="/user" class="m_header_bar_back">
				<Icon type="ios-arrow-back"></Icon>
			</router-link>
			<span class="m_header_bar_title">我的收藏</span>
			<span class="m_header_bar_menu"></span>
		</div>
		<Scroll class='scroll column-style' v-if="hasLove">
		<div class="spdetail" v-for="(item, index) in likeList" :key='index'>
			 <span @click="deletelike(item.id)" >❤</span>
			<router-link :to="{ path: '/sort/sortDetail',query:{id:item.id} }">
				<img :src=' item.model_img | imgfilter'>
				<div class="right">
					<p class="sP">{{item.model_name}}
					</p>
					<p class="font-14">{{item.model_no}}</p>
					<p>
						<span v-if="item.promotionTitle !=null" class="promotion">{{item.promotionTitle}}</span>
						<span v-else></span>
					</p>
					<p class="sh6">￥{{item.sale_price  | pricefilter}}</p>
				</div>
			</router-link>
		</div>
		</Scroll>
				<div class="flex-center  empty" v-else>
			<img src="../../../assets/img/love_empty.png" style="max-width: 8rem;">
			<p>您还没有相关的订单</p>
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

<style>
	.coupon .ivu-tabs-nav {
		width: 100%;
	}
	
	.coupon .ivu-tabs-nav .ivu-tabs-tab {
		width: 33.333%;
		text-align: center;
	}
</style>