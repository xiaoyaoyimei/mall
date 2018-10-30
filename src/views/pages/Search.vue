<template>
    <div class="search">
        	 <header class="bg-black ">
				<div>
					<i class="i icon icon-dx-back" @click="back()"></i>
					<input ref="keyword" placeholder="关键字" v-model.trim='keyword' @keyup.13="search()">
					<span class="gosearch" @click="search()">搜索</span>

				</div>
			</header> 
			<div class="content"> 
				<dl class="hot">
					<dt>热搜</dt>
					<dd  @click='gosort("电竞椅")'>电竞椅</dd></dl>
				<dl class="history"><dt>历史搜索 <Icon @click='clear()' style="float:right;font-size:0.4rem;" type="ios-trash-outline"></Icon></dt>
					<dd  v-for="(item,index) in arr" :key="index" @click='gosort(item)'>{{item}}</dd>
				</dl>
			</div>
    </div>
</template>
<script>
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
        data () {
            return {
            	keyword:'',
            	arr:[],
            	maxLen:20,
            }
        },
        methods:{
			back(){
				this.$router.go(-1);
			},
        	getSearchHistory(){
        		if(localStorage.getItem('searchhistory')!=null&&localStorage.getItem('searchhistory')!=undefined){
        				this.arr=JSON.parse(localStorage.getItem('searchhistory'));
        		}
        	},
        	search(){
        		let val=this.keyword;
        		if(val==""){
        			this.$router.push({path:'/sort',query:{keyword:this.keyword}});  
        		}else{
        			if(localStorage.getItem('searchhistory')!=null){
		        			this.arr=JSON.parse(localStorage.getItem('searchhistory'));
		        			insertArray(this.arr,val,this.maxLen);
		        		}else{
		        			insertArray(this.arr,val,this.maxLen);
		        		}
		        	    localStorage.setItem('searchhistory',JSON.stringify(this.arr));
        	    		this.$router.push({path:'/sort',query:{keyword:this.keyword}});  
        		}
        		
        		
        	},
        	clear(){
        		    this.$Modal.confirm({
                    content: '<p>确定清空历史记录？</p>',
                    onOk: () => {
                      this.arr=[];
        				localStorage.removeItem('searchhistory')
                    },
                    onCancel: () => {
                        this.$Message.info('取消成功');
                    }
                });
        		
        	},
        	gosort(value){
        		this.$router.push({path:'/sort',query:{keyword:value}}); 
        	}
        	
        },
          mounted(){
          	 this.$refs.keyword.focus();
          	this.getSearchHistory();
          }
       }

</script>
<style lang="scss" scoped="scoped">
	.bg-black{
		width: 7.5rem;
		height: 1.5rem;
		background-color: #ff0000;
	}
	.bg-black .i{
		vertical-align: middle;
	}
	.bg-black div{
		padding:0.15rem 0.2rem;
		position: relative;
	}
	.bg-black input{
		width: 6rem;
		height: 0.85rem;
		border-radius: 0.5rem;
		outline: none;
		box-shadow: none;
		font-weight: 400;
		font-style: normal;
		font-size: 0.3rem;
		color: rgba(153, 153, 153, 0.498039215686275);
		text-align: left;
		position: relative;
		top: 0.1rem;
		padding-left: 0.30rem;
	}
	.bg-black .gosearch{
		position: absolute;
		top: 0.25rem;
		right: 0.5rem;
		width: 1.5rem;
		height: 0.85rem;
		border-bottom-right-radius: 0.5rem;
		border-top-right-radius: 0.5rem;
		line-height: 0.85rem;
		color: #ffffff;
		text-align: center;
		background-color:#a21112;
		font-size: 0.3rem;
	}
	
	.content dl {
		background: #fff;
		margin-bottom: 0.21rem;
	}
	
	.content dt {
		font-weight: 600;
		margin-bottom: 0.1rem;
		font-size: 0.16rem;
		color:#333;
	}
	.hot{
		padding: 0.3rem;
	}
	.hot dd{
		font-size: 0.12rem;
		background: #f6f6f6;
		display: inline-block;
		padding: 0.1rem 0.25rem;
		border-radius: 0.05rem;
		margin-right: 0.05rem;
	}
	.history{
		margin: 0rem 0.3rem;
		dt{
			border-bottom: 1px solid #eee;
			padding: 0.25rem 0.1rem;
		}
		dd {
			padding:  0.1rem 0.2rem;
		}
	}
	.delete-wrap{
		position: fixed;
		bottom: 0;
		width: 100%;
		text-align: center;
	}
	
	.delete {
		cursor: pointer;
		background: #fff;
		border: 1px solid #eee;
		padding: 0.05rem;
		font-size: 0.14rem;
	
	}
	.delete i{
		margin-right: 0.1rem;
	}

</style>

