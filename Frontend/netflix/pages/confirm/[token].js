import React, { useEffect, useState } from 'react'
import styles from '../../styles/Confirm.module.css'
import { useRouter } from 'next/router'

const Confirm = () => {

    const router = useRouter();
    const { token } = router.query

    const [error, setError] = useState(null)

    const confirmEmail = async(token) => {
        try {
            const rawRes = await fetch('http://localhost:9003/users/confirm/email', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({ token })
            });
            const resJson = await rawRes.json();
            console.log(resJson)
        } catch(e) {
            setError('Something went wrong. Please try again later.')
            console.log(e)
        }
    }

    useEffect(() => {
        if(!router.isReady) return;

        confirmEmail(token)

    },[router.isReady])

    return (
        <div className={styles.container}>
            CONFIRM EMAIL {token}
            {error ? <p>{error}</p> : null}
        </div>
    )
}

export default Confirm
