<template>
	<div style="background-color:#fff;">
		<div class="m_header_bar">
			<router-link to="/index"  class="m_header_bar_back"><Icon type="ios-arrow-back"></Icon></router-link>
			<span class="m_header_bar_title">秒杀专场</span>
		</div>
			<div  class="flex-center" v-if="show">
			<img src="../../assets/img/lightning.png">
			<p>暂无秒杀活动 敬请期待</p>
		</div>
		<div class="product" v-else>
			<div v-if='startproshow'>
				<div class="sTitle">
					秒杀已开始  距结束
					<span class="red">{{day}}</span> :
					<span class="red">{{hr}}</span> :
					<span class="red">{{min}}</span> :
					<span class="red">{{sec}}</span>
				</div>
					<div   class="sKpdetail"    v-for="(item, index) in startpro" :key='index'>
						<router-link class="Slist" :to="{ name: '/secdetail',query:{skuId:item.skuId} }">
							<img src="../../assets/img/u242.png" class="Sicon" alt="">
							<img  class="Simg" :src='item.productItem.listImg |imgfilter'>
							<div class="floatright">	
								<p class="sPN">{{item.product.modelNo}}</p>
								<p class="sPN">{{item.product.modelName}}</p>
								<div class="crush">
									<div class="left">
										<span>￥{{item.crush.salePrice}}</span><br>
										<em>￥{{item.product.salePrice}}</em>
									</div>
								</div>
								<span class="btn">立即抢购</span>
							</div>
						</router-link>
					</div>
				</div>
				<div v-if='nostartproshow'>
					<div class="sTitle">
						秒杀未开始  距开始
						<span class="blue">{{nostartday}}</span> :
						<span class="blue">{{nostarthr}}</span> :
						<span class="blue">{{nostartmin}}</span> :
						<span class="blue">{{nostartsec}}</span>
					</div>
					<div   class="sKpdetail"    v-for="(item, index) in nostartpro" :key='index'>
						<router-link class="Slist" :to="{ name: '/secdetail',query:{skuId:item.skuId} }">
							<img src="../../assets/img/u242.png" class="Sicon" alt="">
							<img  class="Simg" :src='item.productItem.listImg |imgfilter'>
							<div class="floatright">	
								<p class="sPN">{{item.product.modelNo}}</p>
								<p class="sPN">{{item.product.modelName}}</p>
								<div class="crush">
									<div class="left">
										<span>￥{{item.crush.salePrice}}</span><br>
										<em>￥{{item.product.salePrice}}</em>
									</div>
								</div>
								<span class="btn blue">立即抢购</span>
							</div>
						</router-link>
					</div>
				</div>

	    </div>
    </div>
</template>
<script>
export default {
    data () {
	return {
			t:'',
			not:'',
		   	pro:[],
            active: 'tab-container1',
            show:false,
			list: [],
			starttime:'',
			nostarttime:'',
			detail:{switch : 1},
			day:'',
			hr:'',
			min:0,
			sec:0,
			nostartday:'',
			nostarthr:'',
			nostartmin:0,
			nostartsec:0,
			startpro:[],
			nostartpro:[],
			startproshow:false,
			nostartproshow:false,
			
    	}
      },

    mounted() {
      this.getNewChannel()
    },
    methods: {
			startcountdown: function() {
				const end = Date.parse(new Date(this.starttime));
				const now = Date.parse(new Date());
				const msec = end - now;
				let day = parseInt(msec / 1000 / 60 / 60 / 24);
				let hr = parseInt(msec / 1000 / 60 / 60 % 24);
				let min = parseInt(msec / 1000 / 60 % 60);
				let sec = parseInt(msec / 1000 % 60);
				this.day = day > 9 ? day : '0' + day;
				this.hr = hr > 9 ? hr : '0' + hr;
				this.min = min > 9 ? min : '0' + min;
				this.sec = sec > 9 ? sec : '0' + sec;
				let self = this;
				this.t = setTimeout(() => {
					self.startcountdown();
				}, 1000);
			},
			nostartcountdown: function() {
				const end = Date.parse(new Date(this.nostarttime));
				const now = Date.parse(new Date());
				const msec = end - now;
				let nostartday = parseInt(msec / 1000 / 60 / 60 / 24);
				let nostarthr = parseInt(msec / 1000 / 60 / 60 % 24);
				let nostartmin = parseInt(msec / 1000 / 60 % 60);
				let nostartsec = parseInt(msec / 1000 % 60);
				this.nostartday =  nostartday > 9 ? nostartday : '0' + nostartday;
				this.nostarthr = nostarthr > 9 ? nostarthr : '0' + nostarthr;
				this.nostartmin = nostartmin > 9 ? nostartmin : '0' + nostartmin;
				this.nostartsec = nostartsec > 9 ? nostartsec : '0' + nostartsec;
				let self = this;
				this.not = setTimeout(() => {
					self.nostartcountdown();
				}, 1000);
			},
    	    getNewChannel(){
    	     	this.$axios({
						    method: 'GET',
						    url:'/promotion/crush',
						}).then((res)=>{
						if(res.code=='200'){
							 this.pro=res.object;
							 for (let index = 0; index < this.pro.length; index++) {
								 if(this.pro[index].switch == '1'){
									 this.startpro.push(this.pro[index])
								 }else{
									 this.nostartpro.push(this.pro[index])
								 }
								 
							 }
							if(this.startpro.length>0){
								this.starttime=this.startpro[0].crush["endTime"]
								this.startcountdown();
								this.startproshow=true
							}
							if(this.nostartpro.length>0){
								this.nostarttime = this.nostartpro[0].crush["startTime"];
								this.nostartcountdown();
								this.nostartproshow=true
							}
							
						//计时器
						
						
							}
							else{
								this.show=true;
							}
						});
						
    	      	},
    	      	percent(v){
    	      		return v.usedQuantity/v.totalQuantity*100
    	      	},
    },
     
}
</script>
<style scoped="scoped" lang="scss">
 @import '@/styles/color.scss';
.m_header_bar{
	background-color: #ff0000;
	text-align: center;
	color: #fff;
}
.m_header_bar_back i{
	color: #fff;
}
.m_header_bar_title{
	text-align: center;
}
.sTitle{
	height: 4.4rem;
	line-height: 4.4rem;
	background-color: #f0f0f0;
	font-weight: 400;
	font-size: 1.6rem;
	color: #1E1E1E;
	text-align: center;
}
.sTitle .red{
	display: inline-block;
	width: 3rem;
	height: 3rem;
	margin-top: 0.55rem;
	background-color: #ff0000;
	line-height: 3rem;
	border-radius: 0.5rem;
	color: #fff;
}
.sTitle .blue{
	display: inline-block;
	width: 3rem;
	height: 3rem;
	margin-top: 0.55rem;
	line-height: 3rem;
	border-radius: 0.5rem;
	color: #fff;
	background-color: #458ffd;
}
.center{
	text-align: center;
	margin-top:1rem;
}
.sKpdetail{
	width: calc(100% - 5rem);
	margin: 2.5rem;
	padding-bottom: 2.5rem;
	border-bottom: 1px solid $color-border;
	position: relative;
}
.Slist{
	position: relative;
}
.product .Slist .Sicon{
	position: absolute;
	// top: 0rem;
	left: 0rem;
	width: 4rem;
	height: 4rem;
}
.Slist .sPN, .Slist .sPN:hover{
	color: #333333;
	font-size: 1.4rem;
}
.product .Slist .Simg{
	width: 10rem;
	height: 10rem;
}
.Slist .btn{
	display: block;
	font-weight: 400;
    font-size: 1.8rem;
	color: #FFFFFF;
	background-color: #ff0000;
	width: 10rem;
	height: 3.5rem;
	position: absolute;
	bottom:1rem;
	right:1rem;
	text-align: center;
}
.Slist .blue{
	background-color: #458ffd;
}
.floatright{
	float: right;
	width: calc(100% - 10rem);
	position: relative;
}
.crush{
	margin-top: 1.5rem;
	display: flex;
	.left{
		flex:1;
		span{
			color:#ff0000;
			font-weight: 600;
			font-size: 1.4rem;
		}
		em{
			text-decoration: line-through;
			font-weight: 400;
			font-size: 1rem;
			color: #999999;
			font-family: normal;
		}
	}
	.r{
		text-align: right;
	}
}
.time{
	color:#d32122;
	margin-top:1rem;
	margin-bottom: 1rem;
}
.nostart,.start{
	
	color:#fff;
	padding: 0.2rem;
}
.nostart{
	background: green;
}
.start{
	background: red;
}
</style>