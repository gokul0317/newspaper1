import React, { useCallback, useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import NewspaperOutlined from '@mui/icons-material/NewspaperOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { addNewsValidation } from '../utils/validations/addnews';
import { useNavigate } from "react-router-dom";
import { useAppContext } from '../ContextAPI/AppContext';
import { useNewsContext } from '../ContextAPI/NewsContext';
import { useGlobalContext } from '../ContextAPI/GlobalContext';

const theme = createTheme();

const initialError = { title: "", description: "", content: ""};
const initialData = {
    "source": {
        "id": "news",
        "name": "News"
    },
    "author": "",
    "title": "",
    "description": "",
    "url": "",
    "urlToImage": "",
    "publishedAt": "",
    "content": ""
}

export default function AddNews() {
    const [currentNews, setCurrentNews] = useState({ ...initialData })
    const [errorMessages, setErrorMessage] = useState({ ...initialError });
    const navigate = useNavigate();
    const { profile } = useAppContext();
    const { addNews } = useNewsContext();
    const { showAlert } = useGlobalContext();

    const handleUpdateProfile = useCallback((event) => {
        const { name, value } = event.target;
        setCurrentNews({
            ...currentNews,
            [name]: value
        })
    }, [currentNews]);
    
    const handleSubmit = useCallback(async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const title = data.get("title");
        const content = data.get("content");
        const description = data.get("description");
        const formData = {
            ...currentNews,
            title,
            content,
            description,
        }
        const isNewsInvalid = addNewsValidation(formData);
        if (isNewsInvalid.isInValid) {
            setErrorMessage({
                ...isNewsInvalid.messages,
            });
        } else {
            setErrorMessage({ ...initialError });
            await addNews(formData);
            showAlert({ message: "News Added", severity: "success" });
            navigate("/");
        }
    }, [setErrorMessage, navigate, addNews, currentNews, showAlert]);
    
    useEffect(() => {
        setCurrentNews({
            ...currentNews, 
            author: `${profile.firstName},${profile.lastName}`,
        })
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [profile]);

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar style={{ width: "64px", height: "64px" }} sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <NewspaperOutlined style={{ height: "90%", width: "90%" }} />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Add news
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    name="title"
                                    fullWidth
                                    id="title"
                                    label="Title"
                                    autoFocus
                                    value={currentNews?.title}
                                    autoComplete="title"
                                    onChange={handleUpdateProfile}
                                    error={!!errorMessages.title}
                                    helperText={errorMessages.title}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    multiline
                                    type="text"
                                    rows="5"
                                    id="description"
                                    label="Description"
                                    name="description"
                                    autoComplete="description"
                                    value={currentNews?.description}
                                    onChange={handleUpdateProfile}
                                    error={!!errorMessages.description}
                                    helperText={errorMessages.description}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    multiline
                                    id="content"
                                    label="Content"
                                    name="content"
                                    rows="8"
                                    type="text"
                                    autoComplete="content"
                                    value={currentNews?.content}
                                    onChange={handleUpdateProfile}
                                    error={!!errorMessages.content}
                                    helperText={errorMessages.content}
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Add News
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}