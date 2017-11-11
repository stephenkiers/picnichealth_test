import apiFetch from '../../utils/api_fetch'
import { api, api_endpoint } from '../../config/constants'
import {OrderedMap, OrderedSet, Map} from 'immutable';

import {createSearchKey, stateFetching, stateIdle, updateSearchResults} from "./actions";
import {snomed_ct_constants} from "./snomed_ct_concepts_reducers";

const snomedGetNode = id => {
    return dispatch => {
        apiFetch(api(api_endpoint.SNOMED_GET, id), undefined, true)
            .then((res) => {
                dispatch({
                    type: snomed_ct_constants.BY_ID.UPSERT_DEFAULT,
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
    }
};


const traverseConceptTree = (node, response = Map(), parentTree = OrderedSet()) => {
    if (!node || node.length < 1) {
        return response
    }
    const current = node[0];
    const currentId = parseInt(current.nodeTerminologyId);
    response = response.set(currentId, Map({
        id: currentId,
        name: current.nodeName,
        childrenCount: current.childCt,
        parentTree: parentTree
    }));
    return traverseConceptTree(current.children, response, parentTree.add(currentId));
};
const snomedGetParentNodes = id => {
  return dispatch => {
      apiFetch(api(api_endpoint.SNOMED_GET_TREES, id), {
          maxResults: 1,
          sortField:"ancestorPath",
          startIndex: 0,
          queryRestriction: null,
      }, true)
          .then((res) => {
              const normalizedResponse = traverseConceptTree(res.trees);
              if (normalizedResponse.last()) {
                  dispatch({
                      type: snomed_ct_constants.BY_ID.BULK_UPSERT,
                      concepts: normalizedResponse,
                  });
                  const parentTree = normalizedResponse.getIn([id, 'parentTree']);
                  dispatch(snomedGetChildren(id, parentTree));
                  dispatch(snomedGetChildren(
                      parentTree.last(),
                      parentTree.slice(0, parentTree.size - 2)
                  )); // get siblings
              }
          }, (err) => {
              // dispatch(handleApiErrors(err))
              // dispatch(reduxUpdateCollectionFetchStatus(collection_id, `search_vendors`, 'idle'))
          });
  };
};

const prepareChildren = (node_array, parentTree) => {
    if (!node_array || node_array.length < 1) {
        return undefined;
    }
    let results = Map({
        conceptsToCreate: Map(),
        childrenConcepts: OrderedSet(),
    });
    node_array.forEach(concept => {
        const conceptId = parseInt(concept.nodeTerminologyId);
        results = results.setIn(['conceptsToCreate', conceptId], Map({
            id: conceptId,
            name: concept.nodeName,
            childrenCount: concept.childCt,
            parentTree: parentTree,
        }));
        results = results.set('childrenConcepts', results.get('childrenConcepts').add(conceptId));
    });
    return results;
};
export const snomedGetChildren = (id, parentTree )=> {
    return dispatch => {
        // console.log("Get children for", id);
        apiFetch(api(api_endpoint.SNOMED_GET_CHILDREN, id), {
            maxResults: 10,
            sortField:"nodeName",
            startIndex: 0,
            queryRestriction: null,
        }, true)
            .then((res) => {
                const results = prepareChildren(res.trees, parentTree);
                if (results) {
                    const insertPackage = results.get('conceptsToCreate')
                        .set(id, Map({
                            id: id,
                            children: results.get("childrenConcepts"),
                            childrenCount: res.totalCount,
                        }));
                    // console.log(id, results.toJS(), insertPackage.toJS());
                    dispatch({
                        type: snomed_ct_constants.BY_ID.BULK_UPSERT,
                        concepts: insertPackage,
                    });
                }
            }, (err) => {
                // dispatch(handleApiErrors(err))
                // dispatch(reduxUpdateCollectionFetchStatus(collection_id, `search_vendors`, 'idle'))
            });

    }
};

export const snomedCtGetDefinition = id => {
    return dispatch => {
        dispatch({
            type: snomed_ct_constants.BY_ID.CREATE,
            id,
        });
        dispatch(stateFetching(id));
        dispatch(snomedGetNode(id));
        dispatch(snomedGetParentNodes(id));
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