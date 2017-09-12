import {
    CONFIRM_CHECK
} from '../actions/types'

const INITIAL_STATE = {
confirmCheck : ''
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
            case CONFIRM_CHECK:
            return {...state, confirmCheck: action.payload}
        default:
            return state
    }
}