import { Dispatch } from 'redux';
import { getQualifyLevel } from '../../utils/apis';

export const GET_USER_LEVEL = 'GET_USER_LEVEL';

export const getUserLevel = () => async (dispatch:Dispatch) => {
    const { data } = await getQualifyLevel();
    dispatch({
      type: GET_USER_LEVEL,
      payload: data,
    });
  };
