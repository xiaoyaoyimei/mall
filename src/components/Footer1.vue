<template>
          <div class="foot">
    <Row class="tabs tabs-icon-left">
    
   <router-link :to="{ path: 'index' }"> <Col span="6" ><Icon type="home" /> 首页</Col></router-link>
     <router-link :to="{ path: 'sort' }">  <Col span="6" > <Icon type="android-apps"></Icon> 收藏</Col></router-link>
       <router-link :to="{ path: 'cart' }">   <Col span="6"> <Icon type="android-cart"></Icon>加入购物车</Col></router-link>
         <router-link :to="{ path: 'user' }">    <Col span="6"><Icon type="ios-person"></Icon> 立即购买</Col></router-link>
    </Row></router-link>
            </div>
</template>

<script>
</script>

<style scoped="scoped"  lang="scss">
 @import '@/styles/color.scss';
.foot {
		background: #fff;
		border-top:1px solid #eee;
		padding:5px 0;
		position: fixed;
		height: 50px;
		z-index: 31;
		bottom: 0;
		left: 0;
		width:100%;
	i{
		display: block;
		font-size:2em
	}
	a{
		color:$color-default;
	}
	a.router-link-active{
			color:$color-dx;
	}
}
</style>