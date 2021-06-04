import React, { useEffect, useState } from 'react'
import styles from '../../styles/Confirm.module.css'
import { useRouter } from 'next/router'
import NextButton from '../../components/NextButton/NextButton'

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
            <img src="/images/email.png" alt="email" className={styles.img} />
            {!error ? <><h1 className={styles.title}>Thank You !</h1>
            <p className={styles.info}>Your account is now confirmed. You can Sign In.</p>
            <NextButton disabled={false} onPress={() => router.push('/login')} text="Sign In" /></>
            : <>
            <h1 className={styles.title}>Error occured.</h1>
            <p className={styles.info}>{error}</p>
            <NextButton disabled={false} onPress={() => router.back()} text="Go Back" />
            </> }
        </div>
    )
}

export default Confirm
