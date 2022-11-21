import { combineReducers, createStore, applyMiddleware } from "redux";

import thunk from "redux-thunk";
import { filmReducer } from "./reducers/filmReducer";
import { userReducer } from "./reducers/userReducer";


const rootReducer = combineReducers({
    filmReducer,
    userReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunk));