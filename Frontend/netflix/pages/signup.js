import React from 'react'
import styles from '../styles/Signup.module.css'
import Head from 'next/head'
import WhiteNav from '../components/WhiteNav/WhiteNav'
import { useUserContext } from '../context/userContext'
import StepOne from '../components/StepOne/StepOne'
import StepOneTwo from '../components/StepOneTwo/StepOneTwo'
import StepTwo from '../components/StepTwo/StepTwo'
import StepTwoTwo from '../components/StepTwoTwo/StepTwoTwo'
import StepThree from '../components/StepThree/StepThree'
import StepThreeTwo from '../components/StepThreeTwo/StepThreeTwo'
import LightFooter from '../components/LightFooter/LightFooter'

const Signup = () => {

    const {state} = useUserContext();

    const renderStep = () => {
        switch(state.step) {
            case 0:
                return <StepOne />
            case 1:
                return <StepOneTwo />
            case 2:
                return <StepTwo />
            case 3:
                return <StepTwoTwo />
            case 4:
                return <StepThree />
            case 5:
                return <StepThreeTwo />
            default:
                return <StepOne />
        }
    }


    return (
        <div className={styles.body}>
            <Head>
                <title>Netflix</title>
            </Head>
            <WhiteNav />
            <hr className={styles.white_separator} />
            {renderStep()}
            <LightFooter />
        </div>
    )
}

export default Signup
