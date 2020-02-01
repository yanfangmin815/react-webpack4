
/*
 author: yfm
 包含所有ajax请求方法的模块
 */
import React from 'react';
import ajax from '@/assets/utils/ajax'
import { environmentSwitch } from '@/assets/env.js'
import request from './file'

const domains = React.$domains
const { NODE_ENV } = process.env
const ENV = environmentSwitch(NODE_ENV) // 获取环境

export const reqMovie = (id) => ajax({
    url: `${request.FETCH_MOVIE_BY_ID}/${id}`,
    data: {},
    type: 'GET',
    baseURL: domains[ENV].baseUrl
})
