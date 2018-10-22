<template>
	<div>
		<div class="Search">
			<div class="s-w">
				<input ref="keyword" placeholder="关键字" v-model.trim='keyword' @keyup.13="search()" /><span @click="search()">搜索</span></div>
		 </div>
		<div class="content">
			<dl class="hot">
				<dt>热搜</dt>
				<dd @click='gosort("电竞椅")'>电竞椅</dd>
			</dl>
			<dl class="history"><dt>历史搜索</dt>
				<dd v-for="(item,index) in arr" :key="index" @click='gosort(item)'>{{item}}</dd>
			</dl>
		</div>
		<div class="delete-wrap">
			<div class='delete' @click='clear()'>
				<Icon type="ios-trash-outline"></Icon>清空历史搜索</div>
		</div>
	</div>
</template>

<script>
	// 检索函数，判断新增的是否存在
	function insertArray(arr, val, maxLen) {
		const index = arr.indexOf(val)
		if(index === 0) {
			return
		}
		if(index > 0) {
			arr.splice(index, 1)
		}
		arr.unshift(val)
		if(maxLen && arr.length > maxLen) {
			arr.pop()
		}
	}
	export default {
		data() {
			return {
				keyword: '',
				arr: [],
				maxLen: 20,
			}
		},
		methods: {
			getSearchHistory() {
				if(localStorage.getItem('searchhistory') != null && localStorage.getItem('searchhistory') != undefined) {
					this.arr = JSON.parse(localStorage.getItem('searchhistory'));
				}
			},
			search() {
				let val = this.keyword;
				if(val == "") {
					this.$router.push({
						path: '/sort',
						query: {
							keyword: this.keyword
						}
					});
				} else {
					if(localStorage.getItem('searchhistory') != null) {
						this.arr = JSON.parse(localStorage.getItem('searchhistory'));
						insertArray(this.arr, val, this.maxLen);
					} else {
						insertArray(this.arr, val, this.maxLen);
					}
					localStorage.setItem('searchhistory', JSON.stringify(this.arr));
					this.$router.push({
						path: '/sort',
						query: {
							keyword: this.keyword
						}
					});
				}

			},
			clear() {
				this.$Modal.confirm({
					content: '<p>确定清空历史记录？</p>',
					onOk: () => {
						this.arr = [];
						localStorage.removeItem('searchhistory')
					},
					onCancel: () => {
						this.$Message.info('取消成功');
					}
				});

			},
			gosort(value) {
				this.$router.push({
					path: '/sort',
					query: {
						keyword: value
					}
				});
			}

		},
		mounted() {
			this.$refs.keyword.focus();
			this.getSearchHistory();
		}
	}
</script>

<style scoped="scoped" lang="scss">
	.Search {
		top: 5rem;
		border-bottom: 0.1rem solid #eee;
		padding: 0.5rem 1rem;
		background: #fff;
	}
	
	.s-w {
		position: relative;
		display: flex;
		height: 32px;
		line-height: 32px;
	}
	
	.search-icon {
		position: absolute;
		top: 0.8rem;
		left: 1rem;
		font-size: 1.6rem;
	}
	
	.s-w input {
		border: 0 none;
		background: #f3f3f3;
		border-radius: 1rem;
		font-size: 1.4rem;
		padding: 0.5rem 0 0.5rem 2.5rem;
		flex: 1;
		margin-right: 1rem;
	}
	
	.s-w span {
		font-size: 1.4rem;
	}
	
	.content dl {
		background: #fff;
		margin-bottom: 1rem;
	}
	
	.content dt {
		font-weight: 600;
		margin-bottom: 0.5rem;
		font-size: 1.6rem;
		color: #333;
	}
	
	.hot {
		padding: 1rem;
	}
	
	.hot dd {
		font-size: 1.2rem;
		background: #f9f9f9;
		display: inline-block;
		padding: 0.3rem 0.5rem;
		border-radius: 0.5rem;
		margin-right: 0.5rem;
	}
	
	.history {
		dt {
			border-bottom: 1px solid #eee;
			padding: 0.5rem 1rem;
		}
		dd {
			cursor: pointer;
			padding: 0.5rem 1rem;
			border-bottom: 1px solid #eee;
		}
	}
	
	.delete-wrap {
		padding: 1rem;
		position: fixed;
		bottom: 0;
		width: 100%;
		text-align: center;
	}
	
	.delete {
		cursor: pointer;
		background: #fff;
		border: 1px solid #eee;
		padding: 0.5rem;
		font-size: 1.4rem;
	}
	
	.delete i {
		margin-right: 1rem;
	}
</style>