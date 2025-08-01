import { ActionIcon, Button, Group, useMantineColorScheme } from '@mantine/core';
import { IconMoon, IconSun } from '@tabler/icons-react';

export function ColorSchemeToggle() {
  const { setColorScheme, colorScheme } = useMantineColorScheme();

  return (
    <Group justify="start" style={theme => ({
      // border: '1px solid #2C2E33',
      backgroundColor: colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[2],
      borderRadius: '20px',
      width: "fit-content"
    })}>
      {
        colorScheme === 'dark' ? (
          <ActionIcon onClick={() => setColorScheme('light')} variant='transparent'>
            <IconSun color='yellow' />
          </ActionIcon>
        ) : ( 
          <ActionIcon onClick={() => setColorScheme('dark')} variant='transparent'>
            <IconMoon color='black' />
          </ActionIcon>
        )
      }
    </Group>
  );
}
