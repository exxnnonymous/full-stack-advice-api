
import Head from "next/head";
import { useEffect,useState } from "react";

import {
  Title,
  useMantineTheme,
  Divider,
  Container
} from "@mantine/core";


import { useModal } from "@/context/ModalLoadingContext";
import { useAuth } from "@/context/AuthContext";
import styles from "@/styles/Docs.module.css";
import TableOfContent from "@/components/Docs/TableOfContent";
import Endpoints from "@/components/Docs/DocsMain";
import GettingStarted from "@/components/Docs/GettingStarted";

const tableofcontent = [
  {
    label: "Making request",
    order: 1,
  },
  {
    label: "Endpoints",
    order: 1,
  },
  {
    label: "Objects",
    order: 1,
  },
  {
    label: "Errors and Notices",
    order: 1,
  },
 
  {
    label: "Code Samples",
    order: 1,
  },
];

function Docs() {
  const { closeLoad } = useModal();
  const { user } = useAuth();
  const theme = useMantineTheme();
  const [activeNav, setActiveNav]= useState(0)


  

  const getUrl = user
    ? `${process.env.public_url}/api/advice?apiKey=${user.api_info.api_key}`
    : `${process.env.public_url}/api/advice?apiKey=your_api_key`;

    // closing loading screen
  useEffect(() => {
    closeLoad();
  }, []);


  return (
    <Container size="xl">
      <Head>
        <title>Docs | Advice API</title>
      </Head>
      <section className={styles.docs_section}>
        <div className={styles.docs_table_nav} >
          <div
            className={styles.doc_nav_wrap}
            style={{
              border: `1px solid ${
                theme.colorScheme === "dark"
                  ? theme.colors.dark[4]
                  : theme.colors.gray[4]
              }`,
            }}
          >
            <Title order={3} mb={15} style={{ fontWeight: 500 }}>
              Table of Content
            </Title>
            <TableOfContent activeNav={activeNav} links={tableofcontent} />
          </div>
        </div>
        <div className={styles.docs_right_col}>
          <Title>API Docs</Title>
          <Divider my="xl" />
          <div className={styles.getting_started}>
            <GettingStarted getUrl={getUrl}/>
          </div>

          <div className={styles.docs_other_info}>
            <Endpoints setActiveNav={setActiveNav}/>
          </div>
        </div>
      </section>
    </Container>
  );
}

export default Docs;