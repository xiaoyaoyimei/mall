{"source":"webpackJsonp([19],{\"4LTw\":function(t,e,a){\"use strict\";Object.defineProperty(e,\"__esModule\",{value:!0});var s=a(\"woOf\"),n=a.n(s),i={data:function(){return{userinfo:{birthday:\"\",sex:\"\",nickName:\"\",iconUrl:\"\",customerMobile:\"\"},show:!0}},methods:{xshow:function(){this.show=!this.show},getUser:function(){var e=this;this.$axios({method:\"post\",url:\"/account\"}).then(function(t){e.userinfo=n()({},t)})},handleChange:function(t){this.userinfo.birthday=t},handleClick:function(){this.open=!this.open},handleClear:function(){this.open=!1,this.show=!this.show},handleOk:function(){var e=this;this.$axios({method:\"post\",url:\"/account/update\",data:{birthday:this.userinfo.birthday}}).then(function(t){\"200\"==t.code&&(e.$Message.success(\"修改成功\"),e.show=!e.show)}),this.open=!1},logout:function(){this.$Modal.confirm({title:\"登出\",content:\"<p>确认退出登录吗?</p>\",onOk:function(){store.dispatch(\"LogOut\").then(function(){return window.location.href=global_.originurl+\"/#/login\",!1})}})}},mounted:function(){this.getUser()}},o={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s(\"div\",{staticClass:\"order coupon\"},[s(\"div\",{staticClass:\"m_header_bar\"},[s(\"router-link\",{staticClass:\"m_header_bar_back\",attrs:{to:\"/user\"}},[s(\"Icon\",{attrs:{type:\"ios-arrow-back\"}})],1),t._v(\" \"),s(\"span\",{staticClass:\"m_header_bar_title\"},[t._v(\"设置\")]),t._v(\" \"),s(\"span\",{staticClass:\"m_header_bar_menu\"})],1),t._v(\" \"),s(\"ul\",{staticClass:\"flex-ul\"},[s(\"li\",{staticClass:\"tx\"},[s(\"span\",[t._v(\"头像\")]),t._v(\" \"),\"\"==t.userinfo.iconUrl?s(\"span\",[s(\"router-link\",{attrs:{to:{path:\"/user/photo\"}}},[s(\"img\",{staticStyle:{width:\"5rem\",height:\"5rem\",\"border-radius\":\"50%\"},attrs:{src:a(\"Icm4\")}})])],1):s(\"span\",[s(\"router-link\",{attrs:{to:{path:\"/user/photo\",query:{iconUrl:t.userinfo.iconUrl}}}},[s(\"img\",{staticStyle:{\"vertical-align\":\"middle\",width:\"3.5rem\",\"max-height\":\"4rem\"},attrs:{src:t._f(\"imgfilter\")(t.userinfo.iconUrl)}})])],1)]),t._v(\" \"),s(\"li\",[s(\"span\",[t._v(\"会员名\")]),t._v(\" \"),s(\"router-link\",{attrs:{to:{path:\"/user/editnick\",query:{nickname:t.userinfo.nickName}},tag:\"span\"}},[t._v(\" \"+t._s(t.userinfo.nickName)+\" \")])],1),t._v(\" \"),s(\"li\",[s(\"span\",{staticClass:\"color-gray\"},[t._v(\"账号\")]),s(\"span\",{staticClass:\"color-gray\"},[t._v(t._s(t.userinfo.customerMobile))])]),t._v(\" \"),s(\"li\",[s(\"span\",[t._v(\"性别\")]),t._v(\" \"),s(\"router-link\",{attrs:{to:{path:\"/user/editsex\",query:{sex:t.userinfo.sex}},tag:\"span\"}},[\"M\"===t.userinfo.sex?s(\"label\",[t._v(\"男\")]):\"F\"===t.userinfo.sex?s(\"label\",[t._v(\"女\")]):s(\"label\",[t._v(\"保密\")])])],1),t._v(\" \"),s(\"li\",[s(\"span\",[t._v(\"出生日期\")]),t._v(\" \"),s(\"span\",[t.show?t._e():s(\"label\",[s(\"DatePicker\",{staticStyle:{width:\"200px\"},attrs:{type:\"date\",confirm:\"\",placeholder:\"Select date\",value:t.userinfo.birthday},on:{\"on-ok\":t.handleOk,\"on-change\":t.handleChange}})],1),t._v(\" \"),s(\"label\",{on:{click:t.xshow}},[t.show?s(\"span\",[t._v(t._s(t.userinfo.birthday))]):t._e(),t._v(\"    选择 \")])])]),t._v(\" \"),s(\"li\",[s(\"router-link\",{attrs:{to:{path:\"/user/address\"},tag:\"span\"}},[t._v(\" 地址管理\")]),s(\"span\",[s(\"Icon\",{attrs:{type:\"ios-arrow-forward\"}})],1)],1),t._v(\" \"),s(\"li\",[s(\"router-link\",{attrs:{to:{path:\"/user/changepwd\"},tag:\"span\"}},[t._v(\" 修改密码\")]),s(\"span\",[s(\"Icon\",{attrs:{type:\"ios-arrow-forward\"}})],1)],1)]),t._v(\" \"),s(\"div\",{staticClass:\"btn-red-fixed\",on:{click:t.logout}},[t._v(\"退出登录\")])])},staticRenderFns:[]};var r=a(\"VU/8\")(i,o,!1,function(t){a(\"TL2H\")},\"data-v-60a4f8c2\",null);e.default=r.exports},Icm4:function(t,e,s){t.exports=s.p+\"static/img/de-tx.05d4e64.jpg\"},TL2H:function(t,e){}});"}