import React from 'react'
import Loadable from 'react-loadable'
import {Redirect} from 'react-router-dom'
import loadable from '@/assets/utils/loadable'
const MAINROUTER = '/react-router-example'


/**
 * list主路由
 * @param
 * @returns {*}
 */
const listMainRouters = [
    {
        //根路由匹配
        path:'/',
        exact:true,
        component:() => <Redirect to='/react-router-example'/>,
        title: '首页'
    },
    {
        // 首页
        path: `${MAINROUTER}`,
        component:Loadable({
            loader:() => import('@/page/index/list/main/list.jsx'),
            loading:() => ('')
        }),
        title: '首页'
    },
    {
        // view0
        path:`${MAINROUTER}/view0`,
        component:loadable('index/list/sub-item/view0'),
        title: 'view0'
    },
    {
        // view1
        path:`${MAINROUTER}/view1`,
        component:loadable('index/list/sub-item/view1'),
        children: [
            {
                path: '/home',
                component: loadable('index/list/sub-item/view1')
            },
            {
                path: '/about',
                component: loadable('index/list/sub-item/view1')
            },
            {
                path: '/topics',
                component: loadable('index/list/sub-item/view1')
            }
        ],
        title: 'view1'
    },
    {
        // view2
        path:`/home`,
        component:loadable('index/list/sub-item/view1'),
        title: 'home'
    },
    {
        // view2
        path:`${MAINROUTER}/view2`,
        component:loadable('index/list/sub-item/view2'),
        title: 'view2'
    },
    {
        // view3
        path:`${MAINROUTER}/view3`,
        component:loadable('index/list/sub-item/view3'),
        title: 'view3'
    },
    {
        // view3
        path:`/logout`,
        component:loadable('index/list/sub-item/view3'),
        title: 'view3'
    },
    {
        // view4
        path:`${MAINROUTER}/view4`,
        component:loadable('index/list/sub-item/view4'),
        title: 'view4'
    },
    {
        // 404 匹配
        path:`/no-found`,
        component:loadable('no-found')
    },
];
/**
 *  路由
const listSubRouters = [
    {
        // React hash 模式路由实现的手段
        path:'/view0',
        component:loadable('list/sub-item/view0'),
        title: 'view0'
    },
    {
        // React Route 路由的基本配置 以及 实现路由的模糊匹配（动态路由）
        path:`/view1`,
        component:loadable('list/sub-item/view1'),
        title: 'view1'
    },
    {
        // React 路由参数
        path:`/view2`,
        component:loadable('list/sub-item/view2'),
        title: 'view2'
    },
    {
        // 路由重定向
        path:`/view3`,
        component:loadable('list/sub-item/view3'),
        title: 'view3'
    },
    {
        // 路由匹配404 处理
        path:`/view4`,
        component:loadable('list/sub-item/view4')
    },
    {
        // Router 侧栏 / 页面过渡 /
        path:'/view5',
        component:loadable('list/sub-item/view5')
    },
    {
        // Route Render 渲染的方式，可选component、render、children
        path:'/view6',
        component:loadable('list/sub-item/view6')
    },
    {
        // React Router Api
        path:'/view7',
        component:loadable('list/sub-item/view7')
    },
    {
        // 测试页面匹配
        path:'/view9',
        component:loadable('list/sub-item/test1')
    },
    {
        // 404 匹配
        path:'/',
        component:(null)
    },
];
 */
export {
    listMainRouters
};
