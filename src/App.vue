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
  font-family:'microsoft yahei', 'Avenir', Helvetica, Arial, sans-serif;
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
  // background: #f0f0f0;
  color: #666;
}
ul,li{
	list-style: none;
}
.ivu-tabs-nav .ivu-tabs-tab-active,.ivu-tabs-nav .ivu-tabs-tab:hover{
	color:#0099ff
}
.ivu-tabs-ink-bar{
	background:#0099ff
}
outline{
	border: 0 none;
}
.ivu-scroll-container{
		height:calc(100vh - 50px)!important;
	}
	    .form_wrap .ivu-form-item{
        margin-bottom: 0;
    padding-top: 1rem;
    padding-bottom: 1rem;
    padding-left:1rem
    }
    .form_wrap >.ivu-form-item:not(:last-child){
    	 border-bottom: 1px solid #eee;
    }
  .form_wrap   .ivu-form-item-error-tip{
         padding-left:1rem
    }
.form_wrap  .ivu-input,.ivu-form-item-error .ivu-input:hover{
        border-color:#fff;
        font-size: 1.6rem;
        transition:0 none;
    }
    .form_wrap   .ivu-input:focus{
        box-shadow:none;
    }
</style>
