webpackJsonp([42],{hmxu:function(t,s,e){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var r={render:function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[r("div",{staticClass:"m_header_bar"},[r("router-link",{staticClass:"m_header_bar_back",attrs:{to:"/user/aftersales"}},[r("Icon",{attrs:{type:"ios-arrow-back"}})],1),e._v(" "),r("span",{staticClass:"m_header_bar_title"},[e._v("退货单详情")]),e._v(" "),r("span",{staticClass:"m_header_bar_menu"})],1),e._v(" "),r("div",{staticClass:"detail"},[r("div",{staticClass:"status"},[e._v("\n\t\t\t"+e._s(e.statusfilter(e.refundOrderdetail.shoppingRefundOrder.refundOrderStatus))+"\n\t\t")]),e._v(" "),r("div",{staticClass:"order-detail-wrap"},[r("p",{staticClass:"color-black"},[e._v("退款金额:￥"+e._s(e._f("pricefilter")(e.refundOrderdetail.shoppingRefundOrder.refundOrderTotalFee)))]),e._v(" "),r("p",{staticClass:"color-gray"},[e._v("申请时间:"+e._s(e._f("formatDate")(e.refundOrderdetail.shoppingRefundOrder.createTime,"yyyy-MM-dd hh:mm:ss")))]),e._v(" "),r("ul",{staticClass:"spitem"},e._l(e.orderdetail.shippingOrderItems,function(t,s){return r("li",{key:s,staticClass:"clearfix orderteail"},[r("img",{attrs:{src:e._f("imgfilter")(t.productItemImg),alt:t.productTitle}}),e._v(" "),r("div",{staticClass:"orderdetailText"},[r("p",[e._v(e._s(e._f("pricefilter")(e.orderFeejun(t)))+" x "+e._s(t.quantity))]),e._v(" "),r("p",[e._v(e._s(t.productTitle))])])])}))]),e._v(" "),r("div",{staticClass:"wrap"},[r("h6",[e._v("订单信息")]),e._v(" "),r("ul",{staticClass:"sp"},[r("li",[r("span",{staticClass:"t"},[e._v("订单编号:")]),r("span",{staticClass:"s"},[e._v(e._s(e.orderdetail.shippingOrder.orderNo))])]),e._v(" "),r("li",[r("span",{staticClass:"t"},[e._v("成交时间:")]),r("span",{staticClass:"s"},[e._v(e._s(e._f("formatDate")(e.orderdetail.shippingOrder.createTime,"yyyy-MM-dd hh:mm:ss")))])]),e._v(" "),r("li",[r("span",{staticClass:"t"},[e._v("商品总价:")]),r("span",{staticClass:"s"},[e._v("￥"+e._s(e._f("pricefilter")(e.orderdetail.shippingOrder.productFee)))])]),e._v(" "),r("li",[r("span",{staticClass:"t"},[e._v("活动优惠:")]),r("span",{staticClass:"s"},[e._v("-￥"),""!=e.orderdetail.shippingOrder.discountFee?r("label",[e._v(e._s(e._f("pricefilter")(e.orderdetail.shippingOrder.discountFee)))]):r("label",[e._v("0")])])]),e._v(" "),r("li",[r("span",{staticClass:"t"},[e._v("运       费:")]),e._v(" "),""!=e.orderdetail.shippingOrder.postageFee?r("span",{staticClass:"s"},[e._v("￥"+e._s(e._f("pricefilter")(e.orderdetail.shippingOrder.postageFee)))]):r("span",[e._v("￥0.00")])]),e._v(" "),r("li",[r("span",{staticClass:"t"},[e._v("应付总额:")]),r("span",{staticClass:"s"},[e._v("￥ "+e._s(e._f("pricefilter")(e.orderdetail.shippingOrder.orderTotalFee)))])])])]),e._v(" "),r("div",{staticClass:"wrap"},[r("h6",[e._v("退款信息")]),e._v(" "),r("ul",{staticClass:"sp"},[r("li",[r("span",{staticClass:"t"},[e._v("退款编号:")]),r("span",{staticClass:"s"},[e._v(e._s(e.refundOrderdetail.shoppingRefundOrder.refundOrderNo))])]),e._v(" "),r("li",[r("span",{staticClass:"t"},[e._v("退款金额:")]),r("span",{staticClass:"s"},[e._v("￥"+e._s(e._f("pricefilter")(e.refundOrderdetail.shoppingRefundOrder.refundOrderTotalFee)))])]),e._v(" "),r("li",[r("span",{staticClass:"t"},[e._v("要       求:")]),r("span",{staticClass:"s"},[e._v(e._s(e.refundOrderdetail.shoppingRefundOrder.remarks))])]),e._v(" "),r("li",[r("span",{staticClass:"t"},[e._v("退货快递:")]),r("span",{staticClass:"s"},[e._v(e._s(e.refundOrderdetail.shoppingRefundOrder.logistics))])]),e._v(" "),r("li",[r("span",{staticClass:"t"},[e._v("退货单号:")]),r("span",{staticClass:"s"},[e._v(e._s(e.refundOrderdetail.shoppingRefundOrder.expressNo))])])])])]),e._v(" "),e.spinShow?r("Spin",{attrs:{size:"large",fix:""}}):e._e()],1)},staticRenderFns:[]};var i=e("VU/8")({data:function(){return{spinShow:!0,orderdetail:{shippingOrder:{postageFee:0,orderTotalFee:0},shippingInvoice:{},shippingAddress:{},shoppingOrderItems:[]},refundOrderdetail:{shoppingRefundOrder:{refundOrderTotalFee:0},shippingInvoice:{},shippingAddress:{},shoppingRefundOrderItems:[]},statusList:[],orderNo:""}},methods:{getStatusEnum:function(){var s=this;this.$axios({method:"get",url:"/refund/enums"}).then(function(t){"200"==t.code&&(s.statusList=t.object)})},statusfilter:function(t){for(var s=0;s<this.statusList.length;s++)if(this.statusList[s].key==t)return this.statusList[s].value},cancel:function(){var s=this;this.$Modal.confirm({content:"<p>确定取消该售后服务订单？</p>",onOk:function(){s.$axios({method:"post",url:"/order/cancel/"+s.orderNo}).then(function(t){"200"==t.code?(s.$Message.info(t.msg),s.getOrder()):(s.getOrder(),s.$Message.info(t.msg))})},onCancel:function(){}})},discountFeejun:function(t){return t.discountFee/t.quantity},productFeejun:function(t){return t.productFee/t.quantity},orderFeejun:function(t){return t.orderFee/t.quantity},getParams:function(){var t=this.$route.query.orderNo;this.orderNo=t},getOrder:function(){var s=this;this.$axios({method:"get",url:"/refund/"+this.$route.query.refundOrderNo}).then(function(t){s.refundOrderdetail=t}),this.$axios({method:"get",url:"/order/"+this.orderNo}).then(function(t){s.orderdetail=t,s.spinShow=!1})}},mounted:function(){this.getParams(),this.getOrder(),this.getStatusEnum()}},r,!1,function(t){e("utcu")},"data-v-02adaf4a",null);s.default=i.exports},utcu:function(t,s){}});