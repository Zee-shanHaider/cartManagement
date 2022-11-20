import {compose, createStore ,applyMiddleware} from 'redux';
import logger from 'redux-logger';
import { rootReducer } from './rootReducers';

// import {persistStore, persistReducer} from 'redux-persist'
// import storage from 'redux-persist/lib/storage'
// import { cartReducer } from './CartStore/cart.reducers';
// const persistConfig = {
//     key: 'root',
//     storage,
//     blacklist: [cartReducer]
// }

// const persistReducers = persistReducer(
//     persistConfig,
//     rootReducer
// )

const middlewares = [logger];

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const composedEnhancers = composeEnhancer(applyMiddleware(...middlewares))

export const store = createStore(
    rootReducer,
    undefined,
    composedEnhancers
    )

// export const persistor = persistStore(store)