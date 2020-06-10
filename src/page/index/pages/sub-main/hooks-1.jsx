import React, { useRef, useEffect, useState } from 'react'
import { run, useConcent } from 'concent'
import { cloneDeep } from 'lodash'
import * as logic from '@/assets/utils/logic'
import { Table } from '@/mayflyComponent'
import './hooks.css'
import setup from './public'
import '@/mayflyComponent/component/table/style/css.js';
// import '@/mayflyComponent/component/paging/style/css.js';

// import("./public").then(() => {
//     console.log(12345678)
// })

const ConcentFnPage = React.memo(function(props) {
    // 定义状态构造函数，传递给useConcent
    const iState = () => ({ products: [], type: '', sex: 'male', addr: '', keyword: '', tag: 'B-B' });
    // useConcent返回ctx，这里直接解构ctx，拿想用的对象或方法
    const { state, settings, sync } = useConcent({ setup, state: iState });
    const { products, type, sex, addr, keyword, tag } = state;
    const { fetchProducts, updateType, clickTitle, resetButton } = settings;
    const [value, setValue] = useState('MMMMMMM')
    const [newRecord, setNewRecord] = useState({})
    const [isEdit, setIsEdit] = useState(false)
    const exeucuteCycle = useRef()
    const [pageInfo, setPageInfo] = useState({
        total: 30,
        maxToShow: 10,
        currentPage: 1
    })

    const [dataset, setDataset] = useState([{
        id: '11-1',
        sex: 'female',
        height: 178
    }, {
        id: '12-1',
        sex: 'female',
        height: 177
    }, {
        id: '13-1',
        sex: 'male',
        height: 176
    }, {
        id: '14-1',
        sex: 'female',
        height: 178
    }])

    const datacolumn = [{
        selection: 'checbox'
    }, {
        title: 'ID',
        prop: 'id',
        width: '25%',
        handles: (record) => {
            if (record.isEdit && record.customerEditLabel) {
                return record.customerEditLabel.id()
            }
            return (
                <span>{record.id}</span>
            )
        }
    }, {
        title: '性別',
        prop: 'sex',
        width: '25%',
        handles: (record) => {
            if (record.isEdit && record.customerEditLabel) {
                return record.customerEditLabel.sex()
            }
            return (
                <span>{record.sex}</span>
            )
        }
    }, {
        title: '身高',
        prop: 'height',
        width: '25%',
        handles: (record) => {
            if (record.isEdit && record.customerEditLabel) {
                return record.customerEditLabel.height()
            }
            return (
                <span>{record.height}</span>
            )
        }
    }, {
        title: '操作',
        width: '20%',
        prop: 'action2',
        type: 'action',
        handles: (record) => {
            return (
                <div className="pop-box d-f ac jc">
                    <button className="btn-hollow mr10" onClick={() => handleDel(record)}>delete</button>
                    {record.isEdit
                        ? <div className="pop-box d-f ac jc">
                            <button className="btn-hollow mr10" onClick={() => handleSave(record)}>save</button>
                            <button className="btn-hollow mr10" onClick={() => handleCancel()}>cancel</button>
                        </div>
                        : <button className="btn-hollow mr10"
                            disabled={isEdit}
                            onClick={() => handleEdit(record)}>edit</button>}
                </div>
            )
        }
    }]

    const handleSave = (record) => {
        const { index } = record
        dataset[index]['isEdit'] = false
        setIsEdit(false)
        const newDataSet = [...dataset]
        setDataset(newDataSet)
    }

    const handleCancel = () => {
        const { index } = newRecord
        for (let key in newRecord) {
            dataset[index][key] = newRecord[key]
        }
        dataset[index]['isEdit'] = false
        setIsEdit(false)
        const newDataSet = [...dataset]
        setDataset(newDataSet)
    }

    const handleDel = (record) => {
        const { index } = record
        dataset.splice(index, 1)
        // react 渲染机制 引用类型必须声明新变量 否则会被视为无改变
        const newDataSet = [...dataset]
        setDataset(newDataSet)
    }

    const handleEdit = (record) => {
        setIsEdit(true)
        setNewRecord(cloneDeep(record))  // 保存原有数据
    }

    const changeVal = (e, key, index) => {
        const val = e.target ? e.target.value : e
        dataset[index][key] = val
        const newDataSet = [...dataset]
        setDataset(newDataSet)
    }

    const refreshButon = () => {
        setValue(1000000000000000000)
    }

    useEffect(() => {
        if (newRecord.index || newRecord.index === 0) {
            const { index } = newRecord
            dataset[index]['isEdit'] = true
            dataset[index]['customerEditLabel'] = {
                height: () => {
                    return (
                        <input type="text" value={dataset[index].height}
                            onChange={(e) => changeVal(e, 'height', index)}/>
                    )
                },
                sex: () => {
                    return (
                        <span>
                            <input type="radio" value={dataset[index].sex} checked={dataset[index].sex == 'female'}
                                onChange={(e) => changeVal('female', 'sex', index)}/> 男
                            <input type="radio" value={dataset[index].sex} checked={dataset[index].sex == 'male'}
                                onChange={(e) => changeVal('male', 'sex', index)}/> 女
                        </span>
                    )
                },
                id: () => {
                    return (
                        <input type="text" value={dataset[index].id}
                            onChange={(e) => changeVal(e, 'id', index)}/>
                    )
                }
            }
            const newDataSet = [...dataset]
            setDataset(newDataSet)
        }
    }, [newRecord])

    // const BBB = () => {
    //     const mark = true
    //     return new Promise((resolve, reject) => {
    //         setTimeout(() => {
    //             console.log('COMGING INTO......')
    //             if (mark) {
    //                 resolve(true)
    //             } else {
    //                 reject(false)
    //             }
    //         }, 5000)
    //     })
    // }

    // 页码改变回调
    const pageChange = (currentPage, prePageNum) => {
        console.log(currentPage, prePageNum, 'page info coming back...')
        const newDataSet = [{
            id: `11-${currentPage}`,
            sex: 'female',
            height: 178
        }, {
            id: `12-${currentPage}`,
            sex: 'female',
            height: 177
        }, {
            id: `13-${currentPage}`,
            sex: 'male',
            height: 176
        }, {
            id: `14-${currentPage}`,
            sex: 'female',
            height: 178
        }]
        setDataset(newDataSet)
    }

    useEffect(() => {
        exeucuteCycle.current.cycleState()
    }, [dataset])

    // 下面UI中使用sync语法糖函数同步状态，如果为了最求极致的性能
    // 可将它们定义在setup返回结果里，这样不用每次渲染都生成临时的更新函数
    return (
        <div className="conditionArea">
            <h1 onClick={clickTitle}>concent setup compnent</h1>
            <span>{tag}------{value}</span>
            <Table
                dataconf={datacolumn}
                dataset={dataset}
                loading={false}
                showPage={true}
                pageInfo={pageInfo}
                ref={exeucuteCycle}
                onPageChange={(currentPage, prePageNum) => pageChange(currentPage, prePageNum)} />
            <br/>
            <select value={type} onChange={updateType}>
                <option value="1">1</option>
                <option value="2">2</option>
            </select>
            <br/><br/>
            <select data-key="sex" value={sex} onChange={sync('sex')}>
                <option value="1">male</option>
                <option value="0">female</option>
            </select>
            <br/><br/>
            <input data-key="addr" value={addr} onChange={sync('addr')} />
            <input data-key="keyword" value={keyword} onChange={sync('keyword')} />
            <button onClick={refreshButon.bind(this)}>refresh</button>
            <button onClick={resetButton.bind(this, 'BBBBBBBB')}>button</button>
        </div>
    );
});

export default ConcentFnPage;