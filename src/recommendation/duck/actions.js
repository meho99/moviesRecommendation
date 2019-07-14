// ----------  ACTIONS  ----------

import types from './types';

const addMovie = item =>({
    type: types.ADD_MOVIE, item
})

export default{
    addMovie
}

