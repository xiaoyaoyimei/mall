const _import = require('./_import_' + process.env.NODE_ENV);
import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store/store'
Vue.use(VueRouter)
let routes = [{
		path: '/',
		redirect: '/index'
	},
	{
		path: '/login',
		name: 'login',
		component: resolve => require(['@/views/Login.vue'], resolve)
	},
	{
		path: '/register',
		name: '注册',
		component: resolve => require(['@/views/RegisterOne.vue'], resolve)
	},
	{
		path: '/forget',
		name: '忘记密码',
		component: resolve => require(['@/views/Forget.vue'], resolve)
	},
	{
		path: '/forgettwo',
		name: '/forgettwo',
		component: resolve => require(['@/views/ForgetTwo.vue'], resolve)
	},
	{
		path: '/index',
		component: resolve => require(['@/container/Full.vue'], resolve),
		children: [{
				name: '首页',
				path: '/index',
				component: resolve => require(['@/views/pages/Home.vue'], resolve),
			},
			{
				name: '新品频道',
				path: '/newchannel',
				component: resolve => require(['@/views/pages/NewChannel.vue'], resolve),
			},
			{
				name: '/sort',
				path: '/sort',
				component: resolve => require(['@/views/pages/Sort.vue'], resolve),
			},
			{
				name: '用户中心',
				path: '/user',
				component: resolve => require(['@/views/pages/userCenter/UserCenter.vue'], resolve),
			},
			{
				name: '/cart',
				path: '/cart',
				component: resolve => require(['@/views/pages/cart/CartOne.vue'], resolve),
			},
			{
				name: '/seckill',
				path: '/seckill',
				component: resolve => require(['@/views/pages/SecKill.vue'], resolve),
			},
		]
	},
	{
		name: '/search',
		path: '/search',
		component: resolve => require(['@/views/pages/Search.vue'], resolve),
	},

	{
		name: '/secdetail',
		path: '/secdetail',
		component: resolve => require(['@/views/pages/SecDetail.vue'], resolve),
	},
	{
		name: '/carttwo',
		path: '/carttwo',
		meta: {
			requireAuth: true
		},
		component: resolve => require(['@/views/pages/cart/CartTwo.vue'], resolve)
	},
	{
		name: '/cartthree',
		path: '/cartthree',
		meta: {
			requireAuth: true
		},
		component: resolve => require(['@/views/pages/cart/CartThree.vue'], resolve),
	},
	{
		name: '/paysuccess',
		path: '/paysuccess',
		meta: {
			requireAuth: true
		},
		component: resolve => require(['@/views/pages/cart/CartFour.vue'], resolve),
	},
	{
		path: "/sort/sortDetail",
		name: '详情',
		component: resolve => require(['@/views/pages/SortDetail.vue'], resolve),
	},
	{
		path: '/user',
		name: '/user',
		redirect: 'home',
		component: resolve => require(['@/container/UFull.vue'], resolve),
		children: [{
				name: 'home',
				path: 'home',
				component: resolve => require(['@/views/pages/userCenter/UserCenter.vue'], resolve),
			},
			{
				meta: {
					requireAuth: true
				},
				name: 'orderlist',
				path: 'orderlist',
				component: resolve => require(['@/views/pages/userCenter/OrderList.vue'], resolve),
			},
			{
				meta: {
					requireAuth: true
				},
				zname: '评价',
				name: 'evaluate',
				path: 'evaluate',
				component: resolve => require(['@/views/pages/userCenter/Evaluate.vue'], resolve),
			},
			{
				meta: {
					requireAuth: true
				},
				name: '/user/express',
				path: '/user/express',
				component: resolve => require(['@/views/pages/userCenter/Express.vue'], resolve),
			},
			{
				meta: {
					requireAuth: true
				},
				zname: '我的评价',
				name: 'myevaluate',
				path: 'myevaluate',
				component: resolve => require(['@/views/pages/userCenter/MyEvaluate.vue'], resolve),
			},
			{
				meta: {
					requireAuth: true
				},
				zname: '售后服务',
				name: '/user/aftersales',
				path: '/user/aftersales',
				component: resolve => require(['@/views/pages/userCenter/AfterSales.vue'], resolve),
			}, {
				meta: {
					requireAuth: true
				},
				zname: '售后服务详情',
				name: '/user/Aftersalesdetail',
				path: '/user/Aftersalesdetail',
				component: resolve => require(['@/views/pages/userCenter/AfterSalesdetail.vue'], resolve),
			},
			{
				meta: {
					requireAuth: true
				},
				name: 'rufundlist',
				path: 'rufundlist',
				component: resolve => require(['@/views/pages/userCenter/RefundList.vue'], resolve),
			},

			{
				meta: {
					requireAuth: true
				},
				name: 'refund',
				path: 'refund',
				component: resolve => require(['@/views/pages/userCenter/Refund.vue'], resolve),
			},
			{
				meta: {
					requireAuth: true
				},
				name: '/refund/logisticsInfo',
				path: '/refund/logisticsInfo',
				component: resolve => require(['@/views/pages/userCenter/LogisticsInfo.vue'], resolve),
			},
			{
				meta: {
					requireAuth: true
				},
				name: '/order/detail',
				path: '/order/detail',
				component: resolve => require(['@/views/pages/userCenter/OrderDetail.vue'], resolve),
			},
			{
				meta: {
					requireAuth: true
				},
				name: '/addInvoice',
				path: '/addInvoice',
				component: resolve => require(['@/views/pages/userCenter/AddInvoice.vue'], resolve),
			},
			{
				meta: {
					requireAuth: true
				},
				name: '/user/address',
				path: 'address',
				component: resolve => require(['@/views/pages/userCenter/Address.vue'], resolve)
			},
			{
				meta: {
					requireAuth: true
				},
				name: 'addaddress',
				path: 'addaddress',
				component: resolve => require(['@/views/pages/userCenter/AddAddress.vue'], resolve)
			},
			{
				meta: {
					requireAuth: true
				},
				name: 'editaddress',
				path: 'editaddress',
				component: resolve => require(['@/views/pages/userCenter/EditAddress.vue'], resolve)
			},
			{
				meta: {
					requireAuth: true
				},
				name: 'mycoupon',
				path: 'mycoupon',
				component: resolve => require(['@/views/pages/userCenter/MyCoupon.vue'], resolve)
			},
			{
				name: 'about',
				path: 'about',
				component: resolve => require(['@/views/pages/userCenter/About.vue'], resolve)
			},
			{
				name: 'contentus',
				path: 'contentus',
				component: resolve => require(['@/views/pages/userCenter/ContentUs.vue'], resolve)
			},
			{
				meta: {
					requireAuth: true
				},
				name: 'changepwd',
				path: 'changepwd',
				component: resolve => require(['@/views/pages/userCenter/ChangePwd.vue'], resolve)
			},

			{
				name: 'couponcenter',
				path: 'couponcenter',
				component: resolve => require(['@/views/pages/userCenter/CouponCenter.vue'], resolve)
			},
			{
				meta: {
					requireAuth: true
				},
				name: 'mylove',
				path: 'mylove',
				component: resolve => require(['@/views/pages/userCenter/MyLove.vue'], resolve)
			},
			{
				meta: {
					requireAuth: true
				},
				name: 'editnick',
				path: 'editnick',
				component: resolve => require(['@/views/pages/userCenter/EditNickname.vue'], resolve)
			},
			{
				meta: {
					requireAuth: true
				},
				name: 'editsex',
				path: 'editsex',
				component: resolve => require(['@/views/pages/userCenter/EditSex.vue'], resolve)
			},
			{
				meta: {
					requireAuth: true
				},
				name: 'photo',
				path: 'photo',
				component: resolve => require(['@/views/pages/userCenter/Photo.vue'], resolve)
			},
			{
				meta: {
					requireAuth: true
				},
				name: 'setting',
				path: 'setting',
				component: resolve => require(['@/views/pages/userCenter/MySetting.vue'], resolve),
			}
		],
	},
	{
		path: '/help',
		name: '/help',
		component: resolve => require(['@/container/UFull.vue'], resolve),
		children: [{
			name: 'yszc',
			path: 'yszc',
			component: resolve => require(['@/views/pages/help/yszc.vue'], resolve),
		}, ]
	},
	{
		path: '/advice',
		name: '/advice',
		component: resolve => require(['@/views/Advice.vue'], resolve),
	},
	{
		path: '/*',
		component: resolve => require(['@/views/errorPages/404.vue'], resolve)
	},
]
const router = new VueRouter({
	routes,
	scrollBehavior(to, from, savedPosition) {
		if(savedPosition) {
			return savedPosition
		} else {
			return {
				x: 0,
				y: 0
			}
		}
	}
});

router.beforeEach((to, from, next) => {
	if(to.matched.some(r => r.meta.requireAuth)) {
		if(store.state.token) {
			next();
		} else {
			next({
				path: '/login',
				query: {
					redirect: to.fullPath
				}
			})
		}
	} else {
		next();
	}
})
export default router;