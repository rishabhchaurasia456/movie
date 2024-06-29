import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const MovieDetails = () => {
  const { rank } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const options = {
          method: 'GET',
          url: `https://imdb-top-100-movies.p.rapidapi.com/${rank}`,
          headers: {
            'X-RapidAPI-Key': '60d30a81eemsh6fa222c14197340p163372jsn2439873f7917',
            'X-RapidAPI-Host': 'imdb-top-100-movies.p.rapidapi.com'
          }
        };

        const response = await axios.request(options);
        setMovie(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching movie details:', error);
        setError('Error fetching movie details. Please try again later.');
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [rank]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
        <div className='container'>
            <div className='row'>
                <div className='col-md-6'>
                    <img src={movie.big_image} alt={movie.title} />
                </div>
                <div className='col-md-6'>
                    <h1>{movie.title}</h1>
                    <p>Genres: {movie.genre.join(', ')}</p>
                    <p>Rating: {movie.rating}</p>
                    <a href={movie.imdb_link} target="_blank" rel="noopener noreferrer">IMDb Link</a>
                </div>
            </div>
            <div className='row'>
                <h5>Description</h5>
                <p>{movie.description}</p>
            </div>
        </div>     
    </div>
  );
};

export default MovieDetails;
