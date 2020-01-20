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
    // console.log(1 << 2)
    // let toggle = true
    // console.log(toggle ^= 100)
  }

  handleConfig = (routers) => {
      // let
      console.log(routers, 'router')
      
  }

  render() {
    this.handleConfig(rootRouters)
    return (
      <div className="App">
        <Router>
          <Switch>
              {
                  <RouterGuard config={rootRouters}/>
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
