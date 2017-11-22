import {gdax_constants} from './gdax_reducers'
import {api, endpoints} from "../constants";
import {apiFetchPromise, immutableFindOrCreate} from "../utils";
import {Map} from 'immutable';



const setCurrency = (currencies, currency1, currency2, value) => {
    currencies = immutableFindOrCreate(currencies, currency1, Map());
    let currency = currencies.get(currency1);
    currency =  immutableFindOrCreate(currency, currency2, value);
    return currencies.set(currency1, currency);
};
export const apiGetCurrencies = () => {
    return dispatch => {
        return apiFetchPromise(api(endpoints.PRODUCTS_LIST), {level:2})
            .then((res) => {
                let currencies = Map();
                for (let i = 0; i < res.length; i++) {
                    const current = res[i];
                    const {id, base_currency, quote_currency, base_min_size, base_max_size, quote_increment} = current;
                    const value = Map({
                        id,
                        baseMinSize: base_min_size,
                        baseMaxSize: base_max_size,
                        quoteIncrement: quote_increment
                    });
                    currencies = setCurrency(currencies, base_currency, quote_currency, value);
                    currencies = setCurrency(currencies, quote_currency, base_currency, value);
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
}