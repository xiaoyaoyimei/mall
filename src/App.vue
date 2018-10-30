<template>
  <div id="app">
    <router-view style="height: 100%;"/>
  </div>
</template>

<script>
export default {
  name: 'App',
  methods:{
//	minigo(){
//		wx.miniProgram.navigateTo({url: '/pages/index/index'})
//	}
//	 isWeiXin() {
//			var ua = window.navigator.userAgent.toLowerCase();
//			console.log(ua);//mozilla/5.0 (iphone; cpu iphone os 9_1 like mac os x) applewebkit/601.1.46 (khtml, like gecko)version/9.0 mobile/13b143 safari/601.1
//			if (ua.match(/MicroMessenger/i) == 'micromessenger') {
//			alert('weixin');
//			return true;
//			} else {
//				alert('不是微信');
//			return false;
//			}
//	}
  },
  mounted(){
  	//判断是否微信登陆
  	//this.isWeiXin()
  }
}
</script>
<style lang="less">
@import './my-theme/index.less';
</style>
<style lang="scss" >
  @import '@/styles/color.scss';
#app {
  font-family: "Microsoft YaHei",'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #888;
  height:100vh;
}
.icon{
    background-image: url(./assets/img/icon.png);
    background-repeat: no-repeat;
    background-attachment: scroll;
    display: inline-block;
    background-size: 50rem 50rem;
}
ul,li{
	list-style: none;
}
</style>
