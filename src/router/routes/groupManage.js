const Index = () => import('viewsPath/groupManage/index.vue'); // 分组管理
const List = () => import('viewsPath/groupManage/list/index.vue'); // 分组管理


const groupManage = [
  {
    // 分组管理
    path: '/groupManage',
    name: '分组管理',
    show: true,
    icon: 'iconfenzuguanli',
    component: Index,
    index: 2,
    redirect: '/groupManage/list',
    meta: {
      activeName: '分组管理',
      openName: '分组管理',
    },
    children: [
      {
        // 分组列表
        path: 'list',
        name: 'groupList',
        component: List,
        meta: {
          activeName: '分组管理',
          openName: '分组管理',
        },
      },
    ],
  }
];

export default [...groupManage];
