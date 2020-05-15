import React, { useReducer, useEffect } from 'react';

const setup = ctx => {
    ctx.watch("sex", () => {
        ctx.setState({tag: 'AAAAAAAAAA'})
    });
    //实例级别的计算函数
    const fetchProducts = ({type, sex, addr, keyword}) => {
        console.log(sex, 'STATE')
        setTimeout(() => {
            function speak(sentence) {
                const utterance = new SpeechSynthesisUtterance(sentence)
                window.speechSynthesis.speak(utterance)
            }
  
      // test
      speak('hello world');
            console.log('request coming back......')
        }, 1000)
    }

    const resetButton = (val) => {
        ctx.setState({tag: val})
    }

    // ctx.effect((title) => {
    //     console.log(title, 'title changed...')
    //     ctx.setState({tag: 'AAAAAAAAAA'})
    // }, ['sex'])

    ctx.effect(({state}) => {
        fetchProducts(state);
    }, ["type", "sex", "addr", "keyword", "tag"]); // 这里只需要传key名称

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
        resetButton,
        //推荐使用此方式，把方法定义在settings里，下面示例故意直接使用sync语法糖函数
        // changeType: ctx.sync('type'),
        updateType: e=> ctx.invoke(logic.complexUpdate, e.currentTarget.value),
        clickTitle: e=> ctx.invoke(logic.complexUpdateTitle, e.currentTarget.innerHTML)
    }
};

export default setup