// 多环境配置
const config = {
  test: {
    "baseUrl": "//localhost:3001/",
    "uisUrl": "//"
  },
  development: {
    "baseUrl": "//localhost:3001/",
    "uisUrl": "//"
  },
  integrate: {
    "baseUrl": "//localhost:3001/",
    "uisUrl": "//"
  },
  production: {
    "baseUrl": "//localhost:3001/",
    "uisUrl": "//"
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
