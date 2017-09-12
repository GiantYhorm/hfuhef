import { combineReducers } from 'redux'
import AuthReducer from './AuthReducer'
import RadioFormReducer from './RadioFormReducer'
import RadioReducer from './RadioReducer'
import MainFormReducer from './MainFormReducer'
export default combineReducers({
    auth: AuthReducer,
    radioForm: RadioFormReducer,
    radio: RadioReducer,
    main: MainFormReducer
})