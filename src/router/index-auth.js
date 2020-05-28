/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-06-22 11:51:43
 * @LastEditTime: 2019-10-30 10:41:48
 * @LastEditors: Please set LastEditors
 */
import Vue from 'vue';
import Router from 'vue-router';
import Main from 'viewsPath/common/Main.vue';

const login = () => import('viewsPath/login/index.vue'); // 登录
const accountSet = () => import('viewsPath/login/accountSet.vue'); // 账号设置
const projectSet = () => import('viewsPath/login/projectSet.vue'); // 项目设置

const context = require.context('./routes', false, /^\.\/(?!index)[^/]*\.js$/);

const childrenRoutes = context.keys().reduce((rs, key) => {
  rs.push(...context(key).default);
  return rs;
}, []);

Vue.use(Router);

 // 路由白名单
 export const whiteList = ['/', '/login', '/accountSet', '/home', '/none', '/projectSet'];

export const defaultRoutes = [
  {
    path: '/login',
    name: 'login',
    show: false,
    component: login,
  },
  {
    path: '/accountSet',
    name: 'accountSet',
    show: false,
    component: accountSet,
  },
  {
    path: '/projectSet',
    name: 'projectSet',
    show: false,
    component: projectSet,
  },
];
export const router = new Router({
  routes: defaultRoutes,
});

export const asyncRoutes = [
  {
    path: '/',
    component: Main,
    name: 'main',
    redirect: '/login',
    children: [
      {
        path: '/home',
        name: 'home',
        show: false,
        component: () => import('viewsPath/home/index.vue'),
        redirect: '/deviceManage',
        children: childrenRoutes,
      },
    ],
  },
  {
    path: '*',
    show: false,
    component: () => import('viewsPath/Error404/index.vue'),
  },
];
