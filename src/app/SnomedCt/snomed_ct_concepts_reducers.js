import { combineReducers } from 'redux-immutable'
// import search_snomed_ct_concept from './snomed_ct_concept_reducers';
import { Map, Set } from 'immutable'
import {immutableNestedGetIn} from "../../utils/utils";


export const snomed_ct_constants = {
    // STATE: {},
    BY_ID: {},
    SEARCH_RESULTS: {
        CREATE: "snomed.search_results.create",
        APPEND: "snomed.search_results.append",
    },
};
// const state = (state = Map(), action) => {
//     switch (action.type) {
//         default:
//             return state;
//     }
// };
const byId = (state = Map(), action) => {
    switch (action.type) {
        default:
            return state;
    }
};
const searchResults = (state = Map(), action) => {
    switch (action.type) {
        case snomed_ct_constants.SEARCH_RESULTS.CREATE:
            return state.has(action.query) ?
                state :
                state.set(action.query, Map({
                    results: Map(),
                    totalCount: undefined,
                }));
        case snomed_ct_constants.SEARCH_RESULTS.APPEND:
            return state.set(action.query, Map({
                results: state.get(action.query)
                    .merge(Set(action.mapOfResults)),
                totalCount: action.totalCount
            }));
        default:
            return state;
    }
};

const snomed_ct_concepts = combineReducers({
    // state,
    byId,
    searchResults
});

export default snomed_ct_concepts;


export const getSearchResultIds = (snomed_ct_state, query) =>
    immutableNestedGetIn(snomed_ct_state, ['searchResults', query], undefined);