import { useEffect, useState } from "react";
import Head from "next/head";
import { useViewportSize } from "@mantine/hooks";
import { Burger,createStyles } from "@mantine/core";

// components
import DashboardLayout from "@/components/Dashboard/DashboardLayout";
import GlobalStyle from "@/components/Dashboard/GlobalStyle";
import NavbarSimple from "@/components/Dashboard/Navbar/Navbar";
import { useModal } from "@/context/ModalLoadingContext";
import getuserinfo from "@/helper/getuserinfo";
import { useAuth } from "@/context/AuthContext";

const useStyles = createStyles((theme)=>{
  return {
    burger:{
      top:'20px',
      left:'20px',
      zIndex:'199'
    },
    burger_fixed: {
      position: "fixed",
    },
    burger_absolute: {
      position: "absolute",
    },
  }
})

function Dashboard({ _user }) {
  const { closeLoad } = useModal();
  const { updateUser, user } = useAuth();
  const [activePage, setActivePage] = useState("main");
  const [opened, toggleOpened] = useState(false);
  const { width } = useViewportSize();
  const {classes} = useStyles()

  // closing loading screen and update user if user doesnot exists.
  useEffect(() => {
    closeLoad();
    if (_user && !user) {
      updateUser(_user);
    }
  }, []);

  

  if (!user) {
    return (
      <div>
        <Head>
          <title>Dashboard | Advice API</title>
        </Head>
      </div>
    );
  }

  return (
    <div className="dashboard_wrapper">
      <GlobalStyle />
      <Head>
        <title>Dashboard | Advice API</title>
      </Head>
      {width <= 768 && (
        <Burger
          opened={opened}
          onClick={() => {
            if(opened){
              toggleOpened(false)
            }
            else{
              toggleOpened(true)

            }
          
          }}
          size="sm"
          className={opened ? `${classes.burger} ${classes.burger_fixed}` : `${classes.burger} ${classes.burger_absolute}`}
        />
      )}
      <NavbarSimple
        activePage={activePage}
        setActivePage={setActivePage}

        toggleOpened={toggleOpened}
        opened={opened}
      />
      <DashboardLayout
        activePage={activePage}
        setActivePage={setActivePage}
        
        opened={opened}
        toggleOpened={toggleOpened}
      />
    </div>
  );
}

export default Dashboard;

export async function getServerSideProps(ctx) {
  const auth = await getuserinfo(ctx);
  if (!auth.authenticated) {
    ctx.res.writeHead(302, {
      Location: "/",
    });
    ctx.res.end();
    return {
      props: {},
    };
  }
  return { props: { _user: auth.user } };
}
