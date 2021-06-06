import Head from 'next/head'
import contentRequests from '../api/contentRequests'
import Banner from '../components/Banner/Banner'
import MainNav from '../components/MainNav/MainNav'
import MoviesRow from '../components/MoviesRow/MoviesRow'
import DarkFooter from '../components/DarkFooter/DarkFooter'
import styles from '../styles/Home.module.css'
import { baseURL, SET_AUTH_USER_TOKEN } from '../constants/api'
import authRequests from '../api/authRequests'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useUserContext } from '../context/userContext'

export default function Home() {

  const router = useRouter();

  const {dispatch} = useUserContext();

  useEffect(() => {
    loadUser();
  },[])

  const loadUser = async() => {
    try {
      const res =  await fetch(`${baseURL}/${authRequests.me}`, {
        credentials: 'include'
      });
      const data = await res.json()
      console.log(data)
      if(!res.ok) {
        await router.replace('/landing')
      } else {
        dispatch({type: SET_AUTH_USER_TOKEN, payload: data})
      }
    } catch(e) {
      console.log(e)
    }
  }

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
      <Banner />
      <div className={styles.rows}>
      <MoviesRow title="Trending Now" category={contentRequests.fetchTrending} isLarge={false} />
      <MoviesRow title="Top Rated" category={contentRequests.fetchTopRated} isLarge={false} />  
      <MoviesRow title="Action Movies" category={contentRequests.fetchActionMovies} isLarge={false} />  
      <MoviesRow title="Comedy Movies" category={contentRequests.fetchComedyMovies} isLarge={false} /> 
      <MoviesRow title="NETFLIX ORIGINALS" category={contentRequests.fetchOriginals} isLarge={true} />
      <MoviesRow title="Horror Movies" category={contentRequests.fetchHorrorMovies} isLarge={false} />  
      <MoviesRow title="Romance Movies" category={contentRequests.fetchRomanceMovies} isLarge={false} />    
      <MoviesRow title="Documentary Movies" category={contentRequests.fetchDocumentaryMovies} isLarge={false} />      
    </div>
    <div style={{width: '100%', backgroundColor: 'black'}}>
    <DarkFooter />
    </div>
    </div>
  )
}


