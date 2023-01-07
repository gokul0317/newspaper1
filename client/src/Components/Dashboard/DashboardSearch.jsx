import React, { useCallback } from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Clear from '@mui/icons-material/Clear';
import { useNewsContext } from '../../ContextAPI/NewsContext';

export default function DashboardSearch() {
    const { search, setSearch, handleSearchArticle, fetchArticles } = useNewsContext();

    const handleSearch = useCallback((event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const searchText = data.get("search");
        handleSearchArticle(searchText);
    }, [handleSearchArticle]);

    return (
        <Grid container style={{ margin: "10px", justifyContent: "center", width: "100%" }}>
            <Grid item>
                <Paper
                    component="form"
                    sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: "100%" }}
                    onSubmit={handleSearch}
                >
                    <InputBase
                        sx={{ ml: 1, flex: 1 }}
                        placeholder="Search News"
                        inputProps={{ 'aria-label': 'search news' }}
                        value={search}
                        name="search"
                        onChange={(e) => {
                            setSearch(e.target.value)
                        }}
                    />
                    <IconButton type="button" onClick={async () => {
                        setSearch("");
                        await fetchArticles()
                    }} sx={{ p: '10px' }} aria-label="clear">
                        <Clear />
                    </IconButton>
                    <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
                        <SearchIcon />
                    </IconButton>
                </Paper>
            </Grid>
        </Grid>
    )
}
