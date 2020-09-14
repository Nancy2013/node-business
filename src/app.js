/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-12 11:27:59
 * @LastEditTime: 2020-09-14 14:32:52
 * @LastEditors: Please set LastEditors
 */
/**
 *  @module app
 *  @requires vue
 *  @requires vuex-router-sync
 *  @requires store/index
 *  @requires router/index
 */
import 'stylesPath/css';
import 'babel-polyfill';
import Vue from 'vue';
import { sync } from 'vuex-router-sync';
import { router, whiteList } from 'routerPath/index';
import I18n from 'vue-i18n';
import store from 'storePath/index';
import App from 'viewsPath/App.vue';
import 'commonPath/polyfill';
import { isHasPermission } from 'commonPath/utils';
import Message from 'ant-design-vue/lib/message';
import EN from './locale/en_US';
import libs from './libs';
import plugins from './plugins';


libs(Vue);
plugins(Vue);
Vue.use(I18n);

const i18n = new I18n({
  locale: EN.locale,
  messages: { [EN.locale]: EN },
});

/* 计算屏幕高度 */
window.addEventListener('resize', () => {
  store.commit('app/updateWindowSize', window);
});

// 标志首次进入界面
let initRoute;

/**
 *判断是否有路由权限
 *
 * @param {*} path 目标路由
 * @returns
 */
async function isPermissionValid(path) {
  // 角色权限
  const { urlSite } = store.state.app;
  if (!urlSite) {
    await Promise.all([store.dispatch('app/getRoleUrl'), store.dispatch('app/getUrlsite')]);
  }
  const userPermission = store.getters['app/userPermission'];
   // 角色权限控制
  if (!isHasPermission(userPermission, path)) {
     Message.error('请联系管理员添加权限！');
     return false;
  }
  return true;
}

/**
 *初始化可以进入的首个路由
 *
 * @param {*} next  路由跳转钩子
 * @returns
 */
async function initPermissionRoute(next) {
  const asyncRoutes = store.getters['app/addRouters'];
  const { children } = asyncRoutes[0].children[0];
  for (let i = 0; i < children.length; i += 1) {
    const perssion = await isPermissionValid(children[i].path);
    if (perssion) {
      initRoute = children[i].path;
      next(initRoute);
      return;
    }
  }
}

/**
 *动态加载路由
 *
 * @param {*} to 目标路由
 * @param {*} from 当前路由
 * @param {*} next 进入下个路由钩子
 */
async function dynamicRoutes(to, from, next) {
  await store.dispatch('app/getInfoProject');
  const asyncRoutes = store.getters['app/addRouters'];
  router.addRoutes(asyncRoutes);
  const childrenRoutes = asyncRoutes[0].children[0];
  const { redirect } = childrenRoutes;
  // 界面刷新
  if (!from.name) {
    if (to.path === '/none') {
      if (redirect === '/none') {
        Message.error('请联系管理员添加模块！');
      } else {
        initPermissionRoute(next);
      }
    }
  }
}

// router.beforeEach((to, from, next) => {
//   const { projectInfo } = store.state.app;
//   const auth = JSON.parse(localStorage[`authB_${projectInfo.id}`] || '{}');
//   if (to.name !== 'login') {
//     if (!auth.token) {
//       next('/login');
//     }
//     // 项目模块显示
//     const { isUpdate } = projectInfo;
//     if (!isUpdate) {
//       // 动态加载路由
//       dynamicRoutes(to, from, next);
//     }
//     console.log('from: ', from, 'to: ', to);
//     if (whiteList.includes(to.path)) {
//       next();
//     } else {
//       // 从登录进入,循环进入任意模块
//       if (!initRoute) {
//         if (from.path === '/login' || from.path === '/home') {
//           initPermissionRoute(next);
//         }
//       }
//       initRoute = '';
//       // 权限判断
//       isPermissionValid(to.path).then(result => {
//         const perssion = result;
//         if (perssion) {
//           if (!isUpdate) {
//             next(to.path);
//           } else {
//             // 防止进入死循环
//             next();
//           }
//         } else {
//           next(false);
//         }
//       });
//     }
//   } else {
//     next();
//   }
// });


// 使用vuex管理 router状态
// 会在store上注册 `store.state.route`
sync(store, router);

const app=new Vue({
  i18n,
  store,
  router,
  ...App,
}).$mount('#app');

export default app;
