import {gdax_constants} from './gdax_reducers'
import {api, config, endpoints} from "../constants";
import {apiFetchPromise, convertToCurrencyInt} from "../utils";
import {Map, OrderedMap} from 'immutable';




const apiGetProducts = () => {
    return dispatch => {
        apiFetchPromise(api(endpoints.PRODUCTS_LIST))
            .then((res) => {
                dispatch({
                    type: gdax_constants.CURRENCY_REPLACE_ORDER_BOOKS,
                    res
                });
            }, (err) => {
                console.log(err)
                // dispatch(handleApiErrors(err))
            });
    }
};
const apiGetCurrencyDetails = () => {
    return dispatch => {
        apiFetchPromise(api(endpoints.CURRENCY_DETAILS))
            .then((res) => {
                dispatch({
                    type: gdax_constants.CURRENCY_UPDATE_DECIMAL_PLACES,
                    res
                });
            }, (err) => {
                console.log(err)
                // dispatch(handleApiErrors(err))
            });
    }
};
export const apiGetCurrencies = () => {
    return dispatch => {
        dispatch(apiGetProducts());
        dispatch(apiGetCurrencyDetails());
    }
};



const buildOrderedMapFromBook = (res, resKey) => {
    let aggregated = OrderedMap();
    let runningTotalAmount = 0;
    let runningPriceAverage = 0;
    res[resKey].forEach(current => {
        const currentPrice = convertToCurrencyInt(current[0]);
        const currentAmount = convertToCurrencyInt(current[1]);
        const currentTotalValue = currentPrice * currentAmount;
        const runningTotalValue = runningPriceAverage * runningTotalAmount;
        const newTotalAmount = runningTotalAmount + currentAmount;
        const newPriceAverage = (runningTotalValue + currentTotalValue) / newTotalAmount;
        aggregated = aggregated.set(newTotalAmount, Map({
            amountAtPrice: newTotalAmount,
            avgPrice: newPriceAverage,
            price: currentPrice
        }));
        runningTotalAmount = newTotalAmount;
        runningPriceAverage = newPriceAverage
    });
    return aggregated
};

export const apiGetOrderBook = (orderBookId) => {
    return dispatch => {
        dispatch({
            type: gdax_constants.ORDER_BOOK_UPDATE_STATE,
            orderBookId,
            state: "fetching",
        });
        return apiFetchPromise(api(endpoints.ORDER_BOOK, orderBookId), {level:2})
            .then((res) => {
                // PRICE, AMOUNT, ORDERS
                console.log(res);
                const orderBook = Map({
                    asks: buildOrderedMapFromBook(res, 'asks'),
                    bids: buildOrderedMapFromBook(res, 'bids'),
                    sequence: res.sequence,
                    updatedAt: (new Date).getTime()
                });
                // console.log(orderBook.toJS());
                dispatch({
                    type: gdax_constants.ORDER_BOOK_REPLACE,
                    orderBookId,
                    orderBook
                });
            }, (err) => {
                console.log(err)
                // dispatch(handleApiErrors(err))
            });
    }
}