{"source":"webpackJsonp([6],{\"1wt9\":function(e,t,r){\"use strict\";Object.defineProperty(t,\"__esModule\",{value:!0});var s,i=r(\"bOdI\"),a=r.n(i),n={data:function(){return{imgmust:\"N\",reasonList:[],defaultList:[],imgName:\"\",visible:!1,uploadImgs:\"\",refundorder:\"\",uploadList:[],loading:!1,uploadUrl:this.$axios.defaults.baseURL+\"/upload/upload?path=account\",refundForm:{orderNo:\"\",refundCauseId:\"\",refundImgs:\"\",remarks:\"\",refundVideo:\"\"},ruleValidate:{refundCauseId:[{required:!0,message:\"请选择退款退货原因\",trigger:\"change\"}]}}},methods:(s={handleView:function(e){this.imgName=e,this.visible=!0},handleRemove:function(e){var t=this.$refs.upload.fileList;this.$refs.upload.fileList.splice(t.indexOf(e),1)},videoSuccess:function(e,t){\"200\"==e.code&&(t.url=e.msg,this.refundForm.refundVideo=e.msg)},handleSuccess:function(e,t){\"200\"==e.code&&(t.url=e.msg,t.name=e.msg)},handleFormatError:function(e){this.$Notice.warning({title:\"文件格式不正确\",desc:\"文件格式不正确,请选择 jpg 或 png.\"})}},a()(s,\"handleFormatError\",function(e){this.$Notice.warning({title:\"文件格式不正确\",desc:\"文件格式不正确,请选择 jpg 或 png.\"})}),a()(s,\"videohandleFormatError\",function(e){this.$Notice.warning({title:\"文件格式不正确\",desc:\"文件格式不正确,请选择 mp4 或 avi 或flv.\"})}),a()(s,\"handleMaxSize\",function(e){this.$Notice.warning({title:\"文件大小超过限制\",desc:\"上传文件 太大，不超过2M.\"})}),a()(s,\"handleBeforeUpload\",function(){var e=this.uploadList.length<5;return e||this.$Notice.warning({title:\"最多可上传9张图片.\"}),e}),a()(s,\"videohandleFormatError\",function(e){this.$Notice.warning({title:\"文件格式不正确\",desc:\"文件格式不正确,请选择 mp4 或 avi 或flv.\"})}),a()(s,\"videoSuccess\",function(e,t){\"200\"==e.code&&(t.url=e.msg,this.refundForm.refundVideo=e.msg)}),a()(s,\"img_must\",function(e){for(var t=0;t<this.reasonList.length;t++)this.reasonList[t].causeId==e&&(this.imgmust=this.reasonList[t].isImg)}),a()(s,\"getStatusEnum\",function(){var t=this;this.$axios({method:\"get\",url:\"/refund/getRefundCauseList\"}).then(function(e){t.reasonList=e})}),a()(s,\"getParams\",function(){this.refundForm.orderNo=this.$route.query.rforder}),a()(s,\"refund\",function(){var t=this;if(this.loading=!0,\"Y\"==this.imgmust&&0==this.uploadList.length)return this.$Message.warning(\"请上传退货凭证\"),void setTimeout(function(){t.loading=!1},2e3);for(var e=\"\",r=0;r<this.uploadList.length;r++)e+=this.uploadList[r].url+\",\";e=\",\"==e.slice(e.length-1)?e.slice(0,-1):e;this.$axios({method:\"post\",url:\"/refund/create\",data:{orderNo:this.refundForm.orderNo,refundCauseId:this.refundForm.refundCauseId,refundImgs:e,remarks:this.refundForm.refundreason,refundVideo:this.refundForm.refundVideo}}).then(function(e){\"200\"==e.code?t.$Message.info(e.object):t.$Message.error(e.msg),t.refundModal=!1,t.$router.push(\"/user/aftersales\")}),setTimeout(function(){t.loading=!1},2e3)}),s),mounted:function(){this.getStatusEnum(),this.getParams(),this.uploadList=this.$refs.upload.fileList}},o={render:function(){var r=this,e=r.$createElement,s=r._self._c||e;return s(\"div\",{staticClass:\"order\"},[s(\"div\",{staticClass:\"m_header_bar\"},[s(\"router-link\",{staticClass:\"m_header_bar_back\",attrs:{to:\"/user/orderlist\"}},[s(\"Icon\",{attrs:{type:\"ios-arrow-back\"}})],1),r._v(\" \"),s(\"span\",{staticClass:\"m_header_bar_title\"},[r._v(\"申请退货退款\")]),r._v(\" \"),s(\"span\",{staticClass:\"m_header_bar_menu\"})],1),r._v(\" \"),s(\"Form\",{ref:\"refundForm\",staticClass:\"refundForm\",attrs:{model:r.refundForm,\"label-width\":70}},[s(\"FormItem\",{attrs:{label:\"订单编号:\"}},[s(\"span\",{staticClass:\"orderNo\"},[r._v(r._s(r.refundForm.orderNo))])]),r._v(\" \"),s(\"FormItem\",{attrs:{label:\"售后原因:\"}},[s(\"Select\",{staticClass:\"select\",on:{\"on-change\":r.img_must},model:{value:r.refundForm.refundCauseId,callback:function(e){r.$set(r.refundForm,\"refundCauseId\",e)},expression:\"refundForm.refundCauseId\"}},r._l(r.reasonList,function(e){return s(\"Option\",{key:e.causeId,attrs:{value:e.causeId}},[r._v(\" \"+r._s(e.content))])}))],1),r._v(\" \"),s(\"FormItem\",{attrs:{label:\"退款说明:\"}},[s(\"i-input\",{staticClass:\"refundFormPro\",attrs:{placeholder:\"\",type:\"textarea\"},model:{value:r.refundForm.refundreason,callback:function(e){r.$set(r.refundForm,\"refundreason\",e)},expression:\"refundForm.refundreason\"}})],1),r._v(\" \"),s(\"FormItem\",{attrs:{label:\"上传图片:\"}},[s(\"div\",{staticClass:\"user-con-wrap \"},[r._l(r.uploadList,function(t){return s(\"div\",{staticClass:\"demo-upload-list\"},[\"finished\"===t.status?[s(\"img\",{attrs:{src:r._f(\"imgfilter\")(t.url)}}),r._v(\" \"),s(\"div\",{staticClass:\"demo-upload-list-cover\"},[s(\"Icon\",{attrs:{type:\"ios-eye-outline\"},nativeOn:{click:function(e){r.handleView(t.name)}}}),r._v(\" \"),s(\"Icon\",{attrs:{type:\"ios-trash-outline\"},nativeOn:{click:function(e){r.handleRemove(t)}}})],1)]:[t.showProgress?s(\"Progress\",{attrs:{percent:t.percentage,\"hide-info\":\"\"}}):r._e()]],2)}),r._v(\" \"),s(\"Upload\",{ref:\"upload\",staticStyle:{display:\"inline-block\",width:\"78px\"},attrs:{\"show-upload-list\":!1,\"default-file-list\":r.defaultList,\"on-success\":r.handleSuccess,format:[\"jpg\",\"jpeg\",\"png\"],\"max-size\":2048,\"on-format-error\":r.handleFormatError,\"on-exceeded-size\":r.handleMaxSize,\"before-upload\":r.handleBeforeUpload,multiple:\"\",type:\"drag\",action:r.uploadUrl}},[s(\"div\",{staticStyle:{width:\"78px\",height:\"78px\",\"line-height\":\"78px\"}},[s(\"Icon\",{attrs:{type:\"ios-camera\",size:\"20\"}})],1)])],2)]),r._v(\" \"),s(\"FormItem\",{attrs:{label:\"上传视频:\"}},[s(\"Upload\",{ref:\"video\",staticStyle:{display:\"inline-block\",width:\"78px\"},attrs:{action:r.uploadUrl,\"on-success\":r.videoSuccess,\"on-format-error\":r.videohandleFormatError}},[s(\"div\",{staticStyle:{width:\"78px\",height:\"78px\",\"line-height\":\"78px\"}},[s(\"Icon\",{attrs:{type:\"ios-camera\",size:\"20\"}})],1)])],1)],1),r._v(\" \"),s(\"div\",{staticClass:\"btn-wrap\"},[s(\"Button\",{staticClass:\"btn-red\",attrs:{type:\"primary\",size:\"large\",long:\"\"},on:{click:r.refund}},[r._v(\"提交\")])],1)],1)},staticRenderFns:[]};var d=r(\"VU/8\")(n,o,!1,function(e){r(\"pyf9\"),r(\"XCuF\")},\"data-v-4a376f62\",null);t.default=d.exports},\"9bBU\":function(e,t,r){r(\"mClu\");var s=r(\"FeBl\").Object;e.exports=function(e,t,r){return s.defineProperty(e,t,r)}},C4MV:function(e,t,r){e.exports={default:r(\"9bBU\"),__esModule:!0}},XCuF:function(e,t){},bOdI:function(e,t,r){\"use strict\";t.__esModule=!0;var s,i=r(\"C4MV\"),a=(s=i)&&s.__esModule?s:{default:s};t.default=function(e,t,r){return t in e?(0,a.default)(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}},mClu:function(e,t,r){var s=r(\"kM2E\");s(s.S+s.F*!r(\"+E39\"),\"Object\",{defineProperty:r(\"evD5\").f})},pyf9:function(e,t){}});"}