import React from 'react'
import { baseURL } from '../../constants/api'
import useMoviesObservable from '../../hooks/useMoviesObservable'
import styles from './Banner.module.css'

const Banner = () => {

    const {bannerMovie} = useMoviesObservable(baseURL, 'originals')


    function truncate(str, n) {
        return str?.length > n ? str.substr(0, n - 1) + "..." : str;
      }

    return (
            <section className={styles.container} style={{backgroundImage: `url("https://image.tmdb.org/t/p/original${bannerMovie?.backdrop_path}")`,backdropPosition: "center center"}}>
                <div className={styles.container_vertical}>
                    <div className={styles.container_info}>   
                        <p className={styles.title}>{bannerMovie?.name}</p>
                        <p className={styles.overview}>{truncate(bannerMovie?.overview,200)}</p>
                        <div className={styles.buttons}>
                            <button className={styles.banner_btn_white}><img src="/images/play.png" className={styles.img_icon} />Play</button>
                            <button className={styles.banner_btn}><img src="/images/info.png" className={styles.img_icon} />More Info</button>
                        </div>
                    </div>
                </div>
            </section>
    )
}

export default Banner
