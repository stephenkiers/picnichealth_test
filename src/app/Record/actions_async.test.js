import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import {apiRecordDelete, apiRecordGetLatest, apiRecordUpdate} from './actions'
import {record_constants} from "./records_reducers";
import {app_state_constants} from "../AppState/app_state_reducers";

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('apiRecordGetLatest', () => {
    it('creates a lot of test data for the app', () => {
        const store = mockStore({ records: {} })
        return store
            .dispatch(apiRecordGetLatest())
            .then(() => {
                expect(store.getActions().length).toEqual(10)
                expect(store.getActions()[0].type).toEqual(record_constants.RECORD_UPDATE)
            });
    })
});
describe('apiRecordUpdate', () => {
    it('creates an update action', () => {
        const store = mockStore({ records: {} })
        const id = '12345',
            first_name = "FirstName",
            last_name = "LastName",
            phone_number = "5555555555",
            created_at = 12345;
        const expectedActions = [
            {
                type: record_constants.RECORD_UPDATE_STATE,
                state: 'saving',
                id
            },
            {
                type: record_constants.RECORD_UPDATE,
                id,
                first_name,
                last_name,
                phone_number,
                created_at,
            },
            {
                type: record_constants.RECORD_UPDATE_STATE,
                state: 'idle',
                id
            },
            {
                type: app_state_constants.APP_STATE_SET_MODAL_TYPE_ID,
                id: undefined
            }
        ];

        return store
            .dispatch(apiRecordUpdate(id, first_name, last_name, phone_number, created_at))
            .then(() => {
                expect(store.getActions()).toEqual(expectedActions)
            });
    })
});
describe('apiRecordDelete', () => {
    it('creates an delete action', () => {
        const store = mockStore({ records: {} })
        const id = '12345';
        const expectedActions = [
            {
                type: record_constants.RECORD_UPDATE_STATE,
                state: 'deleting',
                id
            },
            {
                type: record_constants.RECORD_DELETE,
                id,
            },
            {
                type: app_state_constants.APP_STATE_SET_MODAL_TYPE_ID,
                id: undefined
            }
        ];

        return store
            .dispatch(apiRecordDelete(id))
            .then(() => {
                expect(store.getActions()).toEqual(expectedActions)
            });
    })
});