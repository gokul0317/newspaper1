import React, { useCallback, useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useLocation } from 'react-router-dom';
import NoImage from "../assets/images/no-image-icon.png";
import { useNewsContext } from '../ContextAPI/NewsContext';
import Loading from '../Components/Common/Loading';

export default function News() {
    const { search } = useLocation();
    const { loading, findCurrentItem } = useNewsContext();
    const [currentItem, setCurrentItem] = useState({});


    const getQueryURL = useCallback(() => {
        const params = search.split("newsURL=");
        const formatedURL = params.splice(1, params.length - 1).join("");
        return formatedURL;
    }, [search]);

    useEffect(() => {
        const queryURL = getQueryURL();
        const getCurrentItem = findCurrentItem(queryURL);
        setCurrentItem(getCurrentItem ? getCurrentItem : {});
    }, [getQueryURL, findCurrentItem]);

    if (loading) return <Loading />;

    return (
        <Grid container spacing={2} direction="column" style={{ gap: "1rem", margin: "1rem", alignItems: "center", justifyContent: "center", width: "90%" }}>
            <Grid item style={{ display: "flex", alignItems: "center", justifyContent: "center"  }}>
                <img style={{ width: "100%", maxWidth: "500px", maxHeight: "300px" }} alt={currentItem?.urlToImage} src={currentItem?.urlToImage ? currentItem?.urlToImage : NoImage} />
            </Grid>
            <Grid item>
                <Typography variant='h5'>
                    {currentItem?.title}
                </Typography>
            </Grid>
            <Grid item>
                <Typography>
                    {currentItem?.description}
                </Typography>
            </Grid>
            <Grid item>
                <Typography>
                    {currentItem?.content}
                </Typography>
            </Grid>
            <Grid item>
                <Grid container direction="row" gap="1rem">
                    <Grid item>
                        <Typography>
                            source: {currentItem?.source?.name}
                        </Typography>
                    </Grid>
                    <Grid item>
                        {currentItem?.author && <Grid item>
                            <Typography>
                                author: {currentItem?.author}
                            </Typography>
                        </Grid>}
                    </Grid>
                    <Grid item>
                        <Typography>
                            published at: {new Date(currentItem?.publishedAt).toLocaleString()}
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>

        </Grid>
    )
}
