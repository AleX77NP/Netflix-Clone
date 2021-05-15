import React from 'react'
import styles from './DarkFooter.module.css'

const DarkFooter = () => {
    return (
        <div className={styles.container}>
            <ul className={styles.links_list}>
            <p className={styles.questions}>Questions? Contact us.</p>
                <li>FAQ</li>
                <li>Help Center</li>
                <li>Account</li>
                <li>Media Center</li>
                <li>Investor Relations</li>
                <li>Jobs</li>
                <li>Ways to Watch</li>
                <li>Terms of Use</li>
                <li>Privacy</li>
                <li>Cookie Preferences</li>
                <li>Corporate Information</li>
                <li>Contact Us</li>
                <li>Speed Test</li>
                <li>Legal Notices</li>
                <li>Netflix Originals</li>
            </ul>
        </div>
    )
}

export default DarkFooter
