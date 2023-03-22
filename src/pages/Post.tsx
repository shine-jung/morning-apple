import {
  Alert,
  Backdrop,
  Box,
  Button as MuiButton,
  ButtonBase,
  CircularProgress,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  InputLabel,
  TextField,
  Toolbar,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { addPost, getPost } from '../apis/post';
import { Button } from '../components/common/Button';
import Header from '../components/Header';
import { IFormData, IPost } from '../types/post';

export default function Post() {
  const [isLoading, setIsLoading] = useState(false);
  const [newImgDir, setNewImgDir] = useState<string | ArrayBuffer | null>(null);
  const [open, setOpen] = useState(false);
  const [data, setData] = useState<IPost>();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<IFormData>();
  const onValid = async (formData: IFormData) => {
    setIsLoading(true);
    const id = await addPost(formData);
    const response = await getPost(id);
    setData(response);
    handleDialogOpen();
    reset();
    setNewImgDir(null);
    setIsLoading(false);
  };
  const onChangeImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader();
    fileReader.onload = function () {
      setNewImgDir(fileReader.result);
    };
    const { files } = event.target;
    setValue('imageFile', files ? files[0] : null);
    if (files) fileReader.readAsDataURL(files[0]);
  };
  const handleDialogOpen = () => {
    setOpen(true);
  };
  const handleDialogClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Header />
      <Toolbar />
      <Toolbar />
      <Container maxWidth="sm" component="form" onSubmit={handleSubmit(onValid)}>
        <InputLabel sx={{ mb: 1, color: 'text.primary' }}>닉네임(익명 가능)</InputLabel>
        <TextField
          {...register('nickname', { required: '필수 입력 항목입니다' })}
          size="small"
          placeholder="홍길동"
          helperText={errors.nickname?.message}
          error={Boolean(errors.nickname?.message)}
        />
        <Box sx={{ height: 24 }} />
        <InputLabel sx={{ mb: 1, color: 'text.primary' }}>한 줄 소개</InputLabel>
        <TextField
          {...register('content', { required: '필수 입력 항목입니다' })}
          size="small"
          placeholder="ex) 반려동물 자랑, 재미있는 에피소드 등 공유"
          helperText={errors.content?.message ?? '내일의 이슈왕이 될지도?'}
          error={Boolean(errors.content?.message)}
          multiline
          maxRows={2}
          fullWidth
        />
        <Box sx={{ height: 24 }} />
        <InputLabel sx={{ mb: 1, color: 'text.primary' }}>
          함께 올리고 싶은 사진이 있다면 추가로 올려주세요!
        </InputLabel>
        <Box>
          {newImgDir ? (
            <Box
              component="img"
              alt="selected image"
              src={typeof newImgDir === 'string' ? newImgDir : undefined}
              sx={{ maxHeight: 300, borderRadius: 1 }}
            />
          ) : (
            <ButtonBase
              component="label"
              sx={{
                width: 300,
                height: 300,
                backgroundColor: 'divider',
                borderRadius: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                color: 'text.secondary',
              }}
            >
              <input
                type="file"
                accept="image/x-png, image/gif, image/jpeg"
                onChange={onChangeImage}
                hidden
              />
              <Typography>사진과 함께 소개하기</Typography>
              <Typography>Click!</Typography>
            </ButtonBase>
          )}
          {newImgDir && (
            <MuiButton variant="outlined" component="label" sx={{ mt: 2 }}>
              사진 바꾸기
              <input
                type="file"
                accept="image/x-png, image/gif, image/jpeg"
                onChange={onChangeImage}
                hidden
              />
            </MuiButton>
          )}
        </Box>
        <Box sx={{ height: 64 }} />
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
          <Button variant="contained" type="submit">
            제출하기
          </Button>
          <Link to="/">
            <Button sx={{ backgroundColor: 'background.paper' }}>오늘의 소식 보기</Button>
          </Link>
        </Box>
      </Container>
      <Toolbar />
      <Dialog open={open} onClose={handleDialogClose}>
        <DialogTitle>제출 완료!</DialogTitle>
        <DialogContent
          sx={{
            width: 400,
            maxWidth: 1,
            height: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <Alert sx={{ width: 1 }}>당신의 응답이 제출되었습니다.</Alert>
          <Typography>닉네임: {data?.nickname}</Typography>
          {data?.imageURL && (
            <Box component="img" src={data?.imageURL} sx={{ height: 300, borderRadius: 1 }} />
          )}
          <Typography variant="subtitle1" sx={{ whiteSpace: 'pre-line', textAlign: 'center' }}>
            {data?.content}
          </Typography>
        </DialogContent>
        <DialogActions>
          <MuiButton onClick={handleDialogClose} autoFocus>
            확인
          </MuiButton>
        </DialogActions>
      </Dialog>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={isLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
}
