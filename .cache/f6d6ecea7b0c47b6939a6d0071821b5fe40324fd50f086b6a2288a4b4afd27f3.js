{"source":"webpackJsonp([43],{\"4LTw\":function(t,s,a){\"use strict\";Object.defineProperty(s,\"__esModule\",{value:!0});var e=a(\"woOf\"),n=a.n(e),o=a(\"wtEF\"),i={data:function(){return{userinfo:{birthday:\"\",sex:\"\",nickName:\"\",iconUrl:\"\",customerMobile:\"\"},show:!0}},methods:{addAdd:function(){localStorage.setItem(\"fromc\",\"setting\"),this.$router.push({name:\"/user/address\"})},xshow:function(){this.show=!this.show},getUser:function(){var s=this;this.$axios({method:\"post\",url:\"/account\"}).then(function(t){s.userinfo=n()({},t)})},handleChange:function(t){this.userinfo.birthday=t},handleClick:function(){this.open=!this.open},handleClear:function(){this.open=!1,this.show=!this.show},handleOk:function(){var s=this;this.$axios({method:\"post\",url:\"/account/update\",data:{birthday:this.userinfo.birthday}}).then(function(t){\"200\"==t.code&&(s.$Message.success(\"修改成功\"),s.show=!s.show)}),this.open=!1},logout:function(){var t=this;this.$Modal.confirm({title:\"登出\",content:\"<p>确认退出登录吗?</p>\",onOk:function(){o.a.dispatch(\"LogOut\").then(function(){return window.location.href=t.global_.originurl+\"/#/login\",!1})}})}},mounted:function(){this.getUser()}},r={render:function(){var t=this,s=t.$createElement,e=t._self._c||s;return e(\"div\",{staticClass:\"order coupon\"},[e(\"div\",{staticClass:\"m_header_bar\"},[e(\"router-link\",{staticClass:\"m_header_bar_back\",attrs:{to:\"/user\"}},[e(\"Icon\",{attrs:{type:\"ios-arrow-back\"}})],1),t._v(\" \"),e(\"span\",{staticClass:\"m_header_bar_title\"},[t._v(\"设置\")]),t._v(\" \"),e(\"span\",{staticClass:\"m_header_bar_menu\"})],1),t._v(\" \"),e(\"ul\",{staticClass:\"flex-ul\"},[e(\"li\",{staticClass:\"tx\"},[e(\"span\",[t._v(\"头像\")]),t._v(\" \"),\"\"==t.userinfo.iconUrl?e(\"router-link\",{staticClass:\"tximg\",attrs:{to:{path:\"/user/photo\"}}},[e(\"img\",{attrs:{src:a(\"Icm4\")}})]):e(\"router-link\",{staticClass:\"tximg\",attrs:{to:{path:\"/user/photo\",query:{iconUrl:t.userinfo.iconUrl}}}},[e(\"img\",{attrs:{src:t._f(\"imgfilter\")(t.userinfo.iconUrl)}})])],1),t._v(\" \"),e(\"li\",[e(\"span\",[t._v(\"会员名\")]),t._v(\" \"),e(\"router-link\",{attrs:{to:{path:\"/user/editnick\",query:{nickname:t.userinfo.nickName}},tag:\"span\"}},[t._v(\" \"+t._s(t.userinfo.nickName)+\" \")])],1),t._v(\" \"),e(\"li\",[e(\"span\",{staticClass:\"color-gray\"},[t._v(\"账号\")]),e(\"span\",{staticClass:\"color-gray\"},[t._v(t._s(t.userinfo.customerMobile))])]),t._v(\" \"),e(\"li\",[e(\"span\",[t._v(\"性别\")]),t._v(\" \"),e(\"router-link\",{attrs:{to:{path:\"/user/editsex\",query:{sex:t.userinfo.sex}},tag:\"span\"}},[\"M\"===t.userinfo.sex?e(\"label\",[t._v(\"男\")]):\"F\"===t.userinfo.sex?e(\"label\",[t._v(\"女\")]):e(\"label\",[t._v(\"保密\")]),t._v(\" \"),e(\"Icon\",{attrs:{type:\"ios-arrow-forward\"}})],1)],1),t._v(\" \"),e(\"li\",[e(\"span\",[t._v(\"出生日期\")]),t._v(\" \"),e(\"span\",[t.show?t._e():e(\"label\",[e(\"DatePicker\",{staticStyle:{width:\"200px\"},attrs:{type:\"date\",confirm:\"\",placeholder:\"Select date\",value:t.userinfo.birthday},on:{\"on-ok\":t.handleOk,\"on-change\":t.handleChange}})],1),t._v(\" \"),e(\"label\",{on:{click:t.xshow}},[t.show?e(\"span\",[t._v(t._s(t.userinfo.birthday))]):t._e(),t._v(\" 选择 \")])])]),t._v(\" \"),e(\"li\",{on:{click:t.addAdd}},[e(\"span\",[t._v(\"地址管理\")]),t._v(\" \"),e(\"span\",[e(\"Icon\",{attrs:{type:\"ios-arrow-forward\"}})],1)]),t._v(\" \"),e(\"router-link\",{attrs:{to:{path:\"/user/changepwd\"},tag:\"li\"}},[e(\"span\",[t._v(\"修改密码\")]),t._v(\" \"),e(\"span\",[e(\"Icon\",{attrs:{type:\"ios-arrow-forward\"}})],1)])],1),t._v(\" \"),e(\"div\",{staticClass:\"btn-red-fixed\",on:{click:t.logout}},[t._v(\"退出登录\")])])},staticRenderFns:[]};var c=a(\"VU/8\")(i,r,!1,function(t){a(\"90Dl\")},\"data-v-013dce24\",null);s.default=c.exports},\"90Dl\":function(t,s){}});"}