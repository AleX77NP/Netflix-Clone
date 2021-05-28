import {useState, useEffect} from 'react'
import {ajax} from 'rxjs/ajax'
import {of} from 'rxjs'
import { catchError, map, take } from 'rxjs/operators';

function useMoviesObservable(baseUrl, category) {

    const [response, setResponse] = useState(null)
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
                next: res => setResponse(res),
                error: err => setError('Something went wrong. Please try again later.')
            })
        }

        return () => {
            disabled = true
            subscription && subscription.unsubscribe()
        }
    },[category])

    return {response, error}
}

export default useMoviesObservable;