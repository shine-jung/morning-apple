import { Avatar, Button, TextField, Box, Typography, Container } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { login } from './services/auth';
import { CenterBox } from '../../components/common/CenterBox';
import { useForm } from 'react-hook-form';

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ email: string; password: string }>();
  const onValid = ({ email, password }: { email: string; password: string }) => {
    try {
      login(email, password);
    } catch (error) {
      alert('Login failed.');
    }
  };

  return (
    <CenterBox>
      <Container maxWidth="xs">
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
        </Box>
        <Box component="form" onSubmit={handleSubmit(onValid)} sx={{ mt: 1 }}>
          <TextField
            {...register('email', { required: '필수 입력 항목입니다' })}
            placeholder="아이디를 입력해주세요"
            helperText={errors.email?.message}
            error={Boolean(errors.email?.message)}
            fullWidth
            margin="normal"
            label="Email"
            type="email"
          />
          <TextField
            {...register('password', { required: '필수 입력 항목입니다' })}
            placeholder="비밀번호를 입력해주세요"
            helperText={errors.password?.message}
            error={Boolean(errors.password?.message)}
            fullWidth
            margin="normal"
            label="Password"
            type="password"
          />
          <Button type="submit" fullWidth variant="contained" size="large" sx={{ mt: 3 }}>
            Sign In
          </Button>
        </Box>
      </Container>
    </CenterBox>
  );
}

export default Login;
