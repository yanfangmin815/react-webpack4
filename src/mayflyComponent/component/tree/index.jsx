import React, { Component } from 'react';
import { cloneDeep } from 'lodash'

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
                                    checked: true
                                },
                                {
                                    key: '1-1-1',
                                    title: 'grand-child-1',
                                    checked: true
                                },
                                {
                                    key: '1-1-2',
                                    title: 'grand-child-2',
                                    checked: true,
                                    children: [
                                        {
                                            key: '1-1-2-0',
                                            title: 'grand-grand-child-0',
                                            checked: true
                                        }
                                    ]
                                },
                                {
                                    key: '1-1-3',
                                    title: 'grand-child-3',
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
        // console.log('componentWillReceiveProps')
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
            obj.state = ''
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
            this.setState({
                newData
            }, () => {
                // 渲染时 处理父级节点选择状态 一级一级向上回溯
                const newDepth = depth
                this.renderInitial(newDepth)
            })
        }, 500)
    }

    renderInitial = (depth) => {
        const { newData } = this.state
        newData.some((item, index) => {
            if (item.depth === depth && item.children.length) {
                const newArr = []
                item.children.some((mome, key) => {
                    newData.some((data, subIndex) => {
                        if (data.key === mome) {
                            newArr.push(data.checked)
                            return true
                        }
                    })
                })
                // 获取同级别选择状态数组
                const checkedState = this.getCheckedState(newArr)
                item.state = checkedState
                item.checked = checkedState === 'all' ? true : false
                // console.log(newArr, '<<<<<<<<<<<<>>>>>>>>>>>>>>>>>')
            }
        })
        this.setState({
            newData
        }, () => {
            if (depth === 0) return
            depth--
            this.renderInitial(depth)
            // console.log(this.state.newData, '11111111111111111111111')
        })
    }

    renderLayout = (newData) => {
        console.log(newData, 'newData-newData')
        return newData.map((item, index) => {
            const className = item.depth ? `ml${item.depth}0` : ''
            const key = item.key
            return (
                <div className={className} key={index}>
                    {item.state === 'semi' ? <span>semi</span> : null}
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
                newItem.state = checked ? 'all' : 'none'
                newData.splice(index, 1, newItem)
                this.setState({
                    newData: newData
                }, () => {
                    this.handleCheckedState(monomer, checked)
                })
                return true
            }
        })
    }

    handleCheckedState = (monomer, checked) => {
        // 判断同级选择状态
        const { newData } = this.state
        const brotherNode = []
        newData.map((item, index) => {
            if (item.parent === monomer.parent) {
                brotherNode.push(item.checked)
            }
        })
        new Promise((resolve, reject) => {
            this.handleCheckedStateChildren(monomer, checked)
            resolve()
        }).then(() => {
            this.handleCheckedStateParents(brotherNode, monomer)
        })
    }

    getCheckedState = (brotherNode) => {
        let len = brotherNode.length
        let num = 0
        brotherNode.forEach((item, index) => {
            item && num++
        })
        if (num === 0) return 'none'
        if (num !== 0 && num < len) return 'semi'
        if (num === len) return 'all'
    }

    handleCheckedStateParents = (brotherNode, monomer) => {
        // 同级选择状态
        console.log(brotherNode, monomer, '改变父节点选择状态')
        const { newData } = this.state
        const checkedState = this.getCheckedState(brotherNode)
        const parent = monomer.parent
        const newDataDeep = cloneDeep(newData)
        let newItem
        // 判断父级选择状态
        newDataDeep.some((item, index) => {
            if (item.key === parent) {
                item.state = checkedState
                item.checked = checkedState === 'all' ? true : false
                newItem = item
                newDataDeep.splice(index, 1, item)
                return true
            }
        })
        this.setState({
            newData: newDataDeep
        }, () => {
            if (parent === 'root') return
            // 获取父级同级Node monomer
            const { newData } = this.state
            const brotherNode = []
            newData.map((item, index) => {
                if (item.parent === newItem.parent) {
                    brotherNode.push(item.checked)
                }
            })
            this.handleCheckedStateParents(brotherNode, newItem)
        })
    }

    handleCheckedStateChildren = (monomer, checked) => {
        const { newData } = this.state
        const that = this
        if (monomer.children.length) {
            const newDataDeep = cloneDeep(newData)
            monomer.children.forEach((item, index) => {
                for (let i = 0; i < newDataDeep.length; i++) {
                    const targetItem = newDataDeep[i]
                    if (targetItem.key === item) {
                        targetItem.checked = checked
                        targetItem.state = checked ? 'all' : 'none'
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
                            that.handleCheckedStateChildren(targetItem, checked)
                            break
                        }
                    }
                })
            })
        }
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
