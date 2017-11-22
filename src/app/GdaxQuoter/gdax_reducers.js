import { combineReducers } from 'redux-immutable'
import { Map, Set } from 'immutable'

export const gdax_constants = {
    REPLACE_CURRENCIES: 'REPLACE_CURRENCIES',
    REPLACE_ORDER_BOOK: 'REPLACE_ORDER_BOOK',
};

const currencies = function(state = Map(), action) {
    switch (action.type) {
        case gdax_constants.REPLACE_CURRENCIES:
            return action.currencies;
        default:
            return state;
    }
};

const orderBooks = function(state = Map(), action) {
    switch (action.type) {
        case gdax_constants.REPLACE_ORDER_BOOK:
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