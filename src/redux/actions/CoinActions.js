import { satrexApi } from '../../utils/ApiConfig';
// import { satrexGreen } from '../../styles/colors';

export const GET_SUPPORTED_COIN_LIST = 'GET_SUPPORTED_COIN_LIST';
export const GET_COIN_PRICE_API = 'GET_COIN_PRICE_API';

export const getSupportedCoinList = () => (dispatch) => {
        satrexApi()
            .post('Board/GetPairsDifferentialPriceForLast24Hours')
            .then(({ data }) => {
                dispatch({
                    type: GET_SUPPORTED_COIN_LIST,
                    payload: data.data,
                });
            });
    };
