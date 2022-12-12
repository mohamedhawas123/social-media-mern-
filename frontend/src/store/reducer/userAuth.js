import * as actionType from '../action/actionTypes'
import {updateObject} from '../utility'

const initalState = {
    loading: false,
    error: null,
    userInfo : {
        name: "",
        email: "",
        password: ""
    }
}


const reducer = (state=initalState, action) => {
    switch(action.type) {

        case actionType.USER_SIGNUP_START: return {...state, loading: true  }
        case actionType.USER_SIGNUP_SUCCESS: return {...state, loading: false, userInfo: action.payload  }
        case actionType.USER_SIGNUP_FAIL: return {...state, loading: false, error: action.error  }

        case actionType.USER_LOGIN_START: return {...state, loading: true  }
        case actionType.USER_LOGIN_SUCCESS: return {...state, loading: false, userInfo: action.payload  }
        case actionType.USER_LOGIN_FAIL: return {...state, loading: false, error: action.error  }

        default:
            return state


    }
}

export default reducer