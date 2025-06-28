import {
    combineReducers,
    configureStore
} from "@reduxjs/toolkit";
import {
    userReducer
} from "./slices/user";
import storage from "redux-persist/lib/storage";
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/lib/persistStore";


export const rootReducer = combineReducers({
    user: userReducer,
    ticket: userReducer
})

const persistConfig = {
    key: "userId",
    storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)


export const store = configureStore({
    reducer: persistedReducer
})

export const persist = persistStore(store)

export default store;