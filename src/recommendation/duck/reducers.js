// ---------- REDUCERS ----------

import types from './types';

const INITIAL_STATE = {
    listName: 'moviesList',
    actualItem: 0,
    list: [

    ]
}

const movieReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {

        // ----- add a movie -----

        case types.ADD_MOVIE:
            return {
                ...state, list: [...state.list, action.item]
            }

        default:
            return state;
    }
}

export default movieReducer