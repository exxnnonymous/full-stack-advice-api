import React from "react";
import { createStyles, Text, SimpleGrid, Container } from "@mantine/core";
import { Rocket, Certificate, Coin } from "tabler-icons-react";

const useStyles = createStyles((theme) => ({
  feature: {
    position: "relative",
    paddingTop: theme.spacing.xl,
    paddingLeft: theme.spacing.xl,
  },

  overlay: {
    position: "absolute",
    height: 100,
    width: 160,
    top: 0,
    left: 0,
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.fn.rgba(theme.colors[theme.primaryColor][7], 0.2)
        : theme.colors[theme.primaryColor][0],
    zIndex: 1,
  },

  content: {
    position: "relative",
    zIndex: 2,
  },

  icon: {
    color:
      theme.colors[theme.primaryColor][theme.colorScheme === "dark" ? 4 : 6],
  },

  title: {
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
  },
}));

function Feature({ icon: Icon, title, description, className, ...others }) {
  const { classes, cx } = useStyles();

  return (
    <div className={cx(classes.feature, className)} {...others}>
      <div className={classes.overlay} />

      <div className={classes.content}>
        <Icon size={38} className={classes.icon} />
        <Text weight={700} size="lg" mb="xs" mt={5} className={classes.title}>
          {title}
        </Text>
        <Text color="dimmed" size="sm">
          {description}
        </Text>
      </div>
    </div>
  );
}

const mockdata = [
  {
    icon: Coin,
    title: "Free credits Daily",
    description:
      "You will get 15 credits daily for free which you can use to get data from the API. You even don't need to pay a dime!",
  },
  {
    icon: Rocket,
    title: "Ultra Fast Speed",
    description:
      "You will get the information in the speed of light. Our API is build on top of the fastest and most powerful servers.",
  },
  {
    icon: Certificate,
    title: "Best Advice JSON API",
    description:
      "Our API is the one of the best API available in the market. It is both fast and free!",
  },
];

export default function FeaturesItems() {
  const items = mockdata.map((item) => <Feature {...item} key={item.title} />);

  return (
    <Container mt={30} mb={30} size="xl">
      <SimpleGrid
        cols={3}
        breakpoints={[{ maxWidth: "sm", cols: 1 }]}
        spacing={50}
      >
        {items}
      </SimpleGrid>
    </Container>
  );
}
