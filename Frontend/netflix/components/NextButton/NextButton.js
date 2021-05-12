import React from 'react'
import styles from './NextButton.module.css'

const NextButton = ({ onPress, isDisabled }) => {
    return (
        <div className={styles.wrapper}>
            <button onClick={onPress} disabled={isDisabled} className={styles.button}>Continue</button>
        </div>
    )
}

export default NextButton
