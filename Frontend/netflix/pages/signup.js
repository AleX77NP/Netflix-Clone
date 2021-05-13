import React from 'react'
import StepOne from '../components/StepOne/StepOne'
import styles from '../styles/Signup.module.css'
import Head from 'next/head'
import WhiteNav from '../components/WhiteNav/WhiteNav'
import { useUserContext } from '../context/userContext'
import StepOneTwo from '../components/StepOneTwo/StepOneTwo'
import StepTwo from '../components/StepTwo/StepTwo'
import StepTwoTwo from '../components/StepTwoTwo/StepTwoTwo'

const Signup = () => {

    const {state} = useUserContext();

    return (
        <div className={styles.body}>
            <Head>
                <title>Netflix</title>
            </Head>
            <WhiteNav />
            <hr className={styles.white_separator} />
            {state.step === 0 ? <StepOne /> : state.step === 1 ? <StepOneTwo /> : state.step === 2 ? <StepTwo /> : <StepTwoTwo /> }
        </div>
    )
}

export default Signup
