import React from 'react'
import styles from '../styles/MyList.module.css'
import Head from 'next/head'
import MainNav from '../components/MainNav/MainNav'
import DarkFooter from '../components/DarkFooter/DarkFooter'

const MyList = () => {
    return (
        <div className={styles.body}>
            <Head>
                <title>Netflix</title>
                <meta name="description" content="Netflix Clone" />
                <link rel="icon" href="/favicon.ico" />
             </Head>
            <header className={styles.nav}>
                <MainNav />
            </header>
            <section className={styles.main}>
                <h1>Movie</h1>
                <h1>Movie</h1>
                <h1>Movie</h1>
                <h1>Movie</h1>
            </section>
            <div style={{width: '100%', backgroundColor: 'black'}}>
                <DarkFooter />
            </div>
        </div>
    )
}

export default MyList;
