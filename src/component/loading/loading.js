import React from 'react'
import PropTypes from 'prop-types'
import './loading.css'
import loadingImg from '@/image/loading-bars.svg'

const Loading = props => (
    <div className="loading-panel">
        {props.show ? <img className="loading" src={loadingImg} alt=""/> : ''}
    </div>
)

Loading.propTypes = {
    show: PropTypes.bool.isRequired,
}

export default Loading
