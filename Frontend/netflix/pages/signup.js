import React from 'react'
import StepOne from '../components/StepOne/StepOne'
import styles from '../styles/Signup.module.css'
import Head from 'next/head'
import WhiteNav from '../components/WhiteNav/WhiteNav'
import { useUserContext } from '../context/userContext'
import StepOneTwo from '../components/StepOneTwo/StepOneTwo'

const Signup = () => {

    const {state, dispatch} = useUserContext();

    return (
        <div className={styles.body}>
            <Head>
                <title>Netflix</title>
            </Head>
            <WhiteNav />
            <hr className={styles.white_separator} />
            {state.step === 0 ? <StepOne /> : <StepOneTwo /> }
        </div>
    )
}

export default Signup
