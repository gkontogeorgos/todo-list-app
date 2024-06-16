import { styled } from '@mui/material/styles';
import { Card, Box } from '@mui/material';

export const StyledCard = styled(Card)({
  padding: '20px',
  width: '100%',
  maxWidth: '400px',
  margin: 'auto',
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
});

export const StyledFormItem = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

export const StyledSaveButtonContainer = styled(Box)({
  marginTop: 20,
  display: 'flex',
  justifyContent: 'flex-end',
});

export const StyledTextarea = styled('textarea')(({ theme }) => ({
  padding: '8px',
  resize: 'none',
  minHeight: '80px',
  maxHeight: '240px',
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
  '&:focus': {
    outline: 'none',
    border: `1px solid ${theme.palette.mode}`,
  },
}));
