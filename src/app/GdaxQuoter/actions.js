import {thing_constants} from './things_reducers'
import {api, endpoints} from "../constants";
import {apiFetchPromise} from "../utils";



export const getCurrencies = () => {
    return dispatch => {
        return apiFetchPromise(api(endpoints.PRODUCTS_LIST), {level:2})
            .then((res) => {
                const currencies = Map();
                for (let i = 0; i < res.length; i++) {
                    const current = res[i];

                }
            }, (err) => {
            console.log(err)
                // dispatch(handleApiErrors(err))
            });
    }
}