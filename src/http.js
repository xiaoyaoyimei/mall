import axios from 'axios'
import store from '@/store/store'
import router from '@/router/route'
import Promise from 'es6-promise'
Promise.polyfill()
import qs from 'qs'

// axios 配置
axios.defaults.timeout = 5000;

axios.defaults.baseURL = '/mall/wap/';
//pro-环境
//axios.defaults.baseURL = 'http://10.0.0.28/mall/wap/';
//axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
//axios.defaults.withCredentials=true;
// http request 拦截器
axios.interceptors.request.use(
    config => {
        if (store.state.token) {
          config.headers['token'] = store.state.token;
		  config.headers['loginUserId']=store.state.userId
        }
        return config;
    },
    err => {
        return Promise.reject(err);
    });

// http response 拦截器
axios.interceptors.response.use(
    response => {
           	if(response.data.code=='401'){
           	  console.log( router);
    		router.replace({
                        path: '/login',
                        query: {redirect: router.currentRoute.fullPath}
                    })
    	}
        return response.data;
    },
    
    error => {
//  	if(error){
//  		        store.commit('LOGOUT');
//                  router.replace({
//                      path: 'login',
//                      query: {redirect: router.currentRoute.fullPath}
//                  })
//  	}
      console.log(JSON.stringify(error));//console : Error: Request failed with status code 402
        return Promise.reject(error.response)
    });

export default axios;
