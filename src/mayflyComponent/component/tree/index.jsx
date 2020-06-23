import React, { Component } from 'react';
import { cloneDeep, debounce } from 'lodash'

export default class Tree extends Component {
    constructor(props) {
        super(props);
        this.depthStatistics = 0
        this.initialArr = []
        this.timer = null
        this.tops = ''
        this.bottoms = ''
        this.disY = ''
        this.height = ''
        this.position = ''
        this.item = ''
        this.state = {
            _Tree: this.props.data || [
                {
                    key: '1',
                    title: 'parent-0',
                    checked: true,
                    children: [
                        {
                            key: '1-0',
                            title: '1-child-0',
                            checked: true,
                            children: [
                                {
                                    key: '1-0-0',
                                    title: 'grand-child-0',
                                    checked: true
                                },
                                {
                                    key: '1-0-1',
                                    title: 'grand-child-1',
                                    checked: true
                                },
                                {
                                    key: '1-0-2',
                                    title: 'grand-child-2',
                                    checked: true,
                                    children: [
                                        {
                                            key: '1-0-2-0',
                                            title: 'grand-grand-child-0',
                                            checked: true
                                        },
                                        {
                                            key: '1-0-2-1',
                                            title: 'grand-grand-child-1',
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
                        },
                        {
                            key: '1-1',
                            title: '1-child-1',
                            checked: true
                        }
                    ]
                },
                {
                    key: '2',
                    title: 'parent-1',
                    checked: true,
                    children: [
                        {
                            key: '2-0',
                            title: '2-child-0',
                            checked: true,
                            children: [
                                {
                                    key: '2-0-0',
                                    title: '2-grand-grand-child-0',
                                    checked: true
                                },
                                {
                                    key: '2-0-1',
                                    title: '2-grand-grand-child-1',
                                    checked: true
                                }
                            ]
                        },
                        {
                            key: '2-1',
                            title: '2-child-1',
                            checked: true
                        }
                    ]
                },
                {
                    key: '3',
                    title: 'parent-2',
                    checked: true,
                    children: [
                        {
                            key: '3-0',
                            title: '3-child-0',
                            checked: true
                        },
                        {
                            key: '3-1',
                            title: '3-child-1',
                            checked: true,
                            children: [
                                {
                                    key: '3-1-0',
                                    title: '3-grand-child-0',
                                    checked: true,
                                    children: [
                                        {
                                            key: '3-1-0-0',
                                            title: '3-grand-grand-child-0',
                                            checked: true,

                                        },
                                        {
                                            key: '3-1-0-1',
                                            title: '3-grand-grand-child-1',
                                            checked: true
                                        }
                                    ]
                                },
                                {
                                    key: '3-1-1',
                                    title: '3-grand-child-1',
                                    checked: true
                                }
                            ]
                        }
                    ]
                }
            ],
            newData: []
        };
    }

    componentDidMount() {
        const { _Tree } = this.state
        this.depthStatistics = 0
        this.initialArr = []
        this.timer = null
        this.setState({
            newData: []
        }, () => {
            new Promise((resolve, reject) => {
                let len
                let newLen
                const result = this.handleData(_Tree, 'root', 0)
                const timer = setInterval(() => {
                    len = result && result.length
                    if (len === newLen) {
                        clearInterval(timer)
                        resolve(result)
                    }
                    newLen = len
                }, 100)
            }).then((result) => {
                this.preHandle(result)
            })
        })
    }

    componentWillReceiveProps(nextProps) {
        // console.log('componentWillReceiveProps')
        const { _Tree } = nextProps
        this.depthStatistics = 0
        this.initialArr = []
        this.timer = null
        this.setState({
            newData: []
        }, () => {
            new Promise((resolve, reject) => {
                let len
                let newLen
                const result = this.handleData(_Tree, 'root', 0)
                const timer = setInterval(() => {
                    len = result && result.length
                    if (len === newLen) {
                        clearInterval(timer)
                        resolve(result)
                    }
                    newLen = len
                }, 100)
            }).then((result) => {
                this.preHandle(result)
            })
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
            obj.folded = false  // 是否折叠
            obj.subFolded = false  // 子项是否折叠
            arr.push(obj)

            this.initialArr.push(obj)
            if (item.children && item.children.length) {
                const newObj = cloneDeep(obj)
                newObj.depth += 1
                this.handleData(item.children, item.key, newObj.depth)
            }
        })
        return this.initialArr
    }

    preHandle = (result) => {
        const len = result.length
        for (let i = 0; i < len; i++) {
            const data = result[i]
            const key = data.key
            const arr = []
            for (let j = 0; j < len; j++) {
                const data = result[j]
                if (key === data.parent) {
                    arr.push(data.key)
                }
            }
            data.children = arr
        }
        // 确定父子关系 保证节点顺序
        const arr = []
        const depthArr = result.map((item, index) => {
            if (item.depth === this.depthStatistics) {
                arr.push(item)
            }
            return item.depth
        })
        // 找出最大值
        const maxVal = this.bubbleSort(depthArr)[depthArr.length - 1]
        this.debounce(this.sequenceAdjustment.bind(this, result, arr, maxVal), 800)()
    }

    bubbleSort = (arr) => {
        for (let i = 0, l = arr.length; i < l - 1; i++) {
            for (let j = i + 1; j < l; j++) {
                if (arr[i] > arr[j]) {
                    let tem = arr[i];
                    arr[i] = arr[j];
                    arr[j] = tem;
                }
            }
        }
        return arr
    }

    // 防抖--应用于自调用函数
    debounce = (fn, delay) => {
        return () => {
            if (this.timer) {
                clearTimeout(this.timer)
            }
            this.timer = setTimeout(fn, delay)
        }
    }

    sequenceAdjustment = (newData, arr, maxVal) => {
        this.depthStatistics++
        let newArr = cloneDeep(arr)
        let initItem
        arr.map((item, index) => {
            const con = []
            newData.some((memo, key) => {
                if (Number(memo.depth) === this.depthStatistics && item.key === memo.parent) {
                    initItem = item
                    con.push(memo)
                }
            })
            if (con.length) {
                const indexes = newArr.findIndex((item, index) => item.key === initItem.key)
                newArr = [...newArr.slice(0, indexes + 1), ...con, ...newArr.slice(indexes + 1)]
            }
        })
        // console.log(newArr, 'sequenceAdjustment')
        if (maxVal === this.depthStatistics) {
            // 渲染时 处理父级节点选择状态 逐级递归
            this.renderInitial(maxVal, newArr)
        }
        if (this.depthStatistics <= maxVal - 1) {
            this.sequenceAdjustment(newData, newArr, maxVal)
        }
    }

    handleFold(item) {
        const { children, key, subFolded } = item
        if (!children.length) return
        const { newData } = this.state
        const data = cloneDeep(newData)
        const antiFolded = !subFolded
        // data.some((memo, index) => {
        const index = data.findIndex(memo => memo.key === key && children.length)
        // if (memo.key === key && children.length) {
        data[index].subFolded = !subFolded
        data.splice(index, 1, data[index])
        this.setState({
            newData: data
        }, () => {
            if (children.length) {
                this.subHandleFold(children, data, antiFolded)
            }
        })
        //         return true
        //     }
        // })
    }

    subHandleFold = (children, data, folded) => {
        children.forEach(memo => {
            const subIndex = data.findIndex(subMemo => subMemo.key === memo)
            data[subIndex].folded = folded
            data.splice(subIndex, 1, data[subIndex])
            this.setState({
                newArr: data
            }, () => {
                // 维持枝节点折叠状态
                if (data[subIndex].children.length && !data[subIndex].subFolded) {
                    this.subHandleFold(data[subIndex].children, data, folded)
                }
            })
        })
    }

    renderInitial = (depth, result) => {
        result.some((item, index) => {
            if (item.depth === depth && item.children.length) {
                const newArr = []
                item.children.some((mome, key) => {
                    result.some((data, subIndex) => {
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
            }
        })
        if (depth === 0) {
            this.setState({
                newData: result
            })
            return
        }
        depth--
        this.renderInitial(depth, result)
    }

    mouseDownEvent(e) {
        const top = document.getElementsByClassName(e.target.className.split(' ')[1])[0].offsetTop
        this.disY = e.clientY - top
    }

    dragTarget(e, item) {
        this.height = document.getElementsByClassName(e.target.className.split(' ')[1])[0].offsetHeight
        this.tops = e.clientY - this.disY
        this.bottoms = Number(this.tops) + Number(this.height)
        this.item = item
    }

    droplogic = (deepData, disVal, item, type) => {
        const that = this
        if (this.item.children.length) {
            const index = deepData.findIndex(memo => memo.key === this.item.key)
            let itemIndex = deepData.findIndex(memo => memo.key === item.key)
            // 获取当前被拖拽节点并其子节点
            const arr = []
            for (let i = index; i < deepData.length; i++) {
                const memo = deepData[i]
                if (arr.length && memo.depth === that.item.depth) break
                memo.depth = Number(memo.depth) + disVal
                arr.push(memo)
            }
            // 更新parent
            arr[0].parent = item.parent
            // 向父节点添加此item之key
            const parent = deepData.find(item => item.key === arr[0].parent)
            const key = arr[0].key
            parent && parent.children.push(key)
            // 先删再添
            arr.map((single, key) => {
                const index = deepData.findIndex(item => item.key === single.key)
                deepData.splice(index, 1)
            })
            itemIndex = type === 'up' ? itemIndex : itemIndex + 1
            deepData.splice(itemIndex, 0, ...arr)
        } else {
            const targetIndex = deepData.findIndex((memo) => memo.key === this.item.key)
            this.item.depth = item.depth
            this.item.parent = item.parent
            deepData.splice(targetIndex, 1)
            let targetItemIndex = deepData.findIndex((memo) => memo.key === item.key)
            targetItemIndex = type === 'up' ? targetItemIndex : targetItemIndex + 1
            deepData.splice(targetItemIndex, 0, this.item)
            if (disVal) {
                const parent = deepData.find(item => item.key === this.item.parent)
                const key = this.item.key
                parent && parent.children.push(key)
            }
        }
        this.setState({
            newData: deepData
        })
    }

    dropTarget(e, item) {
        // console.log(this.position, item, this.item, 'dropTarget')
        const position = this.position
        const { newData } = this.state
        const deepData = cloneDeep(newData)
        const that = this
        let disVal = Number(item.depth) - Number(this.item.depth)
        // disVal -> 跨层级拖拽 -> 旧父节点需移除此item对应之key -> 新父节点添加此item之key
        const key = that.item.key
        const parent = deepData.find(item => item.key === that.item.parent)
        const index = parent.children.findIndex(item => item === key)
        parent && parent.children.splice(index, 1)

        if (position === 'up') {
            this.droplogic(deepData, disVal, item, 'up')
            // if (this.item.children.length) {
            //     const index = deepData.findIndex(memo => memo.key === this.item.key)
            //     const itemIndex = deepData.findIndex(memo => memo.key === item.key)
            //     // 获取当前被拖拽节点并其子节点
            //     const arr = []
            //     for (let i = index; i < deepData.length; i++) {
            //         const memo = deepData[i]
            //         if (arr.length && memo.depth === that.item.depth) break
            //         memo.depth = Number(memo.depth) + disVal
            //         arr.push(memo)
            //     }
            //     // 更新parent
            //     arr[0].parent = item.parent
            //     // 向父节点添加此item之key
            //     const parent = deepData.find(item => item.key === arr[0].parent)
            //     const key = arr[0].key
            //     parent && parent.children.push(key)
            //     // 先删再添
            //     arr.map((single, key) => {
            //         const index = deepData.findIndex(item => item.key === single.key)
            //         deepData.splice(index, 1)
            //     })
            //     deepData.splice(itemIndex, 0, ...arr)
            // } else {
            //     const targetIndex = deepData.findIndex((memo) => memo.key === this.item.key)
            //     this.item.depth = item.depth
            //     this.item.parent = item.parent
            //     deepData.splice(targetIndex, 1)
            //     const targetItemIndex = deepData.findIndex((memo) => memo.key === item.key)
            //     deepData.splice(targetItemIndex, 0, this.item)
            //     if (disVal) {
            //         const parent = deepData.find(item => item.key === this.item.parent)
            //         const key = this.item.key
            //         parent && parent.children.push(key)
            //     }
            // }
            // this.setState({
            //     newData: deepData
            // })
        }
        else if (position === 'below') {
            this.droplogic(deepData, disVal, item, 'below')
            // if (this.item.children.length) {
            //     const index = deepData.findIndex(memo => memo.key === this.item.key)
            //     const itemIndex = deepData.findIndex(memo => memo.key === item.key)
            //     // 获取当前被拖拽节点并其子节点
            //     const arr = []
            //     for (let i = index; i < deepData.length; i++) {
            //         const memo = deepData[i]
            //         if (arr.length && memo.depth === that.item.depth) break
            //         memo.depth = Number(memo.depth) + disVal
            //         arr.push(memo)
            //     }
            //     // 更新parent
            //     arr[0].parent = item.parent
            //     // 向父节点添加此item之key
            //     const parent = deepData.find(item => item.key === arr[0].parent)
            //     const key = arr[0].key
            //     parent && parent.children.push(key)
            //     // 先删再添之删除
            //     arr.map((single, key) => {
            //         const index = deepData.findIndex(item => item.key === single.key)
            //         deepData.splice(index, 1)
            //     })
            //     // 先删再添之添加
            //     deepData.splice(itemIndex + 1, 0, ...arr)
            // } else {
            //     const targetIndex = deepData.findIndex((memo) => memo.key === this.item.key)
            //     this.item.depth = item.depth
            //     this.item.parent = item.parent
            //     deepData.splice(targetIndex, 1)
            //     const targetItemIndex = deepData.findIndex((memo) => memo.key === item.key)
            //     deepData.splice(targetItemIndex + 1, 0, this.item)
            //     if (disVal) {
            //         const parent = deepData.find(item => item.key === this.item.parent)
            //         const key = this.item.key
            //         parent && parent.children.push(key)
            //     }
            // }
            // this.setState({
            //     newData: deepData
            // })
        }
    }

    onDragOverTarget(e, item) {
        e.preventDefault();
        const top = document.getElementsByClassName(e.target.className.split(' ')[1])[0].offsetTop
        const height = document.getElementsByClassName(e.target.className.split(' ')[1])[0].offsetHeight
        const bottom = Number(top) + Number(height)
        console.log(this.tops, this.bottoms, top, bottom, e.target.innerHTML, 'onDragOverTarget')
        if (this.bottoms - bottom >= 3 && this.bottoms - bottom <= 19) {
            console.log('到了下面')
            this.position = 'below'
        }
        if (top - this.tops >= 6 && top - this.tops <= 19) {
            console.log('在上面了')
            this.position = 'up'
        }
        if (top - this.tops < 6 && this.bottoms - bottom < 3) {
            console.log('在中间')
            this.position = 'middle'
        }
    }

    renderLayout = (newData) => {
        console.log(newData, 'newData-newData')
        return newData.map((item, index) => {
            const className = item.depth ? `ml${item.depth}0` : ''
            return !item.folded ? <div className={className} key={index} onClick={this.handleFold.bind(this, item)}>
                <span>{item.state === 'semi' ? 'semi' : ''}</span>
                <input type="checkbox" checked={item.checked} onChange={e => this.changeState(e, item)}/>
                <span className={['ml8', `ml${item.key}`].join(' ')}
                    style={{ display: 'inline-block', height: '24px', lineHeight: '24px' }}
                    onMouseDown={(e) => this.mouseDownEvent(e)}
                    onMouseUp={() => { document.onmousemove = null }}
                    draggable={true}
                    onDrag={(e) => this.dragTarget(e, item)}
                    onDragOver={(e) => this.onDragOverTarget(e, item)}
                    onDrop={(e) => this.dropTarget(e, item)}>{item.title}</span>
            </div> : null
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
        // console.log(brotherNode, monomer, '改变父节点选择状态')
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
                {this.renderLayout(newData)}
                {/* 每个节点 -- end */}
            </div>
        );
    }
}
