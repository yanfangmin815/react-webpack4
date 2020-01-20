import Loadable from 'react-loadable'
// 引入路由
import { otherMainRouters } from './other'

const common  = [
    {
        // 登录页
        path:'/mobile.html',
        hash: '',
        component:Loadable({
            loader:() => import('@/page/mobile/list/main/mobile.jsx'),
            loading:() => ('')
        }),
        title: 'mobile初始页'
    }
]
const rootRouters = []
rootRouters.push(...common)
rootRouters.push(...otherMainRouters)
export {
    rootRouters
}
