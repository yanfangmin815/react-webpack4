import Loadable from 'react-loadable'
import loadable from '@/assets/utils/loadable'

/**
 * 测试主路由
 * @param
 * @returns {*}
 */
const otherMainRouters = [
    {
        // mobile-其他页面-1
        path:'/mobile.html',
        hash: '#/other-page',
        component:Loadable({
            loader:() => import('@/page/mobile/pages/main/page1.jsx'),
            loading:() => ('')
        }),
        title: 'mobile-其他页面'
    },
    {
        // 404 匹配
        path:`/no-found`,
        hash : '',
        component:loadable('no-found')
    },
];
export {
    otherMainRouters
}
