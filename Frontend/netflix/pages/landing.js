import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Landing.module.css'
import Separator from '../components/Separator/Separator'
import { stories } from '../data/stories'
import { faq } from '../data/faq'
import StoryCard from '../components/StoryCard/StoryCard'
import Accordition from '../components/Accordition/Accordition'
import { useEffect, useState } from 'react'
import { useEmail } from '../hooks/useEmail'
import { useUserContext } from '../context/userContext'
import { SET_EMAIL } from '../constants/steps'
import DarkFooter from '../components/DarkFooter/DarkFooter'

const Landing = () => {

    const [faqs, setFaqs] = useState([])
    const {email, emailError, isValid, handleEmail} = useEmail('')
    const {state, dispatch} = useUserContext();

    console.log(state)

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
                    <Link href="/login"><a id={styles.signin} className={styles.link_top}>Sign In</a></Link>
                </div>
                <div className={styles.content}>
                    <p className={styles.header}>Unlimited movies, TV shows, and more.</p>
                    <p id={styles.pmd} className={styles.paragraph}>Watch anywhere. Cancel anytime.</p>
                    <p className={styles.paragraph}>Ready to watch? Enter your email to create or restart your membership.</p>
                    <div className={styles.start}>
                        <input className={styles.input} placeholder="Email address" onChange={(e) => handleEmail(e.target.value)} />
                        <Link href={isValid ? '/signup' : '/landing'}><button disabled={isValid ? false : true} onClick={() => dispatch({type: SET_EMAIL, payload: email })} className={styles.btn_start}>Get Started &rarr;</button></Link>
                    </div>
                    {emailError !== '' ? <p className={styles.input_error}>{emailError}</p> : <p className={styles.input_error}></p> }
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
            <Separator />
            <DarkFooter />
        </div>
    )
}

export default Landing
