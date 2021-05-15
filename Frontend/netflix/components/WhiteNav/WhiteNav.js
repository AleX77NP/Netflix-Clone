import Link from 'next/link'
import React from 'react'
import styles from './WhiteNav.module.css'

const WhiteNav = () => {
    return (
        <div className={styles.nav}>
            <div className={styles.logo}>
            <Link href="/landing"><img src="/images/logo.png" alt="logo" className={styles.logo_img} /></Link>
            </div>
            <Link href="/landing"><a className={styles.sign_out}>Sign out</a></Link>
        </div>
    )
}

export default WhiteNav
