/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-22 16:37:47
 * @LastEditTime: 2019-09-12 10:39:55
 * @LastEditors: Please set LastEditors
 */
const Index = () => import('viewsPath/timeLinkage/index.vue'); // 定时联动
const List = () => import('viewsPath/timeLinkage/list/index.vue'); // 定时联动-列表
const Detail = () => import('viewsPath/timeLinkage/detail/index.vue'); // 定时联动-详情
const TimingList = () => import('viewsPath/timeLinkage/list/timing/index.vue'); // 定时-列表
const TimingDetail = () => import('viewsPath/timeLinkage/detail/timing/index.vue'); // 定时-详情
const SceneList = () => import('viewsPath/timeLinkage/list/scene/index.vue'); // 场景-列表
const SceneDetail = () => import('viewsPath/timeLinkage/detail/scene/index.vue'); // 场景-详情
const LinkageList = () => import('viewsPath/timeLinkage/list/linkage/index.vue'); // 场景-列表
const LinkageDetail = () => import('viewsPath/timeLinkage/detail/linkage/index.vue'); // 场景-详情

const timeLinkage = [
  {
    // 定时联动
    path: '/timeLinkage',
    name: '定时联动',
    show: true,
    icon: 'icontime-circle',
    component: Index,
    index: 8,
    redirect: '/timeLinkage/list',
    meta: {
      activeName: '定时联动',
      openName: '定时联动',
    },
    children: [
      {
        // 定时联动-列表
        path: 'list',
        name: 'timeLinkageList',
        component: List,
        redirect: '/timeLinkage/list/timing',
        meta: {
          activeName: '定时联动',
          openName: '定时联动',
        },
        children: [
          {
            // 定时-列表
            path: 'timing',
            name: 'timingList',
            component: TimingList,
            meta: {
              activeName: '定时联动',
              openName: '定时联动',
            },
          },
          {
            // 场景-列表
            path: 'scene',
            name: 'sceneList',
            component: SceneList,
            meta: {
              activeName: '定时联动',
              openName: '定时联动',
            },
          },
          {
            // 联动-列表
            path: 'linkage',
            name: 'linkageList',
            component: LinkageList,
            meta: {
              activeName: '定时联动',
              openName: '定时联动',
            },
          },
        ],
      },
      {
        // 定时联动-详情
        path: 'detail',
        name: 'timeLinkageDetail',
        component: Detail,
        redirect: '/timeLinkage/detail/timing',
        meta: {
          activeName: '定时联动',
          openName: '定时联动',
        },
        children: [
          {
            // 定时-详情
            path: 'timing/:id',
            name: 'timingDetail',
            component: TimingDetail,
            meta: {
              activeName: '定时联动',
              openName: '定时联动',
            },
          },
          {
            // 场景-详情
            path: 'scene/:id',
            name: 'sceneDetail',
            component: SceneDetail,
            meta: {
              activeName: '定时联动',
              openName: '定时联动',
            },
          },
          {
            // 联动-详情
            path: 'linkage/:id',
            name: 'linkageDetail',
            component: LinkageDetail,
            meta: {
              activeName: '定时联动',
              openName: '定时联动',
            },
          },
        ],
      },
      {
        // 定时联动-添加
        path: 'add',
        name: 'timeLinkageAdd',
        component: Detail,
        meta: {
          activeName: '定时联动',
          openName: '定时联动',
        },
        children: [
          {
            // 定时-添加
            path: 'timing',
            name: 'timingAdd',
            component: TimingDetail,
            meta: {
              activeName: '定时联动',
              openName: '定时联动',
            },
          },
          {
            // 场景-添加
            path: 'scene',
            name: 'sceneAdd',
            component: SceneDetail,
            meta: {
              activeName: '定时联动',
              openName: '定时联动',
            },
          },
          {
            // 联动-添加
            path: 'linkage',
            name: 'linkageAdd',
            component: LinkageDetail,
            meta: {
              activeName: '定时联动',
              openName: '定时联动',
            },
          },
        ],
      }
    ],
  },
];

export default [...timeLinkage];
