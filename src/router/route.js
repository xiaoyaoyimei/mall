const _import = require('./_import_' + process.env.NODE_ENV);
let routes =  [
				{path: '/',redirect: '/login'},
			    {path: '/login', name: 'login',component:  resolve => require(['@/views/Login.vue'], resolve)},
			    {path: '/register',name: '注册',component:  resolve => require(['@/views/Register.vue'], resolve)},
       			{path: '/index',component: resolve => require(['@/container/Full.vue'], resolve),
					children: [{
						name:'首页',
						path: '/index',
						component:resolve => require(['@/views/pages/Home.vue'], resolve),
					},{
						name:'/sort',
						path: '/sort',
						component:resolve => require(['@/views/pages/Sort.vue'], resolve),
					},
					{
						name:'购物车',
						path: '/cart',
						component:resolve => require(['@/views/pages/cart/CartOne.vue'], resolve),
					}]
				},
				{
				path: '/user',redirect: '/user/home',component: resolve => require(['@/container/UFull.vue'], resolve),
				children:[{
				         	name:'/user/orderlist',
				   			path: '/user/home',
				 	   		component:resolve => require(['@/views/pages/userCenter/Index.vue'], resolve),
				         },
						   {
					name:'/user/address',
			   		path: '/user/address',
		 		   	component:resolve => require(['@/views/pages/userCenter/Address.vue'],resolve)
				},
				{
					name:'/user/editaddress',
			   		path:'/user/editaddress',
		 		   	component:resolve => require(['@/views/pages/userCenter/EditAddress.vue'],resolve)
				},
					{
					name:'/user/mycoupon',
			   		path:'/user/mycoupon',
		 		   	component:resolve => require(['@/views/pages/userCenter/MyCoupon.vue'],resolve)
				},
				{
					name:'/user/couponcenter',
			   		path:'/user/couponcenter',
		 		   	component:resolve => require(['@/views/pages/userCenter/CouponCenter.vue'],resolve)
				},
					{
					name:'/user/mylove',
			   		path:'/user/mylove',
		 		   	component:resolve => require(['@/views/pages/userCenter/MyLove.vue'],resolve)
				},
					{
					name:'/user/myinfo',
			   		path:'/user/myinfo',
		 		   	component:resolve => require(['@/views/pages/userCenter/MyInfo.vue'],resolve)
				},
				{
					name:'/user/editnick',
			   		path:'/user/editnick',
		 		   	component:resolve => require(['@/views/pages/userCenter/EditNickname.vue'],resolve)
				},
				{
					name:'/user/editsex',
			   		path:'/user/editsex',
		 		   	component:resolve => require(['@/views/pages/userCenter/EditSex.vue'],resolve)
				}]
				}]

export default routes;
