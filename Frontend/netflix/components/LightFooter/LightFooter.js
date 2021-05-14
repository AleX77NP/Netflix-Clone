import React from 'react'
import styles from './LightFooter.module.css'

const LightFooter = () => {
    return (
        <div className={styles.container}>
            <p className={styles.questions}>Questions? Contact us.</p>
            <ul className={styles.links_list}>
                <li>FAQ</li>
                <li>Help Center</li>
                <li>Terms of Use</li>
                <li>Privacy</li>
                <li>Cookie Preferences</li>
                <li>Corporate Information</li>
                <li></li>
            </ul>
        </div>
    )
}

export default LightFooter
