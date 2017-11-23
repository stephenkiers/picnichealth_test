import { combineReducers } from 'redux-immutable'
import { Map, Set } from 'immutable'
import {convertToCurrencyInt} from "../utils";

export const gdax_constants = {
    CURRENCY_UPDATE_SPECS: "CURRENCY_UPDATE_DECIMAL_PLACES",
    CURRENCY_REPLACE_ORDER_BOOKS: "CURRENCY_REPLACE_ORDER_BOOKS",
    ORDER_BOOK_REPLACE: "ORDER_BOOK_REPLACE",
    ORDER_BOOK_UPDATE_STATE: "ORDER_BOOK_UPDATE_STATE",
};


const setCurrencyOrderBook = (state, currency1, currency2, value, isBase) => {
    state = state.has(currency1) ? state : state.set(currency1, Map({orderBooks: Map()}));
    return state.setIn([currency1, 'orderBooks', currency2], value.set("isBase", isBase));
};

const currencies = function(state = Map(), action) {
    switch (action.type) {
        case gdax_constants.CURRENCY_REPLACE_ORDER_BOOKS:
            for (let i = 0; i < action.res.length; i++) {
                const {id, base_currency, quote_currency, base_min_size, base_max_size, quote_increment} = action.res[i];
                const value = Map({
                    id,
                    baseMinSize: convertToCurrencyInt(base_min_size),
                    baseMaxSize: convertToCurrencyInt(base_max_size),
                    quoteIncrement: quote_increment
                });
                state = setCurrencyOrderBook(state, base_currency, quote_currency, value, true);
                state = setCurrencyOrderBook(state, quote_currency, base_currency, value, false);
            }
            return state;

        case gdax_constants.CURRENCY_UPDATE_SPECS:
            debugger;

        default:
            return state;
    }
};

const orderBooks = function(state = Map(), action) {
    switch (action.type) {
        case gdax_constants.ORDER_BOOK_UPDATE_STATE:
            return state.set(action.orderBookId, Map({state: action.state}));
        case gdax_constants.ORDER_BOOK_REPLACE:
            return state.set(action.orderBookId, action.orderBook);
        default:
            return state;
    }
};

const gdax = combineReducers({
    currencies,
    orderBooks
});

export default gdax;

export const getCurrencies = state =>
    state.get('currencies');

export const getOrderBook = (state, id) =>
    state.getIn(['orderBooks', id]);