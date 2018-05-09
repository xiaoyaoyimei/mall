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

<style lang="scss">
 @import '@/styles/color.scss';
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
ul,li{
	list-style: none;
}
.ivu-tabs-nav .ivu-tabs-tab-active,.ivu-tabs-nav .ivu-tabs-tab:hover{
	color:$color-dx;
}
.ivu-tabs-ink-bar{
	background:$color-dx;
}
 .order{
		h2{
		background: #d32122;
		color: #fff;
		font-size: 16px;
		height: 44px;
		line-height: 24px;
		padding-left:10px;
		padding-top:10px;
		padding-bottom: 10px;
		font-weight: normal;
		cursor: pointer;
		text-align: center;
		i{
			font-size: 1.5em;
			margin-right: 10px;
			font-weight: bold;
			position:fixed;
			left:15px;
		}
	}
	
}
.order div,.ivu-tabs-tabpane{
	text-align: center;
}
</style>
