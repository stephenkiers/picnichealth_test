import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import {apiGetStatsUpdate} from './actions'
import {app_state_constants} from "./app_state_reducers";

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('apiGetStatsUpdate', () => {

    it('creates reduxAppStateUpdateStats when data is fetched', () => {
        const total_records = 125,
            avg_per_hour = 3.02,
            records_last_hour_ratio = 0;

        const expectedActions = [{
            type: app_state_constants.APP_STATE_UPDATE_STATS,
            total_records,
            avg_per_hour,
            records_last_hour_ratio
        }];
        const store = mockStore({ app_state: {} })

        return store
            .dispatch(apiGetStatsUpdate(0))
            .then(() => {
                // return of async actions
                expect(store.getActions()).toEqual(expectedActions)
            });
    })
});