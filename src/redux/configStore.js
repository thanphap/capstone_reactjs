import { combineReducers, createStore, applyMiddleware } from "redux";

import thunk from "redux-thunk";
import { FilmReducer } from "./reducers/FilmReducer";
import { UserReducer } from "./reducers/UserReducer";


const rootReducer = combineReducers({
    FilmReducer,
    UserReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunk));