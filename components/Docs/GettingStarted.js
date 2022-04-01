import React from "react";
import { Text, Box, Tooltip, useMantineTheme } from "@mantine/core";
import { useClipboard, useViewportSize } from "@mantine/hooks";
import { Copy } from "tabler-icons-react";
import styles from "@/styles/Docs.module.css";

function GettingStarted({ getUrl }) {
  const theme = useMantineTheme();
  const { width } = useViewportSize();
  const clipboard = useClipboard({ timeout: 1500 });
  return (
    <div className={styles.making_request}>
      <Text size="sm" pb={20}>
        You will get 15 credits daily for free which you can use to fetch data
        from the API.
      </Text>
      <Text size="xl">Making requests</Text>
      <Box
        sx={(theme) => {
          return {
            backgroundColor:
              theme.colorScheme === "dark"
                ? theme.colors.dark[6]
                : theme.colors.gray[2],
            border: `1px solid ${
              theme.colorScheme === "dark"
                ? theme.colors.dark[5]
                : theme.colors.gray[4]
            }`,
          };
        }}
        className={styles.request_box}
      >
        <span>GET</span>
        <div className={styles.url_box}>
          <code>{getUrl}</code>
        </div>
        <Tooltip
          label={clipboard.copied ? "Copied" : "Copy Url"}
          color={clipboard.copied ? "pink" : "indigo"}
          withArrow
        >
          <Copy
            size={width <= 650 ? 26 : 40}
            className={styles.copyIcon}
            style={{
              borderColor: `${theme.colors.indigo[9]}`,
            }}
            onClick={() => clipboard.copy(getUrl)}
            color={theme.colors.indigo[9]}
          />
        </Tooltip>
      </Box>
    </div>
  );
}

export default GettingStarted;
