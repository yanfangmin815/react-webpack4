import React, { Component } from 'react';
import { cloneDeep } from 'lodash'
// import TreeNode from '../treeNode';

export default class Tree extends Component {
    constructor(props) {
        super(props);
        this.state = {
            _Tree: this.props.data || [
                {
                    key: 1,
                    title: 'parent-0',
                    checked: true,
                    children: [
                        {
                            key: '1-0',
                            title: 'child-0',
                            checked: true,
                        },
                        {
                            key: '1-1',
                            title: 'child-1',
                            checked: true,
                            children: [
                                {
                                    key: '1-1-0',
                                    title: 'grand-child-0',
                                    checked: false
                                },
                                {
                                    key: '1-1-1',
                                    title: 'grand-child-1',
                                    checked: true
                                },
                                {
                                    key: '1-1-2',
                                    title: 'grand-child-1',
                                    checked: true
                                }
                            ]
                        }
                    ]
                },
                {
                    key: 2,
                    title: 'parent-1',
                    checked: true,
                }
            ],
            newData: []
        };
    }

    componentDidMount() {
        const { _Tree } = this.state
        this.setState({
            newData: []
        }, () => {
            this.handleData(_Tree, 'root', 0)
        })
    }

    componentWillReceiveProps(nextProps) {
        console.log('componentWillReceiveProps')
        const { _Tree } = nextProps
        this.setState({
            newData: []
        }, () => {
            this.handleData(_Tree, 'root', 0)
        })
    }

    handleData = (treeData, parent, depth) => {
        const arr = []
        treeData.forEach((item, index) => {
            const obj = {}
            obj.key = item.key
            obj.title = item.title
            obj.checked = item.checked
            obj.parent = parent
            obj.depth = depth
            arr.push(obj)
            this.setState({
                newData: this.state.newData.concat(arr)
            }, () => {
                if (item.children && item.children.length) {
                    depth++
                    this.handleData(item.children, item.key, depth)
                }
            })
        })
        setTimeout(() => {
            const { newData } = this.state
            const len = newData.length
            for (let i = 0; i < len; i++) {
                const data = newData[i]
                const key = data.key
                const arr = []
                for (let j = 0; j < len; j++) {
                    const data = newData[j]
                    if (key === data.parent) {
                        arr.push(data.key)
                    }
                }
                data.children = arr
            }
            // console.log(newData, '???????????')
        }, 500)
    }

    renderLayout = (newData) => {
        newData.map((item, index) => {
            const className = item.depth ? `ml${item.depth}0` : ''
            console.log(className)
            // value={item.checked} onChange={e => this.changeState(e)}
            return (
                <div className={className} key={index}>
                    <input type="checkbox" />
                    <span className="ml8">{item.title}</span>
                </div>
            )
        })
    }

    render() {
        const { newData } = this.state
        return (
            <div>
                {/* 每个节点 -- start */}
                <div>
                    {this.renderLayout(newData)}
                    {/* <div>
                        <input type="checkbox" />
                        <span className="ml8">parent-0</span>
                    </div>
                    <div className="ml10">
                        <input type="checkbox" />
                        <span className="ml8">child-0</span>
                    </div>
                    <div className="ml10">
                        <input type="checkbox" />
                        <span className="ml8">child-1</span>
                    </div>
                    <div className="ml20">
                        <input type="checkbox" />
                        <span className="ml8">grand-child-0</span>
                    </div>
                    <div className="ml20">
                        <input type="checkbox" />
                        <span className="ml8">grand-child-1</span>
                    </div> */}
                </div>
                {/* 每个节点 -- end */}
            </div>
        );
    }
}
