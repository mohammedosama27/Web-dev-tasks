import React, { useState } from 'react';
import '../styles/MovieForm.css';

const MovieForm = ({ onAddMovie }) => {
    const [newMovie, setNewMovie] = useState('');
    const [newReview, setNewReview] = useState('');
    const [rating, setRating] = useState(0);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (newMovie.trim() !== '') {
            onAddMovie({
                id: Date.now(),
                name: newMovie,
                review: newReview,
                rating: rating
            });
            setNewMovie('');
            setNewReview('');
            setRating(0);
        }
    };

    return (
        <form className="movie-form" onSubmit={handleSubmit}>
            <input
                type="text"
                value={newMovie}
                onChange={(e) => setNewMovie(e.target.value)}
                placeholder="Enter movie name"
                required
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
            <button type="submit">Add Movie</button>
        </form>
    );
};

export default MovieForm;