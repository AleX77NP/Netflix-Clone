import React from 'react'
import styles from './StepTwo.module.css'
import Image from 'next/image'
import NextButton from '../NextButton/NextButton'
import { THREE } from '../../constants/steps'
import { useUserContext } from '../../context/userContext'

const StepTwo = () => {

    const {dispatch} = useUserContext();

    return (
        <div className={styles.container}>
            <div className={styles.img}>
            <Image src="/images/checkmark.png" alt="step 1" width={50} height={50} />
            </div>
            <p className={styles.step}>STEP <span className={styles.span}>1</span> OF <span className={styles.span}>3</span></p>
            <p className={styles.header}>Choose your plan.</p>

            <div className={styles.check_list}>
                <p className={styles.check_item}><span className={styles.mark}>&#10003;</span> No commitments, cancel anytime.</p>
                <p className={styles.check_item}><span className={styles.mark}>&#10003;</span> Everything on Netflix for one low price.</p>
                <p className={styles.check_item}><span className={styles.mark}>&#10003;</span> Unlimited viewing on all your devices.</p>
            </div>
            <div className={styles.btn_wrapper}>
            <NextButton text="See the Plans" isDisabled={false} onPress={() => dispatch({type: THREE})} />
            </div>
        </div>
    )
}

export default StepTwo
