
/*
包含所有ajax请求方法的模块
 */
import React from 'react';
import ajax from '@/assets/utils/ajax'
import request from './file'
const domains = React.$domains

export const reqMovie = (id) => ajax({
    url: `${request.FETCH_MOVIE_BY_ID}/${id}`,
    data: {},
    type: 'GET',
    baseURL: domains.baseUrl
})
