<template>
	<div>
		<div class="wap_header">
			<router-link to="/user">
				<Icon type="ios-arrow-back"></Icon>物流信息
			</router-link>
		</div>
		<div class="express pt44">	
			<div class="ex_t ">{{orderStatus}}</div>
			<ul >
				<li  v-for="(item,index) in expressList" :key="index">
					<p   v-if="item.show" class="font-16 red">{{item.date}}</p>
					<p >
						<span>{{item.time}} &nbsp;&nbsp;&nbsp;&nbsp;【{{item.addr}}】&nbsp;{{item.remark}}</span>
					</p>
				</li>
			</ul>
			<div class="logisticsdetail">
				<p>运单号码： {{expressNo}} </p>
					<p>物流公司： {{logistics}} </p>
				<p>发货地址： 江苏省无锡市江阴市青阳镇工业园区华澄路21号</p>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				expressList: [],
				orderNo:'',
				expressNo:'',
				logistics:'',
				orderStatus:''
			}
		},
		methods: {
			getList() {
				this.$axios({
					method: 'post',
					url: `/order/getRoute/${this.orderNo}`,
				}).then((res) => {
					this.expressList = res;
					for (let index = 0; index < this.expressList.length; index++) {
						if(index >0){
							if(this.expressList[index].date == this.expressList[index-1].date){
								this.expressList[index].show = false
							}else{
								this.expressList[index].show = true
							}
						}else{
							this.expressList[index].show = true
						}
					}
				});
			},
		},
		mounted() {
			this.orderNo=this.$route.query.orderNo;
			this.expressNo=this.$route.query.expressNo;
			this.logistics=this.$route.query.logistics;
			this.orderStatus=this.$route.query.orderStatus;
			this.getList();
		},
	}
</script>

<style lang="scss" scoped="scoped">
.red{
	color: red;
}
.express {
	background: #fff;
	padding: 1rem;
	.ex_t{
		font-weight: 500;
		color:red;
		font-size: 1.6rem;
		padding-bottom: 1rem;
		padding-top: 1rem;
	}
	ul{
		border-top: 1px solid #ddd;
		padding-top: 2rem;
		padding-bottom: 2rem;
		border-bottom: 1px solid #ddd;
		p{
			font-size: 1.4rem;
			padding-bottom: 0.5rem;
		}
	}
}
.logisticsdetail p{
	font-size: 1.6rem;
	padding-top: 1rem;
	
}
</style>