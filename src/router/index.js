import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [

  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/index-ease',
    meta: { title: '系统首页', icon: 'home' },
    children: [
    //   {
    //   path: 'dashboard',
    //   name: 'Dashboard',
    //   component: () => import('@/views/dashboard/index'),
    //   meta: { title: '佣金概述', icon: 'dashboard' }
    // }, {
    //   path: 'pearl',
    //   name: 'Pearl',
    //   component: () => import('@/views/dashboard/pearl'),
    //   meta: { title: '珍珠概述', icon: 'dashboard' }
    // },
      {
        path: 'index-ease',
        name: 'Index-ease',
        component: () => import('@/views/dashboard/index-ease'),
        meta: { title: '系统首页', icon: 'dashboard' }
      }
    ]
  },
  {
    path: '/preview',
    redirect: '/preview/levelShellText',
    component: () => import('@/views/preview/index'),
    hidden: true,
    meta: { title: '预览', icon: 'home' },
    children: [{
      path: 'levelShellText',
      name: 'LevelShellText',
      hidden: true,
      component: () => import('@/views/preview/levelShellText'),
      meta: { title: '', icon: 'dashboard' }
    }, {
      path: 'standard',
      name: 'Standard',
      hidden: true,
      component: () => import('@/views/preview/standard'),
      meta: { title: '推广行为规范', icon: 'dashboard' }
    },
    {
      path: 'alwaysQuestion',
      name: 'AlwaysQuestion',
      hidden: true,
      component: () => import('@/views/preview/alwaysQuestion'),
      meta: { title: '常见问题', icon: 'dashboard' }
    }, {
      path: 'privacy',
      name: 'Privacy',
      hidden: true,
      component: () => import('@/views/preview/privacy'),
      meta: { title: '隐私政策', icon: 'dashboard' }
    }
    ]
  },
  {
    path: '/contentMg',
    component: Layout,
    // hidden: true,
    redirect: '/contentMg/advertising',
    meta: { title: '内容管理', icon: 'content' },
    children: [{
      path: 'advertising',
      name: 'Advertising',
      // hidden: true,
      component: () => import('@/views/contentMg/advertising'),
      meta: { title: '广告管理', icon: 'contentchild' }
    }, {
      path: 'messageMg',
      name: 'messageMg',
      // hidden: true,
      component: () => import('@/views/contentMg/messageMg'),
      meta: { title: '消息设置', icon: 'contentchild' }
    },
    {
      path: 'announcement',
      name: 'Announcement',
      // hidden: true,
      component: () => import('@/views/contentMg/Announcement'),
      meta: { title: '公告管理', icon: 'contentchild' }
    },
    {
      path: 'customerProblems',
      name: 'CustomerProblems',
      // hidden: true,
      component: () => import('@/views/contentMg/customerProblems'),
      meta: { title: '客户留言', icon: 'contentchild' }
    },
    {
      path: 'question',
      name: 'Question',
      // hidden: true,
      component: () => import('@/views/contentMg/question'),
      meta: { title: '常见问题', icon: 'contentchild' }
    },
    {
      path: 'miniVideo',
      name: 'MiniVideo',
      // hidden: true,
      component: () => import('@/views/contentMg/miniVideo'),
      meta: { title: '小视频管理', icon: 'contentchild' }
    },
    {
      path: 'moreMg',
      name: 'MoreMg',
      component: () => import('@/views/contentMg/moreMg'),
      meta: { title: '更多管理', icon: 'contentchild' }
    }
    ]
  },
  {
    path: '/financeOrder',
    component: Layout,
    // hidden: true,
    redirect: '/financeOrder/orderInfo',
    meta: { title: '财务订单', icon: 'money' },
    children: [{
      path: 'orderInfo',
      name: 'OrderInfo',
      component: () => import('@/views/financeOrder/orderInfo'),
      meta: { title: '订单明细', icon: 'moneychild' }
    }, {
      path: 'orderdata',
      name: 'Orderdata',
      hidden: true,
      component: () => import('@/views/financeOrder/components/orderInfo'),
      meta: { title: '订单详情', icon: 'moneychild' }
    },
    {
      path: 'commissionInfo',
      name: 'CommissionInfo',
      component: () => import('@/views/financeOrder/commissionInfo'),
      meta: { title: '佣金明细', icon: 'moneychild' }
    },
    {
      path: 'commissionData',
      name: 'CommissionData',
      hidden: true,
      component: () => import('@/views/financeOrder/components/commissionInfo'),
      meta: { title: '佣金详情', icon: 'moneychild' }
    },
    {
      path: 'applyfor',
      name: 'Applyfor',
      component: () => import('@/views/financeOrder/applyfor'),
      meta: { title: '申请提现', icon: 'moneychild' }
    }
    ]
  },
  {
    path: '/shell',
    // hidden: true,
    component: Layout,
    redirect: '/shell/pearlDetail',
    meta: { title: '贝壳珍珠', icon: 'shell' },
    children: [{
      path: 'pearlDetail',
      name: 'PearlDetail',
      component: () => import('@/views/shell/PearlDetail'),
      meta: { title: '珍珠明细', icon: 'shellchild' }
    }, {
      path: 'pearltask',
      name: 'Pearltask',
      component: () => import('@/views/shell/pearltask'),
      meta: { title: '珍珠任务', icon: 'shellchild' }
    },
    {
      path: 'videoReward',
      name: 'VideoReward',
      component: () => import('@/views/shell/videoReward'),
      meta: { title: '视频打赏', icon: 'shellchild' }
    }
    ]
  },
  {
    path: '/userManage',
    component: Layout,
    redirect: '/userManage/index',
    meta: { title: '用户管理', icon: 'user' },
    children: [{
      path: 'index',
      name: 'Index',
      // hidden: true,
      component: () => import('@/views/userManage/index'),
      meta: { title: '用户管理', icon: 'userchild' }
    },
    {
      path: 'userInfo',
      name: 'UserInfo',
      hidden: true,
      component: () => import('@/views/userManage/userInfo'),
      meta: { title: '用户详情', icon: 'userchild' }
    }, {
      path: 'citypartner',
      name: 'Citypartner',
      component: () => import('@/views/userManage/citypartner'),
      meta: { title: '城市合伙人', icon: 'userchild' }
    }
    ]
  },

  {
    path: '/coupon',
    component: Layout,
    // hidden: true,
    redirect: '/coupon/storeManage',
    meta: { title: '优惠券', icon: 'coupon' },
    children: [{
      path: 'storeManage',
      name: 'storeManage',
      component: () => import('@/views/coupon/storeMg'),
      meta: { title: '商城管理', icon: 'couponchild' }
    },
    {
      path: 'insideMg',
      name: 'InsideMg',
      component: () => import('@/views/coupon/InsideMg'),
      meta: { title: '类目管理', icon: 'couponchild' }
    },
    {
      path: 'commodityMg',
      name: 'CommodityMg',
      component: () => import('@/views/coupon/commodityMg'),
      meta: { title: '商品管理', icon: 'couponchild' }
    },
    {
      path: 'commodityMgInfo',
      name: 'CommodityMgInfo',
      // hidden: true,
      component: () => import('@/views/coupon/commodityMgInfo'),
      meta: { title: '商品详情', icon: 'couponchild' }
    },
    {
      path: 'discoverMg',
      name: 'DiscoverMg',
      // hidden: true,
      component: () => import('@/views/coupon/discoverMg'),
      meta: { title: '发现管理', icon: 'couponchild' }
    },
    {
      path: 'columnMg',
      name: 'ColumnMg',
      component: () => import('@/views/coupon/columnMg'),
      meta: { title: '专栏管理', icon: 'couponchild' }
    },
    {
      path: 'columnMgadd',
      name: 'ColumnMgadd',
      hidden: true,
      component: () => import('@/views/coupon/columnMgadd'),
      meta: { title: '专栏新增/编辑', icon: 'couponchild' }
    },
    {
      path: 'specialMg',
      name: 'SpecialMg',
      component: () => import('@/views/coupon/specialMg'),
      meta: { title: '专题管理', icon: 'couponchild' }
    },
    {
      path: 'specialMgadd',
      name: 'SpecialMgadd',
      hidden: true,
      component: () => import('@/views/coupon/specialMgadd'),
      meta: { title: '专题新增/编辑', icon: 'couponchild' }
    },
    {
      path: 'realtimeMg',
      name: 'RealtimeMg',
      component: () => import('@/views/coupon/realtimeMg'),
      meta: { title: '实时头条', icon: 'couponchild' }
    }
    ]
  }, {
    path: '/systemManage',
    component: Layout,
    // hidden: true,
    redirect: '/systemManage/shellSet',
    meta: { title: '系统设置', icon: 'set' },
    children: [
      {
        path: 'couponSet',
        name: 'CouponSet',
        // hidden: true,
        component: () => import('@/views/systemManage/couponSet'),
        meta: { title: '优惠券设置', icon: 'setchild' }
      },
      {
        path: 'shellSet',
        name: 'ShellSet',
        component: () => import('@/views/systemManage/shellSet'),
        meta: { title: '贝壳设置', icon: 'setchild' }
      },
      {
        path: 'seastar',
        name: 'Seastar',
        // hidden: true,
        component: () => import('@/views/systemManage/Seastar'),
        meta: { title: '海洋星达人', icon: 'setchild' }
      },
      {
        path: 'cityPartner',
        name: 'CityPartner',
        // hidden: true,
        component: () => import('@/views/systemManage/cityPartner'),
        meta: { title: '城市合伙人', icon: 'setchild' }
      },
      {
        path: 'version',
        name: 'Version',
        // hidden: true,
        component: () => import('@/views/systemManage/version'),
        meta: { title: '版本管理', icon: 'setchild' }
      },
      {
        path: 'account',
        name: 'Account',
        // hidden: true,
        component: () => import('@/views/systemManage/account'),
        meta: { title: '账号管理', icon: 'setchild' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
