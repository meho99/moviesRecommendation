// ----------  ACTIONS  ----------

import types from './types';

const addMovie = item =>({
    type: types.ADD_MOVIE, item
})

const nextMovie = () =>({
    type: types.NEXT_MOVIE
})

export default{
    addMovie,
    nextMovie
}

