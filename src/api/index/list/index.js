
/*
包含所有ajax请求方法的模块
 */
import React from 'react';
import ajax from '@/assets/utils/ajax'
import request from './file'

const domains = React.$domains

export const reqMockDataGood = (type) => ajax({
    url: `${request.FETCH_MOCK_DATA_GOODS}`,
    data: {},
    type: 'GET',
    baseURL: domains.baseUrl
})

export const reqMovies = (type) => ajax({
    url: `${request.FETCH_MOVIE_LIST}/${type}?start=0&count=10`,
    data: {},
    type: 'GET',
    baseURL: domains.baseUrl
})
export const reqSearchMovie = (searchName) => ajax({
    url: `${request.SEARCH_MOVIE + searchName}`,
    data: {},
    type: 'GET',
    baseURL: domains.baseUrl
})
