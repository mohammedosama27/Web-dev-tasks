import { useState } from 'react';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [newMovie, setNewMovie] = useState('');
  const [newReview, setNewReview] = useState('');
  const [rating, setRating] = useState(0);

  const addMovie = () => {
    if (newMovie.trim() !== '') {
      setMovies([...movies, {
        id: Date.now(),
        name: newMovie,
        review: newReview,
        rating: rating
      }]);
      setNewMovie('');
      setNewReview('');
      setRating(0);
    }
  };

  const removeMovie = (movieId) => {
    setMovies(movies.filter(movie => movie.id !== movieId));
  };

  const renderStars = (count) => {
    return '⭐'.repeat(count);
  };

  return (
    <div className="App">
      <h1>Movies Watch List</h1>
      <div className="add-movie-form">
        <input
          type="text"
          value={newMovie}
          onChange={(e) => setNewMovie(e.target.value)}
          placeholder="Enter movie name"
        />
        <textarea
          value={newReview}
          onChange={(e) => setNewReview(e.target.value)}
          placeholder="Write your review"
        />
        <div className="rating-selector">
          <label>Rating: </label>
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              onClick={() => setRating(star)}
              className={star <= rating ? 'star active' : 'star'}
            >
              ⭐
            </span>
          ))}
        </div>
        <button onClick={addMovie}>Add Movie</button>
      </div>

      <div className="movies-list">
        {movies.map(movie => (
          <div key={movie.id} className="movie-card">
            <h3>{movie.name}</h3>
            <p>{movie.review}</p>
            <div className="rating">
              {renderStars(movie.rating)}
            </div>
            <button onClick={() => removeMovie(movie.id)} className="remove-btn">
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;