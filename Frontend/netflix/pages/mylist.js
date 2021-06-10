import React from 'react'
import styles from '../styles/MyList.module.css'
import Head from 'next/head'
import MainNav from '../components/MainNav/MainNav'
import DarkFooter from '../components/DarkFooter/DarkFooter'
import AuthLayout from '../components/AuthLayout/AuthLayout'
import { useUserContext } from '../context/userContext'
import 'react-toastify/dist/ReactToastify.css';
import MyMovie from '../components/MyMovie/MyMovie'

const MyList = () => {

    const {state} = useUserContext()

    return (
        <AuthLayout>
            <div className={styles.body}>
                <Head>
                    <title>Netflix</title>
                    <meta name="description" content="Netflix Clone" />
                    <link rel="icon" href="/favicon.ico" />
                </Head>
                <header className={styles.nav}>
                    <MainNav />
                </header>
                <div style={{minHeight: '100vh'}}>
                <section className={styles.main}>
                    {
                        state.authUser && state.authUser.user.watchlist.map((movie) => (
                            <MyMovie key={movie.id} movie={movie} />
                        ))
                    }
                </section>
                </div>
                <div style={{width: '100%', backgroundColor: 'black'}}>
                    <DarkFooter />
                </div>
            </div>
        </AuthLayout>
    )
}

export default MyList;
