import apiFetch from '../../utils/api_fetch'
import { api, api_endpoint } from '../../config/constants'

import {searchStart} from "./actions";

export const snomedCtAutocompleteSearch = query => {
    return dispatch => {
        dispatch(searchStart(query));
        console.log('search for', query);
        return apiFetch(api(api_endpoint.SNOMED_SEARCH, query))
            .then((res) => {
                console.log(res);
                // dispatch(reduxUpdateCollection(
                //     collection_id, 'search_vendors', res.results,
                //     'manual', // sorted_by
                //     res.results.length, // total_results
                //     'idle'
                // ))
            }, (err) => {
                // dispatch(handleApiErrors(err))
                // dispatch(reduxUpdateCollectionFetchStatus(collection_id, `search_vendors`, 'idle'))
            });
    }
}