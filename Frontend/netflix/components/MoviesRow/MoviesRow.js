import React, { useEffect, useState } from 'react'
import styles from './MoviesRow.module.css'
import PropTypes from 'prop-types';
import axios from '../../api/axios'

const baseImgUrl = "https://image.tmdb.org/t/p/original";

const MoviesRow = ({title, fetchUrl, isLarge}) => {

    const [movies, setMovies] = useState([])

    useEffect(() => {
        const fetchMovies = async () => {
            try {
            const req = await axios.get(fetchUrl);
            setMovies(req.data.results)
            return req;
            } catch(e) {
                console.log(e)
            }
        }
        fetchMovies();
    },[fetchUrl])

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>{title}</h2>
            <div className={styles.movies}>
                {
                    movies.map((movie) => (
                        <img src={`${baseImgUrl}${isLarge ? movie.poster_path : movie.backdrop_path}`}
                        alt="movie_poster"
                        className={isLarge ? styles.movie_row_large : styles.movie_row}
                        key={movie.title}
                        />
                    ))
                }
            </div>
        </div>
    )
}

MoviesRow.propTypes = {
    title: PropTypes.string,
    fetchUrl: PropTypes.string,
    isLarge: PropTypes.bool
}

export default MoviesRow
