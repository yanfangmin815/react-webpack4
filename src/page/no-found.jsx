import React from 'react'
import {
    BrowserRouter as Router, Route, Link
}from 'react-router-dom'
import './css/no-found.css'

class notMatch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            noPage:require('@/image/404.jpg'),
        }
    }
    render() {
        return(
            <div className='img-div'>
                <img src={this.state.noPage} alt="" className='no-found-img'/>
            </div>
        )
    }
}

export default notMatch;
