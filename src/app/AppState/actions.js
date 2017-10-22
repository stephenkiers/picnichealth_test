import {app_state_constants} from "./app_state_reducers";


export const reduxAppStateSetModalId = id => ({
    type: app_state_constants.APP_STATE_SET_MODAL_TYPE_ID,
    id,
});
export const reduxAppStateUpdateStats = (total_records, avg_per_hour, records_last_hour_ratio) => ({
    type: app_state_constants.APP_STATE_UPDATE_STATS,
    total_records,
    avg_per_hour,
    records_last_hour_ratio,
});

let total_records_cache = 125,
    records_last_hour_ratio_cache = 0;

export const apiGetStatsUpdate = (nu_to_change_by) => {
    return dispatch => {
        // GET 'v1/records/stats'
        // this would be better using websockets, but I illustrated with simple polling
        const fake_fetch = new Promise((resolve, reject) => {
            setTimeout(function(){
                resolve(typeof nu_to_change_by === "undefined" ?  (Math.floor(Math.random() * 5) + 1) - 2 : nu_to_change_by);
            }, 250);
        })
        return fake_fetch.then(res => {
            dispatch(reduxAppStateUpdateStats(
                total_records_cache + res,
                3.02,
                records_last_hour_ratio_cache + res
            ));
        }).catch(err => {
            //handleErr
        })
    }
}