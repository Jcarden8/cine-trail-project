import React from 'react'
import "./MovieCard.css"
import Rating from '../Rating/Rating';
import {Link} from 'react-router-dom'

function MovieCard({movie, imageUrl, imgHeight, radius, cardStyle}) {
    const imageBase = process.env.REACT_APP_IMAGE_BASE;

    const imageStyle={
        height: imgHeight,
        width: "200px",
        backgroundImage: `url("${imageBase}${imageUrl}")`,
        borderRadius: radius,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative" 
    }
  return (
    <Link className={cardStyle} 
         to={`/moviedetails/${movie?.id}`}>
        <div style={imageStyle}>
            <div className="movie-info-top">
                <p>{movie.vote_average}</p>
            </div>
            <div className="movie-info-bottom">
                <p>{movie.title}</p>
                <Rating stars={movie?.vote_average/2}/>
            </div>
        </div>
        {
                cardStyle==="top-rated-card"?
                <p>{movie.title}</p>
                :
                null
            }
    </Link>
  )
}

export default MovieCard