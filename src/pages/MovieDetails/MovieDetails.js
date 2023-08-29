import React from 'react'
import {useParams} from 'react-router-dom'
import "./MovieDetails.css"
import axios from 'axios'
import ReactPlayer from 'react-player'
import Review from '../../components/Review/Review'
import Rating from '../../components/Rating/Rating';


function MovieDetails() {
    const apiKey = process.env.REACT_APP_API_KEY;
    const baseUrl = process.env.REACT_APP_BASE_URL;
    const imageBase = process.env.REACT_APP_IMAGE_BASE;

    const {movieId} = useParams();

    
    const [videoLink, setVideoLink] = React.useState('')
    const [movie, setMovie] = React.useState()
    const [rating, setRating] = React.useState(0)

    
    const [reviews, setReviews] = React.useState([])

    
    const [reviewNumber, setReviewNumber] = React.useState(3)
    const [totalReviews, setTotalReviews] = React.useState(0)


    React.useEffect(
        ()=>{
            
            axios.get(`${baseUrl}/movie/${movieId}/videos?api_key=${apiKey}`)
            .then(res =>{
                
                const youTubeLinks = res.data.results.filter(
                    item => item.site==="YouTube" &&
                    item.type==="Trailer"
                )
                
                setVideoLink(youTubeLinks[0].key)
                
            })
            .catch(err => console.log(err))

            
            axios.get(`${baseUrl}/movie/${movieId}?api_key=${apiKey}`)
            .then(res =>{
                
                setMovie(res.data)
                setRating(res.data.vote_average/2)
            })
            .catch(err => console.log(err))


            axios.get(`${baseUrl}/movie/${movieId}/reviews?api_key=${apiKey}`)
            .then(res =>{
                
                setReviews(res.data.results)
                setTotalReviews(res.data.total_results)
            })
            .catch(err => console.log(err))

        },[]
    )
  return (
    <div className="details-container">
        {
            videoLink ?
            <div className="trailer-container">
                <ReactPlayer 
                   className="trailer-player"
                   url={`https://www.youtube.com/watch?v=${videoLink}`}
                   width="100%"
                   height="100%"
                />
            </div>
            :
            <div className="trailer-container-blank"
            style={
                {
                  backgroundImage:`url("${imageBase}/${movie?.backdrop_path}")`,
                  backgroundPosition:"center",
                  backgroundSize:"cover"
                 }}   >
            <p>No Trailer Found</p>
            </div>
        }
        <div className="title-container">
            <h2>{movie?.title}</h2>
        </div>
        <Rating stars={rating} />
        <div className="info-container">
            <img src={`${imageBase}/${movie?.poster_path}`}
                 className="details-poster" />
            <div className="movie-details-info">
                <h2>{movie?.tagline}</h2>
                <h4>{movie?.overview}</h4>
                <h4>Status: <span>{movie?.status}</span></h4>
                <h4>Runtime: <span>{movie?.runtime}</span></h4>
                <h4>Budget: <span>{movie?.budget}</span></h4>
            </div>
        </div>
        <div className="review-container">
           {
            reviews.slice(0, reviewNumber).map(item=><Review review={item} />)
           }
        </div>
        {
            reviewNumber  <= totalReviews ?
        <p onClick={()=>setReviewNumber(reviewNumber + 3)}>Read more reviews</p>
        :
        <p onClick={()=>setReviewNumber(3)}>End of reviews</p>

        }
    </div>
  )
}

export default MovieDetails