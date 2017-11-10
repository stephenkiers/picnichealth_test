import {snomed_ct_constants} from './snomed_ct_concepts_reducers'

export const searchStart = (query) => ({
    type: snomed_ct_constants.SEARCH_RESULTS.START,
    query,
});
