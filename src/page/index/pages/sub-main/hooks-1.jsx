import React, { useReducer, useEffect } from 'react';
import { run, useConcent } from 'concent';
import * as logic from '@/assets/utils/logic';
import './hooks.css'

const setup = ctx => {
    /*ctx.watch("keyword", () => {
        console.log('keyword changed...')
    });*/
    //实例级别的计算函数
    const fetchProducts = ({type, sex, addr, keyword}) => {
        console.log(sex, 'STATE')
        setTimeout(() => {
            console.log('request coming back......')
        }, 1000)
    }

    ctx.effect((title) => {
        console.log(title, 'title changed...')
    }, ['title'])

    ctx.effect(({state}) => {
        fetchProducts(state);
    }, ["type", "sex", "addr", "keyword"]);//这里只需要传key名称就可以了
    /** 原函数组件内写法：
     useEffect(() => {
      fetchProducts(type, sex, addr, keyword);
    }, [type, sex, addr, keyword]);
     */

    ctx.effect(() => {
        return () => {
            // 返回一个清理函数
            // 等价于componentWillUnmout, 这里搞清理事情
        };
    }, []);
    /** 原函数组件内写法：
     useEffect(()=>{
      return ()=>{// 返回一个清理函数
        // 等价于componentWillUnmout, 这里搞清理事情
      }
    }, []);//第二位参数传空数组，次副作用只在初次渲染完毕后执行一次
     */

    ctx.effectProps(() => {
        // 对props上的变更书写副作用，注意这里不同于ctx.effect，ctx.effect是针对state写副作用
        const curTag = ctx.props.tag;
        if (curTag !== ctx.prevProps.tag) ctx.setState({ tag: curTag });
    }, ["tag"]);//这里只需要传key名称就可以了
    /** 原函数组件内写法：
     useEffect(()=>{
    // 首次渲染时，此副作用还是会执行的，在内部巧妙的再比较一次，避免一次多余的ui更新
    // 等价于上面组件类里getDerivedStateFromProps里的逻辑
    if(tag !== propTag)setTag(tag);
  }, [propTag, tag]);
     */

    return {// 返回结果收集在ctx.settings里
        fetchProducts,
        //推荐使用此方式，把方法定义在settings里，下面示例故意直接使用sync语法糖函数
        // changeType: ctx.sync('type'),
        updateType: e=> ctx.invoke(logic.complexUpdate, e.currentTarget.value),
        clickTitle: e=> ctx.invoke(logic.complexUpdateTitle, e.currentTarget.innerHTML),
        /*updateTypeAndTitle: e=> {
            // 为了配合这个演示，我们另开两个key存type，sex^_^
            const {tmpType, tmpSex} = ctx.state;
            ctx.invoke(logic.updateTypeAndTitle,
                {type: tmpType,
                    title: tmpSex});
        }*/
    }
};

/*//定义状态构造函数，传递给useConcent
const iState = () => ({
    products:[],
    type: "",
    sex: "",
    addr: "",
    keyword: "",
    tag: "" ,
    title: ''});
run({
    product:{
        //这里复用刚才的状态生成函数
        state: iState()
    }
})*/

const ConcentFnPage = React.memo(function({ tag: propTag }) {
    // run()
    // useConcent返回ctx，这里直接解构ctx，拿想用的对象或方法
    const { state, settings, sync } = useConcent({ setup, module:'product' });
    const { products, type, sex, addr, keyword, tag } = state;
    const { fetchProducts, updateType, clickTitle } = settings;

    // 下面UI中使用sync语法糖函数同步状态，如果为了最求极致的性能
    // 可将它们定义在setup返回结果里，这样不用每次渲染都生成临时的更新函数
    return (
        <div className="conditionArea">
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
