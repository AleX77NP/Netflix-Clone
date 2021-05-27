import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import styles from './MainNav.module.css'

const MainNav = () => {

    const [navDark, setNavDark] = useState(false);

    const handleScroll = (event) => {
        if(window.scrollY > 100) {
            setNavDark(true)
        } else {
            setNavDark(false)
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll)

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    },[])

    return (
        <div className={navDark ? styles.nav_wrapper_dark : styles.nav_wrapper}>
            <div className={styles.nav_left}>
                <Link href="/"><img src="/images/logo.png" alt="logo" className={styles.logo_img} /></Link>
                <a className={styles.nav_link_small}>Browse <i className={styles.arrow_down}></i></a>
                <a className={styles.nav_link}>Home</a>
                <a className={styles.nav_link}>Originals</a>
                <a className={styles.nav_link}>Movies</a>
                <a className={styles.nav_link}>New &#38; Popular</a>
                <a className={styles.nav_link}>My List</a>
            </div>

            <div className={styles.nav_right}>
                <img src="/images/search.png" alt="search" className={styles.search_img} />
                <img src="/images/gift.png" alt="gift" className={styles.gift_img} />
                <img src="/images/reminder.png" alt="reminder" className={styles.reminder_img} />
                <a className={styles.nav_link_right}>Account</a>
                <img src="/images/profile.png" alt="avatar" className={styles.avatar} />
            </div>
        </div>
    )
}

export default MainNav
