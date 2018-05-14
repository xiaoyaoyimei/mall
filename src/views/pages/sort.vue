<template>
	<div class="sort1">
	<header>
	 	<Row>
		 <i-col span="24">
				<Menu mode="horizontal" :theme="theme1" active-key="1">
					<i-col span="6">
						<Menu-item name="1" key="1">
							综合
						</Menu-item>
					</i-col>
					<i-col span="6">
						<Menu-item name="2" key="2">
							最新
						</Menu-item>
					</i-col>
					<i-col span="6">
						<Menu-item name="3" key="3">
						价格
						<!-- <div>价格
							<Icon type="arrow-up-b"></Icon></div>
						<div style="position:absolute;top:10px;"><span style="opacity:0;">价格</span>	<Icon type="arrow-down-b"></Icon></div> -->
		<!-- <i-table size="small" border :columns="columns5" :data="data5"></i-table> -->
						</Menu-item>
					</i-col>
					<i-col span="6">
						<Menu-item name="4" key="4">
							销量
						</Menu-item>
					</i-col>
				</Menu>
			</i-col>
		</Row>
		</header>
		<Row class="sRow product">
		
				<Col :xs="12"  class="sMar"  :md="6"   v-for="(item, index) in productList" :key='index'>
					<router-link :to="{ path: '/sort/sortDetail' }">
						<img  :src='imageSrc + item.model_img'>
						<p class="sP">{{item.series_name}}
						</p>
						<!-- {{item}} -->
						<h6 class="sh6">{{item.sale_price}}<small class="sSmall">已售68件</small></h6>
					</router-link>
				</Col>
				<!-- <Col :xs="12" class="sMar"  :md="6">
					<a href="#/sort/sortDetail">
						<img  src="../../assets/img/x2.jpg">
						<p class="sP">电竞椅系列
						</p>
						<h6 class="sh6">￥1100.00<small class="sSmall">已售68件</small></h6>
					</a>
				</Col>
				<Col :xs="12" class="sMar"  :md="6">
					<a href="#">
						<img  src="../../assets/img/x3.jpg">
						<p class="sP">其他周边
						</p>
						<h6 class="sh6">￥1110.00<small class="sSmall">已售68件</small></h6>
					</a>
				</Col>
				<Col :xs="12" class="sMar"  :md="6">
					<a href="#">
						<img  src="../../assets/img/x4.jpg">
						<p class="sP">电竞馆周边
						</p>
						<h6 class="sh6">￥1101.00
						<small class="sSmall">已售68件</small></h6>
					</a>
				</Col>
				<Col :xs="12" class="sMar"  :md="6">
					<a href="#">
						<img  src="../../assets/img/x3.jpg">
						<p class="sP">其他周边
						</p>
						<h6 class="sh6">￥1110.00<small class="sSmall">已售68件</small></h6>
					</a>
				</Col>
				<Col :xs="12" class="sMar"  :md="6">
					<a href="#">
						<img  src="../../assets/img/x4.jpg">
						<p class="sP">电竞馆周边
						</p>
						<h6 class="sh6">￥1101.00
						<small class="sSmall">已售68件</small></h6>
					</a>
				</Col> -->
		</Row>
	</div>
</template>
<script>
    export default {
        data () {
            return {
				theme1: 'light',
				productList:[],
				imageSrc:this.global_.imgurl,
			}
			
		},
		methods:{
			getList(){
				this.$axios({
					method: 'GET',
					url:'/product/search?startRow=1&pageSize=10',
				}).then((res)=>{
					this.productList = res.data.itemsList;
				})
			}
		},
		 mounted(){
	      	this.getList();
	      }
    }
</script>

<style lang="scss">
 @import '@/styles/color.scss';
 header{
	 position:fixed;
	 top:0px;
	 left:0px;
	 z-index:10;
	 width:100%;
 }
.ivu-table-row{
	float:left;
}
.sRow{
	margin-top:5.5em;
}
.sMar{
	margin-top:0.2em;
	box-sizing:border-box;
	padding:0.25em;
	a{
		margin-top:-0.2em;
		box-sizing:border-box;
		width:100%;
		img{
			max-width:100%;
		}
	}
}
.sP{
	color:$color-default;
	text-align:left;
	text-indent:1.5em;
	font-size:1.2em;
	height:3em;
	line-height:1.5em;
	background-color:$color-white;
}
.sh6{
	color:$color-dx;
	text-align:left;
	text-indent:2em;
	font-size:0.8em;
	// height:1.5em;
	// line-height:1.5em;
	background-color:$color-white;
	padding-bottom:0.5em;
	overflow:hidden;
}
.sSmall{
	color:$color-gray;
	font-size:0.3em;
	font-weight:normal;
	float:right;
	padding-right:0.25em;
}
</style>