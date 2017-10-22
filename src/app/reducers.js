import {combineReducers} from 'redux-immutable'

import app_state, * as fromAppState from './AppState/app_state_reducers'
import things, * as fromThings from './Thing/things_reducers'

const rootReducer = combineReducers({
    app_state,
    things,
});


// export default rootReducer
export default rootReducer

export const getArrayOfThingIds = state =>
    fromThings.getArrayOfThingIds(state.get('things'));
export const getThing = (state, id) =>
    fromThings.getThing(state.get('things'), id);