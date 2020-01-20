import React from 'react'
import Loadable from 'react-loadable'
/**
 * 组件异步加载装置 => react-loadable
 * @param {String} filename
 */
const loadable = (filename) => Loadable({
    loader:() => import(`@/page/${filename}`),
    loading:() => <div></div>
});

export default loadable
