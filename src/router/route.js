const _import = require('./_import_' + process.env.NODE_ENV);
let routes =  [
				{path: '/',redirect: '/index'},
			    {path: '/login', name: 'login',component:  resolve => require(['@/views/Login.vue'], resolve)},
			    {path: '/register',name: '注册',component:  resolve => require(['@/views/RegisterOne.vue'], resolve)},
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
						name:'用户中心',
						meta:{requireAuth:true},
						path: '/user',
						component:resolve => require(['@/views/pages/userCenter/UserCenter.vue'], resolve),
					},
					]
				},
					{
						name:'/cart',
						path: '/cart',
						meta:{requireAuth:true},
						component:resolve => require(['@/views/pages/cart/CartOne.vue'], resolve),
					},
						{
					name:'/carttwo',
					path: '/carttwo',
					meta:{requireAuth:true},
					component:resolve => require(['@/views/pages/cart/CartTwo.vue'], resolve)
				},
					{
						name:'/cartthree',
						path: '/cartthree',
						meta:{requireAuth:true},
						component:resolve => require(['@/views/pages/cart/CartThree.vue'], resolve),
					},
						{
						name:'/paysuccess',
						path: '/paysuccess',
						meta:{requireAuth:true},
						component:resolve => require(['@/views/pages/cart/CartFour.vue'], resolve),
					},
			  		{
					path:"/sort/sortDetail",
					name:'详情',
					component:resolve=>require(['@/views/pages/SortDetail.vue'], resolve),
					},
				{
				path: '/user',name:'/user',component: resolve => require(['@/container/UFull.vue'], resolve),
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
				         	name:'orderdetail',
				   			path: 'datail',
				 	   		component:resolve => require(['@/views/pages/userCenter/OrderDetail.vue'], resolve),
				       },
				         
					{
						name:'/user/address',
				   		path: 'address',
			 		   	component:resolve => require(['@/views/pages/userCenter/Address.vue'],resolve)
					},
					{
					name:'addaddress',
			   		path:'addaddress',
		 		   	component:resolve => require(['@/views/pages/userCenter/addAddress.vue'],resolve)
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
		 		   	component:resolve => require(['@/views/pages/userCenter/MySetting.vue'],resolve),
				}	
			],
			},
			 {
            path: '/*',
            component:resolve => require(['@/views/errorPages/404.vue'],resolve)
       		 },
			]

export default routes;
