
import {
    LOADING_STATUS
} from '../../action-types'

const initLoading = false

export function loading(state = initLoading, action) {
    switch (action.type) {
        case LOADING_STATUS: {
            return action.payload
        }
        default: {
            return state;
        }
    }
}
