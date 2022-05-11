import {
 ADD_REDIRECTS, CLEAN_REDIRECTS, TOGGLE_THEME, USER_LANGUAGE, SET_TOURGUIDE_STATUS,
} from '../actions/LayoutActions';
import { actionType, layoutStatesTypes } from '../../utils/interfaces';
import setTheme from '../../utils/helpers/setTheme';

const initialState:layoutStatesTypes = {
    language: 'FA',
    redirectUrls: [],
    theme: true,
    tourGuideReady: false,
};

const layoutReducer = (state:layoutStatesTypes = initialState, action:actionType) => {
    switch (action.type) {
        case USER_LANGUAGE: {
            return {
                ...state,
                language: action.payload,
            };
        }
        case ADD_REDIRECTS: {
            return {
                ...state,
                redirectUrls: [...state.redirectUrls, action.payload],
            };
        }
        case CLEAN_REDIRECTS: {
            return {
                ...state,
                redirectUrls: [],
            };
        }
        case TOGGLE_THEME: {
            setTheme(action.payload);
            return {
                ...state,
                theme: action.payload,
            };
        }
        case SET_TOURGUIDE_STATUS:
            return {
                ...state,
                tourGuideReady: action.payload,
            };
        default:
            return state;
    }
};

export default layoutReducer;
