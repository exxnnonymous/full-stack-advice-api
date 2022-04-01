import { useState, useEffect, useRef } from "react";
import {
  createStyles,
  Header,
  Group,
  Container,
  Burger,
  Button,
} from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";
import { useRouter } from "next/router";
import ThemeSwitch from "../Misc/ThemeSwitch";
import { useModal } from "@/context/ModalLoadingContext";
import { useAuth } from "@/context/AuthContext";

const useStyles = createStyles((theme) => ({
  logo: {
    fontSize: "1.5rem",
    fontWeight: "700",
    [theme.fn.smallerThan("sm")]: {
      marginLeft: "3rem",
    },
  },
  inner: {
    position: "relative",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: 56,
  },

  links: {
    width: 260,
    [theme.fn.smallerThan("sm")]: {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[7]
          : theme.colors.gray[1],
    },
  },

  signup_btn: {
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },
  signup_btn_mbl: {
    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
  },

  burger: {
    marginRight: theme.spacing.md,
    zIndex: 115,

    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
  },
  burger_fixed: {
    position: "fixed",
  },
  burger_absolute: {
    position: "absolute",
  },
  responsive_dash_btn: {
    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
  },
  link: {
    display: "block",
    lineHeight: 1,
    padding: "8px 12px",
    borderRadius: theme.radius.sm,
    textDecoration: "none",
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    [theme.fn.smallerThan("sm")]: {
      fontSize: "1.5rem",
      padding: ".8rem 1.3rem",
    },

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[1],
    },
  },

  linkActive: {
    "&, &:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.fn.rgba(theme.colors.indigo[9], 0.25)
          : theme.colors.indigo[2],
      color: theme.colors.indigo[theme.colorScheme === "dark" ? 3 : 7],
    },
  },
}));

export default function HeaderMiddle({ links }) {
  const [opened, toggleOpened] = useState(false);
  const [active, setActive] = useState(links[0].link);
  const { classes, cx } = useStyles();
  const router = useRouter();
  const headerRef = useRef();
  const { width } = useViewportSize();

  const { openModal, register_modal, login_modal, startLoad } = useModal();
  const { authenticated, registered } = useAuth();


  // changing active to highlight the link
  useEffect(() => {
    setActive(router.pathname);
  }, [router]);


  // to toggle header in mobile view
  function toggleHeader() {
    if (opened) {
      toggleOpened(false);
      headerRef.current.classList.remove("header_hide");
    } else {
      headerRef.current.classList.add("header_hide");
      toggleOpened(true);
    }
  }

  // to chose header in mobile view
  function closeHeader() {
    if (opened) {
      toggleOpened(false);
      headerRef.current.classList.remove("header_hide");
    }
  }


  // generating links 
  const items = links.map((link) => (
    <a
      key={link.label}
      href={link.link}
      className={cx(classes.link, {
        [classes.linkActive]: active === link.link,
      })}
      onClick={(event) => {
        event.preventDefault();
        width <= 768 && closeHeader();
        startLoad();
        setActive(link.link);
        router.push(link.link);
      }}
    >
      {link.label}
    </a>
  ));

  return (
    <Header height={56}>
      <Container className={classes.inner} size="xl">
        <Burger
          opened={opened}
          onClick={() => toggleHeader()}
          size="sm"
          className={opened ? `${classes.burger} ${classes.burger_fixed}` : `${classes.burger} ${classes.burger_absolute}`}
        />

        <Group
          ref={headerRef}
          className={`${classes.links} responsive_header`}
          spacing={5}
        >
          {items}
          <div className={classes.responsive_dash_btn}>
            {(!authenticated && !registered )&& (
              <Group className={classes.signup_btn_mbl}>
                <Button
                  color="indigo"
                  onClick={() => {
                    width <= 768 && closeHeader();
                    login_modal();
                    openModal();
                  }}
                >
                  Login
                </Button>
                <Button
                  color="indigo"
                  variant="outline"
                  onClick={() => {
                    width <= 768 && closeHeader();
                    register_modal();
                    openModal();
                  }}
                >
                  Sign Up
                </Button>
              </Group>
            )}
          </div>
        </Group>

        <div className={classes.logo}>Advice</div>

        <Group spacing={20} position="right" noWrap>
          {authenticated || registered ? (
            <>
              <DashboardBtn />
            </>
          ) : (
            <Group className={classes.signup_btn}>
              <Button
                color="indigo"
                onClick={() => {
                  login_modal();
                  openModal();
                }}
              >
                Login
              </Button>
              <Button
                color="indigo"
                variant="outline"
                onClick={() => {
                  register_modal();
                  openModal();
                }}
              >
                Sign Up
              </Button>
            </Group>
          )}

          <ThemeSwitch />
        </Group>
      </Container>
    </Header>
  );
}

function DashboardBtn() {
  const { startLoad } = useModal();
  const router = useRouter();
  return (
    <Button
      color="indigo"
      onClick={() => {
        startLoad();
        router.push("/dashboard");
      }}
    >
      Dashboard
    </Button>
  );
}
