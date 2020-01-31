// 多环境配置
const config = {
  test: {
    "baseUrl": "//localhost:3001/",
    "uisUrl": "//mtest.picclife.cn/uis/"
  },
  development: {
    "baseUrl": "//localhost:3001/",
    "uisUrl": "//mdev.picclife.cn/uis/"
  },
  integrate: {
    "baseUrl": "//localhost:3001/",
    "uisUrl": "//mintegrate.picclife.cn/uis/"
  },
  production: {
    "baseUrl": "//localhost:3001/",
    "uisUrl": "//m.picclife.cn/uis/"
  }
}

const environmentMap = {
  development: 'development',
  test: 'test',
  integrate: 'integrate',
  production: 'production'
}

// 环境切换
function environmentSwitch (NODE_ENV = 'development') {
  return environmentMap[NODE_ENV]
}

export { config, environmentSwitch }