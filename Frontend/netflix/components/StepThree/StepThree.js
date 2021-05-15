import React from 'react'
import styles from './StepThree.module.css'
import Image from 'next/image'
import { useUserContext } from '../../context/userContext'
import { FIVE} from '../../constants/steps'

const StepThree = () => {

    const {dispatch} = useUserContext();

    return (
        <div className={styles.container}>
            <div className={styles.img}>
            <Image src="/images/lock.png" alt="step 1" width={50} height={50} />
            </div>
            <p className={styles.step}>STEP <span className={styles.span}>3</span> OF <span className={styles.span}>3</span></p>
            <p className={styles.header}>Set up your payment.</p>
            <p className={styles.info}>Your membership starts as soon as you set up payment.</p>
            <p className={styles.bonus}>No commitments.</p>
            <p className={styles.bonus}>Cancel online anytime.</p>

            <div className={styles.payment_wrapper}>
                <p className={styles.secure}><small>Secure Server</small> &#128274;</p>
                <a className={styles.payment_button} onClick={() => dispatch({type: FIVE})}>
                    <div className={styles.payment_info}>
                    <p className={styles.cards}>Credit or Debit Card</p>
                    <Image src="/images/creditcards.png" alt="payment" width={120} height={25} />
                    </div>
                    <span className={styles.next}>&#5171;</span>
                </a>
            </div>

        </div>
    )
}

export default StepThree
