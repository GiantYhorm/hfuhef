import {
    RADIO_DELETE,
    RADIO_UPDATE,
    RADIO_CREATE,
    RADIO_SAVE_SUCCESS,
    IMAGE_PATH_CHANGED,
    RADIO_FETCH_SUCCESS
} from '../actions/types'

const INITIAL_STATE = {
    radioTitle: '',
    imagePath: '',
    fetchFlag: false
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case RADIO_UPDATE:
            return { ...state, [action.payload.prop]: action.payload.value }
        case RADIO_CREATE:
            return {...state }
        case RADIO_SAVE_SUCCESS:
            return INITIAL_STATE
            case IMAGE_PATH_CHANGED :
            return {...state, imagePath: action.payload}
        case RADIO_DELETE:
        return INITIAL_STATE
        case RADIO_FETCH_SUCCESS:
        return {...state, fetchFlag : action.payload}
            default:
            return state
    }
}