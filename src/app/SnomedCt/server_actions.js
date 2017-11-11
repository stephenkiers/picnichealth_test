import apiFetch from '../../utils/api_fetch'
import { api, api_endpoint } from '../../config/constants'
import {OrderedMap, Map} from 'immutable';

import {createSearchKey, stateFetching, stateIdle, updateSearchResults} from "./actions";
import {snomed_ct_constants} from "./snomed_ct_concepts_reducers";


const traverseConceptTree = (node, response = Map(), parent_id = undefined) => {
    if (!node || node.length < 1) {
        return response
    }
    const current = node[0];
    response = response.set(current.nodeTerminologyId, Map({
        id: current.nodeTerminologyId,
        label: current.nodeName,
        children_count: current.childCt,
        parent: parent_id
    }));
    return traverseConceptTree(current.children, response, current.nodeTerminologyId);
};

export const snomedCtGetDefinition = id => {
    return dispatch => {
        dispatch({
            type: snomed_ct_constants.BY_ID.CREATE,
            id,
        });
        dispatch(stateFetching(id));
        apiFetch(api(api_endpoint.SNOMED_GET, id), undefined, true)
            .then((res) => {
                dispatch({
                    type: snomed_ct_constants.BY_ID.UPSERT_BASIC,
                    id: id,
                    name: res.name,
                    semantic_types: res.semanticTypes && res.semanticTypes.map(semanticType => ({
                        label: semanticType.semanticType,
                        // this way so we can add more keys later if needed
                    })),
                    obsolete: res.obsolete,
                    alternative_terms: res.atoms && res.atoms.map(term => ({
                        label: term.name,
                    })),
                });
                dispatch(stateIdle(id));
            }, (err) => {
                // dispatch(handleApiErrors(err))
                // dispatch(reduxUpdateCollectionFetchStatus(collection_id, `search_vendors`, 'idle'))
            });
        apiFetch(api(api_endpoint.SNOMED_GET_TREES, id), {
                maxResults: 1,
                sortField:"ancestorPath",
                startIndex: 0,
                queryRestriction: null,
            }, true)
            .then((res) => {
                console.log(res);
                const transformedResponse = traverseConceptTree(res.trees)
                transformedResponse.forEach(concept => {
                    console.log(concept.toJS());
                    // dispatch({
                    //     type: snomed_ct_constants.BY_ID.UPSERT_TREE,
                    // })
                })



                // dispatch({
                //     type: snomed_ct_constants.BY_ID.UPSERT_TREE,
                //     id: id,
                //     name: res.name,
                //     semantic_types: res.semanticTypes.map(semanticType => ({
                //         label: semanticType.semanticType,
                //         // this way so we can add more keys later if needed
                //     })),
                //     alternative_terms: res.atoms.map(term => ({
                //         label: term.name,
                //     })),
                // });
            }, (err) => {
                // dispatch(handleApiErrors(err))
                // dispatch(reduxUpdateCollectionFetchStatus(collection_id, `search_vendors`, 'idle'))
            });
        // apiFetch(api(api_endpoint.SNOMED_GET_CHILDREN, id), undefined, true)
        //     .then((res) => {
        //         dispatch({
        //             type: snomed_ct_constants.BY_ID.UPSERT_BASIC,
        //             id: id,
        //             name: res.name,
        //             semantic_types: res.semanticTypes.map(semanticType => ({
        //                 label: semanticType.semanticType,
        //                 // this way so we can add more keys later if needed
        //             })),
        //             alternative_terms: res.atoms.map(term => ({
        //                 label: term.name,
        //             })),
        //         });
        //     }, (err) => {
        //         // dispatch(handleApiErrors(err))
        //         // dispatch(reduxUpdateCollectionFetchStatus(collection_id, `search_vendors`, 'idle'))
        //     });
    }
};

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