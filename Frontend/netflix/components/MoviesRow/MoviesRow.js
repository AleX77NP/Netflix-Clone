import React, { useCallback, useEffect, useState } from 'react'
import styles from './MoviesRow.module.css'
import PropTypes from 'prop-types';
import {baseURL} from '../../constants/api'
import useMoviesObservable from '../../hooks/useMoviesObservable';
import MovieCard from '../MovieCard/MovieCard';
import LargeCard from '../LargeCard/LargeCard';
import {resultsPaged} from '../../utils/arrays'


const MoviesRow = ({title, category, isLarge}) => {

    const {response, error, loading} = useMoviesObservable(baseURL,category)

    const [paginated, setPaginated] = useState([])

    const [first, setFirst] = useState(0)
    const [last, setLast] = useState(8);

    useEffect(useCallback(() => {
        if(response && response.results) {
            setPaginated(resultsPaged(response.results, first,last))
        }
    },[first,last, response]),[first,last, response])

    const goNext = () => {
        if(last < response.results.length) {
        setFirst(prev => prev + 1)
        setLast(prev => prev + 1)    
        }    
    }

    const goPrev = () => {
        if(first > 0) {
        setFirst(prev => prev - 1)
        setLast(prev => prev - 1)        
        }
    }

    return loading ? <div className={styles.loading}>
        <img src="/images/loading.gif" alt="loading" className={styles.img_loading} />
    </div> : (
        <div>
            <h2 className={styles.title}>{title}</h2>
            {error !== null ? <h3 className={styles.error}>{error}</h3>: null}
            <div className={styles.movies_wrapper}>
            <div className={styles.movies}>
                {
                    response && response.results && paginated.map((movie) => (
                        isLarge ? <LargeCard key={movie.id} movie={movie} /> : <MovieCard key={movie.id} movie={movie} />
                    ))
                }
            </div>
            <h1 onClick={goPrev} style={{color: 'white', margin: 'auto', cursor: 'pointer', display: first == 0 ? 'none' : 'inline-block'}}>&lt;</h1>
            <h1 onClick={goNext} style={{color: 'white', margin: 'auto', cursor: 'pointer'}}>&gt;</h1>
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
