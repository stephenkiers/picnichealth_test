import {gdax_constants} from './gdax_reducers'
import {api, config, endpoints} from "../constants";
import {apiFetchPromise, convertToCurrencyInt, immutableFindOrCreate} from "../utils";
import {Map, OrderedMap} from 'immutable';



const setCurrency = (currencies, currency1, currency2, value, isBase) => {
    currencies = immutableFindOrCreate(currencies, currency1, Map());
    let currency = currencies.get(currency1);
    currency =  immutableFindOrCreate(currency, currency2, value.set("isBase", isBase));
    return currencies.set(currency1, currency);
};
export const apiGetCurrencies = () => {
    return dispatch => {
        return apiFetchPromise(api(endpoints.PRODUCTS_LIST))
            .then((res) => {
                let currencies = Map();
                for (let i = 0; i < res.length; i++) {
                    const current = res[i];
                    const {id, base_currency, quote_currency, base_min_size, base_max_size, quote_increment} = current;
                    const value = Map({
                        id,
                        baseMinSize: convertToCurrencyInt(base_min_size),
                        baseMaxSize: convertToCurrencyInt(base_max_size),
                        quoteIncrement: quote_increment
                    });
                    currencies = setCurrency(currencies, base_currency, quote_currency, value, true);
                    currencies = setCurrency(currencies, quote_currency, base_currency, value, false);
                }
                dispatch({
                    type: gdax_constants.REPLACE_CURRENCIES,
                    currencies
                });
            }, (err) => {
                console.log(err)
                // dispatch(handleApiErrors(err))
            });
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
            price: newPriceAverage,
        }));
        runningTotalAmount = newTotalAmount;
        runningPriceAverage = newPriceAverage
    })
    return aggregated
};

export const apiGetOrderBook = (orderBookId) => {
    return dispatch => {
        dispatch({
            type: gdax_constants.REQUEST_ORDER_BOOK,
            orderBookId
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
                    type: gdax_constants.REPLACE_ORDER_BOOK,
                    orderBookId,
                    orderBook
                });
            }, (err) => {
                console.log(err)
                // dispatch(handleApiErrors(err))
            });
    }
}