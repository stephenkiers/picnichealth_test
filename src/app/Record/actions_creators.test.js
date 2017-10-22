import {reduxRecordUpdate, reduxRecordDelete, reduxRecordUpdateState } from './actions'
import {record_constants} from "./records_reducers";

describe('reduxRecordUpdate', () => {
    it('should create an action to update a record', () => {
        const id = '12345',
            first_name = "FirstName",
            last_name = "LastName",
            phone_number = "5555555555",
            created_at = 12345;
        const expectedAction = {
            type: record_constants.RECORD_UPDATE,
            id,
            first_name,
            last_name,
            phone_number,
            created_at,
        };
        expect(reduxRecordUpdate(id, first_name, last_name, phone_number, created_at)).toEqual(expectedAction);
    })
});
describe('reduxRecordDelete', () => {
    it('should create an action to update the site stats', () => {
        const id = 123;
        const expectedAction = {
            type: record_constants.RECORD_DELETE,
            id
        };
        expect(reduxRecordDelete(id)).toEqual(expectedAction);
    })
});
describe('reduxRecordUpdateState', () => {
    it('should create an action to update the site stats', () => {
        const id = 1,
            state = 'newState';
        const expectedAction = {
            type: record_constants.RECORD_UPDATE_STATE,
            id,
            state
        };
        expect(reduxRecordUpdateState(id, state)).toEqual(expectedAction);
    })
});