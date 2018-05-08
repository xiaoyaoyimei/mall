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
					component:resolve => require(['@/views/pages/index.vue'], resolve)
				},{
					name:'分类',
					path: '/sort',
					component:resolve => require(['@/views/pages/sort.vue'], resolve),
					children:[
						
					]
				},
				{
					name:'购物车',
					path: '/cart',
					component:resolve => require(['@/views/pages/cart/cartOne.vue'], resolve),
					// children:[
					// 	{
					// 		component:resolve => require(['@/Subcomponent/shopping.vue'], resolve)
					// 	}
					// ]
				},
				
				{
					name:'个人中心',
					path: '/user',
					component:resolve => require(['@/views/pages/userCenter/index.vue'], resolve)
				},
				]
		},
		{
			path:"/sort/sortDetail",
			redirect: '/index',
			iconCls: 'el-icon-location',//图标样式class\n
			component:resolve=>require(['@/container/full1.vue'], resolve),
			children:[
				{
					name:'详情',
					path:"/sort/sortDetail",
					component:resolve=>require(['@/views/pages/sortDetail.vue'], resolve),
				}
			]
		},
		{
			path:"/paymoney",
			redirect: '/index',
			iconCls: 'el-icon-location',//图标样式class\n
			component:resolve=>require(['@/container/full2.vue'], resolve),
			children:[
				{
					name:'结算',
					path: '/paymoney',
					component:resolve => require(['@/views/pages/cart/paymoney.vue'], resolve)
				},
			]
		},
  ]
export default routes;
