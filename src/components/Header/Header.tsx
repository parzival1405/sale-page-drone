import {
  ActionIcon,
  Burger,
  Flex,
  Group,
  Header as MantineHeader,
  MediaQuery,
  Text,
  useMantineTheme,
} from '@mantine/core';
import AffinaLogo from '@icon/AffinaLogo';
import { useAtom, useSetAtom } from 'jotai';
import { colorSchemeAtom, hideNavbarAtom } from '@atom/applicationAtoms';
import { IconLogout, IconMoonStars, IconSun } from '@tabler/icons-react';

function Header() {
  const theme = useMantineTheme();

  const [hideNavbar, setHideNavbar] = useAtom(hideNavbarAtom);
  const setColorScheme = useSetAtom(colorSchemeAtom);

  return (
    <MantineHeader height={{ base: 65 }} p="md">
      <Group position="apart">
        <Flex align="center" h="100%">
          <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
            <Burger
              opened={hideNavbar}
              onClick={() => setHideNavbar((o) => !o)}
              size="sm"
              color={theme.colors.gray[6]}
              mr="xl"
            />
          </MediaQuery>

          <Group spacing="1.5rem">
            <AffinaLogo />
            <Text size="xl" weight={500}>
              Admin Portal
            </Text>
          </Group>
        </Flex>

        <Group spacing="xs">
          <ActionIcon
            variant="outline"
            title="Thay đổi chế độ màu"
            color={theme.colorScheme === 'dark' ? 'yellow' : 'blue'}
            onClick={() => setColorScheme(theme.colorScheme === 'dark' ? 'light' : 'dark')}
          >
            {theme.colorScheme === 'dark' ? (
              <IconSun size="1.125rem" />
            ) : (
              <IconMoonStars size="1.125rem" />
            )}
          </ActionIcon>
          <ActionIcon variant="outline" title="Đăng xuất" color="blue">
            <IconLogout size="1.125rem" />
          </ActionIcon>
        </Group>
      </Group>
    </MantineHeader>
  );
}

export default Header;
