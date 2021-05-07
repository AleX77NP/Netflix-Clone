import React from 'react'
import styles from './StoryCard.module.css'

const StoryCard = ({title, text, image, reverse}) => {
    return !reverse ? (
        <div className={styles.card}>
            <div className={styles.description}>
                <p className={styles.title}>{title}</p>
                <p className={styles.text}>{text}</p>
            </div>
            <img src={image} alt="card" className={styles.img} />
        </div>
    ) : (
        <div className={styles.card}>
            <img src={image} alt="card" className={styles.img} />
            <div className={styles.description}>
                <p className={styles.title}>{title}</p>
                <p className={styles.text}>{text}</p>
            </div>
        </div>
    )
}

export default StoryCard
