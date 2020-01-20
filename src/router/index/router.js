import Loadable from 'react-loadable'
// 引入路由
import { listMainRouters } from './list'
import { otherMainRouters } from './other'

const common  = [
    {
        // 登录页
        path:'/login',
        component:Loadable({
            loader:() => import('@/page/login.jsx'),
            loading:() => ('')
        }),
        title: '登录'
    }
]

const rootRouters = []
rootRouters.push(...common)
rootRouters.push(...listMainRouters)
rootRouters.push(...otherMainRouters)

export {
    rootRouters
}
