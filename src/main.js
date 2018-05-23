// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App'
import routes from '@/router/route'
import store from '@/store/store'
import iView from 'iview';
import axios from 'axios';
import '@/my-theme/index.less'
import fang_ from '@/assets/js/user.js'
//设置全局变量
import global_ from '@/base/baseParam';
Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(iView);
Vue.prototype.global_=global_;
Vue.prototype.$axios = axios;
Vue.prototype.fang_ = fang_;
// 导入所有的过滤器变量
import * as custom from '@/base/basefilters/'
// 导出的是对象，可以直接通过key和value来获得过滤器的名和过滤器的方法
Object.keys(custom).forEach(key => {
    Vue.filter(key, custom[key])
})
//window.setInterval(fang_.login(app),3000);

//判断是否登录
//let sendBtnTimer = setInterval(changeSendBtn,5000)
function changeSendBtn() {
	console.log(global_)
       axios.post('customer/login', {  
				loginName: global_.loginName,  
				passWord: global_.passWord  
				}).then(res => {  
					this.logining = false;
	               	let { code, msg } = res.data;
		              if (code !== 200) {
		                  this.$Message.error(msg);
		              } else {
					        this.$Message.success('登录成功');
							let data = res.data;  
							//根据store中set_token方法将token保存至localStorage/sessionStorage中，data["Authentication-Token"]，获取token的value值  
							this.$store.commit('set_token',{token:data.object["token"],userId:data.object["userId"]});  
//							 ...mapMutations({
//   							 'set_token',{token:data.object["token"]} // 将 `this.add()` 映射为 `this.$store.commit('increment')`
// 								 })
							if (store.state.token) {  
								this.$router.push('/index')  
								console.log(store.state.token)  
							    console.log(store.state.userId) 
							} else {  
								this.$router.replace('/login');  
							}  
		              }
				}).catch(error => {  
						this.loading = false  
						this.loginBtn = "登录"  
						  this.$Message.error('系统异常');
				}) 
}
// 页面刷新时，重新赋值token  
if (localStorage.getItem('token')) {  
store.commit('set_token',{token: localStorage.getItem('token'),userId:localStorage.getItem('userId')})  
}  
const router = new VueRouter({  
routes  
});  
router.beforeEach((to, from, next) => {  
		if (to.matched.some(r => r.meta.requireAuth)) { 
			if (store.state.token!==null&&store.state.token!==undefined&&store.state.token!=="") {  
			next();  
			}  
			else {  
				next({  
						path: '/login',  
						query: {redirect: to.fullPath}  
				})  
			}  
		}  
		else {  
		next();  
		}  
}) 
/* eslint-disable no-new */
var app =new Vue({
  el: '#app',
  router,
  store,//使用store
  components: { App },
  template: '<App/>'
})
//设置拦截器
//axios.defaults.baseURL = 'http://10.0.0.2:8081/mall/wap/';
axios.defaults.baseURL = 'http://test-shop.dxracer.com.cn:8084/mall/wap/';
axios.interceptors.request.use(config => {  
// 在发送请求之前做些什么  
//判断是否存在token，如果存在将每个页面header都添加token  
if(store.state.token){
 	config.headers['token'] = store.state.token;
	config.headers['loginUserId']=store.state.userId  
}  
else{
	
}
  
return config;  
}, error => {  
// 对请求错误做些什么  
return Promise.reject(error);  
});  
  
// http response 拦截器  
//axios.interceptors.response.use(  
//	
//response => { 
//  // token 已过期，重定向到登录页面  
//  if (response.data.code == 4){  
//      localStorage.clear()  
//      router.replace({  
//                      path: '/login',  
//                      query: {redirect: router.currentRoute.fullPath}  
//                  })  
//  }  
//  return response.data
//},  
//error => {  
//if (error.response) {  
//		switch (error.response.status) {  
//		case 401: 
//		this.$store.commit('del_token');
//		router.replace({  
//		path: '/login',  
//		query: {redirect: router.currentRoute.fullPath}//登录成功后跳入浏览的当前页面  
//		});
//}  
//}  
//return Promise.reject(error)  
//}); 

axios.interceptors.response.use(function (response) {  
    // token 已过期，重定向到登录页面  
    if (response.data.code == 4){  
        localStorage.clear()  
        router.replace({  
                        path: '/signin',  
                        query: {redirect: router.currentRoute.fullPath}  
                    })  
    }  
    return response.data 
}, function (error) {  
	if (error.response) {
      // 请求已发出，但服务器响应的状态码不在 2xx 范围内
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', error.message);
    }
    console.log(error.config);
    // Do something with response error  
    return Promise.reject(error)  
})  