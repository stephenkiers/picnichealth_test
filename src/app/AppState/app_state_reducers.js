import { Map, Set } from 'immutable'

export const app_state_constants = {
    APP_STATE_SET_MODAL_TYPE_ID: 'APP_STATE_SET_MODAL_TYPE_ID',
    APP_STATE_UPDATE_STATS:'APP_STATE_UPDATE_STATS',
};

const app_state = function(state = Map({
    modal_id: undefined,
    stats: Map({
        total_records: 0,
        avg_per_hour: 0,
        records_last_hour_ratio: 0,
    })
}), action) {
    switch (action.type) {
        case app_state_constants.APP_STATE_SET_MODAL_TYPE_ID:
            return state.set('modal_id', action.id);
        case app_state_constants.APP_STATE_UPDATE_STATS:
            return state
                .setIn(['stats', 'total_records'], action.total_records)
                .setIn(['stats', 'avg_per_hour'], action.avg_per_hour)
                .setIn(['stats', 'records_last_hour_ratio'], action.records_last_hour_ratio);
        default:
            return state;
    }
};

export default app_state;

export const getModalId = state =>
    state.get('modal_id');
export const getStats = state =>
    state.get('stats');