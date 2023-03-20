import { Box } from '@mui/material';
import ThemeModeToggle from '../components/common/ThemeModeToggle';

export default function Main() {
  return (
    <Box
      sx={{
        width: 1,
        height: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <ThemeModeToggle />
      Main
    </Box>
  );
}
