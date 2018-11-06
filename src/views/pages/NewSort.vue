<template>
	<div>
		<v-scroll :on-refresh="onRefresh" :on-infinite="onInfinite">
			<ul class="clearfix">
				<li v-for="(item,index) in listdata"><img :src='item.model_img |imgfilter' :alt="item.model_name"></li>
				<li v-for="(item,index) in downdata"><img :src='item.model_img |imgfilter' :alt="item.model_name">{{item.model_name}}</li>
			</ul>
		</v-scroll>
		<!--<div v-show="fang">没有更多了.....</div>-->
	</div>
</template>
<script>
	import Scroll from '@/components/YScroll';

	export default {
		data() {
			return {
				counter: 1, //默认已经显示出15条数据 count等于一是让从16条开始加载
				num: 16, // 一次显示多少条
				pageStart: 0, // 开始页数
				pageEnd: 0, // 结束页数
				listdata: [], // 下拉更新数据存放数组
				downdata: [], // 上拉更多的数据存放数组
				total:0,
				fang:false
			}
		},
		mounted: function() {
			this.getList();
		},
		methods: {
	
			getList() {
						alert(this.pageStart)
				//  let vm = this;
				//   vm.$http.get('https://api.github.com/repos/typecho-fans/plugins/contents/').then((response) => {
				//        vm.listdata = response.data.slice(0,15);
				//       }, (response) => {
				//        console.log('error');
				//      });
				
				let _this = this;
				if(this.pageStart>this.total){
					return false
				}else{
					this.$axios({
					method: 'GET',
					url: '/product/search?startRow=' + this.pageStart + '&pageSize=' + 16,
				}).then((res) => {
					this.total=res.total;
					_this.listdata = res.itemsList.slice(0,16);
					
				})	
				}
			

			},
			onRefresh(done) {
				this.getList();
				done() // call done

			},
			onInfinite(done) {
				let vm = this;
				if(vm.pageStart>this.total){
					this.fang=true;
					return false
				}
				else{
						vm.$axios({
					method: 'GET',
					url: '/product/search?startRow=' + vm.pageStart + '&pageSize=' + 16,
				}).then((res) => {
					vm.counter++;
					vm.pageEnd = vm.num * vm.counter;
					vm.pageStart = vm.pageEnd - vm.num;
					let arr = res.itemsList;
					let i = vm.pageStart;
					let end = vm.pageEnd;
					for(; i < end; i++) {
						//obj["name"] = arr[i].name;
						vm.downdata=arr;
						if((i + 1) >= res.length) {
							this.$el.querySelector('.load-more').style.display = 'none';
							return;
						}
					}
					done()
				}, (response) => {
					console.log('error');
				});
				}
			
			},
		//     vm.$http.get('https://api.github.com/repos/typecho-fans/plugins/contents/').then((response) => {
		//       vm.counter++;
		//       vm.pageEnd = vm.num * vm.counter;
		//       vm.pageStart = vm.pageEnd - vm.num;
		//       let arr = response.data;
		//         let i = vm.pageStart;
		//         let end = vm.pageEnd;
		//         for(; i<end; i++){
		//          let obj ={};
		//          obj["name"] = arr[i].name;
		//          vm.downdata.push(obj);
		//           if((i + 1) >= response.data.length){
		//           this.$el.querySelector('.load-more').style.display = 'none';
		//           return;
		//          }
		//          }
		//       done() // call done
		//        }, (response) => {
		//        console.log('error');
		//      });
	},
	components: {
		'v-scroll': Scroll
	}
	}
</script>
<style scoped="scoped" lang="scss">
	li{
		width:50%;
		float: left;
		img{
			max-width: 100%;
		}
	}
</style>