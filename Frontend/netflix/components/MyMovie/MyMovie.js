import React from 'react'
import { baseImgUrl } from '../../constants/api'
import styles from './MyMovie.module.css'
import { baseURL} from '../../constants/api'
import authRequests from '../../api/authRequests'
import { mutate } from 'swr'
import { ToastContainer, toast } from 'react-toastify';

const MyMovie = ({movie}) => {

    const removeFromWatchlist = async(myMovie) => {
        let data = {
            'movie': myMovie
        }
        try {
            const res = await fetch(`${baseURL}/${authRequests.removeWatchlist}`, {
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
                toast.dark("Error occured. Please try again later.")
            } else {
                mutate(`${baseURL}/${authRequests.me}`)
                toast.dark(resJson.message)
            }
        } catch(e) {
            console.log(e)
        }
    }

    return (
        <div key={movie.id} className={styles.myMovie}>
            <img src={`${baseImgUrl}${movie?.backdrop_path}`} alt="movie_poster" className={styles.img_movie} />
            <p className={styles.name}>{movie.name || movie.title || movie.originalTitle}</p>
            <div className={styles.buttons}>
                <button className={styles.button_play}><span style={{marginRight: '2px'}}>Play</span><img src="/images/play.png" alt="play-img" style={{width: '12px', marginTop: '2px'}} /></button>
                <button onClick={() => removeFromWatchlist(movie)} className={styles.button_remove}><span style={{marginRight: '4px'}}>Remove</span><img src="/images/delete.png" alt="play-delete" style={{width: '12px', marginTop: '2px'}} /></button>
            </div>
            <ToastContainer />
         </div>
    )
}

export default MyMovie
