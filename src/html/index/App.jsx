import React, {Component, PropTypes} from 'react'
import {hot} from 'react-hot-loader'
import {connect} from 'react-redux'
import { run, useConcent } from 'concent'
import intl from 'react-intl-universal'
import enUS from '@/locales/en-US.json'
import zhCN from '@/locales/zh-CN.json'
import clCN from '@/locales/cl-CN.json'
// import "mayfly-design/lib/sass/normal.scss";

import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Link,
  Switch,
  withRouter,
} from 'react-router-dom'
import { rootRouters } from '@/router/index/router'
import { RouterGuard } from '@/component/index'
let routerList = []
const locales = {
  'en-US': enUS,
  'zh-CN': zhCN,
  'cl-CN': clCN
};


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      initDone: false,
      lang: localStorage.getItem('lang_type') || 'zh-CN' 
    }
    //定义状态构造函数，传递给useConcent
    const iState = () => ({
        products:[],
        type: "",
        sex: "",
        addr: "",
        keyword: "",
        tag: "" ,
        title: ''});
    run({
        product:{
            //这里复用刚才的状态生成函数
            state: iState(),
        }
    })
  }

  componentDidMount () {
    // routerList = []
    this.loadLocales();
  }
 
  // 国际化
  loadLocales() {
    intl
      .init({
        // init method will load CLDR locale data according to currentLocale
        // react-intl-universal is singleton, so you should init it only once in your app
        currentLocale: this.state.lang, // TODO: determine locale here
        locales
      })
      .then(() => {
        // After loading CLDR locale data, start to render
        // this.setState({ initDone: true });
      });
  }

  // 处理所有路由
  handleConfig = (routers) => {
    routers.map((item, index) => {
      let routerMap = {}
      routerMap.path = item.path
      routerMap.component = item.component
      routerMap.title = item.title
      routerList.push(routerMap)
      if (item.children) {
        item.children.forEach((subItem, subIndex) => {
          let subRouterMap = {}
          let subRouterList = []
          subRouterMap.path = item.path + subItem.path
          subRouterMap.component = subItem.component
          subRouterMap.title = subItem.title
          if (subItem.children) {
            subRouterMap.children = subItem.children
          }
          subRouterList.push(subRouterMap)
          // 递归子路由
          this.handleConfig(subRouterList)
        })
      }
    }) 
    return routerList
  }

  render() {
    // 处理所有路由
    let routers = this.handleConfig(rootRouters)
    return (
      <div className="App">
        <Router>
          <Switch>
              {
                  <RouterGuard config={routers}/>
              }
          </Switch>
        </Router>
      </div>
    );
  }
}

const hotApp = hot(module)(App);
export default connect(
    state => ({
      operateAuth: state.operateAuth
    })
)(hotApp)
