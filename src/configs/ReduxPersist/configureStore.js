import { applyMiddleware, createStore } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import thunk from "redux-thunk";
import logger from 'redux-logger'
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import rootReducer from "../Redux/reducer/index";

const persistConfig = {
    key: "root",
    storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

let store = createStore(persistedReducer, applyMiddleware(thunk, logger));
let persistor = persistStore(store);
export { persistor, store }