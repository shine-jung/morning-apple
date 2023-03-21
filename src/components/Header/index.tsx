import { AppBar, Toolbar, Container, Box, useTheme } from '@mui/material';
import { useEffect, useState } from 'react';
import { imageSrc } from '../../utils/commons';

function Header() {
  const theme = useTheme();
  const [position, setPosition] = useState(window.pageYOffset);
  const transparent = position < (theme.mixins.toolbar.minHeight as number);

  useEffect(() => {
    const handleScroll = () => {
      const moving = window.pageYOffset;
      setPosition(moving);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <AppBar
      position="fixed"
      color="inherit"
      sx={{
        '&.transparent': {
          backgroundColor: 'transparent',
          transition: 'background-color 0.1s ease-out',
          boxShadow: 0,
        },
        '&.paper': {
          backgroundColor: theme.palette.background.paper,
          transition: 'background-color 0.1s ease-out',
          boxShadow: 'rgb(0 0 0 / 8%) 0px 0px 8px',
        },
      }}
      className={`${transparent ? 'transparent' : 'paper'}`}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box component="img" src={imageSrc.logoImage} sx={{ width: 56, mx: 'auto', my: 2 }} />
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;
