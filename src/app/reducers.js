import {combineReducers} from 'redux-immutable'

import app_state, * as fromAppState from './AppState/app_state_reducers'
import snomed_ct_concepts, * as fromSnomedCTConcepts from './SnomedCt/snomed_ct_concepts_reducers'

const rootReducer = combineReducers({
    app_state,
    snomed_ct_concepts,
});

// export default rootReducer
export default rootReducer

export const getSearchResultIds = (state, query) =>
    fromSnomedCTConcepts.getSearchResultIds(state.snomed_ct_concepts, query);