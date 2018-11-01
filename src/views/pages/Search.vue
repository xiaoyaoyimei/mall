<template>
    <div class="search">
        	 <header class="bg-black ">
				<div class="search-wrap">
				<input placeholder="关键字" @click="search()" v-model.trim="keyword" @keyup.13="search()" ref="keyword">
					<Icon type="ios-search"  class="icon-search"/>
						<span @click="search()">搜索</span>
				</div>
			</header>
			<div class="content"> 
				<dl class="hot">
					<dt>热搜</dt>
					<dd  @click='gosort("电竞椅")'>电竞椅</dd>
				<dd  @click='gosort("LPL")'>LPL</dd>
				<dd  @click='gosort("办公")'>办公</dd></dl>
				<dl class="history"><dt>历史搜索 <Icon @click='clear()' style="float:right;font-size:2rem!important;" type="ios-trash-outline"></Icon></dt>
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
		width: 100%;;
		height: 4.9rem;
		background-color: #ff0000;
	}
	.bg-black .i{
		vertical-align: middle;
		position: relative;
		top: 0.5rem;
	}
	.bg-black div{
		padding:0.25rem 1rem;
		position: relative;
		min-width: 28rem;
	}
	.bg-black input{
		width: 80%;
		min-width: 20rem;
		height: 3rem;
		border-radius: 1.5rem;
		outline: none;
		box-shadow: none;
		font-weight: 400;
		font-style: normal;
		font-size: 1.5rem;
		color: rgba(153, 153, 153, 0.498039215686275);
		text-align: left;
		position: relative;
		top: 0.5rem;
		padding-left: 1.5rem;
	}
	.bg-black .gosearch{
		position: absolute;
		top: 0.75rem;
		right: 2rem;
		width: 7.5rem;
		height: 3rem;
		border-bottom-right-radius: 1.5rem;
		border-top-right-radius: 1.5rem;
		line-height: 3rem;
		color: #ffffff;
		text-align: center;
		background-color:#a21112;
		font-size: 1.5rem;
	}
	
	.content dl {
		background: #fff;
		margin-bottom: 1.055rem;
	}
	
	.content dt {
		font-weight: 600;
		margin-bottom: 0.5rem;
		font-size: 1.6rem;
		color:#333;
	}
	.hot{
		padding: 1rem;
	}
	.hot dd{
		font-size: 1.4rem;
		background: #fafafa;
		display: inline-block;
		padding: 0.3rem 1rem;
		border-radius: 0.25rem;
		margin-right: 0.25rem;
		color: #454545;
	}
	.history{
		min-height: 30rem;
		dt{
			padding: 1rem;
		}
		dd{
			cursor: pointer;
			padding:  0.5rem 1rem;
			font-size: 1.4rem;
			border-bottom: 1px solid #eee;
		}
	}
	.delete-wrap{
		padding:0.5rem;
		position: fixed;
		bottom: 0;
		width: 100%;
		text-align: center;
	}
	
	.delete {
		cursor: pointer;
		background: #fff;
		border: 1px solid #eee;
		padding: 0.25rem;
		font-size:1.4rem;
	
	}
	.delete i{
		margin-right: 0.5rem;
	}

</style>

