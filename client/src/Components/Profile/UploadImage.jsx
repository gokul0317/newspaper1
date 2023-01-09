import React from 'react'
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { DropZone } from "./DropZone";

export function UploadImage() {
    return (
        <Box component="form" noValidate onSubmit={(e) => e.preventDefault()}  sx={{ mt: 3 }} style={{ width: "100%" }}>
            <Grid container spacing={2} justifyContent="center">
                <DropZone />
            </Grid>
        </Box>
    )
}
