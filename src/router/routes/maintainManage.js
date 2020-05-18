const Index = () => import('viewsPath/maintainManage/index.vue'); // 维护管理
const List = () => import('viewsPath/maintainManage/list/index.vue'); // 设备管理
const Detail = () => import('viewsPath/maintainManage/detail/index.vue'); // 设备详情


const maintainManage = [
  {
    // 维护管理
    path: '/maintainManage',
    name: '维护管理',
    show: true,
    icon: 'iconweihuguanli',
    component: Index,
    redirect: '/maintainManage/maintainList',
    index: 3,
    meta: {
      activeName: '维护管理',
      openName: '维护管理',
    },
    children: [
      {
        // 维护列表
        path: 'maintainList',
        name: 'maintainList',
        component: List,
        meta: {
          activeName: '维护管理',
          openName: '维护管理',
        },
      },
      {
        // 维护详情
        path: 'maintainDetail/:id',
        name: 'maintainDetail',
        component: Detail,
        meta: {
          activeName: '维护管理',
          openName: '维护管理',
        },
      }
    ],
  }
];

export default [...maintainManage];
