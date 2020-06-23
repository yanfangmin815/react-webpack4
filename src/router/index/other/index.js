import Loadable from 'react-loadable'
import loadable from '@/assets/utils/loadable'

/**
 * 测试主路由
 * @param
 * @returns {*}
 */
const otherMainRouters = [
    {
        // 其他页面-1
        path: '/other-page',
        component: Loadable({
            loader: () => import('@/page/index/pages/main/page1.jsx'),
            loading: () => ('')
        }),
        title: '其他页面'
    },
    {
        // hooks页面
        path: '/other-hooks',
        component: Loadable({
            loader: () => import('@/page/index/pages/sub-main/hooks.jsx'),
            loading: () => ('')
        }),
        title: 'hooks测试页面'
    },
    {
        // hooks页面
        path: '/other-hooks-1',
        component: Loadable({
            loader: () => import('@/page/index/pages/sub-main/hooks-1.jsx'),
            loading: () => ('')
        }),
        title: 'hooks-1测试页面'
    },
    {
        // 多语言测试页面
        path: '/multi-language',
        component: Loadable({
            loader: () => import('@/page/index/list/sub-item/multi-language.jsx'),
            loading: () => ('')
        }),
        title: '多语言测试页面'
    },
    {
        // 多语言测试页面
        path: '/ast-test-1',
        component: Loadable({
            loader: () => import('@/page/index/pages/sub-main/ast-test-1.jsx'),
            loading: () => ('')
        }),
        title: 'ast-test-1'
    }
];

/**
 * 测试嵌套路由
 * @param
 * @returns {*}
 */
const otherSubRouters = [
    {
        /* // React hash 模式路由实现的手段
        path:'/other-page',
        component:loadable('/pages/main/page1') */
    }
];

export {
    otherMainRouters,
    otherSubRouters
}
