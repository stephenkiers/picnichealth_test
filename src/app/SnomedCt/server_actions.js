import apiFetch from '../../utils/api_fetch'
import { api, api_endpoint } from '../../config/constants'
import {OrderedMap, Map} from 'immutable';

import {createSearchKey, updateSearchResults} from "./actions";

export const snomedCtAutocompleteSearch = query => {
    return dispatch => {
        dispatch(createSearchKey(query));
        return apiFetch(api(api_endpoint.SNOMED_SEARCH, query), {
            maxResults: 10,
            startIndex: 0,
        }, true)
        // return apiFetch(api(api_endpoint.SNOMED_SEARCH, query))
            .then((res) => {
                let ids = OrderedMap();
                res.results.forEach(concept => {
                    if (concept.terminology === "SNOMEDCT") {
                        ids = ids.set(concept.terminologyId, Map({
                            id: concept.terminologyId,
                            label: concept.value,
                            score: concept.score,
                        }));
                    }
                });
                dispatch(updateSearchResults(query, ids, res.totalCount));
            }, (err) => {
                // dispatch(handleApiErrors(err))
                // dispatch(reduxUpdateCollectionFetchStatus(collection_id, `search_vendors`, 'idle'))
            });
    }
}