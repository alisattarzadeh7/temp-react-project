import _ from 'lodash';

const initialState = {
    coinsList: [],
    coinLogos: [],
    supportedCoinList: [],
    coinPaprikaList: [],
    dollarPrice: 0,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case 'GET_SUPPORTED_COIN_LIST': {
            const logosArr = {};
            action.payload.forEach((item) => logosArr[item.sourceAssetSymbol] = item.sourceAssetImageAddress);
            return {
                ...state,
                supportedCoinList: action.payload,
                coinsList: _.keys(
                    _.groupBy(action.payload, 'sourceAssetEnglishTitle'),
                ).map((v) => v.toLowerCase()),
                coinLogos: logosArr,
            };
        }

        case 'GET_COIN_PRICE_API': {
            return {
                ...state,
                coinPaprikaList: action.payload.coinPaprikaList,
                dollarPrice: action.payload.dollarPrice,
            };
        }

        default: {
            return state;
        }
    }
};
