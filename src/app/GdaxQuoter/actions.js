import {thing_constants} from './things_reducers'
import {api, endpoints} from "../constants";
import {apiFetchPromise} from "../utils";

export const getCurrencies = () => {
    return dispatch => {
        return apiFetchPromise(api(endpoints.PRODUCTS_LIST), {level:2})
            .then((res) => {
                console.log(res)
                // dispatch({
                //     type: thing_constants.THING_DELETE,
                //     id,
                //     name,
                // })
            }, (err) => {
            console.log(err)
                // dispatch(handleApiErrors(err))
            });
    }
}