import React, { useCallback } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import Bookmark from '@mui/icons-material/Bookmark';
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import { Link as RouterLink } from 'react-router-dom';
import NoImage from "../../assets/images/no-image-icon.png";

import { useNewsContext } from '../../ContextAPI/NewContext';

export default function DashboardItem({ newsItem }) {
    const { addOrRemoveBookMark, isItembookMarked } = useNewsContext();

    const toggleBookMark = useCallback(() => {
        addOrRemoveBookMark(newsItem);
    }, [addOrRemoveBookMark, newsItem]);

    const getBookMark = useCallback(() => {
       return isItembookMarked(newsItem)
    }, [newsItem, isItembookMarked])

    return <Grid item key={newsItem?.url}><Card sx={{ maxWidth: 345 }}>
        <CardHeader
            avatar={
                <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                    {newsItem?.source?.name[0]}
                </Avatar>
            }
            title={newsItem?.source?.name}
            subheader={new Date(newsItem.publishedAt).toDateString()}
        />
        {<CardMedia
            component="img"
            height="200"
            image={newsItem.urlToImage ? newsItem.urlToImage : NoImage}
            alt="Image"
        />}
        <CardContent>
            <Link component={RouterLink} to={`/news?newsURL=${newsItem?.url}`}>
                <Typography variant="body2" color="text.secondary">
                    {newsItem?.title}
                </Typography>
            </Link>
        </CardContent>
        <CardActions disableSpacing>
            <IconButton aria-label="add to favorites" onClick={toggleBookMark}>
                <Bookmark color={getBookMark() ? 'success' : ""} />
            </IconButton>
        </CardActions>
    </Card></Grid>;
}

