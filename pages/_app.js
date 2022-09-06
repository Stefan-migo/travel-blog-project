import Wrapper from '../components/wrapper'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <Wrapper>
      <Component {...pageProps} />
    </Wrapper>
  )
}

export default MyApp
