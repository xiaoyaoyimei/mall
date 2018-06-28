import axios from 'axios'
import store from '@/store/store'
import router from '@/router/route'

// axios 配置
axios.defaults.timeout = 5000;
//设置拦截器
//axios.defaults.baseURL = process.env.API_HOST+'/wap/';
axios.defaults.baseURL = '/mall/wap/';
axios.defaults.headers.post['Content-Type'] = 'application/json';
// http request 拦截器
axios.interceptors.request.use(
    config => {
        if (store.state.token) {
          config.headers['token'] = store.state.token;
		  config.headers['loginUserId']=store.state.userId  
        }
        config.data=JSON.stringify(config.data);
        return config;
    },
    err => {
        return Promise.reject(err);
    });

// http response 拦截器
axios.interceptors.response.use(
    response => {
    	   
           	if(response.data.code=='401'){
    		router.replace({
                        path: 'login',
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
