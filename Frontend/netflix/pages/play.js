import React from 'react'
import styles from '../styles/Play.module.css'

const Play = () => {
    return (
        <div className={styles.container}>
            <iframe 
            className={styles.video}
            src="https://www.youtube.com/embed/gbbaX6WzBFg">
            </iframe>
        </div>
    )
}

export default Play
