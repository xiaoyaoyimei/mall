{"source":"webpackJsonp([19],{I9qK:function(t,s,e){\"use strict\";s.a=function(t,s){/(y+)/.test(s)&&(s=s.replace(RegExp.$1,(t.getFullYear()+\"\").substr(4-RegExp.$1.length)));var e={\"M+\":t.getMonth()+1,\"d+\":t.getDate(),\"h+\":t.getHours(),\"m+\":t.getMinutes(),\"s+\":t.getSeconds()};for(var r in e)if(new RegExp(\"(\"+r+\")\").test(s)){var i=e[r]+\"\";s=s.replace(RegExp.$1,1===RegExp.$1.length?i:(\"00\"+(a=i)).substr(a.length))}var a;return s}},gqWv:function(t,s,e){\"use strict\";Object.defineProperty(s,\"__esModule\",{value:!0});var r=e(\"I9qK\"),i={data:function(){return{statusList:[],orderdetail:{shippingOrder:{},shippingInvoice:{},shippingAddress:{},shippingOrderItems:[]},orderNo:\"\",hr:\"\",min:0,sec:0,jsqtime:0,t:\"\"}},filters:{formatDate:function(t){var s=new Date(t);return Object(r.a)(s,\"yyyy-MM-dd hh:mm:ss\")}},methods:{countdown:function(){var t=Date.parse(new Date(this.jsqtime))-Date.parse(new Date),s=parseInt(t/1e3/60/60/24),e=parseInt(t/1e3/60/60%24),r=parseInt(t/1e3/60%60),i=parseInt(t/1e3%60);this.day=s,this.hr=9<e?e:\"0\"+e,this.min=9<r?r:\"0\"+r,this.sec=9<i?i:\"0\"+i;var a=this;this.t=setTimeout(function(){a.countdown()},1e3)},getStatusEnum:function(){var s=this;this.$axios({method:\"get\",url:\"/order/enums\"}).then(function(t){\"200\"==t.code&&(s.statusList=t.object)})},statusfilter:function(t){for(var s=0;s<this.statusList.length;s++)if(this.statusList[s].key==t)return this.statusList[s].value},cancel:function(){var s=this;this.$Modal.confirm({content:\"<p>确定取消该订单？</p>\",onOk:function(){s.$axios({method:\"post\",url:\"/order/cancel/\"+s.orderNo}).then(function(t){\"200\"==t.code?(s.$Message.info(t.msg),s.getOrder()):s.$Message.info(t.msg)})},onCancel:function(){}})},quzhifu:function(){this.$router.push({name:\"/cartthree\",query:{orderNo:this.orderNo}})},productFeejun:function(t){return t.productFee/t.quantity},getParams:function(){var t=this.$route.query.orderNo;this.orderNo=t},getOrder:function(){var s=this;this.$axios({method:\"get\",url:\"/order/\"+this.orderNo}).then(function(t){s.orderdetail=t,\"01\"==s.orderdetail.shippingOrder.orderStatus&&(s.jsqtime=s.orderdetail.shippingOrder.createTime+18e5,s.countdown()),\"06\"==s.orderdetail.shippingOrder.orderStatus&&(s.jsqtime=s.orderdetail.shippingOrder.deliverTime+6048e5,s.countdown())})}},destroyed:function(){clearTimeout(this.t)},mounted:function(){this.getParams(),this.getOrder(),this.getStatusEnum()}},a={render:function(){var e=this,t=e.$createElement,r=e._self._c||t;return r(\"div\",[r(\"div\",{staticClass:\"m_header_bar\"},[r(\"router-link\",{staticClass:\"m_header_bar_back\",attrs:{to:\"/user/orderlist\"}},[r(\"Icon\",{attrs:{type:\"ios-arrow-back\"}})],1),e._v(\" \"),r(\"span\",{staticClass:\"m_header_bar_title\"},[e._v(\"订单详情\")]),e._v(\" \"),r(\"span\",{staticClass:\"m_header_bar_menu\"})],1),e._v(\" \"),r(\"div\",{staticClass:\"detail\"},[r(\"div\",{staticClass:\"status\"},[\"01\"==e.orderdetail.shippingOrder.orderStatus?r(\"div\",[r(\"p\",[e._v(\"等待买家付款\")]),e._v(\" \"),r(\"p\",{staticClass:\"font-14\"},[e._v(\"订单将在\"),r(\"strong\",[e._v(e._s(e.min)+\":\"+e._s(e.sec))]),e._v(\"自动关闭,请及时付款~\")])]):e._e(),e._v(\" \"),\"02\"==e.orderdetail.shippingOrder.orderStatus?r(\"div\",[r(\"p\",[e._v(\"等待商家发货\")]),e._v(\" \"),r(\"p\",{staticClass:\"font-14\"},[e._v(\"您已付款,请耐心等待~\")])]):e._e(),e._v(\" \"),\"06\"==e.orderdetail.shippingOrder.orderStatus?r(\"div\",[r(\"p\",[e._v(\"等待卖家收货\")]),e._v(\" \"),r(\"p\",{staticClass:\"font-14\"},[e._v(\"订单将在\"),r(\"strong\",[e._v(e._s(e.day)+\":\"+e._s(e.hr)+\":\"+e._s(e.min)+\":\"+e._s(e.sec)+\" \")]),e._v(\"自动确认收货,请及时确认收货~\")])]):e._e(),e._v(\" \"),\"07\"==e.orderdetail.shippingOrder.orderStatus?r(\"div\",[r(\"p\",[e._v(\"买家已收货\")]),e._v(\" \"),r(\"p\",{staticClass:\"font-14\"},[e._v(\"快乐的您分享完美的使用心得\")])]):e._e(),e._v(\" \"),\"03\"==e.orderdetail.shippingOrder.orderStatus||\"04\"==e.orderdetail.shippingOrder.orderStatus||\"05\"==e.orderdetail.shippingOrder.orderStatus?r(\"div\",[e._v(\"\\n\\t\\t\\t\\t\"+e._s(e.statusfilter(e.orderdetail.shippingOrder.orderStatus))+\"\\n\\t\\t\\t\")]):e._e()]),e._v(\" \"),r(\"div\",{staticClass:\"order-detail-wrap\"},[r(\"p\",{staticClass:\"color-black\"},[e._v(\"订单编号:\"+e._s(e.orderdetail.shippingOrder.orderNo))]),e._v(\" \"),r(\"p\",{staticClass:\"color-gray\"},[e._v(\"下单时间:\"+e._s(e._f(\"formatDate\")(e.orderdetail.shippingOrder.createTime)))]),e._v(\" \"),r(\"ul\",{staticClass:\"spitem\"},e._l(e.orderdetail.shippingOrderItems,function(t,s){return r(\"li\",{key:s},[r(\"img\",{attrs:{src:e._f(\"imgfilter\")(t.productItemImg)}}),e._v(\" \"),r(\"div\",{staticClass:\"w13\"},[r(\"p\",{staticClass:\"color-black\"},[e._v(e._s(t.productItemNo))]),e._v(\" \"),r(\"p\",{staticClass:\"title\"},[e._v(e._s(t.productTitle))]),e._v(\" \"),r(\"span\",[e._v(e._s(t.productAttrs)+\" \")])]),e._v(\" \"),r(\"p\",[r(\"span\",{staticClass:\"price\"},[e._v(\"￥\"+e._s(e._f(\"pricefilter\")(e.productFeejun(t)))),r(\"br\"),e._v(\"x\"+e._s(t.quantity)+\"   \")])])])}))]),e._v(\" \"),r(\"div\",{staticClass:\"wrap\"},[r(\"h6\",[e._v(\"收货地址\")]),e._v(\" \"),r(\"ul\",{staticClass:\"sp\"},[r(\"li\",[r(\"span\",{staticClass:\"t\"},[e._v(\"姓       名:\")]),r(\"span\",{staticClass:\"s\"},[e._v(e._s(e.orderdetail.shippingAddress.receiverName)+\" \")])]),e._v(\" \"),r(\"li\",[r(\"span\",{staticClass:\"t\"},[e._v(\"联系电话:\")]),r(\"span\",{staticClass:\"s\"},[e._v(e._s(e.orderdetail.shippingAddress.receiverMobile)+\" \")])]),e._v(\" \"),r(\"li\",[r(\"span\",{staticClass:\"t\"},[e._v(\"收货地址:\")]),e._v(\" \"),r(\"span\",{staticClass:\"s\"},[e._v(e._s(e.orderdetail.shippingAddress.receiverState)+e._s(e.orderdetail.shippingAddress.receiverCity)+e._s(e.orderdetail.shippingAddress.receiverDistrict)+\"\\n\\t\\t\\t\\t\\t\"+e._s(e.orderdetail.shippingAddress.receiverAddress)+\"\\n\\t\\t \")])])])]),e._v(\" \"),r(\"div\",{staticClass:\"wrap\"},[r(\"h6\",[e._v(\"发票信息\")]),e._v(\" \"),r(\"ul\",{staticClass:\"sp\"},[r(\"li\",[r(\"span\",{staticClass:\"t\"},[e._v(\"收  票  人:\")]),r(\"span\",{staticClass:\"s\"},[e._v(e._s(e.orderdetail.shippingInvoice.receivePerson))])]),e._v(\" \"),r(\"li\",[r(\"span\",{staticClass:\"t\"},[e._v(\"发票抬头:\")]),r(\"span\",{staticClass:\"s\"},[e._v(e._s(e.orderdetail.shippingInvoice.invoiceTitle))])]),e._v(\" \"),r(\"li\",[r(\"span\",{staticClass:\"t\"},[e._v(\"发票类型:\")]),r(\"span\",{staticClass:\"s\"},[e._v(e._s(e.orderdetail.shippingInvoice.invoiceType)+\" \")]),e._v(\" \"),\"04\"!=e.orderdetail.shippingOrder.orderStatus?r(\"span\",{staticClass:\"btn-invoice\"},[\"\"==e.orderdetail.shippingInvoice||\"created\"==e.orderdetail.shippingInvoice.invoiceStatus?r(\"router-link\",{attrs:{to:{name:\"/addInvoice\",query:{orderNo:e.orderdetail.shippingOrder.orderNo},params:{shippingInvoice:e.orderdetail.shippingInvoice}}}},[e._v(\"\\n\\t   \\t\\t     \\t编辑发票\")]):e._e()],1):e._e()])])]),e._v(\" \"),r(\"div\",{staticClass:\"wrap\"},[r(\"ul\",{staticClass:\"sp\"},[r(\"li\",[r(\"span\",{staticClass:\"t\"},[e._v(\"商品总价:\")]),r(\"span\",{staticClass:\"s\"},[e._v(\"￥\"+e._s(e._f(\"pricefilter\")(e.orderdetail.shippingOrder.productFee)))])]),e._v(\" \"),r(\"li\",[r(\"span\",{staticClass:\"t\"},[e._v(\"活动优惠:\")]),r(\"span\",{staticClass:\"s\"},[e._v(\"-￥\"+e._s(e._f(\"pricefilter\")(e.orderdetail.shippingOrder.discountFee)))])]),e._v(\" \"),r(\"li\",[r(\"span\",{staticClass:\"t\"},[e._v(\"运       费:\")]),r(\"span\",{staticClass:\"s\"},[e._v(\"￥\"+e._s(e._f(\"pricefilter\")(e.orderdetail.shippingOrder.postageFee)))])]),e._v(\" \"),r(\"li\",{staticClass:\"border\"},[r(\"span\",{staticClass:\"t\"},[e._v(\"应付总额:\")]),r(\"span\",{staticClass:\"s zjg\"},[e._v(\"￥\"+e._s(e._f(\"pricefilter\")(e.orderdetail.shippingOrder.orderTotalFee)))])])])])]),e._v(\" \"),r(\"div\",{directives:[{name:\"show\",rawName:\"v-show\",value:\"01\"==e.orderdetail.shippingOrder.orderStatus||\"02\"==e.orderdetail.shippingOrder.orderStatus,expression:\"orderdetail.shippingOrder.orderStatus=='01'||orderdetail.shippingOrder.orderStatus=='02'\"}],staticClass:\"fixbottom\"},[r(\"button\",{staticClass:\"btn-white\",on:{click:function(t){e.cancel()}}},[e._v(\"取消订单\")]),e._v(\" \"),r(\"button\",{directives:[{name:\"show\",rawName:\"v-show\",value:\"01\"==e.orderdetail.shippingOrder.orderStatus,expression:\"orderdetail.shippingOrder.orderStatus=='01'\"}],staticClass:\"btn-red-small\",on:{click:function(t){e.quzhifu()}}},[e._v(\"立即付款\")])])])},staticRenderFns:[]};var n=e(\"VU/8\")(i,a,!1,function(t){e(\"tFLg\"),e(\"j53U\")},\"data-v-685b18a4\",null);s.default=n.exports},j53U:function(t,s){},tFLg:function(t,s){}});"}