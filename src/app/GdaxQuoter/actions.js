import {gdax_constants} from './gdax_reducers'
import {api, config, endpoints} from "../constants";
import {apiFetchPromise, buildOrderedMapFromBook, convertToCurrencyInt} from "../utils";
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
                    type: gdax_constants.CURRENCY_UPDATE_SPECS,
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

export const apiGetOrderBook = (orderBookId) => {
    return dispatch => {
        dispatch({
            type: gdax_constants.ORDER_BOOK_UPDATE_STATE,
            orderBookId,
            state: "fetching",
        });
        return apiFetchPromise(api(endpoints.ORDER_BOOK, orderBookId), {level:2})
            .then((res) => {
                // console.log(res);
                const orderBook = Map({
                    baseAsks: buildOrderedMapFromBook(res, 'asks', true),
                    baseBids: buildOrderedMapFromBook(res, 'bids', true),
                    quoteAsks: buildOrderedMapFromBook(res, 'bids', false),
                    quoteBids: buildOrderedMapFromBook(res, 'asks', false),
                    sequence: res.sequence,
                    updatedAt: (new Date).getTime(),
                    state: 'idle',
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