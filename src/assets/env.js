// 多环境配置
const config = {
  test: {
    "baseUrl": "//localhost:3001/",
    "uisUrl": "//mtest.abc"
  },
  development: {
    "baseUrl": "//localhost:3001/",
    "uisUrl": "//mdev.abc"
  },
  integrate: {
    "baseUrl": "//localhost:3001/",
    "uisUrl": "//mintegrate.abc"
  },
  production: {
    "baseUrl": "//localhost:3001/",
    "uisUrl": "//m.abc"
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