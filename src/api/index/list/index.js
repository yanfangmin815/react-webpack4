
/*
    所有ajax请求
 */
import React from 'react';
import ajax from '@/assets/utils/ajax'
import { environmentSwitch } from '@/assets/env.js'
import request from './file'

const domains = React.$domains
const { NODE_ENV } = process.env
const ENV = environmentSwitch(NODE_ENV) // 获取环境
// console.log(domains[ENV], 'domains')

export const reqMockDataGood = (type) => {
    return ajax({
        url: `${request.FETCH_MOCK_DATA_GOODS}`,
        data: {},
        type: 'GET',
        baseURL: domains[ENV].baseUrl
    })
}

export const reqMovies = (type) => ajax({
    url: `${request.FETCH_MOVIE_LIST}/${type}?start=0&count=10`,
    data: {},
    type: 'GET',
    baseURL: domains[ENV].baseUrl
})
export const reqSearchMovie = (searchName) => ajax({
    url: `${request.SEARCH_MOVIE + searchName}`,
    data: {},
    type: 'GET',
    baseURL: domains[ENV].baseUrl
})
