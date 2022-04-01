import Head from "next/head";
import { useEffect } from "react";
import { useModal } from "@/context/ModalLoadingContext";
import FeaturesMain from "@/components/Features/Main";

function Features() {
  const { closeLoad } = useModal();

  // closing loading screen
  useEffect(() => {
    closeLoad();
  }, []);

  return (
    <div>
      <Head>
        <title>Features | Advice API</title>
      </Head>
      <div style={{ widt: "100%", height: "100%" }}>
        <FeaturesMain />
      </div>
    </div>
  );
}

export default Features;
