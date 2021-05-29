import Head from 'next/head'
import contentRequests from '../api/contentRequests'
import Banner from '../components/Banner/Banner'
import MainNav from '../components/MainNav/MainNav'
import MoviesRow from '../components/MoviesRow/MoviesRow'
import styles from '../styles/Home.module.css'

export default function Home() {
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
    </div>
  )
}
