import React from 'react'
import styles from '../styles/MyList.module.css'
import Head from 'next/head'
import MainNav from '../components/MainNav/MainNav'
import DarkFooter from '../components/DarkFooter/DarkFooter'
import AuthLayout from '../components/AuthLayout/AuthLayout'
import { useUserContext } from '../context/userContext'
import { baseURL, baseImgUrl } from '../constants/api'
import authRequests from '../api/authRequests'
import { mutate } from 'swr'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MyList = () => {

    const {state} = useUserContext()

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
        <AuthLayout>
            <div className={styles.body}>
                <Head>
                    <title>Netflix</title>
                    <meta name="description" content="Netflix Clone" />
                    <link rel="icon" href="/favicon.ico" />
                </Head>
                <header className={styles.nav}>
                    <MainNav />
                </header>
                <div style={{minHeight: '100vh'}}>
                <ToastContainer />
                <section className={styles.main}>
                    {
                        state.authUser && state.authUser.user.watchlist.map((movie) => (
                            <div key={movie.id} className={styles.myMovie}>
                                <img src={`${baseImgUrl}${movie?.backdrop_path}`} alt="movie_poster" className={styles.img_movie} />
                                <p className={styles.name}>{movie.name || movie.title || movie.originalTitle}</p>
                                <div className={styles.buttons}>
                                    <button className={styles.button_play}><span style={{marginRight: '2px'}}>Play</span><img src="/images/play.png" alt="play-img" style={{width: '12px', marginTop: '2px'}} /></button>
                                    <button onClick={() => removeFromWatchlist(movie)} className={styles.button_remove}><span style={{marginRight: '4px'}}>Remove</span><img src="/images/delete.png" alt="play-delete" style={{width: '12px', marginTop: '2px'}} /></button>
                                </div>
                            </div>
                        ))
                    }
                </section>
                </div>
                <div style={{width: '100%', backgroundColor: 'black'}}>
                    <DarkFooter />
                </div>
            </div>
        </AuthLayout>
    )
}

export default MyList;
