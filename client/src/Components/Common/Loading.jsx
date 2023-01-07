import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';

export default function Loading() {
  return (
    <Grid container sx={{ width: "100%", margin: "10px", height: "100%", justifyContent: "center" }}>
      <Grid item>
        <CircularProgress />
      </Grid>
    </Grid>
  );
}