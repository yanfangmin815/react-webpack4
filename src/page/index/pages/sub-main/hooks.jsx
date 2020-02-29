import React, { useReducer, useEffect } from 'react';
import { run, useConcent } from 'concent';
import * as logic from '@/assets/utils/logic';
import { Dialog, Toast, Table, Paging  } from 'i-mayfly';
import './hooks.scss'


const setup = ctx => {
    //实例级别的计算函数
    const fetchProducts = ({type, sex, addr, keyword}) => {
        console.log(type, 'STATE')
        setTimeout(() => {
            console.log('request coming back......')
        }, 1000)
    }

    const testPromise = () => {
        let p = new Promise(function(reslove,reject){
            // reslove('成功')  //状态由等待变为成功，传的参数作为then函数中成功函数的实参
            reject('失败')  //状态由等待变为失败，传的参数作为then函数中失败函数的实参
        })
        //then中有2个参数，第一个参数是状态变为成功后应该执行的回调函数，第二个参数是状态变为失败后应该执行的回调函数。
        p.then((data)=>{
            console.log('成功'+data)
        },(err)=>{
            console.log('失败'+err)
        }).catch(err => {
            console.log('fail')
        }) 
    }

    ctx.effect((title) => {
        console.log(title, 'title changed...')
    }, ['title'])

    ctx.effect(({state}) => {
        fetchProducts(state);
    }, ["type", "sex", "addr", "keyword"]);//这里只需要传key名称就可以了

    ctx.effect(({state}) => {
        testPromise()
    }, []);//这里只需要传key名称就可以了

    ctx.effect(() => {
        return () => {
            // 返回一个清理函数
            // 等价于componentWillUnmout, 这里搞清理事情
        };
    }, []);

    ctx.effectProps(() => {
        // 对props上的变更书写副作用，注意这里不同于ctx.effect，ctx.effect是针对state写副作用
        const curTag = ctx.props.tag;
        if (curTag !== ctx.prevProps.tag) ctx.setState({ tag: curTag });
    }, ["tag"]);//这里只需要传key名称就可以了

    return {// 返回结果收集在ctx.settings里
        fetchProducts,
        //推荐使用此方式，把方法定义在settings里，下面示例故意直接使用sync语法糖函数
        // changeType: ctx.sync('type'),
        updateType: e=> ctx.invoke(logic.complexUpdate, e.currentTarget.value),
        clickTitle: e=> ctx.invoke(logic.complexUpdateTitle, e.currentTarget.innerHTML),
    }
};

const ConcentFnPage = React.memo(function({ tag: propTag }) {
    // run()
    // useConcent返回ctx，这里直接解构ctx，拿想用的对象或方法
    const { state, settings, sync } = useConcent({ setup, module:'product' });
    const { products, type, sex, addr, keyword, tag } = state;
    const { fetchProducts, updateType, clickTitle } = settings;
    const dataset = [{
        id: 1,
        name: 'Apple',
        height: 178
    }, {
        id: 2,
        name: 'Boy',
        height: 177
    }, {
        id: 3,
        name: 'Cat',
        height: 176
    }]
    const dataconf = [{
        title: 'ID',
        name: 'id',
        width: '25%'
    }, {
        title: '姓名',
        name: 'name',
        width: '25%'
    }, {
        title: '身高',
        name: 'height',
        width: '25%'
    }, {
        title: '',
        width: '25%',
        name: 'action2',
        type: 'action',
        handles: [
            {
                name: '配置',
                btnType: 'text',
                handle: (data) => {
                    alert('配置')
                    console.log(data);
                }
            }, {
                name: '备注',
                btnType: 'text',handle: (data) => {
                    alert('备注')
                    console.log(data);
                }
            }]
    }]
    // 下面UI中使用sync语法糖函数同步状态，如果为了最求极致的性能
    // 可将它们定义在setup返回结果里，这样不用每次渲染都生成临时的更新函数
    return (
        <div className="conditionArea">
            <Table dataconf={dataconf} dataset={dataset}  />
            <h1 onClick={clickTitle}>concent setup compnent</h1>
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
            <button onClick={fetchProducts}>refresh</button>
            {/*{products.map((v, idx)=><div key={idx}>name:{v.name} author:{v.author}</div>)}*/}
        </div>


    );
});

export default ConcentFnPage;
