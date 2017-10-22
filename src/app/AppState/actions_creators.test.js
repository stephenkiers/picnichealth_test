import {reduxAppStateSetModalId, reduxAppStateUpdateStats} from './actions'
import {app_state_constants} from "./app_state_reducers";

describe('reduxAppStateSetModalId', () => {
    it('should create an action to set the modal id', () => {
        const id = '12345'
        const expectedAction = {
            type: app_state_constants.APP_STATE_SET_MODAL_TYPE_ID,
            id
        };
        expect(reduxAppStateSetModalId(id)).toEqual(expectedAction);
    })
});
describe('reduxAppStateUpdateStats', () => {
    it('should create an action to update the site stats', () => {
        const total_records = 1,
            avg_per_hour = 2,
            records_last_hour_ratio = 3;
        const expectedAction = {
            type: app_state_constants.APP_STATE_UPDATE_STATS,
            total_records,
            avg_per_hour,
            records_last_hour_ratio,
        };
        expect(reduxAppStateUpdateStats(total_records, avg_per_hour, records_last_hour_ratio)).toEqual(expectedAction);
    })
});