{"source":"webpackJsonp([23],{\"/I9U\":function(t,e){},P9vW:function(t,e,o){\"use strict\";Object.defineProperty(e,\"__esModule\",{value:!0});o(\"wtEF\");var s={name:\"login\",data:function(){return{uploadUrl:this.$axios.defaults.baseURL+\"/upload/upload?path=account\",tousuForm:{userId:\"\",mobile:\"\",content:\"\",imageUrl:\"\"},uploadList:[],defaultList:[],ruleInline:{userId:[{required:!0,message:\"请输入姓名\",trigger:\"blur\"}],mobile:[{required:!0,trigger:\"blur\",validator:function(t,e,o){null==e?o(new Error(\"手机号不能为空\")):/^(1[3-9])\\d{9}$/.test(e)?o():o(new Error(\"请输入正确的手机号\"))}}],content:[{required:!0,message:\"请输入内容\",trigger:\"blur\"}]},loading:!1,showDialog:!1,showFile:!0}},methods:{toususubmit:function(){var o=this;this.loading=!0,this.$refs.tousuForm.validate(function(t){if(t){var e=o.tousuForm;e.imageUrl=o.uploadList[0].url,o.$axios({method:\"post\",url:\"/advice/insert\",data:e}).then(function(t){\"200\"==t.code?(o.$Message.success(\"投诉成功\"),o.$router.push(\"/index\")):(o.loading=!1,o.$Message.success(\"投诉失败\"))})}}),setTimeout(function(){o.loading=!1},2e3)},evauploadhandleSuccess:function(t,e){\"200\"==t.code&&(e.url=t.msg,e.name=t.msg,this.showFile=!1)},handleFormatError:function(t){this.$Notice.warning({title:\"文件格式不正确\",desc:\"文件格式不正确,请选择 jpg 或 png.\"})},handleMaxSize:function(t){this.$Notice.warning({title:\"文件大小超过限制\",desc:\"上传文件 太大，不超过2M.\"})},evahandleBeforeUpload:function(){var t=this.uploadList.length<5;return t||this.$Notice.warning({title:\"最多可上传5张图片.\"}),t}},mounted:function(){this.uploadList=this.$refs.evaupload.fileList}},r={render:function(){var e=this,t=e.$createElement,o=e._self._c||t;return o(\"div\",[o(\"div\",{staticClass:\"wap_header\"},[o(\"router-link\",{attrs:{to:\"/user\"}},[o(\"Icon\",{attrs:{type:\"ios-arrow-back\"}}),e._v(\"建议反馈\\n\\t\\t\\t\")],1)],1),e._v(\" \"),o(\"div\",{staticClass:\"advice\"},[o(\"Form\",{ref:\"tousuForm\",staticClass:\"form\",attrs:{model:e.tousuForm,rules:e.ruleInline}},[o(\"h6\",[e._v(\"对于您给的支持和帮助，深表感谢\")]),e._v(\" \"),o(\"FormItem\",{attrs:{prop:\"userId\"}},[o(\"input\",{directives:[{name:\"model\",rawName:\"v-model\",value:e.tousuForm.userId,expression:\"tousuForm.userId\"}],staticClass:\"input\",attrs:{type:\"text\",placeholder:\"姓名\"},domProps:{value:e.tousuForm.userId},on:{input:function(t){t.target.composing||e.$set(e.tousuForm,\"userId\",t.target.value)}}})]),e._v(\" \"),o(\"FormItem\",{attrs:{prop:\"mobile\"}},[o(\"input\",{directives:[{name:\"model\",rawName:\"v-model.trim\",value:e.tousuForm.mobile,expression:\"tousuForm.mobile\",modifiers:{trim:!0}}],staticClass:\"input\",attrs:{type:\"text\",placeholder:\"手机号\"},domProps:{value:e.tousuForm.mobile},on:{input:function(t){t.target.composing||e.$set(e.tousuForm,\"mobile\",t.target.value.trim())},blur:function(t){e.$forceUpdate()}}})]),e._v(\" \"),o(\"FormItem\",{attrs:{prop:\"content\"}},[o(\"textarea\",{directives:[{name:\"model\",rawName:\"v-model\",value:e.tousuForm.content,expression:\"tousuForm.content\"}],staticStyle:{width:\"100%\",height:\"10rem\"},attrs:{type:\"textarea\",placeholder:\"在这里描述您遇到的问题\"},domProps:{value:e.tousuForm.content},on:{input:function(t){t.target.composing||e.$set(e.tousuForm,\"content\",t.target.value)}}})]),e._v(\" \"),o(\"FormItem\",[o(\"div\",[e._l(e.uploadList,function(t){return o(\"div\",{staticClass:\"demo-upload-list\",staticStyle:{width:\"260px\",\"text-align\":\"left\"}},[\"finished\"===t.status?[o(\"img\",{attrs:{width:\"100px;\",src:e._f(\"imgfilter\")(t.url)}})]:[t.showProgress?o(\"Progress\",{attrs:{percent:t.percentage,\"hide-info\":\"\"}}):e._e()]],2)}),e._v(\" \"),e.showFile?o(\"Upload\",{ref:\"evaupload\",staticStyle:{display:\"inline-block\",width:\"80px\"},attrs:{\"show-upload-list\":!1,\"default-file-list\":e.defaultList,\"on-success\":e.evauploadhandleSuccess,format:[\"jpg\",\"jpeg\",\"png\"],\"max-size\":2048,\"on-format-error\":e.handleFormatError,\"on-exceeded-size\":e.handleMaxSize,\"before-upload\":e.evahandleBeforeUpload,multiple:\"\",type:\"drag\",action:e.uploadUrl}},[o(\"div\",{staticStyle:{width:\"78px\",height:\"78px\",\"line-height\":\"78px\"}},[o(\"Icon\",{attrs:{type:\"ios-camera\",size:\"20\"}})],1)]):e._e()],2)]),e._v(\" \"),o(\"Button\",{staticClass:\"btn\",attrs:{long:\"\",loading:e.loading},on:{click:function(t){e.toususubmit()}}},[e._v(\"提交\")])],1)],1)])},staticRenderFns:[]};var i=o(\"VU/8\")(s,r,!1,function(t){o(\"/I9U\"),o(\"pXPJ\")},\"data-v-dad5a19c\",null);e.default=i.exports},pXPJ:function(t,e){}});"}