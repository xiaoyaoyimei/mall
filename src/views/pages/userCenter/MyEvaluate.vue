<template>
	<div>
		<div class="m_header_bar">
			<router-link to="/user" class="m_header_bar_back">
				<Icon type="ios-arrow-back"></Icon>
			</router-link>
			<span class="m_header_bar_title">我的评价</span>
			<span class="m_header_bar_menu"></span>
		</div>
		<Scroll class='scroll column-style' style="padding:0rem;margin:0rem;" v-if="hasEvaluate">
            <ul class="evaluate" >
                <li class="li clearfix" v-for="(item,index) in evaluateList" :key="index">
                    <div class="evaluateText clearfix">
                        <div class="iconUrl">
                            <img :src="item.list.iconUrl | imgfilter" alt="">{{item.list.nickName}}
                        </div>
                        <div class="fabulous red">
                            {{item.number}} 
                            <img src="../../../assets/img/zan-red.png" v-if="item.isZan =='Y'" @click='zan(item.list.id,item.isZan)'>
							<img src="../../../assets/img/zan-gray.png" v-else @click='zan(item.list.id,item.isZan)'>
                        </div>
                        <div class="fabulousTime">
                            {{item.list.commentTime  | formatDate('MM-dd')}}&nbsp;&nbsp;&nbsp;&nbsp; 件数:{{item.shippingOrderItems.quantity}}, 颜色分类:{{item.shippingOrderItems.productAttrs}}
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
                hasEvaluate:true,
                onlyimg:false,
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
        width: 100% ;
        background-color: #ffffff;
        padding: 1rem;
        margin-bottom: 0.1rem;
    }
    .evaluateImg img{
        width: 8rem;
        height: 8rem;
    }
    .productItem{
        float: right;
        background-color: #f0f0f0;
        width: calc(100% - 8rem);
        padding: 1rem;
        height: 8rem;
    }
    .evaluateImg span{
        display: block;
        height: 2rem;
        white-space:nowrap;
        width: 100%;
        overflow: hidden;
        text-align: left;
        font-size: 1.6rem;
    }
    .evaluateImg .productFee{
        margin-top: 1.6rem;
    }
    .fabulousImg img{
        width: 40%;
        margin-right: 10%;
    }
    .evaluateText{
        width: 100%;
        position: relative;
    }
    .fabulousText{
        float: left;
        width: calc(100% - 4rem);
        font-size: 2.4rem;
        margin: 1rem 0rem;
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
    .iconUrl{
          font-size: 2rem;
          margin-bottom: 1rem;
    }
    .iconUrl img{
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