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
					},
					{
						name:'/sort',
						path: '/sort',
						component:resolve => require(['@/views/pages/Sort.vue'], resolve),
					},
					{
						name:'购物车',
						path: '/cart',
						component:resolve => require(['@/views/pages/cart/CartOne.vue'], resolve),
					},
						{
						name:'用户中心',
						meta:{requireAuth:true},
						path: '/user',
						component:resolve => require(['@/views/pages/userCenter/UserCenter.vue'], resolve),
					},
					]
				},
			  {
					path:"/sort/sortDetail",
					name:'详情',
					component:resolve=>require(['@/views/pages/SortDetail.vue'], resolve),
				},
				{
					name:'结算',
					path: '/paymoney',
					component:resolve => require(['@/views/pages/cart/Paymoney.vue'], resolve)
				},
				{
				path: '/user',component: resolve => require(['@/container/UFull.vue'], resolve),
				meta:{requireAuth:true},
				children:[
				   			{
				         	name:'home',
				   			path: 'home',
				 	   		component:resolve => require(['@/views/pages/userCenter/UserCenter.vue'], resolve),
				         },
				            {
				         	name:'orderlist',
				   			path: 'orderlist',
				 	   		component:resolve => require(['@/views/pages/userCenter/OrderList.vue'], resolve),
				         },
					{
						name:'address',
				   		path: 'address',
			 		   	component:resolve => require(['@/views/pages/userCenter/Address.vue'],resolve)
					},
				{
					name:'editaddress',
			   		path:'editaddress',
		 		   	component:resolve => require(['@/views/pages/userCenter/EditAddress.vue'],resolve)
				},
					{
					name:'mycoupon',
			   		path:'mycoupon',
		 		   	component:resolve => require(['@/views/pages/userCenter/MyCoupon.vue'],resolve)
				},
				{
					name:'couponcenter',
			   		path:'couponcenter',
		 		   	component:resolve => require(['@/views/pages/userCenter/CouponCenter.vue'],resolve)
				},
					{
					name:'mylove',
			   		path:'mylove',
		 		   	component:resolve => require(['@/views/pages/userCenter/MyLove.vue'],resolve)
				},
					{
					name:'myinfo',
			   		path:'myinfo',
		 		   	component:resolve => require(['@/views/pages/userCenter/MyInfo.vue'],resolve)
				},
				{
					name:'editnick',
			   		path:'editnick',
		 		   	component:resolve => require(['@/views/pages/userCenter/EditNickname.vue'],resolve)
				},
				{
					name:'editsex',
			   		path:'editsex',
		 		   	component:resolve => require(['@/views/pages/userCenter/EditSex.vue'],resolve)
				},
				{
					name:'photo',
			   		path:'photo',
		 		   	component:resolve => require(['@/views/pages/userCenter/Photo.vue'],resolve)
				},
					{
					name:'setting',
			   		path:'setting',
		 		   	component:resolve => require(['@/views/pages/userCenter/MySetting.vue'],resolve)
				}	
			]
				}]

export default routes;