import React from 'react'
import avatar from '../../assets/no-image.png'
import "./Review.css"

function Review({review}) {
    const imageBase = process.env.REACT_APP_IMAGE_BASE;

    
    const [imageError, setImageError] = React.useState(false)

    const [seeMore, setSeeMore] = React.useState(false)
  return (
    <div className="review">
        <div className="avatar-container">
            <img className="avatar" 
              onError = {()=>setImageError(true)}
              src={ imageError? avatar:
                `${imageBase}${review?.author_details.avatar_path}`} 
              />
                <p>{review?.author}</p>
        </div>
        <div className="review-text">
            {
                !seeMore ?
            <p>{review?.content.slice(0, 250)}
            <span
              onClick={()=>setSeeMore(true)}>...seeMore</span></p>
            :
            <p>{review?.content}
            <span
            onClick={()=>setSeeMore(false)}
            >...seeLess</span></p>
            }
        </div>

    </div>
  )
}

export default Review