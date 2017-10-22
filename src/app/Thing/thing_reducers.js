import { thing_constants } from './things_reducers'
import { Map } from 'immutable'

const default_record = Map({ // export for testing
    id: "",
    name: "",
});

const thing = (state = Map(default_record), action) => {
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
export default thing