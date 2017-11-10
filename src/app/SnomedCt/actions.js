import {snomed_ct_constants} from './snomed_ct_concepts_reducers'

export const createSearchKey = (query) => ({
    type: snomed_ct_constants.SEARCH_RESULTS.CREATE,
    query,
});
export const updateSearchResults = (query, mapOfResults, totalCount) => ({
    type: snomed_ct_constants.SEARCH_RESULTS.APPEND,
    query,
    mapOfResults,
    totalCount
});
// export bulkAddSearchResults =
