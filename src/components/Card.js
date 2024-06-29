import React from 'react';
import { Link } from 'react-router-dom';

const Card = ({ movies }) => {
  return (
    <div className='container'>
      <div className='row'>
        {movies.map((movie, index) => (
          <div key={index} className='col-md-3'>
              <Link to={`/movie/${movie.rank}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <div className='card'>
                <img src={movie.image} alt={movie.title} className='poster' />
                <div className='movie-details'>
                  <div className='box'>
                    <h5 className='title'>{movie.title}</h5>
                    <p className='rating'>Rating: {movie.rating}</p>
                  </div>
                </div>
              </div>
              </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Card;
