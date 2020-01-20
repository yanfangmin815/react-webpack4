
import {
    TOGGLE_SIDE_BAR,
    RECEIVE_MOVE,
    RECEIVE_MOVES,
    RECEIVE_SEARCH_MOVES,
    RECEIVE_MOCK_DATA_GOOD,
    CHANGE_DATA_GOOD
} from '../../action-types'


const initMockGood = []

export function goods(state = initMockGood, action) {
    switch (action.type) {
        case RECEIVE_MOCK_DATA_GOOD: {
            return [...action.payload]
        }
        case CHANGE_DATA_GOOD: {
            state.push(action.payload)
            return [...state]
        }
        default: {
            return state;
        }
    }
}

const initSearchMovies = [];

export function searchMovies(state = initSearchMovies, action) {
    switch (action.type) {
        case RECEIVE_SEARCH_MOVES:
            return action.payload;
        default: {
            return state;
        }
    }
}

const initMovies = []

export function movies(state = initMovies, action) {
    switch (action.type) {
        case RECEIVE_MOVES: {
            return [...action.payload]
        }
        default: {
            return state;
        }
    }
}

const initMovie = {}
export const movie = (state = initMovie, action) => {
    switch (action.type) {
        case RECEIVE_MOVE: {
            return action.payload;
        }
        default: {
            return state;
        }
    }
}

const initSlideBarStatus = false

export function slideBarStatus(state = initSlideBarStatus, action) {
    switch (action.type) {
        case TOGGLE_SIDE_BAR: {
            return action.payload
        }
        default:
            return state;
    }
}
