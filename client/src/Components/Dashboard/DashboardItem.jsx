import React, { useCallback, useEffect, useRef, useState } from 'react';
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

import { useNewsContext } from '../../ContextAPI/NewsContext';

export default function DashboardItem({ newsItem }) {
    const { addOrRemoveBookMark, isItembookMarked } = useNewsContext();
    const [disable, setDisable] = useState(false);
    const interval = useRef(null)
    const toggleBookMark = useCallback(async () => {
        setDisable(true);
        await addOrRemoveBookMark(newsItem);
        interval.current = setTimeout(() => {
            setDisable(false);
        }, 500)
    }, [addOrRemoveBookMark, newsItem]);

    const getBookMark = useCallback(() => {
        return isItembookMarked(newsItem)
    }, [newsItem, isItembookMarked])

    useEffect(() => {
        return () => {
            if (interval.current) clearInterval(interval.current)
        }
    }, [])

    return <Grid item key={newsItem?.url}><Card sx={{ maxWidth: 345, minWidth: 300, height: "100%", width: "100%" }}>
        <CardHeader
            avatar={
                <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                    {newsItem?.source?.name[0]}
                </Avatar>
            }
            title={newsItem?.source?.name}
            subheader={new Date(newsItem.publishedAt).toDateString()}
        />
        {<Link component={RouterLink} to={`/news?newsURL=${newsItem?.url}`}>
            <CardMedia
                component="img"
                height="200"
                image={newsItem.urlToImage ? newsItem.urlToImage : NoImage}
                alt="Image"
            />
        </Link>}
        <CardContent>
            <Link component={RouterLink} to={`/news?newsURL=${newsItem?.url}`}>
                <Typography variant="body2" color="text.secondary">
                    {newsItem?.title}
                </Typography>
            </Link>
        </CardContent>
        <CardActions disableSpacing>
            <IconButton disabled={disable} aria-label="add to favorites" onClick={toggleBookMark}>
                <Bookmark color={getBookMark() ? 'success' : ""} />
            </IconButton>
        </CardActions>
    </Card></Grid>;
}

