import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { newsApiService } from "../api/newsApi";

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
        } catch(e) {
            console.log("error", e);
            setNews([]);
            setTotalNews(0);
        } finally {
            setLoading(false);
        }
    }, []);


    const fetchArticles = useCallback(async () => {
        try {
            setLoading(true)
            const resp = await newsApiService.fetchNewsFeed();
            setNews(resp.data.articles);
            setTotalNews(resp.data.totalResults)
        } catch (e) {
            console.log("Error in new", e);
            setNews([]);
            setTotalNews(0)
        } finally {
            setLoading(false)
        }
    }, [setTotalNews, setNews, setLoading]);

    const handleSearchArticle = useCallback(async (searchText) => {
        if (!searchText.trim().length) {
            await fetchArticles();
        } else {
            await searchArticle(searchText);
        }
    }, [fetchArticles, searchArticle]);

    useEffect(() => {
        const cb = async () => {
            await fetchArticles();
        }
        cb();
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
        fetchArticles
    };

    return <NewsContext.Provider value={NewsContextData}>{props.children}</NewsContext.Provider>
}