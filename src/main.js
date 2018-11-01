// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router  from '@/router/route'
import store from '@/store/store'
import iView from 'iview';
import axios from './http'
import '@/my-theme/index.less'
// 在入口文件中引入(暂时不支持单组件引入的方式):
//import wcSwiper from 'wc-swiper'
//import 'wc-swiper/style.css'
//Vue.use(wcSwiper);
//开启调试模式
//Vue.config.devtools = true
//设置全局变量
import global_ from '@/base/baseParam';
Vue.config.productionTip = false
Vue.use(iView);
Vue.prototype.global_=global_;
Vue.prototype.$axios = axios;
// 导入所有的过滤器变量
import * as custom from '@/base/basefilters/'
// 导出的是对象，可以直接通过key和value来获得过滤器的名和过滤器的方法
Object.keys(custom).forEach(key => {
    Vue.filter(key, custom[key])
})
// 页面刷新时，重新赋值token
/* eslint-disable no-new */
var app =new Vue({
  el: '#app',
  router,
  store,//使用store
  components: { App },
  template: '<App/>'
})
