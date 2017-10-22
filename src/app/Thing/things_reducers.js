import { combineReducers } from 'redux-immutable'
import thing from './thing_reducers';
import { Map, Set } from 'immutable'

export const thing_constants = {
    THING_UPSERT: 'THING_UPSERT',
    THING_DELETE: 'THING_DELETE',
};

const default_things = {
    1: thing(Map(), {
        type: thing_constants.THING_UPSERT,
        id: 1,
        name: 'Steve',
    }),
    2: thing(Map(), {
        type: thing_constants.THING_UPSERT,
        id: 2,
        name: 'Jenelle',
    }),
};

const byId = function(state = Map(default_things), action) {
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
    state.get('byId').keySeq().toSet();

export const getThing = (state, id) =>
    state.getIn(['byId', id]);