import Head from "next/head";

import Navbar from "../components/Navbar/Navbar";
import Homepage from "../components/Home/Homepage";
import SectionOne from "../components/Home/SectionOne";

export default function Home() {
  return (
    <>
      <Head>
        <title>Shopify</title>
        <meta name="description" content="Your shopping place now and forever." />
      </Head>

      <Navbar />
      <Homepage />
      <SectionOne />
    </>
  );
}
