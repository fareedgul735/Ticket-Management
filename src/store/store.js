import {
    combineReducers,
    configureStore
} from "@reduxjs/toolkit";
import {
    userReducer
} from "./slices/user";


export const rootReducer = combineReducers({
    user: userReducer,
    ticket: userReducer
})

export const store = configureStore({
    reducer: rootReducer
})