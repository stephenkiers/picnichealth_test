import { combineReducers } from 'redux-immutable'
import { Map, Set } from 'immutable'

export const gdax_constants = {
    REPLACE_CURRENCIES: 'REPLACE_CURRENCIES',
};

const currencies = function(state = Map(), action) {
    switch (action.type) {
        case gdax_constants.REPLACE_CURRENCIES:
            return action.currencies;
        default:
            return state;
    }
};

const gdax = combineReducers({
    currencies
});

export default gdax;

export const getCurrencies = state =>
    state.get('currencies');

export const getOrderBook = (state, id) =>
    undefined;