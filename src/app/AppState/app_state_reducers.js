import {Map} from 'immutable'

export const app_state_constants = {
};

const default_app_state = {};

const app_state = function(state = Map(default_app_state), action) {
    switch (action.type) {
        default:
            return state;
    }
};

export default app_state;

// export const getSomething = (state, id) =>
//     state.get(id);