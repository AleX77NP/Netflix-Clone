import React, { useEffect, useState } from 'react'
import styles from './MoviesRow.module.css'
import PropTypes from 'prop-types';
import {baseURL} from '../../constants/api'
import useMoviesObservable from '../../hooks/useMoviesObservable';

const baseImgUrl = "https://image.tmdb.org/t/p/original";

const MoviesRow = ({title, category, isLarge}) => {

    const {response, error} = useMoviesObservable(baseURL,category)

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>{title}</h2>
            {error !== null ? <h3 className={styles.error}>{error}</h3>: null}
            <div className={styles.movies}>
                {
                    response && response.results &&  response.results.map((movie) => (
                        <img src={`${baseImgUrl}${isLarge ? movie.poster_path : movie.backdrop_path}`}
                        alt="movie_poster"
                        className={isLarge ? styles.movie_row_large : styles.movie_row}
                        key={movie.id}
                        />
                    ))
                }
            </div>
        </div>
    )
}

MoviesRow.propTypes = {
    title: PropTypes.string,
    category: PropTypes.string,
    isLarge: PropTypes.bool
}


export default MoviesRow
