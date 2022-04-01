import React from "react";
import { createStyles, Text, Card, RingProgress, Group } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  today_span:{
    fontSize:'12px',
    paddingLeft:'5px',
  },
  card: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[7]
        : theme.white,
  },

  label: {
    fontWeight: 700,
    lineHeight: 1,
    color:
      theme.colorScheme === "dark"
        ? theme.colors.gray[5]
        : theme.colors.gray[8],
  },

  lead: {
    fontWeight: 700,
    fontSize: 22,
    lineHeight: 1,
    color:
      theme.colorScheme === "dark"
        ? theme.colors.gray[5]
        : theme.colors.gray[8],
  },
  lead_label: {
    fontWeight: 600,
  },

  inner: {
    display: "flex",

    [theme.fn.smallerThan(350)]: {
      flexDirection: "column",
    },
  },

  ring: {
    flex: 1,
    display: "flex",
    justifyContent: "flex-end",

    [theme.fn.smallerThan(350)]: {
      justifyContent: "center",
      marginTop: theme.spacing.md,
    },
  },
}));

export default function StatsRingCard({
  title,
  completed,
  total,
  stats,
  tillNow,
}) {
  const { classes, theme } = useStyles();
  const statValue = (completed / total) * 100;

  
  const items = stats.map((stat) => {
    if(stat.label === "Remaining Credits"){
      return(<div key={stat.label}>
        <Text className={classes.label}>{stat.value} <span className={classes.today_span}>(today)</span></Text>
        <Text size="xs" color="dimmed" className={classes.lead_label}>
          {stat.label}
        </Text>
        
      </div>)
    }
    return(<div key={stat.label}>
      <Text className={classes.label}>{stat.value}</Text>
      <Text size="xs" color="dimmed" className={classes.lead_label}>
        {stat.label}
      </Text>
    </div>)

  });

  return (
    <div>
      <Card withBorder p="xl" radius="md" className={`${classes.card} responsive_stat`}>
        <div className={classes.inner}>
          <div>
            <Text size="xl" className={`${classes.label} stat_label`}>
              {title}
            </Text>
            <div>
              <Text className={classes.lead} mt={20}>
                {tillNow.value}
              </Text>
              <Text size="xs" color="dimmed" className={classes.lead_label}>
                {tillNow.label}
              </Text>
            </div>
            <Group mt="lg">{items}</Group>
          </div>

          <div className={classes.ring}>
            <RingProgress
              roundCaps
              thickness={6}
              size={130}
              sections={[
                {
                  value: statValue,
                  color:
                    statValue < 20
                      ? theme.colors.indigo[9]
                      : statValue < 50
                      ? theme.colors.green[9]
                      : theme.colors.red[9],
                },
              ]}
              label={
                <div>
                  <Text
                    align="center"
                    size="lg"
                    className={classes.label}
                    sx={{ fontSize: 22 }}
                  >
                    {((completed / total) * 100).toFixed(0)}%
                  </Text>
                  <Text
                    align="center"
                    size="xs"
                    color="dimmed"
                    className={classes.lead_label}
                  >
                    Used
                  </Text>
                </div>
              }
            />
          </div>
        </div>
      </Card>
    </div>
  );
}
