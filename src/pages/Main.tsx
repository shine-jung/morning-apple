import { Fireworks } from '@fireworks-js/react';
import { Box, Typography, useTheme } from '@mui/material';
import { useEffect, useLayoutEffect, useState } from 'react';
import Countdown from 'react-countdown';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getTodayPost } from '../apis/post';
import { IPost } from '../types/post';
import { imageSrc } from '../utils/commons';
import { getNextDate, giveZeroPadding, imagePreload } from '../utils/functions';
import { BouncingDotsLoader } from '../components/common/BouncingDotsLoader';
import { Button } from '../components/common/Button';
import { CenterBox } from '../components/common/CenterBox';

const renderer = ({ hours, minutes, seconds, completed }: any) => {
  if (completed) {
    return (
      <Typography color="primary.main" variant="h5">
        새로운 소식이 업데이트 되었습니다!
      </Typography>
    );
  } else {
    return (
      <Typography color="primary.main" variant="h5" fontWeight={500}>
        <span style={{ fontWeight: 400, fontFamily: "'Chivo Mono', monospace" }}>
          {giveZeroPadding(hours)} : {giveZeroPadding(minutes)} : {giveZeroPadding(seconds)}
        </span>
        &nbsp;&nbsp;뒤에 오픈 예정
      </Typography>
    );
  }
};

export default function Main() {
  const { shadows } = useTheme();
  const [post, setPost] = useState<IPost>();
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const isShowPost = !isLoading && post;
  const nextDate = getNextDate();
  const loadData = async () => {
    const response = await getTodayPost();
    setPost(response);
  };
  const handleShow = () => {
    setShow(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 5000);
  };
  const handleCompleteCountdown = async () => {
    await loadData();
    handleShow();
  };
  useLayoutEffect(() => {
    imagePreload(imageSrc.logoImage);
    imagePreload(imageSrc.loadingImage);
    imagePreload(imageSrc.alternativeImage);
  }, []);
  useEffect(() => {
    if (post?.imageURL) {
      imagePreload(post.imageURL);
    }
  }, [post]);
  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
      {show ? (
        <>
          {isShowPost ? (
            <CenterBox sx={{ gap: 3 }}>
              <Fireworks
                options={{
                  rocketsPoint: { min: 0, max: 100 },
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
              <Typography variant="h3">{post.nickname}의 🍎</Typography>
              <motion.img
                src={post.imageURL ?? imageSrc.alternativeImage}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                style={{ height: '50%', borderRadius: 8, boxShadow: shadows[8] }}
              />
              <Typography variant="h3" sx={{ whiteSpace: 'pre-line', textAlign: 'center', my: 1 }}>
                {post.content}
              </Typography>
              <Link to="/post">
                <Button sx={{ backgroundColor: 'background.paper' }}>글 쓰러 가기</Button>
              </Link>
            </CenterBox>
          ) : (
            <CenterBox>
              <Box component="img" src={imageSrc.loadingImage} sx={{ height: '50%' }} />
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                <Typography sx={{ fontSize: 48, fontWeight: 700 }}>오늘의 사과 찾는 중</Typography>
                <BouncingDotsLoader />
              </Box>
            </CenterBox>
          )}
        </>
      ) : (
        <CenterBox sx={{ gap: 5 }}>
          <Countdown
            date={nextDate}
            onComplete={handleCompleteCountdown}
            renderer={renderer}
            daysInHours
          />
          <Typography sx={{ whiteSpace: 'pre-line', textAlign: 'center', fontSize: 48 }}>
            러너분들, 주목!{'\n'}오늘 아침 <b>사과의 주인공</b>은 누구일까요?
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
            <Box component="img" src={imageSrc.logoImage} sx={{ height: 200 }} />
            <Typography color="text.secondary">아침에 사과</Typography>
          </Box>
          <Button variant="contained" onClick={handleShow}>
            클릭해서 확인하기
          </Button>
          <Link to="/post">
            <Button sx={{ backgroundColor: 'background.paper' }}>글 쓰러 가기</Button>
          </Link>
        </CenterBox>
      )}
    </>
  );
}
