import { Button as MuiButton, styled } from '@mui/material';

export const Button = styled(MuiButton)(({ theme }) => ({
  width: 300,
  height: 56,
  borderRadius: 24,
  boxShadow: theme.shadows[4],
  fontSize: 18,
  fontWeight: 500,
  ':hover': {
    boxShadow: theme.shadows[4],
  },
}));
