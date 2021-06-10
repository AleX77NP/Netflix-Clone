import React, { useMemo, useState } from 'react'
import styles from './MovieCard.module.css'
import Link from 'next/link'
import PropTypes from 'prop-types';
import {truncate} from '../../utils/strings'
import useWindowDimensions from '../../hooks/useWindowDimensions'
import { useUserContext } from '../../context/userContext';
import { baseURL, baseImgUrl } from '../../constants/api';
import authRequests from '../../api/authRequests';
import { mutate } from 'swr'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {arrayIncludes, arrayIncludesId} from '../../utils/arrays'

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
            console.log(e)
        }
      }
    }

    const likeMovie = async(myMovie, arr, arr2) => {
        console.log('click')
        let url = `${baseURL}/${authRequests.addLike}`
        if(arrayIncludesId(arr2, myMovie.id)) {
            toast.dark('You disliked this movie. You have to remove the dislike first.')
        } else {
            if (arrayIncludesId(arr, myMovie.id)) {
                url = `${baseURL}/${authRequests.removeLike}`
            }
            try {
                let data = {
                    'id': myMovie.id
                }
                const res = await fetch(url, {
                    method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                  },
                  credentials: 'include',
                  body: JSON.stringify(data)
                })
                const resJson = await res.json();
                if(res.status !== 200) {
                    toast.dark('Error occured. Please try again later.')
                    console.log(resJson)
                } else {
                    mutate(`${baseURL}/${authRequests.me}`)
                    toast.dark(resJson.message)
                }
            } catch(e) {
                toast.dark('Error occured. Please try again later.')
                console.log(e)
            }
        }
    }

    const dislikeMovie = async(myMovie, arr, arr2) => {
        console.log('click')
        let url = `${baseURL}/${authRequests.addDislike}`
        if(arrayIncludesId(arr2, myMovie.id)) {
            toast.dark('You liked this movie. You have to remove the dislike first.')
        } else {
            if (arrayIncludesId(arr, myMovie.id)) {
                url = `${baseURL}/${authRequests.removeDislike}`
            }
            try {
                let data = {
                    'id': myMovie.id
                }
                const res = await fetch(url, {
                    method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                  },
                  credentials: 'include',
                  body: JSON.stringify(data)
                })
                const resJson = await res.json();
                if(res.status !== 200) {
                    toast.dark('Error occured. Please try again later.')
                    console.log(resJson)
                } else {
                    mutate(`${baseURL}/${authRequests.me}`)
                    toast.dark(resJson.message)
                }
            } catch(e) {
                toast.dark('Error occured. Please try again later.')
                console.log(e)
            }
        }
    }



    const cardWidth = useMemo(() => {
        return (width/8)-24;
    },[width])

    return (
        <div className={styles.card}
        onMouseEnter={() => setShowDetails(true)}
        onMouseLeave={() => setShowDetails(false)}
        style={{width:  width > 1200 ? `${cardWidth}px` : '120px'}}
        >
            {
                !showDetails ? <img src={`${baseImgUrl}${movie?.backdrop_path}`}
                alt="movie-card"
                className={styles.poster}
            /> : <>
            <img src={`${baseImgUrl}${movie?.backdrop_path}`}
                alt="movie-card"
                className={styles.poster}
            />
            <div className={styles.info}>
            <div className={styles.buttons}>
                <Link href="/play"><button className={styles.button}><img className={styles.icon} src="/images/play_white.png" alt="play" /></button></Link>
                <button onClick={() => addToWatchlist(movie)} className={arrayIncludes(state.authUser.user.watchlist, movie) ? styles.button_orange : styles.button}><img className={styles.icon} src="/images/plus.png" alt="plus" /></button>
                <button onClick={() => likeMovie(movie,state.authUser.user.liked, state.authUser.user.disliked)} className={arrayIncludesId(state.authUser.user.liked, movie.id) ? styles.button_green : styles.button}><img className={styles.icon} src="/images/like.png" alt="like" /></button>
                <button onClick={() => dislikeMovie(movie,state.authUser.user.disliked, state.authUser.user.liked)} className={arrayIncludesId(state.authUser.user.disliked, movie.id) ? styles.button_red : styles.button}><img className={styles.icon} src="/images/dislike.png" alt="dislike" /></button>
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
