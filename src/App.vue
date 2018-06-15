<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>
<style lang="less">
@import './my-theme/index.less';
</style>
<style lang="scss" >
  @import '@/styles/color.scss';
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height:100vh;
  background: #f6f6f6;
}
ul,li{
	list-style: none;
}
.ivu-tabs-nav .ivu-tabs-tab-active,.ivu-tabs-nav .ivu-tabs-tab:hover{
	color:#d32122
}
.ivu-tabs-ink-bar{
	background:#d32122
}
outline{
	border: 0 none;
}
</style>
