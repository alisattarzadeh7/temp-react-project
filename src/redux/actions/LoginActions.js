export const REFRESH_TOKEN_TIME = 'REFRESH_TOKEN_TIME';
export const SET_JWT_TOKEN = 'SET_JWT_TOKEN';

export const setRefreshTokenTime = (date) => (dispatch) => {
        dispatch({
            type: REFRESH_TOKEN_TIME,
            payload: date,
        });
    };

export const setJwtToken = (token, refreshToken) => (dispatch) => {
        dispatch({
            type: SET_JWT_TOKEN,
            payload: { token, refreshToken },
        });
    };
