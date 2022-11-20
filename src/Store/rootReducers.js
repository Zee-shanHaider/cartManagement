import { cartReducer } from "./CartStore/cart.reducers"
import {combineReducers} from 'redux';
import { userReducer } from "./user/user_reducer";

export const rootReducer = combineReducers({
     cartReducer,
     userReducer,
})