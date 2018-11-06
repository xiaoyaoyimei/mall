<template>
  <div id="app">
    <router-view style="height: 100%;"/>
  </div>
</template>

<style lang="less">
@import './my-theme/index.less';
</style>
<style lang="scss" >
  @import '@/styles/common.scss';
#app {
  font-family: "Microsoft YaHei",'Avenir', Helvetica, Arial, sans-serif;
  font-family:'microsoft yahei', 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #888;
  background: #f0f0f0;
  min-height: 100vh;
}
.icon{
    background-image: url(./assets/img/icon.png);
    background-repeat: no-repeat;
    background-attachment: scroll;
    display: inline-block;
    background-size: 25rem 25rem;
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
		height:calc(100vh - 50px);
	}
	    .form_wrap .ivu-form-item{
        margin-bottom: 0;
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
    .ivu-form-item-error-tip{
    	z-index: 2;
    }
</style>
