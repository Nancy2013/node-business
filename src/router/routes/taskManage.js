const Index = () => import('viewsPath/taskManage/index.vue'); // 任务管理
const List = () => import('viewsPath/taskManage/list/index.vue'); // 任务列表
const Detail = () => import('viewsPath/taskManage/detail/index.vue'); // 任务列表


const taskManage = [
  {
    // 任务管理
    path: '/taskManage',
    name: '任务管理',
    show: true,
    icon: 'iconrenwuguanli',
    component: Index,
    index: 5,
    redirect: '/taskManage/list',
    meta: {
      activeName: '任务管理',
      openName: '任务管理',
    },
    children: [
      {
        // 任务列表
        path: 'list',
        name: 'taskList',
        component: List,
        meta: {
          activeName: '任务管理',
          openName: '任务管理',
        },
      },
      {
        // 任务详情
        path: 'task/:id',
        name: 'taskDetail',
        component: Detail,
        meta: {
          activeName: '任务管理',
          openName: '任务管理',
        },
      },
      {
        // 创建任务
        path: 'add',
        name: 'taskAdd',
        component: Detail,
        meta: {
          activeName: '任务管理',
          openName: '任务管理',
        },
      },
    ],
  }
];

export default [...taskManage];
