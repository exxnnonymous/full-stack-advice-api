import { useState, useEffect } from "react";
import {
  Text,
  Title,
  Container,
  createStyles,
  Button,
  Tooltip,
} from "@mantine/core";
import axios from "axios";
import { Prism } from "@mantine/prism";


// mantine styling
const useStyles = createStyles((theme) => ({
  wrapper: {
    paddingTop: theme.spacing.xl * 4,
    paddingBottom: theme.spacing.xl * 4,
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.white,
  },
  try_api: {
    paddingTop: theme.spacing.xl * 3,
  },

  title: {
    fontWeight: 600,
    marginBottom: theme.spacing.xl * 2,
    textAlign: "center",
    fontSize: "2.5rem",
    color: theme.colorScheme === "light" ? theme.colors.dark[3] : theme.white,
    [theme.fn.smallerThan("sm")]: {
      fontSize: 28,
      textAlign: "left",
    },
  },

  description: {
    textAlign: "center",
    lineHeight: "1.7",
    [theme.fn.smallerThan("sm")]: {
      textAlign: "left",
    },
  },

  get_random: {
    height: 45,
  },

  code_wrapper: {
    marginTop: theme.spacing.xl * 2,
    marginBottom: theme.spacing.xl,
    border: `1px solid ${
      theme.colorScheme === "dark" ? theme.white : theme.colors.dark[6]
    }`,
    borderRadius: "10px",
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.white,
  },
}));

export default function About({ title, description }) {
  const { classes } = useStyles();
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(0);
  const [code, setCode] = useState(`{
    "total_results": "2",
    "slips": [
      {
        "advice": "Remember that spiders are more afraid of you, than you are of them."
      },
      {
      	"advice":"Smile and the world smiles with you. Frown and you're on your own."
      }
     ]
}
    `);

  async function fetchRandom() {
    try {
      const res = await axios.get(
        "/api/advice/sampleApiData?apikey=0f443afe09974640ac469cd02e9fasf785f8af7asafsf87124670"
      );
      setCode(`{
  "slip": 
    {
      "id": ${res.data.slip.id},
      "advice": "${res.data.slip.advice}"
    }
}`);
      setCount((prev) => prev + 1);
    } catch (err) {}
  }

  
  useEffect(() => {
    setLoading(false);
  }, [code]);

  return (
    <div className={classes.wrapper}>
      <Container size={550} p={0}>
        <Text size="lg" className={classes.description} color="dimmed">
          {description}
        </Text>
      </Container>
      <Container className={classes.try_api}>
        <Title className={classes.title} color="dimmed">
          {title}
        </Title>
        <Container size={700} className={classes.code_editor}>
          <Tooltip  opened={count >= 3 ? null : false} label="Register to request more" color={"teal"} withArrow>
            <Button
              variant="gradient"
              gradient={{ from: "indigo", to: "blue" }}
              className={classes.get_random}
              disabled={count >= 3 || loading}
              onClick={() => {
                setLoading(true);
                fetchRandom();
              }}
            >
              {loading ? "Loading..." : "Get Random Advice"}
            </Button>
          </Tooltip>

          <CodeEditor code={code} />
        </Container>
      </Container>
    </div>
  );
}


// prism code highlighter component
function CodeEditor({ code }) {
  const { classes } = useStyles();

  return (
    <>
      <Container className={classes.code_wrapper}>
        <Prism language="js" noCopy>
          {code}
        </Prism>
      </Container>
    </>
  );
}
