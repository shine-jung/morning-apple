import { Box, Link as MuiLink, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getPosts } from '../apis/post';
import { IPost } from '../types/post';

export default function Main() {
  const [posts, setPosts] = useState<IPost[]>([]);
  const post = posts[Math.floor(Math.random() * posts.length)];
  const [name, setName] = useState("기본")

  const loadData = async () => {
    const response = await getPosts();
    setPosts(response);
  };

  const changeName = () => {
    const namesList = [
      'Marcelo',
      'Lizzette',
      'Pauline',
      'Fumiko',
      'Tomasa',
      'Bertha',
      'Antoinette',
      'Tianna',
      'Ammie',
      'Victorina',
      'Marlon',
      'Jules',
      'Arletha',
      'Ellyn',
      'Karol',
      'Corrin',
      'Josephine',
    ];
    const choice = namesList[Math.floor(Math.random() * namesList.length)];
    return choice;
  }
  const fixName = () => {
    const n = changeName();
    setName(n);
  }

  useEffect(() => {
    loadData();
    let timer = setInterval(()=> {
      fixName();
    }, 25);
    setTimeout(()=>{
      clearInterval(timer);
      setName(post?.content)
    }, 1000);
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
      <Typography variant="h4">
        {post?.content}
        {name}
      </Typography>
      <MuiLink component={Link} to="/post">
        글 쓰러 가기
      </MuiLink>
    </Box>
  );
}
