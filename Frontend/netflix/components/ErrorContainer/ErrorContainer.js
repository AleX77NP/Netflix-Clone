import React from 'react'
import styles from './ErrorContainer.module.css'

const ErrorContainer = () => {
    return (
        <div className={styles.container}>
            <img src="/images/logo.png" alt="logo-error" className={styles.logo} />
            <p className={styles.error}>
            An internal error occured on server. Please try again later.
            </p>
        </div>
    )
}

export default ErrorContainer
