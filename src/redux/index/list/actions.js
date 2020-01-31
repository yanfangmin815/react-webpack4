/*
包含n个action creator函数的模块
 */
import {
    TOGGLE_SIDE_BAR,
    LOADING_STATUS,
    RECEIVE_MOVES,
    RECEIVE_SEARCH_MOVES,
    RECEIVE_MOCK_DATA_GOOD,
    CHANGE_DATA_GOOD
} from '../../action-types'
import {
    reqMovies,
    reqSearchMovie,
    reqMockDataGood
} from '@/api/index/list'

import {createAction} from 'redux-actions'

export const loadingStatus = createAction(LOADING_STATUS)
export const toggleSideBar = createAction(TOGGLE_SIDE_BAR)

const receiveMovies = createAction(RECEIVE_MOVES)
const receiveSearchMovie = createAction(RECEIVE_SEARCH_MOVES)
const receiveMockDataGood = createAction(RECEIVE_MOCK_DATA_GOOD)
const changeDataGood = createAction(CHANGE_DATA_GOOD)

// 改变loading值
export const changeLoading = (data) => {
    return (dispatch) => {
        try {
            dispatch(loadingStatus(true))
            setTimeout(() => {
                dispatch(loadingStatus(false))
            },2000)
        } catch (e) {
            
        }
    }
}

// 改变goods数据
export const changeGood = (data) => {
    return (dispatch) => {
        try {
            dispatch(changeDataGood(data))
        } catch (e) {
            
        }
    }
}

// 异步获取mock模拟数据
export const getMockDataGood = () => {
    return async (dispatch) => {
        try {
            dispatch(loadingStatus(true))
            const response = await reqMockDataGood()
            console.log(response, 'response')
            dispatch(loadingStatus(false))
            setTimeout(() => {
                dispatch(receiveMockDataGood(response.data.data))
            },2000)
        } catch (e) {
            dispatch(loadingStatus(false))
        }
    }
}

// 异步获取movie列表的action
export const getMovies = (type) => {
    return async (dispatch) => {
        try {
            dispatch(loadingStatus(true));
            const response = await reqMovies(type)
            dispatch(loadingStatus(false))
            dispatch(receiveMovies(response.data.subjects))
        } catch (e) {
            dispatch(loadingStatus(false))
        }
    }
}

// 异步搜索movie列表的action
export const searchMovie = (searchName) => {
    return async (dispatch) => {
        dispatch(loadingStatus(true));
        const response = await reqSearchMovie(searchName)
        dispatch(loadingStatus(false))
        dispatch(receiveSearchMovie(response.data.subjects))
    }
}




