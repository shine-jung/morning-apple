import {
  Box,
  Button,
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
  } = useForm<IFormData>();
  const onValid = async (formData: IFormData) => {
    setIsLoading(true);
    const id = await addPost(formData);
    const response = await getPost(id);
    setData(response);
    handleDialogOpen();
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
        <InputLabel>닉네임</InputLabel>
        <TextField
          {...register('nickname', { required: '필수 입력 항목입니다' })}
          size="small"
          helperText={errors.nickname?.message}
        />
        <Box sx={{ height: 16 }} />
        <Box>
          {newImgDir ? (
            <Box
              component="img"
              alt="selected image"
              src={typeof newImgDir === 'string' ? newImgDir : undefined}
              sx={{ maxHeight: 300 }}
            />
          ) : (
            <Box
              sx={{
                width: 1,
                height: 300,
                backgroundColor: 'divider',
                borderRadius: 1,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Typography>올리고 싶은 사진이 있으면 첨부해 주세요!</Typography>
            </Box>
          )}
          <Button variant="outlined" component="label" sx={{ mt: 2 }}>
            사진 선택
            <input
              type="file"
              accept="image/x-png, image/gif, image/jpeg"
              onChange={onChangeImage}
              hidden
            />
          </Button>
        </Box>
        <Box sx={{ height: 16 }} />
        <InputLabel>설명</InputLabel>
        <TextField
          {...register('content', { required: '필수 입력 항목입니다' })}
          size="small"
          helperText={errors.content?.message}
          multiline
          minRows={2}
          fullWidth
        />
        <Box sx={{ height: 16 }} />
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button variant="contained" type="submit">
            제출
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
        <DialogContent>
          <DialogContentText>당신의 응답이 제출 되었습니다.</DialogContentText>
          <Typography>{data?.nickname}</Typography>
          {data?.imageURL && <Box component="img" src={data?.imageURL} />}
          <Typography>{data?.content}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} autoFocus>
            확인
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
