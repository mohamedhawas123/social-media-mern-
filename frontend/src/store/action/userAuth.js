
import * as actionType from './actionTypes'
import axios from 'axios'


export const UserRegis = (name, email, password) =>  async(dispatch, getState)=> {

    try {

        dispatch({
            type: actionType.USER_LOGIN_START
        })
        
        const config = {
            'headers': {
                'content-type':'application/json'
            }
        }
        const {data} = await axios.post("http://127.0.0.1:3000/auth/register", {
            name: name,
            email: email,
            password: password
        }, config)

        dispatch({
            type: actionType.USER_SIGNUP_SUCCESS,
            payload: data
        })

    }catch(e) {
        dispatch({
            type: actionType.USER_SIGNUP_FAIL,
            error: e
        })
    }


}


export const UserLogin = (email, password) =>  async(dispatch, getState)=> {

    try {

        dispatch({
            type: actionType.USER_LOGIN_START
        })
        
        const config = {
            'headers': {
                'content-type':'application/json'
            }
        }
        const {data} = await axios.post("http://127.0.0.1:3000/auth/login", {
            
            email: email,
            password: password
        })

        dispatch({
            type: actionType.USER_LOGIN_SUCCESS,
            payload: data
        }, config)

    }catch(e) {
        dispatch({
            type: actionType.USER_LOGIN_FAIL,
            error: e
        })
    }


}

export const logout = () => async (dispatch, getState) => {

    dispatch ({
        type: actionType.USER_LOGOUT
    })

}