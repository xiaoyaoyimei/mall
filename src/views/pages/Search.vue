<template>
	<div>
	 <div class="Search">	
	 	<div class="s-w"><Icon type="ios-search-strong" class="search-icon"></Icon>
	 		<input placeholder="关键字" v-model='keyword'/><span @click="search()">搜索</span></div></div>
	<div class="content">
			<dl class="hot">
				<dt>热搜</dt>
				<dd>电竞椅</dd><dd>优惠</dd></dl>
		<dl class="history"><dt>历史搜索</dt>
			<dd  v-for="(item,index) in searchhistory" :key="index">{{item}}</dd>
		</dl>
	</div>
	<div class="delete-wrap" >
		<div class='delete' @click='clear()'><Icon type="ios-trash-outline"></Icon>清空历史搜索</div></div>
</div>
</template>

<script>
		export default {
        data () {
            return {
            	keyword:'',
            	searchhistory:[]
            }
        },
        methods:{
        	getSearchHistory(){
        		if(localStorage.getItem('searchhistory')!=null&&localStorage.getItem('searchhistory')!=undefined){
        				this.searchhistory=JSON.parse(localStorage.getItem('searchhistory'))
        		}
        	},
        	search(){
        		this.searchhistory.unshift(this.keyword);
        		localStorage.setItem('searchhistory',JSON.stringify(this.searchhistory))
        		this.$router.push({name:'/sort',params:{keyword:this.keyword}});  
        	},
        	clear(){
        		this.searchhistory=[];
        		localStorage.removeItem('searchhistory')
        	}
        },
          mounted(){
          	this.getSearchHistory();
          }
       }
</script>

<style scoped="scoped" lang="scss">
	.Search{
		top: 5rem;
		border-bottom: 0.1rem  solid #eee;
		padding: 0.5rem 1rem;
		background: #fff;
	}
	.s-w{
		position: relative;
		display: flex;
		height: 32px;
		line-height: 32px;
	}
	.search-icon{
		position: absolute;
		top:0.5rem;
		left: 1rem;
	}
	.s-w input{
		border: 0 none;
		background: #f3f3f3;
		border-radius: 1rem;
		font-size: 1.4rem;
		padding: 0.5rem 0 0.5rem 2.5rem;
		flex:1;
		margin-right: 1rem;
	}
	.s-w span{
		font-size: 1.4rem;
	}
	.content dl{
		background: #fff;
		margin-bottom: 1rem;
	}
	.content dt{
		font-weight: 600;
		margin-bottom: 0.5rem;
		font-size: 1.6rem;
		color:#333;
	}
	.hot{
		padding: 1rem;
	}
	.hot dd{
		font-size: 1.2rem;
		background: #f9f9f9;
		display: inline-block;
		padding: 0.3rem 0.5rem;
		border-radius: 0.5rem;
		margin-right: 0.5rem;
	}
	.history{
		dt{
			border-bottom: 1px solid #eee;
			padding: 0.5rem 1rem;
		}
		dd{
			padding:  0.5rem 1rem;
				border-bottom: 1px solid #eee;
		}
	}
	.delete-wrap{
		padding:1rem;
		position: fixed;
		bottom:0;
		width: 100%;
	    text-align:center;
	}
	.delete{
		cursor: pointer;
		background: #fff;
		border: 1px solid #eee;
		padding: 0.5rem;
	
	}
	.delete i{
		margin-right: 1rem;
	}
</style>