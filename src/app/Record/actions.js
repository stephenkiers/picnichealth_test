import {record_constants} from './records_reducers'
import {reduxAppStateSetModalId} from "../AppState/actions";
import faker from 'faker';
import {generateRandomUUID} from "../utils";

export const reduxRecordUpdate = (id, first_name, last_name, phone_number, created_at) => ({
    type: record_constants.RECORD_UPDATE,
    id,
    first_name,
    last_name,
    phone_number,
    created_at,
});
export const reduxRecordDelete = id => ({
    type: record_constants.RECORD_DELETE,
    id
})
export const reduxRecordUpdateState = (id, state) => ({
    type: record_constants.RECORD_UPDATE_STATE,
    id,
    state,
});

export const apiRecordGetLatest = () => {
    return dispatch => {
        const fake_fetch = new Promise((resolve, reject) => {
            setTimeout(function(){
                let testData = []
                Array.from(new Array(10)).forEach(() => {
                    testData.push({
                        id: generateRandomUUID(),
                        first_name: faker.name.firstName(),
                        last_name: faker.name.lastName(),
                        phone_number: `${Math.floor(1000000000 + Math.random() * 9000000000)}`,
                        created_at: (new Date).getTime() - Math.floor(Math.random() * 1000)
                    })
                })
                resolve(testData);
            }, 500);
        });
        return fake_fetch.then(res => {
            // GET 'v1/records'

            // this is not an ideal seed file, but I don't think it needs to be
            // optimized for this test, as a backend would really be used
            res.forEach(result => {
                dispatch(reduxRecordUpdate(
                    result.id,
                    result.first_name,
                    result.last_name,
                    result.phone_number,
                    result.created_at
                ));
            })
        }).catch(err => {
            //handleErr
        })
    }
}


export const apiRecordUpdate = (id, first_name, last_name, phone_number, created_at) => {
    return dispatch => {
        dispatch(reduxRecordUpdateState(id, 'saving'));
        created_at = created_at || (new Date).getTime();
        const fake_fetch = new Promise((resolve, reject) => {
            //This should be a fetch promise to send attributes to backend.
            // In practice, there would be a catch when/if there are errors
            // POST `v1/records/${id}`
            setTimeout(function() {
                resolve()
            }, 2000)
        });
        return fake_fetch.then(res => {
            dispatch(reduxRecordUpdate(id, first_name, last_name, phone_number, created_at));
            dispatch(reduxRecordUpdateState(id, 'idle'));
            dispatch(reduxAppStateSetModalId(undefined));
        })
    }
}
export const apiRecordDelete = id => {
    return dispatch => {
        dispatch(reduxRecordUpdateState(id, 'deleting'))
        const fake_fetch = new Promise((resolve, reject) => {
            //This should be a fetch promise to send attributes to backend.
            // In practice, there would be a catch when/if there are errors
            // DELETE `v1/records/${id}`
            setTimeout(function() {
                resolve()
            }, 1000)
        });
        return fake_fetch.then(res => {
            dispatch(reduxRecordDelete(id));
            dispatch(reduxAppStateSetModalId(undefined));
        });
    }
}