import {
    GET_CURRENT_USER, SET_CURRENT_USER, GET_ERRORS
} from '../constants'
import jwtDecode from 'jwt-decode'
import axiosClient from '../axiosClient'
import axios from 'axios'
export const setCurrentUser = (user) => {
    return {
        type: SET_CURRENT_USER,
        payload: user
    }
}

export const getCurrentUser = () => {
    return dispatch => {
        axiosClient({
            method: "GET",
            url: `/api/auth/info`
        })
            .then((res) => {
                console.log(res.data);
                dispatch({
                    type: GET_CURRENT_USER,
                    payload: res.data
                });
            })
            .catch((err) => {
                console.log(err);
            })
    }
}

export const getErrors = (errors) => {
    return {
        type: GET_ERRORS,
        payload: errors
    }
}

export const login = (user, history) => {
    const { email, password } = user;
    return dispatch => {
        axios({
            method: 'POST',
            url: `/api/auth/login`,
            data: { email, password }
        })
            .then((res) => {
                const token = res.data.token;
                const username = res.data.username;
                sessionStorage.setItem('username', username);
                sessionStorage.setItem('token', token);
                const decoded = jwtDecode(token);
                dispatch(setCurrentUser(decoded));
                if(res.data.roles.includes('ROLE_ADMIN')) {
                    history('/admin/dashboard')
                } else {
                    history('/')
                }
            })
            .catch(err => {
                console.log(err);
            })
    }
}

export const logout = () => {
    return dispatch => {
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("username");
        window.location.href = "/";
        dispatch(setCurrentUser({}));
    }
}
