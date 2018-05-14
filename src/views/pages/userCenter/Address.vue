<template>
	<div class="order">
		<h2><router-link  to="/user"><Icon type="ios-arrow-thin-left"></Icon></router-link>收货地址</h2>
			<ul class="address">
				<li v-for="(item, index) in addressList">
				<p><span>{{item.person}} </span><span>{{item.phone}}</span></p>
				<p><span>{{item.receiveProvince}}{{item.receiveCity}}{{item.receiveDistrict}}{{item.address}}</span></p>
				<p><span> <Checkbox v-model="item.isDefault" @click.native="updateDefault(item.id)">设为默认</Checkbox></span>
				<span>
				<router-link :to="{ path: '/user/editaddress', query: {old:item}}" tag="label"> <Icon type="edit"></Icon>编辑</router-link>
					<label @click="handleDelete(item.id)"><Icon type="trash-a" ></Icon>删除</label>
				</span></p>
				</li>
			</ul>
		<div class="addaddress">
			<router-link  to="/user/addaddress">添加新地址</router-link></div>
	</div>
</template>

<script>
	export default {
    data () {
        return {
        	addressList:[],
        }
      },
      filters: {
		  formatXz(value) {
		    if (!value) return ''
		    	value = value.toString()
				const statusMap = {
					  	"Y":true,
					    'N':false,
					}
				return statusMap[value]
		  }
		},
       methods:{
       	    getAddressList(){
       	    	      	this.$axios({
						    method: 'post',
						    url:'/address',
						}).then((res)=>{
							if(res.status=='200'){
							 this.addressList=res.data;
							}
							for(let i=0;i<this.addressList.length;i++){
								if(this.addressList[i].isDefault=='N'){
									this.addressList[i].isDefault=false;
								}else{
									this.addressList[i].isDefault=true;
								}
							}
						});
       	   },
       	   updateDefault(value){
       	   	this.$axios({
						    method: 'post',
						    url:'/address/updateDefault?id='+value+'&isDefault=Y',
						}).then((res)=>{
							if(res.status=='200'){
								this.getAddressList();
							}
						})
       	   },
       	   handleDelete(value){
       	   	   this.$Modal.confirm({
                    title: '确认删除',
                    content: '<p>确认删除该条地址</p>',
                    onOk: () => {
                         	this.$axios({
							    method: 'post',
							    url:'/address/delete?id='+value+'',
							}).then((res)=>{
								if(res.status=='200'){
									this.getAddressList();
								}
						})
                    },
                    onCancel: () => {
                        this.$Message.info('取消删除');
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
  		text-align: center;
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
		  	label{
		  		cursor: pointer;
		  	}
		  	span:first-child{
		  		flex:1
		  		}
		  		i{
		  			margin-left:10px;
		  			margin-right:5px;
		  			
		  		}
		  }
</style>