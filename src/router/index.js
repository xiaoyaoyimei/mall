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
					component:resolve => require(['@/views/pages/sort.vue'], resolve)
				},
				{
					name:'购物车',
					path: '/cart',
					component:resolve => require(['@/views/pages/cart/cartOne.vue'], resolve)
				},
				{
					name:'个人中心',
					path: '/user',
					component:resolve => require(['@/views/pages/userCenter/index.vue'], resolve)
				}
				]
		}
  ]
export default routes;
