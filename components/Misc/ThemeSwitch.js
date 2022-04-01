import { ActionIcon, useMantineColorScheme } from '@mantine/core';
import { Sun, MoonStars } from 'tabler-icons-react';


export default function ThemeSwitch() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === 'dark';


  return (
    <ActionIcon
      variant="outline"
      color={dark ? 'yellow' : 'indigo'}
      onClick={() => toggleColorScheme()}
      title={dark ? "Light mode":"Dark mode"}
    >
      {dark ? <Sun size={18} /> : <MoonStars size={18} />}
    </ActionIcon>
  );
}