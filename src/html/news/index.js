import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import {Provider} from 'react-redux'
// 由于 antd 组件的默认文案是英文，所以需要修改为中文
// import zhCN from 'antd/es/locale/zh_CN';

// 项目启动 初始化域名为axios对象
import domains from '@/assets/invoker/invoker'
import '@/style/public.css'
import store from '@/redux/store'

// 绑定在React全局
React.$domains = domains
console.log('React', React)

ReactDOM.render(
    (
        <Provider store={store}>
            <App/>
        </Provider>
    ),
    document.getElementById('root')
);

