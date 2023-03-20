import { Box, Link as MuiLink, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getTodayPost } from '../apis/post';
import { IPost } from '../types/post';

export default function Main() {
  const [post, setPost] = useState<IPost>();

  const loadData = async () => {
    const response = await getTodayPost();
    setPost(response);
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
      {post?.imageURL && (
        <Box component="img" src={post?.imageURL} sx={{ height: 400, borderRadius: 1 }} />
      )}
      <Typography variant="h4" sx={{ whiteSpace: 'pre-line' }}>
        {post?.content}
      </Typography>
      <MuiLink component={Link} to="/post">
        글 쓰러 가기
      </MuiLink>
    </Box>
  );
}
