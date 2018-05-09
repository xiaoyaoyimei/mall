<template>
	<div class="order">
		<router-link tag="h2" to="/user"><Icon type="ios-arrow-thin-left"></Icon>收货地址</router-link>
			<ul class="address">
				<li>
				<p><span>fanglijing </span><span>18811996471</span></p>
				<p><span>五彩科技大厦</span></p>
				<p><span><Checkbox v-model="single">设为默认</Checkbox></span>
				<span><Icon type="edit"></Icon>编辑<Icon type="trash-a"></Icon>删除</span></p>
				</li>
			</ul>
		<div class="addaddress">
			<router-link  to="/user/editaddress">添加新地址</router-link></div>
	</div>
</template>

<script>
	 export default {
    data () {
        return {
        	single:'',
        	addressList:[]
        }
      },
       methods:{
       	    getAddressList(){
       	    	      	this.$axios({
						    method: 'post',
						    url:'/address',
						}).then((res)=>{
							if(res.data.code=='200'){
							 this.addressList=res.data;
							}
						});
       	    }
	      },
	      mounted(){
	      	this.getAddressList();
	      }
   }
</script>

<style scoped="scoped"  lang="scss">
  .addaddress{
  	position: fixed;
  	bottom:0;
  	background: #ed1844;
  	width: 100%;color:#fff;
  	padding:10px 0;
  	cursor: pointer;
  	a{
  		color:#fff;
  	}
  }
  .address { 
  	background: #fff;
  	padding:10px;
  	font-size: 14px;
		 li p{
		  	display: flex;
		  	padding:3px 0
		  	}
		  	span:first-child{
		  		flex:1
		  		}
		  		i{
		  			margin-left:10px
		  		}
		  }
</style>