import {combineReducers} from 'redux-immutable';
import gdax, * as fromGdax from './GdaxQuoter/gdax_reducers';

const rootReducer = combineReducers({
    gdax,
});

export default rootReducer;

export const getCurrencies = (state) =>
    fromGdax.getCurrencies(state.get('gdax'));
export const getOrderBook = (state, id) =>
    fromGdax.getOrderBook(state.get('gdax'), id);