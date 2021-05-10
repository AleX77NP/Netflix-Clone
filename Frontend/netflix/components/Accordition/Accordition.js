import React from 'react'
import PropTypes from 'prop-types';
import styles from './Accordition.module.css'

const Accordition = ({item, onToggle}) => {
    const plus = <span>&#43;</span>
    const x = <span>&#10005;</span>
    return (
        <div onClick={() => onToggle(item.id)} className={styles.container}>
            <div className={styles.question_wrapper}>
                <p className={styles.question}>{item.question}</p>
                <p className={item.open ? styles.sign_x : styles.sign}>{item.open ? x : plus}</p>
            </div> 

            {item.open ? <div className={styles.answer_wrapper}>
                <p className={styles.answer}>{item.answer}</p>
            </div> : null }         
        </div>
    )
}

Accordition.propTypes = {
    item: PropTypes.object,
    onToggle: PropTypes.func
}

export default Accordition
