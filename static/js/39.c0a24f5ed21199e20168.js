webpackJsonp([39],{SJuU:function(s,e){},X7yx:function(s,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a={render:function(){var e=this,s=e.$createElement,t=e._self._c||s;return t("div",{staticClass:"order"},[t("div",{staticClass:"wap_header"},[t("router-link",{attrs:{to:"/user/setting"}},[t("Icon",{attrs:{type:"ios-arrow-back"}}),e._v("修改密码")],1)],1),e._v(" "),t("Form",{ref:"pwd",staticClass:"form_wrap pt44 new_height",attrs:{model:e.pwd,rules:e.pwdValidate}},[t("FormItem",{attrs:{prop:"newpass"}},[t("i-input",{attrs:{placeholder:"请输入新密码",type:"password"},model:{value:e.pwd.newpass,callback:function(s){e.$set(e.pwd,"newpass","string"==typeof s?s.trim():s)},expression:"pwd.newpass"}})],1),e._v(" "),t("FormItem",{attrs:{prop:"newpassagian"}},[t("i-input",{attrs:{placeholder:"请确认新密码",type:"password"},model:{value:e.pwd.newpassagian,callback:function(s){e.$set(e.pwd,"newpassagian","string"==typeof s?s.trim():s)},expression:"pwd.newpassagian"}})],1)],1),e._v(" "),t("div",{staticClass:"btn-wrap"},[t("Button",{staticClass:"btn-red",attrs:{type:"primary",long:""},on:{click:e.handleOk}},[e._v("保存")])],1)],1)},staticRenderFns:[]};var r=t("VU/8")({data:function(){return{pwd:{newpass:"",newpassagian:""},pwdValidate:{newpass:[{required:!0,message:"请输入新密码",trigger:"blur"},{type:"string",min:6,message:"新密码不能少于6位",trigger:"blur"}],newpassagian:[{required:!0,message:"请输入确认密码",trigger:"blur"},{type:"string",min:6,message:"确认密码不能少于6位",trigger:"blur"}]}}},methods:{handleOk:function(){var e=this;this.pwd.newpass==this.pwd.newpassagian?this.$refs.pwd.validate(function(s){s&&e.$axios({method:"post",url:"/customer/update/password?password="+e.pwd.newpass}).then(function(s){"200"==s.code&&(e.$Message.success("密码修改成功"),e.$router.push("/user"))})}):this.$Message.error("两次密码不一致,请重新输入")}}},a,!1,function(s){t("SJuU")},null,null);e.default=r.exports}});