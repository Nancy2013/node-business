const Index = () => import('viewsPath/userManage/index.vue'); // 人员管理
const UserList = () => import('viewsPath/userManage/userList.vue'); // 普通人员
const InstallerList = () => import('viewsPath/userManage/installerList.vue'); // 安装工
const RoleList = () => import('viewsPath/userManage/roleList.vue'); // 角色列表

const userManage = [
  {
    // 人员管理
    path: '/userManage',
    name: '人员管理',
    show: true,
    icon: 'iconrenyuanguanli',
    component: Index,
    redirect: '/userManage/userList',
    index: 7,
    meta: {
      activeName: '人员管理',
      openName: '人员管理',
    },
    children: [
      {
        // 普通人员
        path: 'userList',
        name: 'userList',
        show: false,
        icon: '',
        component: UserList,
        index: 1,
        meta: {
          activeName: '人员管理',
          openName: '人员管理',
        }
      },
      {
        // 安装工
        path: 'installerList',
        name: 'installerList',
        show: false,
        icon: '',
        component: InstallerList,
        index: 1,
        meta: {
          activeName: '人员管理',
          openName: '人员管理',
        }
      },
      {
        // 角色列表
        path: 'roleList',
        name: 'roleList',
        show: false,
        icon: '',
        component: RoleList,
        index: 1,
        meta: {
          activeName: '人员管理',
          openName: '人员管理',
        }
      }
    ],
  }
];

export default [...userManage];
