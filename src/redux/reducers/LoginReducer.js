import {
    REFRESH_TOKEN_TIME,
    SET_JWT_TOKEN,
} from '../actions/LoginActions';

const initialState = {
    token: null,
    refreshTokenTime: null,
};

const LoginReducer = function (state = initialState, action) {
    switch (action.type) {
        case SET_JWT_TOKEN: {
            return {
                ...state,
                token: action.payload,
            };
        }

        case REFRESH_TOKEN_TIME: {
            return {
                ...state,
                refreshTokenTime: action.payload,
            };
        }
        default: {
            return state;
        }
    }
};

export default LoginReducer;
