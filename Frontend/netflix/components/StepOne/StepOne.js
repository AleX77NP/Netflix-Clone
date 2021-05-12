import React from 'react'
import styles from './StepOne.module.css'
import Image from 'next/image'
import NextButton from '../NextButton/NextButton'
import { useUserContext } from '../../context/userContext'
import { ONE_TWO, TWO, THREE} from '../../constants/steps'

const StepOne = () => {

    const {state, dispatch} = useUserContext();

    return (
        <div className={styles.container}>
                <div className={styles.img}>
                <Image src="/images/step1.png" alt="step 1" width={280} height={70} />
                </div>
                <p className={styles.step}>STEP <span className={styles.span}>1</span> OF <span className={styles.span}>3</span></p>
                <p className={styles.header}>Finish setting up your account.</p>
                <p className={styles.description}>
                Netflix is personalized for you. Create a password to watch Netflix on any device at any time.
                </p>
                <div className={styles.btn_wrapper}>
                <NextButton onPress={() => dispatch({type: ONE_TWO})} />
                </div>
        </div>
    )
}

export default StepOne
