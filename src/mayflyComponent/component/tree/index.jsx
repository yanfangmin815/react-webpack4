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
                <div>
                    <div>
                        <input type="checkbox"/>
                        <span className="ml8">parent-0</span>
                    </div>
                    <div className="ml10">
                        <input type="checkbox"/>
                        <span className="ml8">child-0</span>
                        <div>
                            <input type="checkbox"/>
                            <span className="ml8">child-0</span>
                        </div>
                    </div>
                    <div className="ml20">
                        <input type="checkbox"/>
                        <span className="ml8">grand-child-0</span>
                        <div>
                            <input type="checkbox"/>
                            <span className="ml8">child-0</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
