import {combineReducers} from 'redux-immutable'

import app_state, * as fromAppState from './AppState/app_state_reducers'
import records, * as fromRecords from './Record/records_reducers'

const rootReducer = combineReducers({
    app_state,
    records,
});


// export default rootReducer
export default rootReducer

export const getStats = state =>
    fromAppState.getStats(state.get('app_state'))
export const getModalId = state =>
    fromAppState.getModalId(state.get('app_state'))

export const getRecords = state =>
    fromRecords.getRecords(state.get('records'));
export const getRecord = (state, id) =>
    fromRecords.getRecord(state.get('records'), id);