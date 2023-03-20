import { Box, Link as MuiLink, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getPosts } from '../apis/post';
import { IPost } from '../types/post';

export default function Main() {
  const [posts, setPosts] = useState<IPost[]>([]);
  const post = posts[Math.floor(Math.random() * posts.length)];

  const loadData = async () => {
    const response = await getPosts();
    setPosts(response);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <Box
      sx={{
        width: 1,
        height: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 3,
      }}
    >
      <Typography>{post?.nickname}</Typography>
      {post?.imageURL && <Box component="img" src={post?.imageURL} sx={{ height: 400 }} />}
      <Typography variant="h4">{post?.content}</Typography>
      <MuiLink component={Link} to="/post">
        글 쓰러 가기
      </MuiLink>
    </Box>
  );
}
