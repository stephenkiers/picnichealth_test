import { combineReducers } from 'redux-immutable'
// import search_snomed_ct_concept from './snomed_ct_concept_reducers';
import {fromJS, Map, OrderedMap, Set} from 'immutable'
import {immutableNestedGetIn} from "../../utils/utils";


export const snomed_ct_constants = {
    // STATE: {},
    BY_ID: {
        STATE_FETCHING: "snomed.by_id.state.fetching",
        STATE_IDLE: "snomed.by_id.state.idle",
        CREATE: "snomed.by_id.create",
        UPSERT_DEFAULT: "snomed.by_id.upsert.default",
        BULK_UPSERT: "snomed.by_id.bulk.upsert",
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
        case snomed_ct_constants.BY_ID.UPSERT_DEFAULT:
            return state.set(
                action.id,
                state.get(action.id).merge(
                    Map({
                        id: action.id,
                        name: action.name,
                        semantic_types: fromJS(action.semantic_types),
                        alternative_terms: fromJS(action.alternative_terms),
                        obsolete: action.obsolete,
                        complete: true,
                    }))
            );
        case snomed_ct_constants.BY_ID.BULK_UPSERT:
            action.concepts.valueSeq().forEach(concept => {
                const id = concept.get('id');
                if (!state.get(id)) {
                    state = state.set(id, Map());
                }
                state = state.set(id, state.get(id).mergeDeep(concept));
            });
            return state;
        case snomed_ct_constants.BY_ID.STATE_IDLE:
            return state.setIn([action.id, 'state'], 'idle');
        case snomed_ct_constants.BY_ID.STATE_FETCHING:
            return state.setIn([action.id, 'state'], 'fetching');
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
                    state: 'init',
                    results: OrderedMap(),
                    totalCount: 0,
                }));
        case snomed_ct_constants.SEARCH_RESULTS.APPEND:
            return state.set(action.query, Map({
                state: 'idle',
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


const buildResultsFromById = (snomed_ct_state, query) => {
    // check if query is a conceptId that has already been loaded,
    // and return that conceptId as an array
    const concept = getConcept(snomed_ct_state, query);
    if (concept) {
        return Map({
            results: OrderedMap({
                [query]: Map({
                    id: query,
                    name: concept.get('name'),
                    score: 1,
                }),
            }),
            totalCount: 1,
        });
    }
    return undefined;
}
export const getSearchResultIds = (snomed_ct_state, query) => {
    // check if query has been cached already
    const queryResults = immutableNestedGetIn(snomed_ct_state, ['searchResults', query], undefined);
    return queryResults ? queryResults : buildResultsFromById(snomed_ct_state, parseInt(query));
}