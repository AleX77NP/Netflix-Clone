import React from 'react'
import styles from './StepConfirm.module.css'
import NextButton from '../NextButton/NextButton'

const StepConfirm = () => {
    return (
        <div className={styles.container}>
            <img src="/images/email.png" alt="email" className={styles.img} />
            <h2 style={{textAlign: 'center'}}>Email Confirmation</h2>
            <p style={{textAlign: 'center', fontSize: '17px'}}>We're excited to have you get started. First, you need to confirm your account via email. Just press the button below.</p>
            <NextButton disabled={false} text="Confirm Account" onPress={() => window.open('https://mail.google.com')} />
        </div>
    )
}

export default StepConfirm
