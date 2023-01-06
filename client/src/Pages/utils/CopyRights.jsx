import React from 'react'
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { Link as RouterLink } from 'react-router-dom';

export default function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link component={RouterLink} color="inherit" to="/login">
        NEWS
      </Link>{' - '}
      {new Date().getFullYear()}
    </Typography>
  );
}