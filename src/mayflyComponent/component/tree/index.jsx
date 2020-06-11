import React, { Component } from 'react';
// import TreeNode from '../treeNode';

export default class Tree extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // _Tree: this.props.data || {}
        };
    }

    componentWillReceiveProps(nextProps) {

    }


    render() {
        return (
            <div>
                {/* <TreeNode data={this.props.data} onClick={(node) => this.handleClickNode(node)} open={this.props.open || false} item={(item) => this.props.item && this.props.item(item)} /> */}
            </div>
        );
    }
}
