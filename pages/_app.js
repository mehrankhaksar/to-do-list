import { SessionProvider } from "next-auth/react";

import Layout from "@/components/layout";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <Layout>
        <Component {...pageProps} />
        <ToastContainer limit={3} />
      </Layout>
    </SessionProvider>
  );
}
