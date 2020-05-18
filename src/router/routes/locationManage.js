const Index = () => import('viewsPath/locationManage/index.vue'); // 位置管理
const List = () => import('viewsPath/locationManage/list/index.vue'); // 位置管理-列表
const SiteList = () => import('viewsPath/locationManage/list/site/index.vue'); // 位置管理-列表-站点
const StoreList = () => import('viewsPath/locationManage/list/store/index.vue'); // 位置管理-列表-门店
const Detail = () => import('viewsPath/locationManage/detail/index.vue'); // 位置管理-详情
const SiteDetail = () => import('viewsPath/locationManage/detail/site/index.vue'); // 位置管理-详情-站点
const StoreDetail = () => import('viewsPath/locationManage/detail/store/index.vue'); // 位置管理-详情-门店

const locationManage = [
  {
    // 位置管理
    path: '/locationManage',
    name: '位置管理',
    show: true,
    icon: 'iconweizhiguanli',
    component: Index,
    index: 4,
    redirect: '/locationManage/list',
    meta: {
      activeName: '位置管理',
      openName: '位置管理',
    },
    children: [
      {
        // 位置列表
        path: 'list',
        name: 'locationList',
        component: List,
        redirect: '/locationManage/list/site',
        meta: {
          activeName: '位置管理',
          openName: '位置管理',
        },
        children: [
          {
            // 站点
            path: 'site',
            name: 'siteList',
            component: SiteList,
            meta: {
              activeName: '位置管理',
              openName: '位置管理',
            },
          },
          {
            // 门店
            path: 'store',
            name: 'storeList',
            component: StoreList,
            meta: {
              activeName: '位置管理',
              openName: '位置管理',
            },
          },
        ],
      },
      {
        // 位置添加
        path: 'add',
        name: 'locationAdd',
        component: Detail,
        meta: {
          activeName: '位置管理',
          openName: '位置管理',
        },
        children: [
          {
            // 站点
            path: 'site',
            name: 'siteAdd',
            component: SiteDetail,
            meta: {
              activeName: '位置管理',
              openName: '位置管理',
            },
          },
          {
            // 门店
            path: 'store',
            name: 'storeAdd',
            component: StoreDetail,
            meta: {
              activeName: '位置管理',
              openName: '位置管理',
            },
          },
        ],
      },
      {
        // 位置详情
        path: 'detail',
        name: 'locationDetail',
        component: Detail,
        meta: {
          activeName: '位置管理',
          openName: '位置管理',
        },
        children: [
          {
            // 站点
            path: 'site/:id',
            name: 'siteDetail',
            component: SiteDetail,
            meta: {
              activeName: '位置管理',
              openName: '位置管理',
            },
          },
          {
            // 门店
            path: 'store/:id',
            name: 'storeDetail',
            component: StoreDetail,
            meta: {
              activeName: '位置管理',
              openName: '位置管理',
            },
          },
        ],
      },

    ],
  },
];

export default [...locationManage];
