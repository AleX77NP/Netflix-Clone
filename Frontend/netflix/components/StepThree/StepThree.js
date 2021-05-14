import React from 'react'
import styles from './StepThree.module.css'
import Image from 'next/image'

const StepThree = () => {
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
        </div>
    )
}

export default StepThree
