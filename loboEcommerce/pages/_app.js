import '../styles/globals.scss'
import { Provider } from "react-redux";//imports para poder usar redux e suas sub dependencias e store
import store from "../store";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import Head from "next/head";
import { SessionProvider } from "next-auth/react";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

let persistor = persistStore(store);

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <>
      <Head>{/*titulo da aba do projeto */}
        <title>Lobo Material Construção</title>
        <meta
          name="description"
          content="Tudo em Materiais de Construção para todas as suas necessidades."
        />
        <link rel="icon" href="/icon.png" />
      </Head>
      <SessionProvider session={session}>
        <Provider store={store}> {/*o retorno deve estar ao lado do codigo jsx para funcionar corretamente */}
          <PersistGate loading={null} persistor={persistor}>
            <PayPalScriptProvider deferLoading={true}>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
              />
              <Component {...pageProps} />
            </PayPalScriptProvider>
          </PersistGate>
        </Provider>
        </SessionProvider>
    </>
  );
}

export default MyApp
