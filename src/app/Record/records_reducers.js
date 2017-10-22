import { combineReducers } from 'redux-immutable'
import record from './record_reducers';
import { Map, Set } from 'immutable'

export const record_constants = {
    RECORD_DELETE: 'RECORD_DELETE',
    RECORD_UPDATE: 'RECORD_UPDATE',
    RECORD_UPDATE_STATE: 'RECORD_UPDATE_STATE',
};


const byId = function(state = Map(), action) {
    switch (action.type) {
        case record_constants.RECORD_UPDATE:
        case record_constants.RECORD_UPDATE_STATE:
            return state.update(action.id, r => record(r, action))
        case record_constants.RECORD_DELETE:
            return state.delete(action.id)
        default:
            return state;
    }
};

const records = combineReducers({
    byId
});

export default records;

export const getRecords = state =>
    state.get('byId').valueSeq().toSet();

export const getRecord = (state, id) =>
    state.getIn(['byId', id]);