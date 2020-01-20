import {combineReducers} from 'redux'

// 引入业务reducer
import * as listReducer from './index/list/reducers'
import * as otherReducer from './index/other/reducers'
/*
import {
    IS_AUTHED,
    SET_AUTHED} from "./action-types";

// 获取是否登录状态
const operateAuth = (state = false, action) => {
    switch (action.type) {
        case SET_AUTHED: {
            return action.data
        }
        default: {
            return state;
        }
    }
}
const reactReducers = {
    operateAuth
}*/
const reducers = Object.assign(
    // reactReducers,
    otherReducer,
    listReducer
)
console.log(reducers, 'reducers')
export default combineReducers(reducers)
