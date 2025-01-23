import dynamic from "next/dynamic";
import type { AppProps } from "next/app";
import "@/styles/globals.scss";
import "../variables.css";

const Layout = dynamic(() => import("@/components/Layout/Layout"));

export default function App({ Component, pageProps }: AppProps) {
  return (
      <Layout>
        <Component {...pageProps} />
      </Layout>
  );
}
