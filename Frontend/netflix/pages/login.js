import React from 'react'
import Head from 'next/head'
import DarkFooter from '../components/DarkFooter/DarkFooter'
import styles from '../styles/Login.module.css'
import Link from 'next/link'

const Login = () => {
    return (
        <div className={styles.body}>
            <Head>
                <title>Netflix</title>
            </Head>
            <header className={styles.showcase}>
                <div className={styles.showcase_top}>
                    <img className={styles.logo} src="/images/logo.png" alt="logo" />
                </div>
                <div className={styles.main}>
                <form className={styles.form}>
                    <h1>Sign In</h1>
                    <label className={styles.label}>Email address</label>
                    <input type="email" className={styles.input} placeholder="Email address" required />
                    <label className={styles.label}>Password</label>
                    <input type="password" className={styles.input} placeholder="Password" required />

                    <input type="submit" className={styles.login_btn} value="Sign In" />
                </form>

                <div className={styles.help}>
                    <div className={styles.checkbox_wrapper}><input className={styles.checkbox} type="checkbox" /><small className={styles.small}>Remember me</small></div>
                    <small className={styles.small}>Need help?</small>
                </div>
                <div>
                    <p className={styles.question}>New to Netflix?<span className={styles.signup}><Link href="/signup"> Sign up now.</Link></span></p>
                    <small className={styles.small}>This page is protected by Google reCAPTCHA to ensure you're not a bot. <span className={styles.blue}>Learn more.</span></small>
                </div>
            </div>
            </header>
            <DarkFooter />
        </div>
    )
}

export default Login
