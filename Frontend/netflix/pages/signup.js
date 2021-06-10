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
import StepConfirm from '../components/StepConfirm/StepConfirm'
import LightFooter from '../components/LightFooter/LightFooter'
import StepThreeThree from '../components/StepThreeThree/StepThreeThree'
import { BACK } from '../constants/steps'

const Signup = () => {

    const {state, dispatch} = useUserContext();

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
            case 6:
                return <StepThreeThree />
            case 7:
                return <StepConfirm />
            default:
                return <StepOne />
        }
    }

    const goBack = () => {
        if(state.step > 0) {
            dispatch({type: BACK})
        }
    }

    return (
        <div className={styles.body}>
            <Head>
                <title>Netflix</title>
            </Head>
            <WhiteNav />
            <hr className={styles.white_separator} />
            <main className={styles.main_region}>
            {renderStep()}
            <div onClick={goBack} style={{width: '65px',margin: 'auto', marginTop: '65px', cursor: 'pointer'}}>
                <img src="/images/back.png" alt="back-img" style={{width: '90%', display: 'block', margin: 'auto'}} />
                <p style={{fontWeight: 'bold', color: 'black', 'marginTop': '5px'}}>Go Back</p>
            </div>
            </main>
            <LightFooter />
        </div>
    )
}

export default Signup
