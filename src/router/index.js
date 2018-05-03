const _import = require('./_import_' + process.env.NODE_ENV);
let routes =  [
        {
			 path: '/',
			 redirect: '/index',
		   	iconCls: 'el-icon-location',//图标样式class\n
			component: resolve => require(['@/container/Full.vue'], resolve),
			children: [
				{
					name:'首页',
					path: '/index',
					component:resolve => require(['@/views/pages/index.vue'], resolve),
				},{
					name:'/sort',
					path: '/sort',
					component:resolve => require(['@/views/pages/sort.vue'], resolve),
				},
				{
					name:'购物车',
					path: '/cart',
					component:resolve => require(['@/views/pages/cart/cartOne.vue'], resolve),
				},
				{
					name:'个人中心',
					path: '/user',
					component:resolve => require(['@/views/pages/userCenter/Index.vue'],resolve)
				}
				]
		},
//{
//			 path: '/user',
//			 redirect: 'index',
//		   	iconCls: 'el-icon-location',//图标样式class\n
//			component: resolve => require(['@/container/UserTop.vue'], resolve),
//			children: [
//				{
//					name:'orderlist',
//					path: 'orderlist',
//					chinaname:'订单列表',
//					component:resolve => require(['@/views/pages/userCenter/OrderList.vue'], resolve),
//				},{
//					name:'address',
//					path: 'address',
//					chinaname:'添加地址',
//					component:resolve => require(['@/views/pages/userCenter/Address.vue'], resolve),
//				},
//				]
//		},
				{
					name:'/user/orderlist',
			   		path: '/user/orderlist',
			 	   	component:resolve => require(['@/views/pages/userCenter/OrderList.vue'],resolve)
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
				
  ]
export default routes;
