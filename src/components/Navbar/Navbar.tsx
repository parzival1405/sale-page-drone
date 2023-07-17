import { Navbar as MantineNavbar, NavLink, useMantineTheme } from '@mantine/core';
import { useAtom } from 'jotai';
import { hideNavbarAtom } from '@atom/applicationAtoms';
import { IconGauge, IconNews } from '@tabler/icons-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const data = [
  { icon: IconGauge, label: 'Tổng quan', link: '/' },
  { icon: IconNews, label: 'Tin tức', link: '/post' },
];

function Navbar() {
  const theme = useMantineTheme();

  const [hideNavbar] = useAtom(hideNavbarAtom);

  const [active, setActive] = useState(0);

  const items = data.map((item, index) => (
    <NavLink
      key={item.label}
      active={index === active}
      label={item.label}
      icon={<item.icon size="1.25rem" stroke={1.5} />}
      onClick={() => setActive(index)}
      sx={{ borderRadius: theme.radius.sm }}
      component={Link}
      to={item.link}
    />
  ));

  return (
    <MantineNavbar p="md" hiddenBreakpoint="sm" hidden={!hideNavbar} width={{ sm: 250 }}>
      {items}
    </MantineNavbar>
  );
}

export default Navbar;
