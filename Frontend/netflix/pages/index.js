import Head from 'next/head'
import contentRequests from '../api/contentRequests'
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
      <div className={styles.rows}>
      <MainNav /> 
      <MoviesRow title="NETFLIX ORIGINALS" fetchUrl={contentRequests.fetchOriginals} isLarge={true} />
      <MoviesRow title="Trending Now" fetchUrl={contentRequests.fetchTrending} isLarge={false} />
      <MoviesRow title="Top Rated" fetchUrl={contentRequests.fetchTopRated} isLarge={false} />  
      <MoviesRow title="Action Movies" fetchUrl={contentRequests.fetchActionMovies} isLarge={false} />  
      <MoviesRow title="Comedy Movies" fetchUrl={contentRequests.fetchComedyMovies} isLarge={false} /> 
      <MoviesRow title="Horror Movies" fetchUrl={contentRequests.fetchHorrorMovies} isLarge={false} />  
      <MoviesRow title="Romance Movies" fetchUrl={contentRequests.fetchRomanceMovies} isLarge={false} />    
      <MoviesRow title="Documentary Movies" fetchUrl={contentRequests.fetchDocumentaryMovies} isLarge={false} />      
    </div>
    </div>
  )
}
