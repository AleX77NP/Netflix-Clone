import React, { useEffect, useState } from 'react'
import styles from './MoviesRow.module.css'
import PropTypes from 'prop-types';
import {baseURL} from '../../constants/api'
import useMoviesObservable from '../../hooks/useMoviesObservable';
import MovieCard from '../MovieCard/MovieCard';
import LargeCard from '../LargeCard/LargeCard';


const MoviesRow = ({title, category, isLarge}) => {

    const {response, error} = useMoviesObservable(baseURL,category)

    return (
        <>
            <h2 className={styles.title}>{title}</h2>
            {error !== null ? <h3 className={styles.error}>{error}</h3>: null}
            <div className={styles.movies}>
                {
                    response && response.results &&  response.results.slice(0,7).map((movie) => (
                        isLarge ? <LargeCard movie={movie} /> : <MovieCard key={movie.id} movie={movie} />
                    ))
                }
            </div>
        </>
    )
}

MoviesRow.propTypes = {
    title: PropTypes.string,
    category: PropTypes.string,
    isLarge: PropTypes.bool
}


export default MoviesRow
