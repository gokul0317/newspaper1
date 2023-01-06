import React from 'react'
import Container from '@mui/material/Container';
import Box from "@mui/material/Box";

export default function PageContainer({ children }) {
    return (
        <Container maxWidth="xl">
            <Box sx={{ bgcolor: '#cfe8fc', minHeight: "50vh" }} >
                {children}
            </Box>
        </Container>
    )
}
