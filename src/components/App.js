import React from 'react';
import {connect} from 'react-redux';
import {data} from '../data';
import Navbar from './Navbar';
import MovieCard from './MovieCard';
import {addMovies,showFavourite} from '../actions'; 

class App extends React.Component {
  componentDidMount(){
    // const {store} = this.props;
    //make api call
    //dispatch action
    this.props.dispatch(addMovies(data));

    //console.log('STATE', this.props);
  }

  isMovieFavourite = (movie) => {
    const {movies} = this.props;

    const index = movies.favourites.indexOf(movie);

    if(index !== -1)
    {
      //found the movie
      return true;
    }
    return false;
  }
  onChangeTab = (value) =>{
    this.props.dispatch(showFavourite(value));
  }
  render(){
  
  const {movies, search} = this.props; //{movies : {}, search :{}}
  const { list,favourites, showFavourite } = movies; //{list: [], favourites : []}
  // console.log("RENDER",this.props);
  const displayMovie = showFavourite ? favourites : list;
  return (
    <div className="App">
      <Navbar search ={search}/>
      <div className = "main">
        <div className="tabs">
          <div className={`tab ${showFavourite ? '' : 'active'}`} onClick={() => this.onChangeTab(false)}>Movies</div>
          <div className={`tab ${showFavourite ? 'active': ''}`} onClick={() => this.onChangeTab(true)}>Favourites</div>
        </div>
        <div className="list">
          {displayMovie.map((movie,index) => (
            <MovieCard
             movie = {movie} 
             key={`movie-${index}`} 
             dispatch={this.props.dispatch}
             isFavourite={this.isMovieFavourite(movie)}
             />
          ))}
        </div>
        {
          displayMovie.length === 0 ? <div className="no-movies">"no movie in favourite list!!!!"</div> : null
        }
      </div>
    </div>
  );
}
}

// class AppWrapper extends React.Component{
//   render(){
//     return (
//       <StoreContext.Consumer>
//         {(store) => <App store={store}/>}
//       </StoreContext.Consumer>
//     )
//   }
// }
function mapStateToProps(state){
  return{
    movies : state.movies,
    search : state.movies
  };
}
const connectedAppComponent = connect(mapStateToProps)(App);
export default connectedAppComponent;
  