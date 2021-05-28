import React from 'react'
import { baseURL } from '../../constants/api'
import useMoviesObservable from '../../hooks/useMoviesObservable'
import styles from './Banner.module.css'

const Banner = () => {

    const {bannerMovie, error} = useMoviesObservable(baseURL, 'originals')

    function truncate(str, n) {
        return str?.length > n ? str.substr(0, n - 1) + "..." : str;
      }

    return (
        <header className={styles.wrapper} style={{backgroundImage: `url("https://image.tmdb.org/t/p/original${bannerMovie?.backdrop_path}")`, backgroundSize: "cover",backdropPosition: "center center"}}>
            <div className={styles.container}>
                <h1 className={styles.title}>{bannerMovie?.title || bannerMovie?.original_name || bannerMovie?.name}</h1>
                <div className={styles.buttons}>
                    <button className={styles.banner_btn}>Play</button>
                    <button className={styles.banner_btn}>More Info</button>
                </div>
                <h1 className={styles.overview}>{truncate(bannerMovie?.overview)}</h1>
            </div>
            <div className={styles.fade} />
        </header>
    )
}

export default Banner
