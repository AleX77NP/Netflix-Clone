import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import styles from './MainNav.module.css'
import { useUserContext } from '../../context/userContext'
import {useRouter} from 'next/router'

const MainNav = () => {

    const {state} = useUserContext();

    const router = useRouter();

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
                <Link href="/"><a className={router.pathname === "/" ? styles.nav_link_active : styles.nav_link}>Home</a></Link>
                <Link href="/mylist"><a className={router.pathname === "/mylist" ? styles.nav_link_active : styles.nav_link}>My List</a></Link>
            </div>

            <div className={styles.nav_right}>
                <img src="/images/search.png" alt="search" className={styles.search_img} />
                <img src="/images/gift.png" alt="gift" className={styles.gift_img} />
                <img src="/images/reminder.png" alt="reminder" className={styles.reminder_img} />
                <Link href="profile"><img src={state.profileImage ? state.profileImage : "/images/profile.png"} alt="avatar" className={styles.avatar} /></Link>
            </div>
        </div>
    )
}

export default MainNav
