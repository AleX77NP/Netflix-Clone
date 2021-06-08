import React, { useCallback, useState } from 'react'
import styles from './MovieCard.module.css'
import PropTypes from 'prop-types';
import {truncate} from '../../utils/strings'
import useWindowDimensions from '../../hooks/useWindowDimensions'
import { useUserContext } from '../../context/userContext';
import { baseURL, baseImgUrl } from '../../constants/api';
import authRequests from '../../api/authRequests';
import { mutate } from 'swr'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MovieCard = ({movie}) => {

    const [showDetails, setShowDetails] = useState(false)
    const { width } = useWindowDimensions();

    const {state} = useUserContext();

    const addToWatchlist = async(myMovie) => {
        let data = {
            'movie': myMovie
        }
        if(state.authUser.user.watchlist.some(elem => elem.id === myMovie.id)) {
            toast.dark('This movie is already in Your watchlist.')
        } else {
        try {
            const res = await fetch(`${baseURL}/${authRequests.addWatchlist}`, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                  },
                  credentials: 'include',
                  body: JSON.stringify(data)
            })
            const resJson = await res.json()
            if(res.status !== 200) {
                toast.dark('Error occured. Please try again later.')
                console.log(resJson)
            } else {
                mutate(`${baseURL}/${authRequests.me}`)
                toast.dark(resJson.message)
            }
        } catch(e) {
            toast.dark('Error occured. Please try again later.')
        }
      }
    }


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
                <button onClick={() => addToWatchlist(movie)} className={styles.button}><img className={styles.icon} src="/images/plus.png" alt="plus" /></button>
                <button className={styles.button}><img className={styles.icon} src="/images/like.png" alt="like" /></button>
                <button className={styles.button}><img className={styles.icon} src="/images/dislike.png" alt="dislike" /></button>
            </div>
            <p className={styles.rating}>{movie?.vote_average}/10 <span className={styles.popularity}>Popularity: {movie?.popularity}</span></p>
            <h6 className={styles.title}>{movie?.title || movie?.name || movie?.original_name}</h6>
            <p className={styles.overview}>{truncate(movie?.overview,200)}</p>
            </div>
            <ToastContainer />
            </>
            }
        </div>
    )
}

MovieCard.propTypes = {
    movie: PropTypes.object
}


export default MovieCard
