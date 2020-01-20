import React from 'react'
import {connect} from 'react-redux'
import {
    BrowserRouter as Router,
    Route,
    Link,
    Switch,
    Redirect
}from 'react-router-dom'

import {SubHeader} from '@/component/index'
import {getMovie} from '@/redux/index/other/actions'

const Page0 = () => {
    return(
        <div>page-0</div>
    )
}

const Page1 = () => {
    return(
        <div>page-1</div>
    )
}

const NoPath = ({location,match,history}) => {
    return (
        <div>404 你不懂！{location.pathname}</div>
    )
}

class NoMatch extends React.Component {
    constructor(porpos) {
        super(porpos);
    }

    componentWillMount() {
        console.log(this.props, 'props')
        const {getMovie, match} = this.props;
        getMovie(match.params.id);
    }

    render() {
        const {history} = this.props;
        return(
            <Router>
                <div>
                    <SubHeader title='路由匹配404 处理'/>
                    <br/>
                    <button onClick={() => history.push('/other-page')}>跳转</button>
                    <ul>
                        <li><Link to='/page0' replace>page0</Link></li>
                        <li><Link to='/page1' replace>page1</Link></li>
                        <li><Link to='/page2' replace>page 404</Link></li>
                    </ul>

                    <Switch>
                        <Route exact path='/page0' component={Page0}/>
                        <Route path='/page1' component={Page1}/>
                        <Route path='/page2' component={NoPath}/>
                    </Switch>
                </div>
            </Router>
        )
    }
}


export default connect(
    state => ({
        movie: state.movie,
        loading: state.loading
    }),
    {getMovie}
)(NoMatch)
