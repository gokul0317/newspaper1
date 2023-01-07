import * as React from 'react';
import Grid from '@mui/material/Grid';

export default function EmptyItems({ itemName }) {
  const textname = itemName ? itemName : "Item"
  return (
    <Grid container sx={{ width: "100%", margin: "10px", height: "100%", justifyContent: "center" }}>
        No {textname} Found
    </Grid>
  );
}