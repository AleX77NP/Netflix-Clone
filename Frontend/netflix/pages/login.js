import React, { useState } from 'react'
import Head from 'next/head'
import DarkFooter from '../components/DarkFooter/DarkFooter'
import styles from '../styles/Login.module.css'
import Link from 'next/link'
import { baseURL } from '../constants/api'
import authRequests from '../api/authRequests'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router'

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const router = useRouter();

    const login = async(e) => {
        e.preventDefault();
        try {
            let data = {
                'email': email,
                'password': password
            }
            const res = await fetch(`${baseURL}/${authRequests.signin}`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                  },
                  credentials: 'include',
                body: JSON.stringify(data)
            })
            const resJson = await res.json()
            if(!res.ok) {
                if (res.status === 404) {
                    toast.dark(resJson.message)
                } else {
                    toast.dark("Error occured. Please try again later.")
                }
            } else {
                router.replace('/')
            }
        } catch(e) {
            console.log(e)
            toast.dark(JSON.stringify(e))
        }
    }

    return (
        <div className={styles.body}>
            <Head>
                <title>Netflix</title>
            </Head>
            <ToastContainer />
            <header className={styles.showcase}>
                <div className={styles.showcase_top}>
                    <img className={styles.logo} src="/images/logo.png" alt="logo" />
                </div>
                <div className={styles.main}>
                <form className={styles.form} onSubmit={login}>
                    <h1>Sign In</h1>
                    <label className={styles.label}>Email address</label>
                    <input type="email" className={styles.input} placeholder="Email address" onChange={(e) => setEmail(e.target.value)} required />
                    <label className={styles.label}>Password</label>
                    <input type="password" className={styles.input} placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />

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
