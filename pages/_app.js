import '../styles/globals.css'
import AuthContextProvider from '../components/context/AuthContext'
import Head from 'next/head'

function MyApp({ Component, pageProps }) {
  return <AuthContextProvider>
    <Head>
      <link rel="shortcut icon" href="/favicon.ico?v=2" type="image/x-icon" />
    </Head>
    <Component {...pageProps} />
  </AuthContextProvider>
}

export default MyApp
