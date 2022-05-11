import { combineReducers } from 'redux';
import LoginReducer from './LoginReducer';
import CoinReducer from './CoinReducer';
import LayoutReducer from './LayoutReducer';
import UserReducer from './UserReducer';

const RootReducer = combineReducers({
    login: LoginReducer,
    coin: CoinReducer,
    layout: LayoutReducer,
    user: UserReducer,

});

const appReducer = (state, action) => {
    if (action.type === 'EXITING') {
        state = undefined;
    }
    return RootReducer(state, action);
};

export default appReducer;
