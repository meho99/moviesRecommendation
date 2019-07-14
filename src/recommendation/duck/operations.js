// ---------- SERVER COMMUNICATION ----------

import actions from './actions';

const fetchMovies = async (Data = { hello: 'world' }, method = 'GET', where = '/recommendations') => {

    const response = await fetch(`/${where}`, { method: method, body: JSON.stringify(Data) })
    const json = await response.json()

    return json
}



// ----- gell movies list from server -----

export const getAllMovies = () =>
    async (dispatch) => {

        // const movies = await fetchMovies() // ---------- if the server really worked ----------

        const movies = [ // ----- assume that backend returned this data -----
            {
                id: '1and3011',
                imageURL: 'https://images-na.ssl-images-amazon.com/images/M/MV5BMTUzNTE2NTkzMV5BMl5BanBnXkFtZTgwMDAzOTUyMDI@._V1_SY1000_CR0,0,674,1000_AL_.jpg',
                title: 'Inferno',
                summary: 'Lorem ipsum….',
                rating: 5.3
            },
            {
                id: '2301abc',
                imageURL: 'https://images-na.ssl-images-amazon.com/images/M/MV5BOTAzODEzNDAzMl5BMl5BanBnXkFtZTgwMDU1MTgzNzE@._V1_SY1000_CR0,0,677,1000_AL_.jpg',
                title: 'Star Wars: Episode VII - The Force Awakens',
                summary: 'Lorem ipsum….',
                rating: 8.2
            }
        ]
        
        // ------ add all movies -----

        movies.map(movie=>{
            dispatch(actions.addMovie(movie))
        })

    }
