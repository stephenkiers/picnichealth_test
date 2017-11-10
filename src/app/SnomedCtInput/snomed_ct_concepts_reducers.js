import { combineReducers } from 'redux-immutable'
import search_snome_dct_concept from './snomed_ct_concept_reducers';
import { Map, Set } from 'immutable'

export const snomed_ct_concepts_constants = {
};

const byId = function(state = Map(), action) {
    switch (action.type) {
        default:
            return state;
    }
};

const search_snomed_ct_concepts = combineReducers({
    byId
});

export default search_snomed_ct_concepts;