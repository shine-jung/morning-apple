import { Box, Link as MuiLink, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getTodayPost } from '../apis/post';
import { IPost } from '../types/post';

export default function Main() {
  const [post, setPost] = useState<IPost>();
  const [name, setName] = useState<string | null>(null);

  const loadData = async () => {
    const response = await getTodayPost();
    setPost(response);
  };

  const getName = () => {
    const nameList = [
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
    const choice = nameList[Math.floor(Math.random() * nameList.length)];
    return choice;
  };
  const fixName = () => {
    const name = getName();
    setName(name);
  };

  useEffect(() => {
    loadData();
    let timer = setInterval(() => {
      fixName();
    }, 25);
    setTimeout(() => {
      clearInterval(timer);
      setName(null);
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
      <Typography>{name ? '오늘의 사과는 과연?' : post?.nickname}</Typography>
      <Box
        component="img"
        src={
          !name && post?.imageURL ? post?.imageURL : 'https://art.pixilart.com/2cbb96b2bfb0e8a.gif'
        }
        sx={{ height: 400, borderRadius: 1 }}
      />
      <Typography variant="h4" sx={{ whiteSpace: 'pre-line' }}>
        {name ?? post?.content}
      </Typography>
      <MuiLink component={Link} to="/post">
        글 쓰러 가기
      </MuiLink>
    </Box>
  );
}
