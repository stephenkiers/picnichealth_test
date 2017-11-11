import { combineReducers } from 'redux-immutable'
// import search_snomed_ct_concept from './snomed_ct_concept_reducers';
import {fromJS, Map, OrderedMap, Set} from 'immutable'
import {immutableNestedGetIn} from "../../utils/utils";


export const snomed_ct_constants = {
    // STATE: {},
    BY_ID: {
        CREATE: "snomed.by_id.create",
        UPSERT_BASIC: "snomed.by_id.upsert_basic",
        UPSERT_PARENTS: "snomed.by_id.upsert_basic",
        UPSERT_CHILDREN: "snomed.by_id.upsert_basic",
    },
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
        case snomed_ct_constants.BY_ID.CREATE:
            return state.has(action.id) ?
                state :
                state.set(action.id, Map({
                    id: action.id
                }));
        case snomed_ct_constants.BY_ID.UPSERT_BASIC:
            return state.set(
                action.id,
                state.get(action.id).mergeDeep(
                    Map({
                        id: action.id,
                        name: action.name,
                        semantic_types: fromJS(action.semantic_types),
                        alternative_terms: fromJS(action.alternative_terms),
                    }))
            );
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
                    results: OrderedMap(),
                    totalCount: 0,
                }));
        case snomed_ct_constants.SEARCH_RESULTS.APPEND:
            return state.set(action.query, Map({
                results: state.getIn([action.query, 'results'])
                    .merge(Set(action.mapOfResults))
                    .sort((a, b) => b.get('score') - a.get('score')),
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


export const getConcept = (snomed_ct_state, id) =>
    immutableNestedGetIn(snomed_ct_state, ['byId', id], undefined);
export const getSearchResultIds = (snomed_ct_state, query) =>
    immutableNestedGetIn(snomed_ct_state, ['searchResults', query], undefined);