import { combineReducers } from 'redux';
import {ADD_MOVIES, ADD_FAVOURITE, REMOVE_FROM_FAVOURITE, SET_SHOW_FAVOURITE,ADD_MOVIE_TO_LIST,ADD_SEARCH_RESULT} from '../actions';
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
        console.log('MOVIE REDUCER');
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
                case ADD_MOVIE_TO_LIST :
                    return{
                        ...state,
                        list : [action.movie, ...state.list]
                    };
            default :
            return state;
        }
}

const inititialSearchState = {
     result : {} ,
     showSearchResults : false
};
export function search(state = inititialSearchState, action)
{
    
    // console.log('SEARCH REDUCER');
    switch(action.type)
    {
        case ADD_SEARCH_RESULT :
            //console.log('SEARCHED MOVIE', action.movie);
                    return{
                        ...state,
                        result : action.movie,
                        showSearchResults : true
            };
        case ADD_MOVIE_TO_LIST :
            console.log('checking state : ',state);
            return{
                ...state,
                showSearchResults : false
            };
        default :
            return state;
    }
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