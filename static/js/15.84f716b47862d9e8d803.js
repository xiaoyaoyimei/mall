webpackJsonp([15],{"+Z+E":function(t,s){},Z4uB:function(t,s,r){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var A={data:function(){return{t:"",not:"",pro:[],active:"tab-container1",show:!1,list:[],starttime:"",nostarttime:"",detail:{switch:1},day:"",hr:"",min:0,sec:0,nostartday:"",nostarthr:"",nostartmin:0,nostartsec:0,startpro:[],nostartpro:[],startproshow:!1,nostartproshow:!1}},mounted:function(){this.getNewChannel()},methods:{startcountdown:function(){var t=Date.parse(new Date(this.starttime))-Date.parse(new Date),s=parseInt(t/1e3/60/60/24),A=parseInt(t/1e3/60/60%24),a=parseInt(t/1e3/60%60),r=parseInt(t/1e3%60);this.day=9<s?s:"0"+s,this.hr=9<A?A:"0"+A,this.min=9<a?a:"0"+a,this.sec=9<r?r:"0"+r;var i=this;this.t=setTimeout(function(){i.startcountdown()},1e3)},nostartcountdown:function(){var t=Date.parse(new Date(this.nostarttime))-Date.parse(new Date),s=parseInt(t/1e3/60/60/24),A=parseInt(t/1e3/60/60%24),a=parseInt(t/1e3/60%60),r=parseInt(t/1e3%60);this.nostartday=9<s?s:"0"+s,this.nostarthr=9<A?A:"0"+A,this.nostartmin=9<a?a:"0"+a,this.nostartsec=9<r?r:"0"+r;var i=this;this.not=setTimeout(function(){i.nostartcountdown()},1e3)},getNewChannel:function(){var A=this;this.$axios({method:"GET",url:"/promotion/crush"}).then(function(t){if("200"==t.code){A.pro=t.object;for(var s=0;s<A.pro.length;s++)"1"==A.pro[s].switch?A.startpro.push(A.pro[s]):A.nostartpro.push(A.pro[s]);0<A.startpro.length&&(A.starttime=A.startpro[0].crush.endTime,A.startcountdown(),A.startproshow=!0),0<A.nostartpro.length&&(A.nostarttime=A.nostartpro[0].crush.startTime,A.nostartcountdown(),A.nostartproshow=!0)}else A.show=!0})},percent:function(t){return t.usedQuantity/t.totalQuantity*100}}},a={render:function(){var A=this,t=A.$createElement,a=A._self._c||t;return a("div",[a("div",{staticClass:"m_header_bar"},[a("router-link",{staticClass:"m_header_bar_back",attrs:{to:"/index"}},[a("Icon",{attrs:{type:"ios-arrow-back"}})],1),A._v(" "),a("span",{staticClass:"m_header_bar_title"},[A._v("秒杀专场")])],1),A._v(" "),A.show?a("div",{staticClass:"flex-center"},[a("img",{attrs:{src:r("oqPQ")}}),A._v(" "),a("p",[A._v("暂无秒杀活动 敬请期待")])]):a("div",{staticClass:"product",staticStyle:{background:"#fff"}},[A.startproshow?a("div",[a("div",{staticClass:"sTitle"},[A._v("\n\t\t\t\t\t秒杀已开始  距结束\n\t\t\t\t\t"),a("span",{staticClass:"red"},[A._v(A._s(A.day))]),A._v(" 天\n\t\t\t\t\t"),a("span",{staticClass:"red"},[A._v(A._s(A.hr))]),A._v(" :\n\t\t\t\t\t"),a("span",{staticClass:"red"},[A._v(A._s(A.min))]),A._v(" :\n\t\t\t\t\t"),a("span",{staticClass:"red"},[A._v(A._s(A.sec))])]),A._v(" "),A._l(A.startpro,function(t,s){return a("div",{key:s,staticClass:"sKpdetail"},[a("router-link",{staticClass:"Slist",attrs:{to:{name:"/secdetail",query:{skuId:t.skuId}}}},[a("img",{staticClass:"Sicon",attrs:{src:r("pHlG"),alt:""}}),A._v(" "),a("img",{staticClass:"Simg",attrs:{src:A._f("imgfilter")(t.productItem.listImg)}}),A._v(" "),a("div",{staticClass:"floatright"},[a("p",{staticClass:"sPN"},[A._v(A._s(t.product.modelNo))]),A._v(" "),a("p",{staticClass:"sPN"},[A._v(A._s(t.product.modelName))]),A._v(" "),a("div",{staticClass:"crush"},[a("div",{staticClass:"left"},[a("span",[A._v("￥"+A._s(t.crush.salePrice))]),a("br"),A._v(" "),a("em",[A._v("￥"+A._s(t.product.salePrice))])])]),A._v(" "),a("span",{staticClass:"btn"},[A._v("立即抢购")])])])],1)})],2):A._e(),A._v(" "),A.nostartproshow?a("div",[a("div",{staticClass:"sTitle"},[A._v("\n\t\t\t\t\t\t秒杀未开始  距开始\n\t\t\t\t\t\t"),a("span",{staticClass:"blue"},[A._v(A._s(A.nostartday))]),A._v(" 天\n\t\t\t\t\t\t"),a("span",{staticClass:"blue"},[A._v(A._s(A.nostarthr))]),A._v(" :\n\t\t\t\t\t\t"),a("span",{staticClass:"blue"},[A._v(A._s(A.nostartmin))]),A._v(" :\n\t\t\t\t\t\t"),a("span",{staticClass:"blue"},[A._v(A._s(A.nostartsec))])]),A._v(" "),A._l(A.nostartpro,function(t,s){return a("div",{key:s,staticClass:"sKpdetail"},[a("router-link",{staticClass:"Slist",attrs:{to:{name:"/secdetail",query:{skuId:t.skuId}}}},[a("img",{staticClass:"Sicon",attrs:{src:r("pHlG"),alt:""}}),A._v(" "),a("img",{staticClass:"Simg",attrs:{src:A._f("imgfilter")(t.productItem.listImg)}}),A._v(" "),a("div",{staticClass:"floatright"},[a("p",{staticClass:"sPN"},[A._v(A._s(t.product.modelNo))]),A._v(" "),a("p",{staticClass:"sPN"},[A._v(A._s(t.product.modelName))]),A._v(" "),a("div",{staticClass:"crush"},[a("div",{staticClass:"left"},[a("span",[A._v("￥"+A._s(t.crush.salePrice))]),a("br"),A._v(" "),a("em",[A._v("￥"+A._s(t.product.salePrice))])])]),A._v(" "),a("span",{staticClass:"btn blue"},[A._v("立即抢购")])])])],1)})],2):A._e()])])},staticRenderFns:[]};var i=r("VU/8")(A,a,!1,function(t){r("+Z+E")},"data-v-dc711ee0",null);s.default=i.exports},oqPQ:function(t,s){t.exports="data:image/png;base64,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"},pHlG:function(t,s){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHgAAAB4CAYAAAA5ZDbSAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA39pVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDoxZTMxZGJmZC00NjkwLWMwNDEtYTlhYy0zMDc1NzkzYjY4NDciIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6ODU2OTQ5MjREOERBMTFFOEIwNUJBMUZFRDVENTk1N0EiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6ODU2OTQ5MjNEOERBMTFFOEIwNUJBMUZFRDVENTk1N0EiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjFjMzAzYjlmLTQ5ZTEtNWU0YS04ZmE2LTllMzNlNDEyNWE4YiIgc3RSZWY6ZG9jdW1lbnRJRD0iYWRvYmU6ZG9jaWQ6cGhvdG9zaG9wOjYyNjUyMWFhLTZjNGYtMWQ0MC05ZDMyLWFkYjYx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"}});