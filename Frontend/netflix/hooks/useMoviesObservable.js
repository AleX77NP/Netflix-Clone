import {useState, useEffect} from 'react'
import {ajax} from 'rxjs/ajax'
import { map, take } from 'rxjs/operators';

function useMoviesObservable(baseUrl, category) {

    const [response, setResponse] = useState(null)
    const [bannerMovie, setBannerMovie] = useState(null)
    const [error, setError] = useState(null)

    useEffect(() => {
        let subscription;
        let disabled = false;
        if(!disabled) {
            const movies$ = ajax(`${baseUrl}/${category}`).pipe(
                map(res => res.response),
                take(1),
            )
            subscription = movies$.subscribe({
                next: res => {
                    setResponse(res)
                    setBannerMovie(res.results[Math.floor(Math.random() * res.results.length)])
                },
                error: err => setError('Something went wrong. Please try again later.')
            })
        }

        return () => {
            disabled = true
            subscription && subscription.unsubscribe()
        }
    },[category])

    return {response, error, bannerMovie}
}

export default useMoviesObservable;