import '../styles/globals.css';

import Head from 'next/head';

function MyApp({ Component, pageProps }) {
    return (
        <>

          <Head>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css" integrity="sha512-KfkfwYDsLkIlwQp6LFnl8zNdLGxu9YAA1QvwINks4PhcElQSvqcyVLLD9aMhXd13uQjoXtEKNosOWaZqXgel0g==" crossOrigin="anonymous" referrerpolicy="no-referrer" />
          </Head>
          <Component {...pageProps} />
        </>
    );
}

export default MyApp
