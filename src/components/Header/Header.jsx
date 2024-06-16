import React from 'react';
import { Typography } from '@mui/material';
import { HeaderBox } from './styles';

const Header = () => {
  return (
    <HeaderBox>
      <Typography variant="h4" component="h1">
        Todo List App
      </Typography>
      <Typography variant="subtitle1">
        Manage your tasks with this app
      </Typography>
    </HeaderBox>
  );
};

export default Header;
