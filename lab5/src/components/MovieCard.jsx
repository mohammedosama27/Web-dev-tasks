import React from 'react';
import '../styles/MovieCard.css';

const MovieCard = ({ movie, onDelete }) => {
    const renderStars = (count) => {
        return '⭐'.repeat(count);
    };

    return (
        <div className="movie-card">
            <h3>{movie.name}</h3>
            <p className="review">{movie.review}</p>
            <div className="rating">
                {renderStars(movie.rating)}
            </div>
            <button onClick={() => onDelete(movie.id)} className="remove-btn">
                Remove
            </button>
        </div>
    );
};

export default MovieCard;