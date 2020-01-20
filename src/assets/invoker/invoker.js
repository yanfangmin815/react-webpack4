import axios from 'axios'
import env from '../env.json'
import intercepter from '../interceptor/interceptor'

// 初始化所有配置host为axios对象
let domains = getDomains(env.envUrl)
function getDomains(conf) {
    let result = {};
    let domains = conf || null
    let num = 0
    if (domains !== null) {
        for (let key in domains) {
            key = key.trim()
            if (key !== '') {  // 创建请求的实例
                result[key] = axios.create({
                    baseURL:domains[key],
                    timeout:10000, // 请求超时时间
                    withCredentials:true
                })
                // 为域名添加拦截器
                intercepter(result[key])
                num ++
            }
        }
    }
    return (num > 0) ? result : null
}

export default domains
