import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Landing.module.css'
import Separator from '../components/Separator/Separator'

const Landing = () => {
    return (
        <div className={styles.body}>
            <Head>
                <title>Netflix -  Watch TV Shows Online, Watch Movies Online</title>
            </Head>
            <header className={styles.showcase}>
                <div className={styles.showcasetop}>
                    <img className={styles.logo} src="/images/logo.png" alt="logo" />
                    <Link href="/signup"><a id={styles.signin} className={styles.linktop}>Sign In</a></Link>
                </div>
                <div className={styles.content}>
                    <p className={styles.header}>Unlimited movies, TV shows, and more.</p>
                    <p id={styles.pmd} className={styles.paragraph}>Watch anywhere. Cancel anytime.</p>
                    <p className={styles.paragraph}>Ready to watch? Enter your email to create or restart your membership.</p>
                    <div className={styles.start}>
                        <input className={styles.input} placeholder="Email address" required />
                        <button className={styles.btnstart}>Get Started &rarr;</button>
                    </div>
                </div>
            </header>
            <Separator />
        </div>
    )
}

export default Landing
