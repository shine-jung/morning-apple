import {
  Backdrop,
  Box,
  Button,
  Card,
  CircularProgress,
  Container,
  Typography,
} from '@mui/material';
import { onAuthStateChanged, User } from 'firebase/auth';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { auth } from '../../service/firebase';
import { IPost } from '../../types/post';
import { imageSrc } from '../../utils/commons';
import { displayTimeKo } from '../../utils/functions';
import { deletePost, getPosts } from './apis/post';
import Login from './Login';
import { logout } from './services/auth';

export default function Admin() {
  const { enqueueSnackbar } = useSnackbar();
  const [init, setInit] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<IPost[]>([]);
  const loadData = async () => {
    const response = await getPosts();
    setPosts(response);
  };
  const handleDelete = async (id: string) => {
    if (window.confirm('정말로 삭제하시겠습니까?')) {
      await deletePost(id);
      await loadData();
      enqueueSnackbar('삭제되었습니다.', { variant: 'success' });
    }
  };

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      setUser(user);
      setInit(true);
    });
    loadData();
  }, []);

  return (
    <>
      {init ? (
        <>
          {user ? (
            <Container>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  py: 4,
                }}
              >
                <Typography variant="h3">사과 창고</Typography>
                <Box>
                  <Button variant="contained" onClick={logout}>
                    로그아웃
                  </Button>
                </Box>
              </Box>
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: `repeat(4, 1fr)`,
                  gap: 3,
                  pb: 8,
                }}
              >
                {posts.map((post) => (
                  <Card
                    key={post.id}
                    sx={{
                      p: 2,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                      gap: 2,
                    }}
                  >
                    <Typography>{displayTimeKo(post.createdAt.toDate())}</Typography>
                    <Typography>닉네임: {post.nickname}</Typography>
                    <Box
                      component="img"
                      src={post.imageURL ?? imageSrc.alternativeImage}
                      sx={{ height: 200, borderRadius: 1 }}
                    />
                    <Typography
                      variant="subtitle1"
                      sx={{ whiteSpace: 'pre-line', textAlign: 'center' }}
                    >
                      {post.content}
                    </Typography>
                    <Box sx={{ width: 1, display: 'flex', justifyContent: 'flex-end' }}>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => handleDelete(post.id)}
                      >
                        삭제
                      </Button>
                    </Box>
                  </Card>
                ))}
              </Box>
            </Container>
          ) : (
            <Login />
          )}
        </>
      ) : (
        <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={true}>
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
    </>
  );
}
