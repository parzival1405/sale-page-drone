import { AppShell, useMantineTheme } from '@mantine/core';
import Header from '@component/Header/Header';
import Navbar from '@component/Navbar/Navbar';
import { Outlet } from 'react-router-dom';

function Home() {
  const theme = useMantineTheme();

  return (
    <AppShell
      styles={{
        main: {
          background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
        },
      }}
      navbarOffsetBreakpoint="sm"
      navbar={<Navbar />}
      header={<Header />}
    >
      <Outlet />
    </AppShell>
  );
}

export default Home;
