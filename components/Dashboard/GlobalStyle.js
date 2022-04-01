import { Global } from "@mantine/core";

// to change color of dashboard page
export default function GlobalStyle() {
  return (
    <Global
      styles={(theme) => ({
        body: {
          backgroundColor:
            theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.fn.rgba(theme.colors.indigo[0], 0.75),
        },
      })}
    />
  );
}
