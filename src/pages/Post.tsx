import {
  Backdrop,
  Box,
  Button,
  ButtonBase,
  CircularProgress,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  InputLabel,
  Link as MuiLink,
  TextField,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { addPost, getPost } from '../apis/post';
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
        <InputLabel sx={{ mb: 1, color: 'text.primary' }}>한 줄 설명</InputLabel>
        <TextField
          {...register('content', { required: '필수 입력 항목입니다' })}
          size="small"
          placeholder="내일의 이슈왕이 되어보세요!"
          helperText={errors.content?.message}
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
            <Button variant="outlined" component="label" sx={{ mt: 2 }}>
              사진 바꾸기
              <input
                type="file"
                accept="image/x-png, image/gif, image/jpeg"
                onChange={onChangeImage}
                hidden
              />
            </Button>
          )}
        </Box>
        <Box sx={{ height: 64 }} />
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button variant="contained" type="submit" sx={{ width: 320 }}>
            제출하기
          </Button>
        </Box>
        <Box sx={{ height: 16 }} />
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <MuiLink component={Link} to="/">
            오늘의 소식 보기
          </MuiLink>
        </Box>
      </Container>
      <Dialog open={open} onClose={handleDialogClose}>
        <DialogTitle>제출 완료!</DialogTitle>
        <DialogContent
          sx={{
            width: 400,
            height: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 1,
          }}
        >
          <DialogContentText>당신의 응답이 제출 되었습니다.</DialogContentText>
          <Typography>{data?.nickname}</Typography>
          {data?.imageURL && (
            <Box component="img" src={data?.imageURL} sx={{ height: 300, borderRadius: 1 }} />
          )}
          <Typography variant="subtitle1" sx={{ whiteSpace: 'pre-line', textAlign: 'center' }}>
            {data?.content}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} autoFocus>
            확인
          </Button>
        </DialogActions>
      </Dialog>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={isLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
}
