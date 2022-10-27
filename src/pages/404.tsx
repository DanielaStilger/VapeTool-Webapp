import { Typography, Stack } from '@mui/material';
import React from 'react';

const NoFoundPage: React.FC<{}> = () => (
  <Stack>
  <Typography variant="h1" component="h1">404</Typography>
  <Typography variant="body1">Sorry, the page you visited does not exist.</Typography>
  </Stack>
);

export default NoFoundPage;
