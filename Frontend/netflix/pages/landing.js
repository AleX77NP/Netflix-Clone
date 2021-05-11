import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Landing.module.css'
import Separator from '../components/Separator/Separator'
import { stories } from '../data/stories'
import { faq } from '../data/faq'
import StoryCard from '../components/StoryCard/StoryCard'
import Accordition from '../components/Accordition/Accordition'
import { useEffect, useState } from 'react'

const Landing = () => {

    const [faqs, setFaqs] = useState([])

    const toggleFaq = (id) => {
        let faq = faqs.find(elem => elem.id === id)
        if (faq.open) {
            faq.open = false
        } else{
        faq.open = true
        }
        setFaqs([...faqs])
    }

    useEffect(() => {
        setFaqs(faq)
    },[])

    return (
        <div className={styles.body}>
            <Head>
                <title>Netflix -  Watch TV Shows Online, Watch Movies Online</title>
            </Head>
            <header className={styles.showcase}>
                <div className={styles.showcase_top}>
                    <img className={styles.logo} src="/images/logo.png" alt="logo" />
                    <Link href="/"><a id={styles.signin} className={styles.link_top}>Sign In</a></Link>
                </div>
                <div className={styles.content}>
                    <p className={styles.header}>Unlimited movies, TV shows, and more.</p>
                    <p id={styles.pmd} className={styles.paragraph}>Watch anywhere. Cancel anytime.</p>
                    <p className={styles.paragraph}>Ready to watch? Enter your email to create or restart your membership.</p>
                    <div className={styles.start}>
                        <input className={styles.input} placeholder="Email address" required />
                        <Link href="/signup"><button className={styles.btn_start}>Get Started &rarr;</button></Link>
                    </div>
                </div>
            </header>
            <Separator />
            <div>
                {
                    stories.map((story) => (
                        <div key={story.title}>
                            <StoryCard reverse={story.reverse} title={story.title} text={story.text} image={story.image} />
                            <Separator />
                        </div>
                    ))
                }
            </div>
            <div><p className={styles.faq_title}>Frequently Asked Questions</p></div>
            <div className={styles.faq}>
                {
                    faq.map((item) => (
                        <div key={item.id}>
                            <Accordition item={item} onToggle={toggleFaq} />
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Landing
