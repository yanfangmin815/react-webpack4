import {
    LOADING_STATUS,
    RECEIVE_MOVE
} from '../../action-types'
import {
    reqMovie
} from '@/api/index/other'
import {createAction} from 'redux-actions'

export const loadingStatus = createAction(LOADING_STATUS)
const receiveMovie = createAction(RECEIVE_MOVE)

export const getMovie = (id) => {
    return async (dispatch) => {
        try{
            dispatch(loadingStatus(true));
            const response = await reqMovie(id);
            dispatch(loadingStatus(false));
            dispatch(receiveMovie(response.data))
        } catch (e) {
            dispatch(loadingStatus(false));
        }
    }
}
