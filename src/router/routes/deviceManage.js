const Index = () => import('viewsPath/deviceManage/index.vue'); // 设备管理
const List = () => import('viewsPath/deviceManage/list/index.vue'); // 设备管理
const Detail = () => import('viewsPath/deviceManage/detail/index.vue'); // 设备详情
const BaseInfo = () => import('viewsPath/deviceManage/detail/baseInfo.vue'); // 基本信息
const ServiceHistory = () => import('viewsPath/deviceManage/detail/serviceHistory.vue'); // 服务记录
const MaintainHistory = () => import('viewsPath/deviceManage/detail/maintainHistory.vue'); // 维修记录

const deviceManage = [
  {
    // 设备管理
    path: '/deviceManage',
    name: '设备管理',
    show: true,
    icon: 'iconshebeiguanli',
    redirect: '/deviceManage/list',
    component: Index,
    index: 1,
    meta: {
      activeName: '设备管理',
      openName: '设备管理',
    },
    children: [
      {
        // 设备列表
        path: 'list',
        name: 'deviceList',
        component: List,
        meta: {
          activeName: '设备管理',
          openName: '设备管理',
        },
      },
      {
        // 设备详情
        path: 'detail/:did',
        name: 'deviceDetail',
        component: Detail,
        redirect: 'detail/:did/baseInfo',
        meta: {
          activeName: '设备管理',
          openName: '设备管理',
        },
        children: [
          {
            // 基本信息
            path: 'baseInfo',
            name: 'baseInfo',
            component: BaseInfo,
            meta: {
              activeName: '设备管理',
              openName: '设备管理',
            },
          },
          {
            // 服务记录
            path: 'serviceHistory',
            name: 'serviceHistory',
            component: ServiceHistory,
            meta: {
              activeName: '设备管理',
              openName: '设备管理',
            },
          },
          {
            // 维修记录
            path: 'maintainHistory',
            name: 'maintainHistory',
            component: MaintainHistory,
            meta: {
              activeName: '设备管理',
              openName: '设备管理',
            },
          },
        ],
      },
    ]
  }
];

export default [...deviceManage];
