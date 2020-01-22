import React, {Component, PropTypes} from 'react';
import {hot} from 'react-hot-loader'
import {connect} from 'react-redux'
import { run, useConcent } from 'concent';

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

/*//平台、设备和操作系统 ，返回ture或false,true表示是移动端，false表示不是移动端
function ismobile() {
    var mobileArry = ["iPhone", "iPad", "Android", "Windows Phone", "BB10; Touch", "BB10; Touch", "PlayBook", "Nokia"];
    var ua = navigator.userAgent;
    var res = mobileArry.filter(function (arr) {
        return ua.indexOf(arr) > 0;
    });
    return res.length > 0;
}*/

class App extends React.Component {
  constructor(props) {
    super(props);
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
              state: iState()
          }
      })
  }

  componentDidMount () {
    // routerList = []
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
          // 递归处理子路由
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
