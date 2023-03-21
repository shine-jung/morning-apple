import { Fireworks } from '@fireworks-js/react';
import { Box, Button, Link as MuiLink, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { getTodayPost } from '../apis/post';
import { IPost } from '../types/post';

export default function Main() {
  const [post, setPost] = useState<IPost>();
  const [text, setText] = useState<string>('');
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const isShowPost = isLoading && post;
  const loadData = async () => {
    const response = await getTodayPost();
    setPost(response);
  };

  const getText = () => {
    const textList = [
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
    const choice = textList[Math.floor(Math.random() * textList.length)];
    return choice;
  };
  const changeText = () => {
    const text = getText();
    setText(text);
  };
  const onClickShow = () => {
    setShow(true);
    let timer = setInterval(() => {
      changeText();
    }, 25);
    setTimeout(() => {
      clearInterval(timer);
      setIsLoading(true);
    }, 5000);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
      {isShowPost && (
        <Fireworks
          options={{
            rocketsPoint: {
              min: 0,
              max: 100,
            },
          }}
          style={{
            zIndex: -1,
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            position: 'fixed',
          }}
        />
      )}
      <Box
        sx={{
          width: 1,
          height: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 4,
        }}
      >
        <Typography variant="h4">
          {isShowPost ? `${post.nickname}의 소식` : '오늘의 사과는 과연?'}
        </Typography>
        <Box
          component="img"
          src={
            show
              ? 'https://art.pixilart.com/2cbb96b2bfb0e8a.gif'
              : 'https://images.unsplash.com/photo-1484069560501-87d72b0c3669?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
          }
          sx={{ height: 400, borderRadius: 1, display: isShowPost ? 'none' : 'flex' }}
        />
        <AnimatePresence>
          {isShowPost && post?.imageURL && (
            <motion.img
              src={post.imageURL}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              style={{ height: 400, borderRadius: 8 }}
            />
          )}
        </AnimatePresence>
        {show ? (
          <Typography variant="h3" sx={{ whiteSpace: 'pre-line', textAlign: 'center', height: 50 }}>
            {isShowPost ? post.content : text}
          </Typography>
        ) : (
          <Button className="glow-on-hover" onClick={onClickShow}>
            클릭해서 확인하기
          </Button>
        )}
        <MuiLink component={Link} to="/post">
          글 쓰러 가기
        </MuiLink>
      </Box>
    </>
  );
}
