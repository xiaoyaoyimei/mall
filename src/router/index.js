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
				}
				]
		}
  ]
export default routes;
