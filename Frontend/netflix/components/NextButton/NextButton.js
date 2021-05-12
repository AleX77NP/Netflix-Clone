import React from 'react'
import styles from './NextButton.module.css'
import PropTypes from 'prop-types';

const NextButton = ({ onPress, isDisabled }) => {
    return (
        <div className={styles.wrapper}>
            <button onClick={onPress} disabled={isDisabled} className={styles.button}>Continue</button>
        </div>
    )
}

NextButton.propTypes = {
    onPress: PropTypes.func,
    isDisabled: PropTypes.bool
}

export default NextButton
