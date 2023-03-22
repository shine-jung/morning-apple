import { Box } from '@mui/material';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ThemeModeToggle from './components/common/ThemeModeToggle';
import Admin from './pages/Admin';
import Main from './pages/Main';
import Post from './pages/Post';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/post" element={<Post />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <Box sx={{ position: 'fixed', bottom: 16, right: 16 }}>
        <ThemeModeToggle />
      </Box>
    </BrowserRouter>
  );
}

export default Router;
