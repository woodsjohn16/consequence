import '../styles/styles.scss'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'

import { Provider } from 'react-redux'
import { useStore } from '../redux/store'
import Layout from '../components/layout/layout'

import { SwitchTransition, CSSTransition } from 'react-transition-group'

function MyApp({ Component, pageProps }: AppProps) {
  const store = useStore(pageProps.initialReduxState)
  const router = useRouter()
  
  return (
    <Provider store={store}>
      <Layout>
        {/* <Component {...pageProps} /> */}
        <SwitchTransition mode="out-in">
          <CSSTransition key={router.pathname} classNames="page" timeout={200}>
            <Component {...pageProps} />
          </CSSTransition>
        </SwitchTransition>
      </Layout>
    </Provider>
  )
}
export default MyApp
