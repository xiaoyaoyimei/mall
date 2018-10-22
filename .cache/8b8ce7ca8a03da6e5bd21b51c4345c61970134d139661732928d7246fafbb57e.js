{"source":"webpackJsonp([33],{pSVD:function(e,t,r){\"use strict\";Object.defineProperty(t,\"__esModule\",{value:!0});var s=r(\"woOf\"),o=r.n(s),d={data:function(){return{old:[],addressOption:[],editForm:{person:\"\",phone:\"\",selectedOptionsAddr:[],address:\"\",tel:\"\"},ruleValidate:{person:[{required:!0,message:\"收货人不能为空\",trigger:\"blur\"}],phone:[{required:!0,message:\"手机号不能为空\",trigger:\"change\"}],selectedOptionsAddr:[{required:!0,type:\"array\",message:\"请选择省市区\",trigger:\"change\"}],address:[{required:!0,message:\"详细地址不能为空\",trigger:\"blur\"}]}}},methods:{getParams:function(){var e=this.$route.query.old;this.old=e,this.editForm.id=this.old.id,this.editForm.person=this.old.person,this.editForm.phone=this.old.phone,this.editForm.tel=this.old.tel,this.editForm.selectedOptionsAddr=[this.old.receiveProvince,this.old.receiveCity,this.old.receiveDistrict],this.editForm.address=this.old.address},getAddressOption:function(){var t=this;this.$axios({method:\"post\",url:\"/common/address\"}).then(function(e){t.addressOption=e})},addSubmit:function(){var d=this;this.$refs.editForm.validate(function(e){if(e){var t=d.editForm,r=t.id;t.receiveProvince=d.editForm.selectedOptionsAddr[0],t.receiveCity=d.editForm.selectedOptionsAddr[1],t.receiveDistrict=d.editForm.selectedOptionsAddr[2],delete t.selectedOptionsAddr,delete t.id;var s=o()({},t);d.$axios({method:\"post\",url:\"/address/update?id=\"+r,data:s}).then(function(e){d.$Message.success(\"提交成功\"),d.$refs.editForm.resetFields(),d.$router.push(\"/user/address\")})}})}},mounted:function(){this.getAddressOption(),this.getParams()}},i={render:function(){var t=this,e=t.$createElement,r=t._self._c||e;return r(\"div\",{staticClass:\"order\"},[r(\"div\",{staticClass:\"m_header_bar\"},[r(\"router-link\",{staticClass:\"m_header_bar_back\",attrs:{to:\"/user/address\"}},[r(\"Icon\",{attrs:{type:\"ios-arrow-back\"}})],1),t._v(\" \"),r(\"span\",{staticClass:\"m_header_bar_title\"},[t._v(\"编辑地址\")])],1),t._v(\" \"),r(\"Form\",{ref:\"editForm\",staticStyle:{background:\"#fff\",padding:\"15px 15px 15px 0\"},attrs:{model:t.editForm,rules:t.ruleValidate,\"label-width\":100}},[r(\"FormItem\",{attrs:{label:\"收货人\",prop:\"person\"}},[r(\"Input\",{attrs:{placeholder:\"收货人\"},model:{value:t.editForm.person,callback:function(e){t.$set(t.editForm,\"person\",e)},expression:\"editForm.person\"}})],1),t._v(\" \"),r(\"FormItem\",{attrs:{label:\"手机号\",prop:\"phone\"}},[r(\"Input\",{attrs:{placeholder:\"联系电话\"},model:{value:t.editForm.phone,callback:function(e){t.$set(t.editForm,\"phone\",e)},expression:\"editForm.phone\"}})],1),t._v(\" \"),r(\"FormItem\",{attrs:{label:\"固定电话\"}},[r(\"Input\",{attrs:{placeholder:\"固定电话\"},model:{value:t.editForm.tel,callback:function(e){t.$set(t.editForm,\"tel\",e)},expression:\"editForm.tel\"}})],1),t._v(\" \"),r(\"FormItem\",{attrs:{label:\"所在地区\",prop:\"selectedOptionsAddr\"}},[r(\"Cascader\",{attrs:{data:t.addressOption},model:{value:t.editForm.selectedOptionsAddr,callback:function(e){t.$set(t.editForm,\"selectedOptionsAddr\",e)},expression:\"editForm.selectedOptionsAddr\"}})],1),t._v(\" \"),r(\"FormItem\",{attrs:{label:\"详细地址\",prop:\"address\"}},[r(\"Input\",{attrs:{placeholder:\"详细地址\"},model:{value:t.editForm.address,callback:function(e){t.$set(t.editForm,\"address\",e)},expression:\"editForm.address\"}})],1),t._v(\" \"),r(\"FormItem\",[r(\"Button\",{attrs:{type:\"primary\",long:\"\"},on:{click:t.addSubmit}},[t._v(\"保存\")])],1)],1)],1)},staticRenderFns:[]};var a=r(\"VU/8\")(d,i,!1,function(e){r(\"xqq0\")},\"data-v-21cebd42\",null);t.default=a.exports},xqq0:function(e,t){}});"}