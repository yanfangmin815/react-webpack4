import Loadable from 'react-loadable'
// 引入路由
import { otherMainRouters } from './other'

const common  = [
    {
        // 登录页
        path:'/news.html',
        hash: '',
        component:Loadable({
            loader:() => import('@/page/news/list/main/news.jsx'),
            loading:() => ('')
        }),
        title: 'news初始页'
    }
]
const rootRouters = []
rootRouters.push(...common)
rootRouters.push(...otherMainRouters)
export {
    rootRouters
}
