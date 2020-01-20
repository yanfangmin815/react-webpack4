import React from 'react'
import './commutation.css'

class Commutation extends React.Component {

    commus = () => {
        const { changeProps } = this.props;
        changeProps('test-val');
    }

    render() {
        return(
            <div className='subFooter' onClick={this.commus}>
                subFooter
            </div>
        )
    }
}

export default Commutation;
