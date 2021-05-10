import React from 'react'
import styles from './StoryCard.module.css'
import PropTypes from 'prop-types';

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

StoryCard.propTypes = {
    title: PropTypes.string,
    text: PropTypes.string,
    image: PropTypes.string,
    reverse: PropTypes.bool
}

export default StoryCard
