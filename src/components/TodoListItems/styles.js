import { styled } from '@mui/material/styles';
import { Card } from '@mui/material';

export const StyledCard = styled(Card)({
  boxShadow:
    'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  bottom: 0,
  left: 0,
  width: '100%',
  padding: 10,
});
