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
        
        // ----- go to next movie -----

        case types.NEXT_MOVIE:
            let actual;
            if(state.list.length === state.actualItem+ 1)
                actual= 0;
            else
                actual= state.actualItem+ 1
            return {
                ... state, actualItem: actual
            }

        default:
            return state;
    }
}

export default movieReducer