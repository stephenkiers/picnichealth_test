import { snomed_ct_concepts_constants } from './snomed_ct_concepts_reducers'
import { Map } from 'immutable'

const default_record = Map({ // export for testing
    id: "",
    name: "",
});

const search_snomed_ct_concept = (state = Map(default_record), action) => {
    switch (action.type) {
        case thing_constants.THING_UPSERT:
            return state.merge(Map({
                id: action.id,
                name: action.name,
            }));
        default:
            return state;
    }
};
export default search_snomed_ct_concept