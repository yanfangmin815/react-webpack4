import axios from 'axios'
import env from '../env.json'
import intercepter from '../interceptor/interceptor'

// 初始化所有配置host为axios对象
let domains = getDomains(env)
function getDomains(conf) {
    let result = {};
    let domains = conf || null
    let num = 0
    if (domains !== null) {
        for (let key in domains) {
            for(let subKey in domains[key]) {
                let keys = subKey.trim()
                if (keys !== '') {  // 创建请求的实例
                    result[keys] = axios.create({
                        baseURL:domains[key][subKey],
                        timeout:10000, // 请求超时时间
                        withCredentials:true
                    })
                    // 为域名添加拦截器
                    intercepter(result[keys])
                    num ++
                }
            }
        }
    }
    return (num > 0) ? result : null
}

export default domains
