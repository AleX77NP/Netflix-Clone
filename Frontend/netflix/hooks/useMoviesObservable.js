import {useState, useEffect} from 'react'
import {ajax} from 'rxjs/ajax'
import { delay, map, take } from 'rxjs/operators';

function useMoviesObservable(baseUrl, category) {

    const [response, setResponse] = useState(null)
    const [loading, setLoading] = useState(true)
    const [bannerMovie, setBannerMovie] = useState(null)
    const [error, setError] = useState(null)

    useEffect(() => {
        let subscription;
        let disabled = false;
        if(!disabled) {
            const movies$ = ajax(`${baseUrl}/content/${category}`).pipe(
                map(res => res.response),
                delay(200),
                take(1),
            )
            subscription = movies$.subscribe({
                next: res => {
                    if(res.results) {
                        setResponse(res)
                        setBannerMovie(res.results[Math.floor(Math.random() * res.results.length)])
                    } else {
                        setError('Something went wrong. Please try again later.')
                    }
                    setLoading(false)
                },
                error: err => {
                    setError('Something went wrong. Please try again later.'),
                    setLoading(false),
                    console.log(err)
                }
            })
        }

        return () => {
            disabled = true
            subscription && subscription.unsubscribe()
        }
    },[category])

    return {response, error, bannerMovie, loading}
}

export default useMoviesObservable;