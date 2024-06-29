import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from './Card';
import './style.css';

const Header = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('');
  const [selectedRating, setSelectedRating] = useState('');
  const [uniqueGenres, setUniqueGenres] = useState([]);
  const [uniqueRatings, setUniqueRatings] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const options = {
          method: 'GET',
          url: 'https://imdb-top-100-movies.p.rapidapi.com/',
          headers: {
            'X-RapidAPI-Key': '60d30a81eemsh6fa222c14197340p163372jsn2439873f7917',
            'X-RapidAPI-Host': 'imdb-top-100-movies.p.rapidapi.com'
          }
        };
  
        const response = await axios.request(options);
        setMovies(response.data);
        setLoading(false);
  
        // Extract unique genres and ratings
        const genres = [];
        const ratings = [];
        response.data.forEach(movie => {
          movie.genre.forEach(g => {
            if (!genres.includes(g)) {
              genres.push(g);
            }
          });
  
          const rating = Math.floor(movie.rating);
          if (!ratings.includes(rating)) {
            ratings.push(rating);
          }
        });
        setUniqueGenres(genres);
        setUniqueRatings(ratings);
  
      } catch (error) {
        console.error('Error fetching movie data:', error);
        setError('Error fetching movie data. Please try again later.');
        setLoading(false);
      }
    };
  
    fetchMovies();
  }, []);
  
  const handleInputChange = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
    filterMovies(query, selectedGenre, selectedRating);
  };

  const handleGenreChange = (event) => {
    const genre = event.target.value;
    setSelectedGenre(genre);
    filterMovies(searchQuery, genre, selectedRating);
  };

  const handleRatingChange = (event) => {
    const rating = event.target.value;
    setSelectedRating(rating);
    filterMovies(searchQuery, selectedGenre, rating);
  };

  const filterMovies = (query, genre, rating) => {
    let filtered = movies;

    if (query.trim() !== '') {
      filtered = filtered.filter(movie =>
        movie.title.toLowerCase().includes(query)
      );
    }

    if (genre) {
      filtered = filtered.filter(movie =>
        movie.genre.includes(genre)
      );
    }

    if (rating) {
      filtered = filtered.filter(movie =>
        Math.floor(movie.rating) === parseInt(rating)
      );
    }

    setFilteredMovies(filtered);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <div className='header'>
        <nav>
          <button className="menu-toggle" onClick={toggleMenu}>
            <i class="fa fa-bars"></i>
          </button>
          <ul className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
            <li><a href='/'>Home</a></li>
          </ul>
        </nav>
        <form>
          <div className='search-btn'>
            <input
              type='text'
              placeholder='Enter Movie Name'
              className='inputText'
              value={searchQuery}
              onChange={handleInputChange}
            />
            <button><i className="fa fa-search"></i></button>
          </div>
        </form>
      </div>
      <div className="filters">
        <div>
          <label htmlFor="genre">Genre:</label>
          <select id="genre" value={selectedGenre} onChange={handleGenreChange}>
            <option value="">All</option>
            {uniqueGenres.map((genre, index) => (
              <option key={index} value={genre}>{genre}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="rating">Rating:</label>
          <select id="rating" value={selectedRating} onChange={handleRatingChange}>
            <option value="">All</option>
            {uniqueRatings.map((rating, index) => (
              <option key={index} value={rating}>{rating}</option>
            ))}
          </select>
        </div>
      </div>
      <div className='container movie_container'>
        {searchQuery === '' && !selectedGenre && !selectedRating ? (
          <Card movies={movies} />
        ) : filteredMovies.length === 0 ? (
          <div>
            <h1 className='text-center d-flex justify-content-center'>Not Found</h1>
          </div>
        ) : (
          <Card movies={filteredMovies} />
        )}
      </div>
    </div>
  );
};

export default Header;
