{"source":"webpackJsonp([28],{\"4xrH\":function(t,e){},\"8RZg\":function(t,e,n){\"use strict\";Object.defineProperty(e,\"__esModule\",{value:!0});var r={data:function(){return{}},methods:{getParams:function(){var e=this,t=this.$route.fullPath;console.log(this.$route);var n=t.indexOf(\"?\"),r=t.substring(n,this.$route.fullPath.length);console.log(\"参数：\"+r),this.$axios({method:\"post\",url:\"/order/alipay/check\"+r}).then(function(t){\"200\"==t.code&&e.$router.push({name:\"/order/detail\",params:{orderNo:t.msg}})})}},mounted:function(){this.getParams()}},o={render:function(){var t=this,e=t.$createElement;return(t._self._c||e)(\"div\",[t._v(\"\\n\\t订单支付成功 \\n\\t查看已支付订单\\n\")])},staticRenderFns:[]};var s=n(\"VU/8\")(r,o,!1,function(t){n(\"4xrH\")},null,null);e.default=s.exports}});"}