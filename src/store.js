 // --------------- STORE ---------------
 
 import { createStore, applyMiddleware } from 'redux'
 import { composeWithDevTools } from 'redux-devtools-extension'
 import movieReducer from './recommendation/duck'
 import thunk from 'redux-thunk'
 
 const store = createStore(movieReducer, composeWithDevTools(applyMiddleware(thunk)))
 
 export default store