import React, {useContext} from 'react'
import Slider from '../../components/Slider/Slider';
import "./Homepage.css"
import {ThemeContext} from '../../contexts/ThemeContext';
import PopularMovies from '../../components/PopularMovies/PopularMovies';
import TopMovies from '../../components/TopMovies/TopMovies';


function Homepage() {
  
  const {darkMode, setDarkMode} = useContext(ThemeContext)

    const apiKey = process.env.REACT_APP_API_KEY;
    const baseUrl = process.env.REACT_APP_BASE_URL;
    const imageBase = process.env.REACT_APP_IMAGE_BASE;
    console.log(baseUrl)
    
    
    
  return (
    <div className={darkMode?"homepage-container":"homepage-container homepage-light"}>
      <Slider />
      <div className="movies-wrapper">
        <PopularMovies />
        <TopMovies />
      </div>
    </div>
  )
}

export default Homepage