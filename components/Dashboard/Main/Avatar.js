import React from 'react';
import {
  UnstyledButton,
  Group,
  Avatar,
  Text,
  createStyles,
} from '@mantine/core';
import { ChevronRight } from 'tabler-icons-react';

const useStyles = createStyles((theme) => ({
  user: {
    display: 'block',
    width: '100%',
    padding: theme.spacing.md,
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    borderRadius: "10px",
    border: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]
    }`,

    

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
    },
  },
}));


export default function UserButton({ avatarName, name, email, color }) {
  const { classes } = useStyles();

  return (
    <UnstyledButton className={classes.user} >
      <Group>
        <Avatar radius="xl"  color={color}>{avatarName}</Avatar>

        <div style={{ flex: 1 }}>
          <Text size="sm" weight={500}>
            {name}
          </Text>

          <Text color="dimmed" size="xs">
            {email}
          </Text>
        </div>

         <ChevronRight size={14} />
      </Group>
    </UnstyledButton>
  );
}