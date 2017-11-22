import { combineReducers } from 'redux-immutable'
import { Map, Set } from 'immutable'

export const gdax_quote_constants = {
    GDAX_ADD_QUOTE: 'GDAX_ADD_QUOTE',
};

const byId = function(state = Map(default_things), action) {
    switch (action.type) {
        case thing_constants.THING_UPSERT:
            const upsert_id = action.id || (new Date).getTime();
            return state.update(
                upsert_id.toString(),
                r => thing(r, {
                    ...action,
                    id: upsert_id.toString(),
                })
            );
        case thing_constants.THING_DELETE:
            return state.delete(action.id);
        default:
            return state;
    }
};

const quotes = combineReducers({
    byId
});

export default quotes;

export const getArrayOfThingIds = state =>
    state.get('byId').keySeq().toSet();

export const getThing = (state, id) =>
    state.getIn(['byId', id]);