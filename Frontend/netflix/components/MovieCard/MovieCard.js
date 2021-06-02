import React, { useCallback, useState } from 'react'
import styles from './MovieCard.module.css'
import PropTypes from 'prop-types';
import {truncate} from '../../utils/strings'
import useWindowDimensions from '../../hooks/useWindowDimensions'

const baseImgUrl = "https://image.tmdb.org/t/p/original";

const MovieCard = ({movie}) => {

    const [showDetails, setShowDetails] = useState(false)
    const { width } = useWindowDimensions();

    const cardWidth = useCallback(() => {
        return (width/8)-24;
    },[width])

    return (
        <div className={styles.card}
        onMouseEnter={() => setShowDetails(true)}
        onMouseLeave={() => setShowDetails(false)}
        style={{width:  width > 1200 ? `${cardWidth()}px` : '120px'}}
        >
            {
                !showDetails ? <img src={`${baseImgUrl}${movie?.backdrop_path}`}
                alt="movie_poster"
                className={styles.poster}
            /> : <>
            <img src={`${baseImgUrl}${movie?.backdrop_path}`}
                alt="movie_poster"
                className={styles.poster}
            />
            <div className={styles.info}>
            <div className={styles.buttons}>
                <button className={styles.button}><img className={styles.icon} src="/images/play_white.png" alt="play" /></button>
                <button className={styles.button}><img className={styles.icon} src="/images/plus.png" alt="plus" /></button>
                <button className={styles.button}><img className={styles.icon} src="/images/like.png" alt="like" /></button>
                <button className={styles.button}><img className={styles.icon} src="/images/dislike.png" alt="dislike" /></button>
            </div>
            <p className={styles.rating}>{movie?.vote_average}/10 <span className={styles.popularity}>Popularity: {movie?.popularity}</span></p>
            <h6 className={styles.title}>{movie?.title || movie?.name || movie?.original_name}</h6>
            <p className={styles.overview}>{truncate(movie?.overview,200)}</p>
            </div>
            </>
            }
        </div>
    )
}

MovieCard.propTypes = {
    movie: PropTypes.object
}


export default MovieCard
