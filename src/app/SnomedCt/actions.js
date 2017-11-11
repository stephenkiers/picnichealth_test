import {snomed_ct_constants} from "./snomed_ct_concepts_reducers";
export const stateIdle = id => ({
    type: snomed_ct_constants.BY_ID.STATE_IDLE,
    id
});
export const stateFetching = id => ({
    type: snomed_ct_constants.BY_ID.STATE_FETCHING,
    id
});