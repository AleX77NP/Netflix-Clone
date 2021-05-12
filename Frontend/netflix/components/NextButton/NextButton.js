import React from 'react'
import styles from './NextButton.module.css'

const NextButton = ({ onPress }) => {
    return (
        <div className={styles.wrapper}>
            <button onClick={onPress} className={styles.button}>Continue</button>
        </div>
    )
}

export default NextButton
