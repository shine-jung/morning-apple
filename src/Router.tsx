import { Box } from '@mui/material';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ThemeModeToggle from './components/common/ThemeModeToggle';
import Main from './pages/Main';
import Post from './pages/Post';

function Router() {
  return (
    <BrowserRouter>
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
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/post" element={<Post />} />
        </Routes>
      </Box>
      <Box sx={{ position: 'fixed', bottom: 16, right: 16 }}>
        <ThemeModeToggle />
      </Box>
    </BrowserRouter>
  );
}

export default Router;
