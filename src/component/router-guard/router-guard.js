import * as React from 'react';
import { Route,Redirect } from 'react-router-dom';

class RouterGuard extends React.Component{

    componentDidMount() {
        console.log('router guard coming into...')
    }

    render(){
        const { location, config } = this.props;
        const { pathname } = location;
        const targetRouterConfig = config.find((v) => v.path === pathname);
        // console.log(config, 'coming into main')
        if(targetRouterConfig){
            // 全局路由守卫
            document.title = targetRouterConfig.title || '默认title';
            return <Route exact={true} path={pathname} component={targetRouterConfig.component}/>
        } else {
            document.title = '404页面';
            return <Redirect to='/no-found' />
        }
    }}

export default  RouterGuard;
