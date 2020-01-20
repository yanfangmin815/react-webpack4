import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux'
import {hot} from 'react-hot-loader'
import {getMovie} from '@/redux/index/other/actions'
import { Loading } from '@/component/index'

class Match1 extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        console.log(this.props, 'props');
        const {getMovie} = this.props;
        getMovie(100);
    }

    render() {
        const {loading} = this.props;
        return(
            <div>
                <p>this is the test-page and other page!!</p>
                <Loading show={loading}/>
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
    {getMovie}
)(Matches)
