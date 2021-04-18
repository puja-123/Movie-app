import React from 'react';
import {data} from '../data';
import Navbar from './Navbar';
import MovieCard from './MovieCard';
import {addMovies,showFavourite} from '../actions'; 
class App extends React.Component {
  componentDidMount(){
    const {store} = this.props;
    store.subscribe(() => {
      console.log('UPDATED');
      this.forceUpdate();
    });
    //make api call
    //dispatch action
    store.dispatch(addMovies(data));

    console.log('STATE', this.props.store.getState());
  }

  isMovieFavourite = (movie) => {
    const {favourites} = this.props.store.getState();

    const index = favourites.indexOf(movie);

    if(index !== -1)
    {
      //found the movie
      return true;
    }
    return false;
  }
  onChangeTab = (value) =>{
    this.props.store.dispatch(showFavourite(value));
  }
  render(){
  const { list,favourites, showFavourite } = this.props.store.getState(); //{list: [], favourites : []}
  console.log("RENDER",this.props.store.getState());
  const displayMovie = showFavourite ? favourites : list;
  return (
    <div className="App">
      <Navbar />
      <div className = "main">
        <div className="tabs">
          <div className={`tab ${showFavourite ? '': 'active'}`} onClick={() => this.onChangeTab(false)}>Movies</div>
          <div className={`tab ${showFavourite ? 'active': ''}`} onClick={() => this.onChangeTab(true)}>Favourites</div>
        </div>
        <div className="list">
          {displayMovie.map((movie,index) => (
            <MovieCard
             movie = {movie} 
             key={`movie-${index}`} 
             dispatch={this.props.store.dispatch}
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
export default App;
  