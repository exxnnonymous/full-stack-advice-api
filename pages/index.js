import { useEffect } from "react";
import Head from "next/head";
import About from "@/components/Home/TryAPI";
import HeroTitle from "@/components/Home/HeroTitle";
import { useModal } from "@/context/ModalLoadingContext";

export default function Home() {
  const { closeLoad } = useModal();

  // closing loading screen
  useEffect(() => {
    closeLoad();
  }, []);



  return (
    <div>
      <Head>
        <title>Advice API</title>
        <meta name="description" content="Get free advices anytime." />
       
      </Head>

      <HeroTitle />

      <About
        title="Give the API a Try"
        description="The Advice JSON API is provided free for all and allows you to get advices on any random category or as per your choice. It is simple and easy to use api."
      />
    </div>
  );
}



export async function getServerSideProps() {
  const data = "myData";
  return { props: { data } };
}