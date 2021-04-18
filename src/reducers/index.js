import { combineReducers } from 'redux';
import {ADD_MOVIES, ADD_FAVOURITE, REMOVE_FROM_FAVOURITE, SET_SHOW_FAVOURITE} from '../actions';
const initialMoviesState = {
    list : [],
    favourites: [],
    showFavourite : false
}

export function movies(state = initialMoviesState, action ){
        // if(action.type === ADD_MOVIES)
        // {
        //     return {
        //         ...state,
        //         list : action.movies
        //     }
        // }
        // return state;
        console.log('MOVIE REDuCER');
        switch(action.type){
            case ADD_MOVIES:
                return {
                    ...state,
                    list : action.movies
                }
            case ADD_FAVOURITE:
                return {
                    ...state,
                    favourites : [action.movie, ...state.favourites]
                }
                case REMOVE_FROM_FAVOURITE :
                    const filteredArray = state.favourites.filter(
                        movie => movie.Title !== action.movie.Title
                    );
                    return {
                        ...state,
                        favourites : filteredArray
                    }
                case SET_SHOW_FAVOURITE:
                    return {
                        ...state,
                        showFavourite : action.val
                    }
            default :
            return state;
        }
}

const inititialSearchState = {
     result : {} 
};
export function search(state = inititialSearchState, action)
{
    console.log('SEARCH REDUCER');
    return state;
}

const initialRootState = {
    movies : initialMoviesState,
    search : inititialSearchState
};
// export default function rootReducer(state = initialRootState, action){
//     return {
//         movies : movies(state.movies, action),
//         search : search(state.search, action)
//     }
// }
export default combineReducers({
    movies,
    search
})