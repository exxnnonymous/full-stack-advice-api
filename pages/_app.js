import "../styles/globals.css";
import App from "next/app";
import { useState, useEffect } from "react";
import Head from "next/head";

import { MantineProvider, ColorSchemeProvider } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
import { useHotkeys, useLocalStorage } from "@mantine/hooks";

import ModalComponent from "@/components/Misc/Modal";
import HeaderMiddle from "@/components/Layout/Header";
import AuthProvider from "@/context/AuthContext";
import ModalProvider from "@/context/ModalLoadingContext";
import Notification from "@/components/Misc/Notification";
import getuserinfo from "../helper/getuserinfo";
import LoadingComponent from "@/components/Misc/Loading";
import { useRouter } from "next/router";
import InitialLoading from "@/components/Misc/InitialLoading";

function MyApp({ Component, pageProps, auth }) {
  const [loading, setLoading] = useState(true);
  const [colorScheme, setColorScheme] = useLocalStorage({
    key: "mantine-color-scheme",
    defaultValue: "dark",
  });
  const router = useRouter();

  const toggleColorScheme = () =>
    setColorScheme(colorScheme === "dark" ? "light" : "dark");

  useHotkeys([["mod+J", () => toggleColorScheme()]]);

  const links = [
    { link: "/", label: "Home" },
    { link: "/features", label: "Features" },
    { link: "/docs", label: "API Docs" },
  ];

  // closing initial loading screen
  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <>
      <Head>
        <title>Advice API</title>
        <meta name="description" content="Get free advices anytime." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {loading && <InitialLoading />}

      <ColorSchemeProvider
        colorScheme={colorScheme}
        toggleColorScheme={toggleColorScheme}
      >
        <MantineProvider
          theme={{ colorScheme, fontFamily: "Poppins" }}
          withGlobalStyles
        >
          <AuthProvider myAuth={auth}>
            <ModalProvider>
              <NotificationsProvider>
                <Notification />
                <LoadingComponent />
                {router.pathname !== "/404" &&
                  router.pathname !== "/dashboard" && (
                    <HeaderMiddle links={links} />
                  )}
                {router.pathname !== "/dashboard" && <ModalComponent />}
                <Component {...pageProps} />
              </NotificationsProvider>
            </ModalProvider>
          </AuthProvider>
        </MantineProvider>
      </ColorSchemeProvider>
    </>
  );
}

export default MyApp;

MyApp.getInitialProps = async (appContext) => {
  if (typeof window === "undefined") {
    const appProps = await App.getInitialProps(appContext);
    const auth = await getuserinfo(appContext.ctx);
    return { ...appProps, auth: auth };
  } else {
    return {};
  }
};



export async function getServerSideProps() {
  const data = "myData";
  return { props: { data } };
}