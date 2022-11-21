import axios from "axios";
import { ACCESS_TOKEN, TOKENCYBER, URL_API, USERLOGIN } from "../../util/setting";
import { history } from "../../App"
import { LOGIN, LOGOUT, TB_LOGIN, TB_REGISTER } from "../types/userType";

export const registerAction = (userInfo) => {
    return (dispatch2) => {
        let promise = axios({
            method: 'post',
            url: `${URL_API}/QuanLyNguoiDung/DangKy`,
            data: userInfo,
            headers: {
                'TokenCybersoft': TOKENCYBER
            }
        })
        promise.then((result) => {
            let action = {
                type: TB_REGISTER,
                alertRegister: result.data.content
            }
            dispatch2(action);
        })
        promise.catch((error) => {
            let action = {
                type: TB_REGISTER,
                alertRegister: error.response?.data.content
            }
            dispatch2(action);
        })
    }
}

export const loginAction = (userInfo) => {
    return (dispatch2) => {
        let promise = axios({
            method: 'post',
            url: `${URL_API}/QuanLyNguoiDung/DangNhap`,
            data: userInfo,
            headers: {
                'TokenCybersoft': TOKENCYBER
            }
        })
        promise.then((result) => {
            localStorage.setItem(ACCESS_TOKEN, result.data.content.accessToken);
            let userInfo = JSON.stringify(result.data.content)
            localStorage.setItem(USERLOGIN, userInfo)
            let action = {
                type: LOGIN,
                uLogin: result.data.content
            }
            dispatch2(action);
            history.push('/home');
        })
        promise.catch((error) => {
            document.getElementById('openModal').click();
            let action = {
                type: TB_LOGIN,
                alertLogin: error.response?.data.content
            }
            dispatch2(action);
        })
    }
}

export const logoutAction = () => {
    return (dispatch2) => {
        localStorage.removeItem(ACCESS_TOKEN);
        localStorage.removeItem(USERLOGIN);
        let action2 = {
            type: LOGOUT,
            uLogin: null
        }
        dispatch2(action2)
    }
}