// ---------- SERVER COMMUNICATION ----------


import actions from './actions';

export const fetchMovies = async (Data = { hello: 'world' }, method = 'GET', where = 'recommendations') => {

    const response = await fetch(`https://myDotServer/${where}`, { method: method, body: JSON.stringify(Data) })
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
            },
            {
                id:'isleofdogs01',
                imageURL : 'https://1.fwcdn.pl/an/np/49468/2017/12980.7.jpg',
                title: 'Isle of Dogs',
                summary: 'Lorem ipsum….',
                rating: 7.8
            },
            {
                id :'it001001',
                imageURL:'https://images-na.ssl-images-amazon.com/images/I/61bMkkwpduL._SY679_.jpg',
                title: 'It',
                summary: 'Lorem ipsum….',
                rating: 6.7
            }
        ]

        // ------ add all movies -----

        movies.map(movie => {
            dispatch(actions.addMovie(movie))
        })
    }

// ----- accept/reject recommendation -----

export const accept_rejectMovie = (action) =>
    async (dispatch) => {

        fetchMovies({ hello: 'world' }, 'PUT', `recommendations/${action.id}/${action.action}`);

        // ----- go to next movie -----
        dispatch(actions.nextMovie())
    }

