{"source":"webpackJsonp([4],{\"3fs2\":function(t,i,s){var e=s(\"RY/4\"),o=s(\"dSzd\")(\"iterator\"),a=s(\"/bQp\");t.exports=s(\"FeBl\").getIteratorMethod=function(t){if(null!=t)return t[o]||t[\"@@iterator\"]||a[e(t)]}},\"6w/A\":function(t,i){},BO1k:function(t,i,s){t.exports={default:s(\"fxRn\"),__esModule:!0}},CAfT:function(t,i){},PuNc:function(t,i,s){\"use strict\";Object.defineProperty(i,\"__esModule\",{value:!0});var e=s(\"woOf\"),o=s.n(e),a=s(\"BO1k\"),q=s.n(a),r={data:function(){return{num:1,kucunshow:!1,videoshow:!1,xiajia:!1,firstshow:!1,selectedId:-1,modal2:!1,oldshangp:{product:{},promotions:[],productImageList:[],productItemList:[],inventory:[],productAttrList:[]},shangp:{product:{salePrice:0},promotions:[],productImageList:[],productItemList:[],inventory:[],productAttrList:[]},productDesc:[],productimg:[],bigchoose:\"\",cxshow:!1,choosesp:{img:\"\",itemNo:\"\",price:\"\",cuxiaoprice:\"\",activityName:\"\",startTime:\"\",endTime:\"\",kucun:\"\"},productItemId:\"\",quantity:1,max:100,productId:\"\"}},methods:{toggletab:function(t){this.num=t,0==this.num&&(this.$refs.video.src=\"http://player.youku.com/embed/\"+this.shangp.product.video,this.$refs.video.flashvars=\"isAutoPlay=true\")},changeNumber:function(t){var i=t.target;if(!/^[1-9]\\d*$/.test(i.value))return this.$Message.warning(\"商品数量须大于0个，请输入正整数\"),void(i.value=1);this.quantity=parseInt(i.value)},jia:function(){this.quantity>=this.max?this.quantity=this.max:this.quantity=parseInt(this.quantity)+1},jian:function(){1==this.quantity?this.quantity:this.quantity=parseInt(this.quantity)-1},atc:function(){var i=this;\"\"!=this.productItemId?null!=localStorage.getItem(\"token\")&&null!=localStorage.getItem(\"token\")?this.$axios({method:\"post\",url:\"/order/shopping/add\",data:{productItemId:this.productItemId,quantity:this.quantity}}).then(function(t){\"200\"==t.code?i.$router.push(\"/cart\"):i.$Message.error(t.msg)}):this.$router.push({path:\"/login\",query:{redirect:this.$route.fullPath}}):this.$Message.error(\"请选择商品属性\")},chooseSP:function(t,i,s){this.kucunshow=!1,this.cxshow=!1;for(var e=\"\",o=0,a=t.target.parentNode.children,r=1;r<a.length;r++)a[r].className=\"\";t.target.className=\"active\";var n=this.$refs.dditem;this.bigchoose=\"\";for(var c=0;c<n.length;c++)\"active\"==n[c].getAttribute(\"class\")&&(e+=n[c].getAttribute(\"title\")+\",\",this.bigchoose+=n[c].innerHTML+\",\",o++);this.shangp.promotions&&(e=\",\"==e.slice(e.length-1)?e.slice(0,-1):e),this.bigchoose=\",\"==this.bigchoose.slice(this.bigchoose.length-1)?this.bigchoose.slice(0,-1):this.bigchoose;var u=!1;if(o==this.shangp.productAttrList.length){var l=!0,d=!1,h=void 0;try{for(var v,p=q()(this.shangp.productItemList);!(l=(v=p.next()).done);l=!0){var m=v.value;if(m.productModelAttrs==e){if(this.choosesp.img=m.listImg,this.choosesp.itemNo=m.itemNo,this.choosesp.price=m.salePrice,this.productItemId=m.id,0<this.shangp.promotions.length){var f=!0,g=!1,_=void 0;try{for(var y,w=q()(this.shangp.promotions);!(f=(y=w.next()).done);f=!0){var x=y.value;x.productItemId==this.productItemId&&(this.cxshow=!0,this.choosesp.cuxiaoprice=x.onSalePrice,this.choosesp.activityName=x.activityName,this.choosesp.startTime=x.startTime,this.choosesp.endTime=x.endTime)}}catch(t){g=!0,_=t}finally{try{!f&&w.return&&w.return()}finally{if(g)throw _}}}u=!0;break}u=!1}}catch(t){d=!0,h=t}finally{try{!l&&p.return&&p.return()}finally{if(d)throw h}}0==u?(this.choosesp.itemNo=\"\",this.choosesp.price=\"\",this.xiajia=!0,this.firstshow=!1):(this.xiajia=!1,this.firstshow=!0)}if(0<this.shangp.inventory.length){var I=!0,b=!1,k=void 0;try{for(var C,N=q()(this.shangp.inventory);!(I=(C=N.next()).done);I=!0){var j=C.value;j.skuId==this.productItemId&&(this.choosesp.kucun=j.quantity-j.lockQuantity)}}catch(t){b=!0,k=t}finally{try{!I&&N.return&&N.return()}finally{if(b)throw k}}}this.choosesp.kucun<=0&&(this.kucunshow=!0)},getParams:function(){var t=this.$route.query.id;this.productId=t},getProduct:function(){var i=this,s=this;s.videoshow=!1,this.$axios({method:\"post\",url:\"/product/\"+this.productId}).then(function(t){\"200\"==t.code?(i.shangp=o()({},i.oldshangp,t.object),\"\"!=t.object.product.video&&(s.videoshow=!0,s.$refs.videoWrap.style.width=window.innerWidth+\"px\",s.$refs.videoWrap.style.height=window.innerWidth+\"px\",s.$refs.video.width=window.innerWidth,s.$refs.video.height=window.innerWidth)):s.videoshow=!1})},getProductDesc:function(){var i=this;this.$axios({method:\"post\",url:\"/product/desc/\"+this.productId}).then(function(t){i.productDesc=t}),this.$axios({method:\"post\",url:\"/product/img/\"+this.productId}).then(function(t){i.productimg=t})}},mounted:function(){this.getParams(),this.getProduct(),this.getProductDesc()}},n={render:function(){var e=this,t=e.$createElement,o=e._self._c||t;return o(\"div\",[o(\"div\",{staticClass:\"sortDetail\"},[o(\"router-link\",{staticClass:\"back\",attrs:{to:\"/sort\",tag:\"span\"}},[o(\"Icon\",{attrs:{type:\"ios-arrow-left\"}})],1),e._v(\" \"),o(\"div\",{staticClass:\"video-wrap\"},[o(\"div\",{directives:[{name:\"show\",rawName:\"v-show\",value:0==e.num,expression:\" 0== num\"}],ref:\"videoWrap\",staticClass:\"video-height\"},[o(\"div\",{directives:[{name:\"show\",rawName:\"v-show\",value:e.videoshow,expression:\"videoshow\"}],staticClass:\"video\"},[o(\"iframe\",{ref:\"video\",attrs:{frameborder:\"0\",allowfullscreen:\"\"}})])]),e._v(\" \"),o(\"div\",{directives:[{name:\"show\",rawName:\"v-show\",value:1==e.num,expression:\" 1== num\"}],staticClass:\"swiper\"},[e.shangp.productImageList.length?o(\"wc-swiper\",{attrs:{autoplay:!1}},e._l(e.shangp.productImageList,function(t,i){return o(\"wc-slide\",{key:i},[o(\"img\",{attrs:{src:e._f(\"imgfilter\")(t.listImg)}})])})):e._e()],1),e._v(\" \"),o(\"div\",{directives:[{name:\"show\",rawName:\"v-show\",value:e.videoshow,expression:\"videoshow\"}],staticClass:\"controls\"},[o(\"button\",{class:1==e.num?\"active\":\"\",on:{click:function(t){e.toggletab(1)}}},[e._v(\"图片\")]),e._v(\" \"),o(\"button\",{class:0==e.num?\"active\":\"\",on:{click:function(t){e.toggletab(0)}}},[e._v(\"视频\")])])]),e._v(\" \"),o(\"div\",{staticClass:\"xiangqiang\"},[o(\"div\",[e._v(e._s(e.shangp.product.modelName))]),e._v(\" \"),o(\"strong\",[o(\"label\",{staticClass:\"price\"},[e._v(\"￥\"+e._s(e._f(\"pricefilter\")(e.shangp.product.salePrice)))])])]),e._v(\" \"),o(\"div\",{staticClass:\"choose\",on:{click:function(t){e.modal2=!0}}},[o(\"span\",[e._v(\"选择规格\"),e.xiajia?e._e():o(\"i\",[e._v(e._s(e.bigchoose))])]),e._v(\" \"),o(\"Icon\",{attrs:{type:\"ios-more\"}})],1)],1),e._v(\" \"),o(\"Tabs\",{staticClass:\"spjs\"},[o(\"TabPane\",{attrs:{label:\"商品介绍\"}},[o(\"ul\",e._l(e.productimg,function(t,i){return o(\"li\",{key:i},[o(\"img\",{attrs:{src:e._f(\"imgfilter\")(t.imgUrl)}})])}))]),e._v(\" \"),o(\"TabPane\",{attrs:{label:\"规格参数\"}},[o(\"ul\",{staticClass:\"gk\"},e._l(e.productDesc,function(t,i){return o(\"li\",{key:i},[o(\"span\",{staticClass:\"title\"},[e._v(e._s(t.attrCode)+\":\")]),e._v(\" \"),o(\"span\",{staticClass:\"neirong\"},[e._v(e._s(t.attrValue))])])}))])],1),e._v(\" \"),o(\"div\",{staticClass:\"foot\"},[o(\"button\",{staticClass:\"jrgwc\",on:{click:function(t){e.modal2=!0}}},[e._v(\"加入购物车\")]),e._v(\" \"),o(\"router-link\",{staticClass:\"cart\",attrs:{to:{path:\"/cart\"}}},[o(\"Icon\",{attrs:{type:\"android-cart\"}}),e._v(\"购物车\")],1)],1),e._v(\" \"),o(\"Modal\",{staticClass:\"chooseModal cartModal\",attrs:{\"mask-closable\":!1},model:{value:e.modal2,callback:function(t){e.modal2=t},expression:\"modal2\"}},[o(\"div\",{attrs:{slot:\"header\"},slot:\"header\"},[e.xiajia?o(\"div\",{staticClass:\"xiajia\"},[o(\"Icon\",{attrs:{type:\"information-circled\"}}),e._v(\"该商品已下架\\r\\n         \\t \")],1):e._e(),e._v(\" \"),e.xiajia||e.firstshow?e._e():o(\"div\",{staticClass:\"xiajia\"},[o(\"Icon\",{attrs:{type:\"information-circled\"}}),e._v(\"请选择商品 \\r\\n         \\t \")],1),e._v(\" \"),e.firstshow?o(\"div\",{staticClass:\"chooseproduct\"},[o(\"img\",{attrs:{src:e._f(\"imgfilter\")(e.choosesp.img)}}),e._v(\" \"),o(\"div\",{staticClass:\"small-xq\"},[o(\"strong\",[e._v(\"￥\"+e._s(e._f(\"pricefilter\")(e.choosesp.price)))]),e._v(\"\\r\\n             \\t\\t商品编号:\"+e._s(e.choosesp.itemNo)+\"\\r\\n             \\t\"),o(\"em\",[e._v(\"库存:\"+e._s(e.choosesp.kucun))]),e._v(\" \"),e.cxshow?o(\"span\",{staticClass:\"cx\"},[o(\"strong\",[e._v(\"￥\"+e._s(e.choosesp.cuxiaoprice))]),e._v(\" \"),o(\"label\",[e._v(e._s(e.choosesp.activityName))])]):e._e()])]):e._e()]),e._v(\" \"),e._l(e.shangp.productAttrList,function(s,t){return o(\"dl\",{key:t},[o(\"dt\",[e._v(e._s(s.attrKey.catalogAttrValue))]),e._v(\" \"),e._l(s.attrValues,function(i,t){return o(\"dd\",{key:t,ref:\"dditem\",refInFor:!0,attrs:{title:i.id},on:{click:function(t){e.chooseSP(t,s,i)}}},[e._v(\"\\r\\n          \\t\"+e._s(i.modelAttrValue)+\"\\r\\n          \")])})],2)}),e._v(\" \"),o(\"div\",[o(\"p\",[e._v(\"数量\")]),e._v(\" \"),o(\"div\",{staticClass:\"min-add\"},[o(\"Icon\",{staticClass:\"min\",attrs:{type:\"minus-round\"},nativeOn:{click:function(t){e.jian()}}}),e._v(\" \"),o(\"input\",{directives:[{name:\"model\",rawName:\"v-model.lazy\",value:e.quantity,expression:\"quantity\",modifiers:{lazy:!0}}],staticClass:\"text-box\",attrs:{name:\"pricenum\",type:\"tel\",placeholder:\"数量\",\"data-max\":\"50\"},domProps:{value:e.quantity},on:{blur:function(t){e.changeNumber(t)},change:function(t){e.quantity=t.target.value}}}),e._v(\" \"),o(\"Icon\",{staticClass:\"add\",attrs:{type:\"plus-round\"},nativeOn:{click:function(t){e.jia()}}})],1)]),e._v(\" \"),o(\"div\",{attrs:{slot:\"footer\"},slot:\"footer\"},[e.kucunshow?o(\"Button\",{attrs:{size:\"large\",long:\"\",disabled:\"disabled\"}},[e._v(\"暂时无货，到货通知\")]):e._e(),e._v(\" \"),e.xiajia?o(\"Button\",{attrs:{size:\"large\",long:\"\",disabled:\"disabled\"}},[e._v(\"该商品已下架\")]):e._e(),e._v(\" \"),e.xiajia||e.kucunshow?e._e():o(\"Button\",{attrs:{size:\"large\",long:\"\",type:\"primary\"},on:{click:e.atc}},[e._v(\"加入购物车\")])],1)],2)],1)},staticRenderFns:[]};var c=s(\"VU/8\")(r,n,!1,function(t){s(\"CAfT\"),s(\"6w/A\")},\"data-v-6e02f75d\",null);i.default=c.exports},\"RY/4\":function(t,i,s){var o=s(\"R9M2\"),a=s(\"dSzd\")(\"toStringTag\"),r=\"Arguments\"==o(function(){return arguments}());t.exports=function(t){var i,s,e;return void 0===t?\"Undefined\":null===t?\"Null\":\"string\"==typeof(s=function(t,i){try{return t[i]}catch(t){}}(i=Object(t),a))?s:r?o(i):\"Object\"==(e=o(i))&&\"function\"==typeof i.callee?\"Arguments\":e}},fxRn:function(t,i,s){s(\"+tPU\"),s(\"zQR9\"),t.exports=s(\"g8Ux\")},g8Ux:function(t,i,s){var e=s(\"77Pl\"),o=s(\"3fs2\");t.exports=s(\"FeBl\").getIterator=function(t){var i=o(t);if(\"function\"!=typeof i)throw TypeError(t+\" is not iterable!\");return e(i.call(t))}}});"}