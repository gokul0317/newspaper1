import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { newsApiService } from "../api/newsApi";
import { useAlertContext } from "./AlertContext";
/* 
{
        "source": {
            "id": "cnn",
            "name": "CNN"
        },
        "author": "Nathaniel Meyersohn",
        "title": "McDonald's CEO says layoffs are coming - CNN",
        "description": "McDonald's is planning to cut some of its corporate staff, CEO Chris Kempczinski said in a memo to employees Friday.",
        "url": "https://www.cnn.com/2023/01/06/business/mcdonalds-layoffs/index.html",
        "urlToImage": "https://media.cnn.com/api/v1/images/stellar/prod/220831113309-01-mcdonalds-california-file.jpg?c=16x9&q=w_800,c_fill",
        "publishedAt": "2023-01-07T14:36:00Z",
        "content": "McDonalds is planning to cut some of its corporate staff, CEO Chris Kempczinski said in a memo to employees Friday.\r\nWe will evaluate roles and staffing levels in parts of the organization and there … [+2070 chars]"
    }
*/
const initialState = {
    news: [],
    loading: false,
    totalnews: 0,
    bookMarks: [],
    search: ""
};

const NewsContext = createContext(initialState);

export const useNewsContext = () => {
    return useContext(NewsContext);
}

export const NewsContextProvider = (props) => {
    const [news, setNews] = useState(initialState?.news);
    const [loading, setLoading] = useState(initialState?.loading);
    const [totalnews, setTotalNews] = useState(initialState?.totalnews);
    const [bookMarks, setBookMarks] = useState(initialState.bookMarks);
    const [search, setSearch] = useState(initialState?.search);
    const [firstLoad, setFirstLoad] = useState(true);
    const { showAlert } = useAlertContext()

    const addOrRemoveBookMark = useCallback((newsItem) => {
        const bookMarkIndex = bookMarks.findIndex((item) => item.url === newsItem.url);
        if (bookMarkIndex !== -1) {
            const bookMarksCopy = [...bookMarks];
            bookMarksCopy.splice(bookMarkIndex, 1);
            setBookMarks(bookMarksCopy);
        } else {
            setBookMarks([...bookMarks, { ...newsItem }])
        }
    }, [bookMarks, setBookMarks]);

    const isItembookMarked = useCallback((newsItem) => {
        const bookMarkItem = bookMarks.find((item) => item.url === newsItem.url);
        return !!bookMarkItem;
    }, [bookMarks]);

    const findCurrentItem = useCallback((url) => {
        return news.find((newsItem) =>
            newsItem.url === url
        );
    }, [news]);

    const searchArticle = useCallback(async (searchText) => {
        try {
            setLoading(true);
            const resp = await newsApiService.searchNews(searchText);
            setNews(resp.data.articles);
            setTotalNews(resp.data.totalResults)
        } catch (e) {
            console.log("error", e);
            showAlert({ message: e?.response?.data?.message, severity: "error" })
            setNews([]);
            setTotalNews(0);
        } finally {
            setLoading(false);
        }
    }, [showAlert]);


    const fetchArticles = useCallback(async () => {
        try {
            setLoading(true)
            const resp = await newsApiService.fetchNewsFeed();
            setNews(resp.data.articles);
            setTotalNews(resp.data.totalResults)
        } catch (e) {
            console.log("Error in new", e);
            showAlert({ message: e?.response?.data?.message, severity: "error" })
            setNews([]);
            setTotalNews(0)
        } finally {
            setLoading(false)
        }
    }, [setTotalNews, setNews, setLoading, showAlert]);

    const handleSearchArticle = useCallback(async (searchText) => {
        if (!searchText.trim().length) {
            await fetchArticles();
        } else {
            await searchArticle(searchText);
        }
    }, [fetchArticles, searchArticle]);

    const addNews = useCallback((newsItem) => {
        setNews([
            { ...newsItem },
            ...news
        ])
    }, [news])

    useEffect(() => {
        const cb = async () => {
            await fetchArticles();
        }
        cb();
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const NewsContextData = {
        news,
        loading,
        totalnews,
        bookMarks,
        addOrRemoveBookMark,
        isItembookMarked,
        findCurrentItem,
        search,
        setSearch,
        handleSearchArticle,
        fetchArticles,
        addNews,
        firstLoad,
        setFirstLoad
    };

    return <NewsContext.Provider value={NewsContextData}>{props.children}</NewsContext.Provider>
}