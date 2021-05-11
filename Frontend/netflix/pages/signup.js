import React from 'react'
import StepOne from '../components/StepOne/StepOne'
import styles from '../styles/Signup.module.css'
import Head from 'next/head'
import WhiteNav from '../components/WhiteNav/WhiteNav'

const Signup = () => {
    return (
        <div className={styles.body}>
            <Head>
                <title>Netflix</title>
            </Head>
            <WhiteNav />
            <hr className={styles.white_separator} />
            <StepOne />
        </div>
    )
}

export default Signup
