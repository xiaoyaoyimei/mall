<template>
	<div>
		<div class="wap_header">
			<router-link to="/user" >
				<Icon type="ios-arrow-back"></Icon>
				我的评价
			</router-link>
		</div>
		<Scroll class='scroll column-style' v-if="hasEvaluate">
			<ul class="evaluate">
				<li class="li clearfix" v-for="(item,index) in evaluateList" :key="index">
					<div class="evaluateText clearfix">
						<div class="iconUrl">
							<img :src="item.list.iconUrl | imgfilter" alt="头像">{{item.list.nickName}}
							<div class="fabulous">
								<span class='zanicon' :class="{red:item.isZan =='Y'}">
													<span>{{item.number}}</span>
								<img src="../../../assets/img/zan-red.png" v-if="item.isZan =='Y'" @click='zan(item.list.id,item.isZan)'>
								<img src="../../../assets/img/zan-gray.png" v-else @click='zan(item.list.id,item.isZan)'>
								</span>
							</div>
						</div>

						<div class="fabulousTime">
							{{item.list.commentTime | formatDate('MM-dd')}}&nbsp;&nbsp;&nbsp;&nbsp; 件数:{{item.shippingOrderItems.quantity}}, 颜色分类:{{item.shippingOrderItems.productAttrs}}
						</div>
						<div class="fabulousText">
							{{item.list.commentContent}}
						</div>
						<div class="fabulousImg">
							<img :src="child | imgfilter" v-for="(child, index) in item.imgList">
						</div>

					</div>
					<div class="evaluateImg">
						<img :src="item.shippingOrderItems.productItemImg | imgfilter" alt="">
						<div class="productItem">
							<!-- <span>{{item.list.productItemNo}}</span> -->
							<span class="fubiao">{{item.list.productTitle}}</span>
							<span class="productFee">￥{{item.list.productFee |pricefilter}}</span>
						</div>
					</div>

				</li>
			</ul>
		</Scroll>
		<div class="flex-center  empty" v-else>
			<img src="../../../assets/img/u9.png" style="max-width: 8rem;">
			<p>暂无任何评价记录~</p>
			<router-link to="/" class="color-dx">去首页</router-link>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				evaluateList: [],
				hasEvaluate: true,
				onlyimg: false,
			}
		},
		methods: {
			getEvaluate() {
				this.$axios({
					method: 'get',
					url: '/comment/mysearch/',
				}).then((res) => {
					if(res.code == "200") {
						this.evaluateList = res.object;
						if(this.evaluateList.length > 0) {
							this.hasEvaluate = true;
						} else {
							this.hasEvaluate = false;
						}

					}
				});
			},
			//点赞
			zan(value, isZan) {
				var zanid = value;
				var Like = isZan;
				if(Like == 'N') {
					Like = 'yes'
				} else {
					Like = 'no'
				}

				this.$axios({
					method: 'post',
					url: '/comment/beLike/' + zanid + '/' + Like,
				}).then((res) => {
					if(res.code == '200') {
						this.getEvaluate()
					}
				})
			},

		},
		mounted() {
			this.getEvaluate();
		},
	}
</script>
<style scoped="scoped">
	.evaluate .li {
		float: left;
		width: 100%;
		background-color: #ffffff;
		padding: 1rem;
		margin-bottom: 0.1rem;
	}
	
	.evaluateImg img {
		width: 8rem;
		height: 8rem;
	}
	
	.productItem {
		flex: 1;
		padding-left: 0.5rem;
		padding-top: 0.5rem;
	}
	
	.evaluateImg {
		display: flex;
		background-color: #f0f0f0;
		align-items: center;
	}
	
	.evaluateImg span {
		display: block;
		width: 100%;
		text-align: left;
		font-size: 1.6rem;
	}
	
	.evaluateImg .productFee {
		margin-top: 1.6rem;
	}
	
	.fabulousImg img {
		width: 40%;
		margin-right: 10%;
	}
	
	.evaluateText {
		width: 100%;
		position: relative;
	}
	
	.fabulousText {
		font-size: 1.6rem;
		margin: 1rem 0rem;
		color: #333;
	}
	
	.fabulous {
		text-align: right;
		width: 4rem;
		float: right;
	}
	
	.zanicon span {
		font-size: 1.6rem;
	}
	
	.red span {
		color: red
	}
	
	.fabulous img {
		width: 1.8rem;
	}
	
	.fabulousTime {
		font-size: 1.2rem;
	}
	
	.iconUrl {
		font-size: 2rem;
		margin-bottom: 1rem;
	}
	
	.iconUrl>img {
		width: 3rem;
		height: 3rem;
		border-radius: 1.5rem;
		margin-right: 2rem;
		vertical-align: middle;
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