import {
  createStyles,
  Container,
  Text,
  Button,
  Group,
} from "@mantine/core";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/router";
import { useModal } from "@/context/ModalLoadingContext";

const BREAKPOINT = "@media (max-width: 755px)";

const useStyles = createStyles((theme) => ({
  wrapper: {
    boxSizing: "border-box",
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.white,
  },

  inner: {
    position: "relative",
    paddingTop: 150,
    paddingBottom: 120,

    [BREAKPOINT]: {
      paddingBottom: 80,
      paddingTop: 80,
    },
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontSize: 62,
    fontWeight: 900,
    lineHeight: 1.1,
    margin: 0,
    padding: 0,
    color: theme.colorScheme === "dark" ? theme.white : theme.black,

    [BREAKPOINT]: {
      fontSize: 42,
      lineHeight: 1.2,
    },
  },

  description: {
    marginTop: theme.spacing.xl,
    fontSize: 24,

    [BREAKPOINT]: {
      fontSize: 18,
    },
  },

  controls: {
    marginTop: theme.spacing.xl * 2,

    [BREAKPOINT]: {
      marginTop: theme.spacing.xl,
    },
  },

  control: {
    height: 54,
    paddingLeft: 38,
    paddingRight: 38,

    [BREAKPOINT]: {
      height: 54,
      paddingLeft: 18,
      paddingRight: 18,
      flex: 1,
    },
  },

  githubControl: {
    borderWidth: 2,
    borderColor:
      theme.colorScheme === "dark" ? "transparent" : theme.colors.dark[9],
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[5] : "transparent",

    "&:hover": {
      backgroundColor: `${
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0]
      } !important`,
    },
  },
}));

export default function HeroTitle() {
  const { classes } = useStyles();
  const { authenticated, registered } = useAuth();
  const router = useRouter()
  const {openModal, register_modal,startLoad} = useModal()

  return (
    <div className={classes.wrapper}>
      <Container size={700} className={classes.inner}>
        <h1 className={classes.title}>
          Get{" "}
          <Text
            component="span"
            variant="gradient"
            gradient={{ from: "indigo", to: "blue" }}
            inherit
          >
            real-time
          </Text>{" "}
          Advice api for free
        </h1>

        <Text className={classes.description} color="dimmed">
          Build different applications with ease using our api - Advice provides
          many advices on different topics and category for free
        </Text>

        <Group className={classes.controls}>
          {authenticated || registered ? (
            <Button
              size="xl"
              className={classes.control}
              variant="gradient"
              gradient={{ from: "indigo", to: "blue" }}
              onClick={()=>{
                startLoad()
                router.push('/dashboard')
              }}
            >
              Dashboard
            </Button>
          ) : (
            <Button
              size="xl"
              className={classes.control}
              variant="gradient"
              gradient={{ from: "indigo", to: "blue" }}
              onClick={() => {
                register_modal();
                openModal();
              }}
            >
              Get Started
            </Button>
          )}
        </Group>
      </Container>
    </div>
  );
}
