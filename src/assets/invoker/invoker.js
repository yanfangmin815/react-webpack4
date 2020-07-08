import axios from 'axios'
import { config } from '../env.js'
import intercepter from '../interceptor/interceptor'
// 初始化所有域名为axios对象
let domains = getDomains(config)
// console.log(domains, 'domains')

function getDomains(conf) {
    let result = {};
    let domains = conf || null
    let num = 0
    if (domains !== null) {
        for (let key in domains) {
            result[key] = {}
            for (let subKey in domains[key]) {
                let keys = subKey.trim()
                if (keys !== '') {  // 创建请求的实例
                    result[key][subKey] = axios.create({
                        baseURL: domains[key][subKey],
                        timeout: 10000, // 请求超时时间
                        withCredentials: true
                    })
                    // 拦截器
                    intercepter(result[key][subKey])
                    num++
                }
            }
        }
    }
    return (num > 0) ? result : null
}

export default domains
