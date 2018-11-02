<template>
	<div>
		<div class="m_header_bar">
			<router-link to="/user" class="m_header_bar_back">
				<Icon type="ios-arrow-back"></Icon>
			</router-link>
			<span class="m_header_bar_title">我的评价</span>
			<span class="m_header_bar_menu"></span>
		</div>
		<Scroll class='scroll column-style' v-if="hasEvaluate">
            <ul class="evaluate" >
                <li class="li clearfix" v-for="(item,index) in evaluateList" :key="index">
                    <div class="evaluateImg">
                        <img :src="item.shippingOrderItems.productItemImg | imgfilter" alt="">
                        <span>{{item.list.productItemNo}}</span>
                        <span class="fubiao">{{item.list.productTitle}}</span>
                        <!-- <span class="">￥{{item.list.productFee |pricefilter}}</span> -->
                        <!--   <span class="red">活动信息展示区域</span>-->
                    </div>
                    <div class="evaluateText clearfix">
                        <div class="fabulous red">
                            {{item.number}} 
                            <img src="../../../assets/img/zan-red.png" v-if="item.isZan =='Y'" @click='zan(item.list.id,item.isZan)'>
							<img src="../../../assets/img/zan-gray.png" v-else @click='zan(item.list.id,item.isZan)'>
                        </div>
                        <div class="fabulousText">
                            {{item.list.commentContent}}
                        </div>
                        <div class="fabulousImg">
                            <img :src="child | imgfilter" v-for="(child, index) in item.imgList">
                        </div>
                        <div class="fabulousTime">
                            {{item.list.commentTime  | formatDate('yyyy-MM-dd hh:mm:ss')}} <!--<i class="cartIcon iconIcon-del"></i>-->
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
				hasEvaluate:true
			}
		},
		methods: {
			getEvaluate() {
				this.$axios({
					method: 'get',
					url: '/comment/mysearch',
				}).then((res) => {
					if(res.code == "200") {
                        this.evaluateList = res.object;
                        if( this.evaluateList.length> 0){
                            this.hasEvaluate = true;    
                        }else{
                            this.hasEvaluate = false;
                        }
                        
					}
				});
			},
			//点赞
			zan(value, isZan) {
				let zanid = value;
				let Like = isZan;
				if(Like == 'N') {
					Like = 'Y'
				} else {
					Like = 'N'
				}
				this.$axios({
					method: 'post',
					url: `/comment/beLike/${zanid}/${Like}`,
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
    .evaluate .li{
        float: left;
        width: calc((100% - 1rem) / 2);
        background-color: #ffffff;
        padding: 1rem;
        margin-bottom: 1rem;
    }
    .evaluate .li:nth-of-type(2n+1){
        margin-right: 1rem;
    }
    .evaluateImg img{
        width: 100%;
    }
    .evaluateImg span{
        display: block;
        height: 2rem;
        white-space:nowrap;
        width: 100%;
        overflow: hidden;
        text-align: center;
    }
    .evaluateText{
        width: 100%;
        position: relative;
    }
    .fabulousText{
        float: left;
        width: calc(100% - 4rem);
        font-size: 1.6rem;
    }
    .fabulous{
        text-align: right;
        float: right;
        width: 4rem;
        color: #ff0000;
    }
    .fabulous img{
        width: 1rem;
    }
    .fabulousTime{
        float: left;
        font-size: 1.2rem;
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