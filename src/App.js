import React from 'react';
import { BrowserRouter as Router, Route, Switch, BrowserRouter, Routes } from 'react-router-dom';
import Header from './components/Header';
import MovieDetails from './components/MovieDetails';
import './components/style.css';
// import './App.css';


function App() {
  return (
    <div className="App">
     <BrowserRouter>
      <Routes>
        <Route path="/" element={<Header />}>
        <Route path="/movie/:rank" element={<MovieDetails />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
