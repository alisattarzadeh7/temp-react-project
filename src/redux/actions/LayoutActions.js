export const USER_LANGUAGE = 'USER_LANGUAGE';
export const ADD_REDIRECTS = 'ADD_REDIRECTS';
export const CLEAN_REDIRECTS = 'CLEAN_REDIRECTS';
export const TOGGLE_THEME = 'TOGGLE_THEME';
export const SET_TOURGUIDE_STATUS = 'SET_TOURGUIDE_STATUS';

export const setLanguage = (language) => {
    localStorage.setItem('language', language);
    return (dispatch) => {
        dispatch({
            type: USER_LANGUAGE,
            payload: language,
        });
    };
};


export const changeTheme = (mode) => (dispatch) => {
        dispatch({
            type: TOGGLE_THEME,
            payload: mode,
        });
    };

export const cleanRedirects = () => (dispatch) => {
        dispatch({
            type: CLEAN_REDIRECTS,
        });
    };

export const setTourGuideStatus = (status) => (dispatch) => {
        dispatch({
            type: SET_TOURGUIDE_STATUS,
            payload: status,
        });
    };
