import React from 'react'
import './subHeader.css'

class SubHeader extends React.Component {

    render() {
        const { title } = this.props
        return(
            <div className='subHeader'>
                {title}
            </div>
        )
    }
}

export default SubHeader;
