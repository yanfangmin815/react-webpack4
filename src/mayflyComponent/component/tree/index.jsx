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
                                    title: 'grand-child-2',
                                    checked: true
                                },
                                {
                                    key: '1-1-3',
                                    title: 'grand-child-3',
                                    checked: false
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
        }, 500)
    }

    renderLayout = (newData) => {
        console.log(newData, '???????????')
        return newData.map((item, index) => {
            const className = item.depth ? `ml${item.depth}0` : ''
            const key = item.key
            return (
                <div className={className} key={index}>
                    <input type="checkbox" checked={item.checked}
                        onChange={e => this.changeState(e, item)}/>
                    <span className="ml8">{item.title}</span>
                </div>
            )
        })
    }

    changeState = (e, monomer) => {
        const checked = e.target.checked
        const { newData } = this.state
        newData.some((item, index) => {
            if (item.key === monomer.key) {
                const newItem = cloneDeep(item)
                newItem.checked = checked
                newData.splice(index, 1, newItem)
                this.setState({
                    newData: newData
                }, () => {
                    this.handleCheckedState(monomer)
                })
                return true
            }
        })
    }

    handleCheckedState = (monomer) => {
        // 判断同级选择状态
        const { newData } = this.state
        const brotherNode = []
        newData.map((item, index) => {
            if (item.parent === monomer.parent) {
                brotherNode.push(item.checked)
            }
        })
        const checkedState = this.getCheckedState(brotherNode)
        console.log(brotherNode, checkedState, 'brotherNode')
        this.handleCheckedStateChildren(checkedState, monomer)
        this.handleCheckedStateParents(checkedState)
    }

    getCheckedState = (brotherNode) => {
        let len = brotherNode.length
        let num = 0
        brotherNode.forEach((item, index) => {
            item && num++
        })
        return num === len
    }

    handleCheckedStateChildren = (checked, monomer) => {
        const { newData } = this.state
        const that = this
        if (monomer.children.length) {
            const newDataDeep = cloneDeep(newData)
            // console.log(monomer.children, newDataDeep, '>>>>>?????<<<<<<')
            monomer.children.forEach((item, index) => {
                for (let i = 0; i < newDataDeep.length; i++) {
                    const targetItem = newDataDeep[i]
                    if (targetItem.key === item) {
                        targetItem.checked = checked
                        break
                    }
                }
            })
            this.setState({
                newData: newDataDeep
            }, () => {
                monomer.children.forEach((item, index) => {
                    for (let i = 0; i < newDataDeep.length; i++) {
                        const targetItem = newDataDeep[i]
                        if (targetItem.key === item && targetItem.children.length) {
                            that.handleCheckedStateChildren(checked, newDataDeep[item])
                            break
                        }
                    }
                })
            })
        }
    }

    handleCheckedStateParents = (checkedState) => {

    }

    render() {
        const { newData } = this.state
        return (
            <div>
                {/* 每个节点 -- start */}
                <div>
                    {this.renderLayout(newData)}
                </div>
                {/* 每个节点 -- end */}
            </div>
        );
    }
}
