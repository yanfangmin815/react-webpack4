import React, {Component, PropTypes} from 'react';
import intl from 'react-intl-universal';
import {
    withRouter
}from 'react-router-dom'

class Content extends Component {
    constructor(props) {
        super(props)
    }
    render(){
        const { match, location, history } = this.props
        return(
            <div className='list'>
                <p onClick={() => history.push(`${match.path}/view0`)}>0、{intl.get('react_hash')}</p>
                <p onClick={() => history.push(`${match.path}/view1`)}>1、{intl.get('react_route')}</p>
                <p onClick={() => history.push(`${match.path}/view2`)}>2、{intl.get('route_parameters')}</p>
                <p onClick={() => history.push(`${match.path}/view3`)}>3、{intl.get('route_redirection')}</p>
                <div style={{ position: 'absolute', zIndex: '9999', right: 0, top: 18 }}>
                    <select onChange={this.props.onSelectLocale} defaultValue={this.props.lang}>
                    {this.props.SUPPOER_LOCALES.map(locale => (
                        <option key={locale.value} value={locale.value}>
                        {locale.name}
                        </option>
                    ))}
                    </select>
                </div>
            </div>
        )
    }
}

export default withRouter(Content) // 使用withRouter包裹