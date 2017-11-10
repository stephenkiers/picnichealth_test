import {combineReducers} from 'redux-immutable'

import app_state, * as fromAppState from './AppState/app_state_reducers'
import snomed_ct_concepts, * as fromSnoMedCT from './SnomedCtInput/snomed_ct_concepts_reducers'

const rootReducer = combineReducers({
    app_state,
    snomed_ct_concepts,
});

// export default rootReducer
export default rootReducer