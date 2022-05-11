import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import RootReducer from './reducers/RootReducer';

const initialState = {};

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['layout'],
};

const middlewares = [thunk];
const persistedReducer = persistReducer(persistConfig, RootReducer);
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const Store = createStore(
  persistedReducer,
  initialState,
  composeEnhancers(applyMiddleware(...middlewares)),
);
