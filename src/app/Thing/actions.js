import {thing_constants} from './things_reducers'

export const thingUpsert = (id, name) => ({
    type: thing_constants.THING_UPSERT,
    id,
    name,
});
export const thingDelete = (id, name) => ({
    type: thing_constants.THING_DELETE,
    id,
    name,
});