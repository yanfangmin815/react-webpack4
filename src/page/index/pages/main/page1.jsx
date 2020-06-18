import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux'
import { hot } from 'react-hot-loader'
import { getMovie } from '@/redux/index/other/actions'
import { Loading } from '@/component/index'
import ConcentFnPage from '../sub-main/hooks-1'

class Match1 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: 'hooks title'
        }
    }

    componentWillMount() {
        // console.log(this.props, 'props');
        const { getMovie } = this.props;
        getMovie(100);
    }

    changeData = () => {
        console.log('parent method...')
    }

    render() {
        const { loading } = this.props;
        return (
            <div>
                <p>this is the test-page and other page!!</p>
                <Loading show={loading}/>
                <ConcentFnPage title={this.state.title} changeData={this.changeData}/>
            </div>
        )
    }
}

const Matches = hot(module)(Match1);
export default connect(
    state => ({
        movie: state.movie,
        loading: state.loading
    }),
    { getMovie }
)(Matches)
