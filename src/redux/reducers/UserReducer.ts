import { userReducerActionType } from '../../utils/interfaces';
import { GET_USER_LEVEL } from '../actions/UserActions';

const initialState = {
  qualityLevel: {},
};

const userReducer = (state = initialState, action:userReducerActionType) => {
  switch (action.type) {
    case GET_USER_LEVEL: {
      return {
        ...state,
        qualityLevel: action.payload,
      };
    }
    default: return state;
  }
};

export default userReducer;
