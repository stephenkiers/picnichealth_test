import { combineReducers } from 'redux-immutable'
import thing from './thing_reducers';
import { Map, Set } from 'immutable'

export const thing_constants = {
    THING_UPSERT: 'THING_UPSERT',
    THING_DELETE: 'THING_DELETE',
};

const byId = function(state = Map(), action) {
    switch (action.type) {
        case thing_constants.THING_UPSERT:
            return state.update(action.id, r => thing(r, action));
        case thing_constants.THING_DELETE:
            return state.delete(action.id);
        default:
            return state;
    }
};

const records = combineReducers({
    byId
});

export default records;

export const getArrayOfThingIds = state =>
    state.get('byId').valueSeq().toSet();

export const getThing = (state, id) =>
    state.getIn(['byId', id]);