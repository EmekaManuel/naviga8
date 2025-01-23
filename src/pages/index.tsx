import Head from "next/head";
import styles from "./index.module.scss";
import dynamic from "next/dynamic";

const HeroSection = dynamic(
  () => import("@/components/landing-page-components/HeroSection")
);
const ProductDemo = dynamic(
  () => import("@/components/landing-page-components/ProductDemo")
);

export default function Home() {
  return (
    <>
      <Head>
        <title>Naviga8 - Find Your Way</title>

        <link rel="canonical" href="/" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <HeroSection
          title="Find Your Way with <br /> Seamless Navigation"
          subtitle="Discover locations, search for places, and get accurate directions with our intuitive map app. Simplify your journeys like never before."
          btnActionText="Explore App Below"
          btnUrl="#"
        />

        <ProductDemo />
      </main>
    </>
  );
}
