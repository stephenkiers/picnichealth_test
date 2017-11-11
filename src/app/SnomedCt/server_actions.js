import apiFetch from '../../utils/api_fetch'
import { api, api_endpoint } from '../../config/constants'
import {OrderedMap, Map} from 'immutable';

import {createSearchKey, updateSearchResults} from "./actions";
import {snomed_ct_constants} from "./snomed_ct_concepts_reducers";


export const snomedCtGetDefinition = id => {
    return dispatch => {
        dispatch({
            type: snomed_ct_constants.BY_ID.CREATE,
            id,
        });
        return apiFetch(api(api_endpoint.SNOMED_GET, id), undefined, true)
            .then((res) => {
                console.log(res);
            }, (err) => {
                // dispatch(handleApiErrors(err))
                // dispatch(reduxUpdateCollectionFetchStatus(collection_id, `search_vendors`, 'idle'))
            });
    }
}

export const snomedCtAutocompleteSearch = query => {
    return dispatch => {
        dispatch({
            type: snomed_ct_constants.SEARCH_RESULTS.CREATE,
            query,
        });
        return apiFetch(api(api_endpoint.SNOMED_SEARCH, query), {
            maxResults: 10,
            startIndex: 0,
        }, true)
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
                dispatch({
                    type: snomed_ct_constants.SEARCH_RESULTS.APPEND,
                    query,
                    mapOfResults: ids,
                    totalCount: res.totalCount,
                });
            }, (err) => {
                // dispatch(handleApiErrors(err))
                // dispatch(reduxUpdateCollectionFetchStatus(collection_id, `search_vendors`, 'idle'))
            });
    }
}