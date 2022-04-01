import {useEffect, useRef} from "react";
import { useViewportSize } from "@mantine/hooks";
import { createStyles, Navbar, Group } from "@mantine/core";
import { useRouter } from "next/router";
import {
  LayoutDashboard,
  Settings,
  User,
  Home,
  Logout,
} from "tabler-icons-react";
import ThemeSwitch from "@/components/Misc/ThemeSwitch";
import { useAuth } from "@/context/AuthContext";
import { useModal } from "@/context/ModalLoadingContext";

const useStyles = createStyles((theme, _params, getRef) => {
  const icon = getRef("icon");
  return {
    navbar: {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[7]
          : theme.colors.indigo[0],
      position: "fixed",
      top: 0,
      left: 0,
    },
    logo: {
      fontSize: "1.5rem",
      fontWeight: "700",
      paddingLeft: "1rem",
      [theme.fn.smallerThan("sm")]:{
        paddingLeft:'60px'
      }
    },
    header: {
      paddingBottom: theme.spacing.md,
      marginBottom: theme.spacing.md * 1.5,
      borderBottom: `1px solid ${
        theme.colorScheme === "dark"
          ? theme.colors.dark[4]
          : theme.colors.gray[2]
      }`,
    },

    footer: {
      paddingTop: theme.spacing.md,
      marginTop: theme.spacing.md,
      borderTop: `1px solid ${
        theme.colorScheme === "dark"
          ? theme.colors.dark[4]
          : theme.colors.gray[2]
      }`,
    },

    link: {
      ...theme.fn.focusStyles(),
      display: "flex",
      alignItems: "center",
      cursor: "pointer",
      textDecoration: "none",
      marginBottom: "5px",
      fontSize: theme.fontSizes.sm,
      color:
        theme.colorScheme === "dark"
          ? theme.colors.dark[1]
          : theme.colors.gray[7],
      padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
      borderRadius: theme.radius.sm,
      fontWeight: 500,

      "&:hover": {
        backgroundColor:
          theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.white,
        color: theme.colorScheme === "dark" ? theme.white : theme.black,

        [`& .${icon}`]: {
          color: theme.colorScheme === "dark" ? theme.white : theme.black,
        },
      },
    },

    linkIcon: {
      ref: icon,
      color:
        theme.colorScheme === "dark"
          ? theme.colors.dark[2]
          : theme.colors.gray[6],
      marginRight: theme.spacing.sm,
    },

    linkActive: {
      "&, &:hover": {
        backgroundColor:
          theme.colorScheme === "dark"
            ? theme.fn.rgba(theme.colors.indigo[8], 0.25)
            : theme.fn.rgba(theme.colors.indigo[8], 0.1),
        color:
          theme.colorScheme === "dark" ? theme.white : theme.colors.indigo[8],
        [`& .${icon}`]: {
          color:
            theme.colorScheme === "dark"
              ? theme.colors.indigo[9]
              : theme.colors.indigo[6],
        },
      },
    },
  };
});

const homeLink = { link: "/", label: "Home", icon: Home }

const link_data = [
  { component: "main", label: "Dashboard", icon: LayoutDashboard },
  { component: "account", label: "Account", icon: User },
  { component: "setting", label: "Settings", icon: Settings },
];

export default function NavbarSimple({ setActivePage,activePage,opened,toggleOpened }) {
  const { classes, cx } = useStyles();
  const { height, width } = useViewportSize();
  const router = useRouter();
  const { logoutAction } = useAuth();
  const { startLoad } = useModal();

  // hiding and showing dashboard navbar
  const navRef = useRef()
  useEffect(()=>{
    if(opened){
      navRef.current.classList.add("show_dash_nav")
    }else{
      navRef.current.classList.remove("show_dash_nav")

    }

  },[opened])

  // closing navbar
  function closeNavbar() {
    if (opened) {
      toggleOpened(false);
      navRef.current.classList.remove("show_dash_nav");
    }
  }

  const links = link_data.map((item) => (
    <a
      className={cx(classes.link, {
        [classes.linkActive]: item.component === activePage,
      })}
      key={item.label}
      onClick={(event) => {
        event.preventDefault();
        width <= 768 && closeNavbar();
        setActivePage(item.component);
      }}
    >
      <item.icon className={classes.linkIcon} />
      <span>{item.label}</span>
    </a>
  ));

  

  return (
    <Navbar
    ref={navRef}
      height={height}
      className={`${classes.navbar} responsive_nav`}
      width={{ sm: 260, lg:300 }}
      p="md"
    >
      <Navbar.Section grow>
        <Group className={classes.header} position="apart">
          <div className={classes.logo}>Advice</div>
          <div onClick={closeNavbar}>
          <ThemeSwitch />
          </div>
        </Group>
        <a
          className={classes.link}
          key={homeLink.label}
          onClick={(event) => {
            event.preventDefault();
            width <= 768 && closeNavbar();
            startLoad() ;
            router.push(homeLink.link);
          }}
        >
          <homeLink.icon className={classes.linkIcon} />
          <span>{homeLink.label}</span>
        </a>
        {links}
      </Navbar.Section>
      <Navbar.Section className={classes.footer}>
        <a
          className={classes.link}
          onClick={(event) => {
            event.preventDefault();
            startLoad();
            router.replace("/");
            logoutAction();
          }}
        >
          <Logout className={classes.linkIcon} />
          <span>Logout</span>
        </a>
      </Navbar.Section>
    </Navbar>
  );
}
