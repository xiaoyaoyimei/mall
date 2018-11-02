<template>
	<div class="order">
		<div class="m_header_bar">
			<Icon type="ios-arrow-back"  @click.native="back"  class="m_header_bar_back"></Icon>
			<span class="m_header_bar_title">管理收货地址</span>
			<span></span>
		</div>
		<Scroll>
			<ul class="addressul">
				<li v-for="(item, index) in addressList" >
				<p @click='chooseDD(item)' class="font-16"><span>{{item.person}} </span><span>{{item.phone}}</span></p>
				<p><span>{{item.receiveProvince}}{{item.receiveCity}}{{item.receiveDistrict}}{{item.address}}</span></p>
				<p>
					<span> <Radio  v-model="item.isDefault" @click.native="updateDefault(item.id)">设为默认</Radio></span>
					<span>
					<router-link :to="{ path: '/user/editaddress', query: {old:item}}" tag="button">编辑</router-link>
						<button @click="handleDelete(item.id)">删除</button>
					</span>
				</p>
				</li>
			</ul>
			</Scroll>
			<div><router-link  to="/user/addaddress"  class="btn-red-fixed" >添加收货地址</router-link>
	</div></div>
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
							 this.addressList=res;
							for(let i=0;i<this.addressList.length;i++){
								if(this.addressList[i].isDefault=='N'){
									this.addressList[i].isDefault=false;
								}else{
									this.addressList[i].isDefault=true;
								}
							}
						});
       	   },
       	   chooseDD(value){
       	   	 let fromc = localStorage.getItem('fromc');
       	   	   if(fromc!=undefined){
	       	   	  	     if(fromc=='miaosha'){
	       	   	  	    	this.$router.push('/secdetail')  
	       	   	  	    }else if(fromc=='setting'){
	       	   	  	    	this.$router.push('/user/setting');
	       	   	  	    }else{
	       	   	  	    	this.$router.push('/carttwo');
	       	   	  	    }
       	   	  	    }else{
       	   	  	    	return;
       	   	  	    }
       	   	   
       	   },
       	   back(){
       	   	  let fromc = localStorage.getItem('fromc');
       	   	  if(fromc!=undefined){
	       	   	  	    if(fromc=='miaosha'){
	       	   	  	    	this.$router.push('/secdetail')  
	       	   	  	    }else if(fromc=='setting'){
	       	   	  	    	this.$router.push('/user/setting');
	       	   	  	    }else{
	       	   	  	    	this.$router.push('/carttwo');
	       	   	  	    }
       	   	  	    }
       	   	  else{
       	   	  	this.$router.push('/user');
       	   	  }
       	   },
       	   updateDefault(value){
	       	   	this.$axios({
							    method: 'post',
							    url:'/address/updateDefault?id='+value+'&isDefault=Y',
							}).then((res)=>{
									this.getAddressList();
							})
       	   },
       	   handleDelete(value){
       	   	   this.$Modal.confirm({
                    title: '确认删除',
                    content: '<p>确认删除该地址</p>',
                    onOk: () => {
                         	this.$axios({
							    method: 'post',
							    url:'/address/delete?id='+value+'',
							}).then((res)=>{
								if(res.code=='200'){
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

<style   lang="scss" scoped="scoped">
  .addressul { 
  	margin-bottom: 5rem;
         li 
         {
         	padding:1rem;
         	  margin-bottom: 1rem;
         	    background: #fff;
         	  border-bottom:1px solid #eee;  
         	p{
            display: flex;
            padding:0.3rem 0;
          
            }
            p:first-child{
            	color:#222;
            }
            p:last-child{
            	border-top:1px solid #eee;
            	padding-top:1rem;
            }
            button{
                cursor: pointer;
                background: #fff;
                border:1px solid #eee;
                padding: 0.3rem 1rem;
                border-radius: 3px;
            }
            button:first-child{
            	margin-right: 0.5rem;
            }
            span:first-child{
                flex:1
                }
                i{
                    margin-left:1rem;
                    margin-right:0.5rem;
                    
                }
          }
          }
</style>