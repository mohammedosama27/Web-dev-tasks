import React from 'react';
import MovieCard from './MovieCard';
import '../styles/MovieList.css';

const MovieList = ({ movies, onDeleteMovie }) => {
    return (
        <div className="movies-list">
            {movies.map(movie => (
                <MovieCard
                    key={movie.id}
                    movie={movie}
                    onDelete={onDeleteMovie}
                />
            ))}
        </div>
    );
};

export default MovieList;