import { USERLOGIN } from "../../util/setting";
import { LOGIN, LOGOUT, TB_LOGIN, TB_REGISTER } from "../types/userType";
import { history } from "../../App"

let uLogin = null;

if (localStorage.getItem(USERLOGIN)) {
  uLogin = JSON.parse(localStorage.getItem(USERLOGIN));
}

const initialState = {
  uLogin: uLogin,
  alertRegister: '',
  alertLogin: ''
}

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      state.uLogin = action.uLogin;
      return { ...state }
    case LOGOUT:
      state.uLogin = action.uLogin;
      history.push('/home');
      return { ...state }
    case TB_REGISTER:
      state.alertRegister = action.alertRegister;
      return { ...state }
    case TB_LOGIN:
      state.alertLogin = action.alertLogin;
      return { ...state }
    default:
      return state
  }
}
