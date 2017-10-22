import { record_constants } from './records_reducers'
import { Map } from 'immutable'

export const default_record = Map({
    id: "",
    first_name: "",
    last_name: "",
    phone_number: "",
    created_at: undefined,
})

const city = (state = Map({state: 'idle'}), action) => {
    switch (action.type) {
        case record_constants.RECORD_UPDATE:
            return state.merge(Map({
                id: action.id,
                first_name: action.first_name,
                last_name: action.last_name,
                phone_number: action.phone_number,
                created_at: action.created_at
            }));
        case record_constants.RECORD_UPDATE_STATE:
            return state.merge(Map({
                id: action.id,
                state: action.state,
            }));

        default:
            return state;
    }
}
export default city