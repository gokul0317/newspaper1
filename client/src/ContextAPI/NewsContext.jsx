import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { newsApiService } from "../api/newsApi";
import { useAppContext } from "./AppContext";
import { useGlobalContext } from "./GlobalContext";
import { customNewsService } from "../api/customNewsApi";
import { parseErrorMessage } from "../utils/helpers"


const initialState = {
    news: [],
    loading: true,
    bookmarkLoading: true,
    setBookmarkLoading: () => {},
    totalnews: 0,
    bookMarks: [],
    search: "",
    setLoading: () => { },
    addOrRemoveBookMark: () => { },
    isItembookMarked: () => { },
    findCurrentItem: () => { },
    setSearch: () => { },
    handleSearchArticle: () => { },
    fetchArticles: () => { },
    addNews: () => { },
    firstLoad: true,
    resetNewsState: () => {}
};

const NewsContext = createContext(initialState);

export const useNewsContext = () => {
    return useContext(NewsContext);
}

export const NewsContextProvider = (props) => {
    const [news, setNews] = useState(initialState?.news);
    const [loading, setLoading] = useState(initialState?.loading);
    const [bookmarkLoading, setBookmarkLoading] = useState(initialState?.bookmarkLoading);
    const [bookMarks, setBookMarks] = useState(initialState?.bookMarks);
    const [search, setSearch] = useState(initialState?.search);
    const [firstLoad, setFirstLoad] = useState(initialState.firstLoad);
    const { showAlert, token } = useGlobalContext();
    const { isLoggedIn } = useAppContext()

    const resetNewsState = useCallback(() => {
        setNews(initialState?.news);
        setLoading(initialState?.loading);
        setBookmarkLoading(initialState?.validUser);
        setBookmarkLoading(initialState?.bookmarkLoading);
        setBookMarks(initialState?.bookMarks);
        setFirstLoad(initialState?.firstLoad);
    }, []);

    const addOrRemoveBookMark = useCallback(async (newsItem) => {
        try {
            const bookMarkIndex = bookMarks.findIndex((item) => item.url === newsItem.url);
            if (bookMarkIndex !== -1) {
                const bookMarksCopy = [...bookMarks];
                bookMarksCopy.splice(bookMarkIndex, 1);
                await customNewsService.deleteBookmarks(bookMarks[bookMarkIndex]._id, token);
                setBookMarks(bookMarksCopy);
            } else {
                const bookMarkResponse = await customNewsService.addBookmarks(newsItem, token);
                setBookMarks([...bookMarks, { ...bookMarkResponse.data.data }])
            }
        } catch (e) {
            console.log("Error in bookmark", e)
        }
    }, [bookMarks, setBookMarks, token]);

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
        } catch (e) {
            console.log("error", e);
            showAlert({ message: e?.response?.data?.message, severity: "error" })
            setNews([]);
        } finally {
            setLoading(false);
        }
    }, [showAlert]);

    const fetchCustomArticles = useCallback(async () => {
        const resp = await customNewsService.getAllCustomNews(token);
        return resp.data.data;
    }, [token])

    const fetchNewsApiArtciles = useCallback(async () => {
        const resp = await newsApiService.fetchNewsFeed();
        return resp.data.articles;
    }, [])


    const fetchArticles = useCallback(async () => {
        try {
            setLoading(true)
            let newsList = [];
            // const promises = [fetchCustomArticles(), fetchNewsApiArtciles()];
            // console.log(fetchNewsApiArtciles());
            const promises = [fetchCustomArticles()];
            const result = await Promise.allSettled(promises);
            const succeded = result.filter((resultItem) => resultItem.status === 'fulfilled');
            succeded.forEach((item) => newsList = [...newsList, ...item.value]);
            setNews([...newsList]);
        } catch (e) {
            console.log("Error in new", e);
            showAlert({ message: e?.response?.data?.message, severity: "error" })
            setNews([]);
        } finally {
            setLoading(false)
        }
    }, [setNews, setLoading, showAlert, fetchCustomArticles, fetchNewsApiArtciles]);

    const fetchBookMarks = async () => {
        try {
            setBookmarkLoading(true);
            const resp = await customNewsService.getBookmarks(token);
            setBookMarks(resp.data.data);
        } catch (e) {
            console.log("Error getting bookmarks", e)
        } finally {
            setBookmarkLoading(false);
        }
    }

    const handleSearchArticle = useCallback(async (searchText) => {
        if (!searchText.trim().length) {
            await fetchArticles();
        } else {
            await searchArticle(searchText);
        }
    }, [fetchArticles, searchArticle]);

    const addNews = useCallback(async (newsItem) => {
        try {
            const response = await customNewsService.saveCustomNews(newsItem, token);
            setNews([
                { ...response.data.data },
                ...news
            ]);
            showAlert({ message: "New added successfully", severity: "success", timeOut: 8000 })
        } catch (e) {
            console.log("Add new error", e);
            const message = parseErrorMessage(e, "Failed to save new");
            showAlert({ message, severity: "error", timeOut: 8000 })
        }
    }, [news, setNews, token, showAlert])

    useEffect(() => {
        if (!isLoggedIn) return;
        const cb = async () => {
            await fetchArticles();
            await fetchBookMarks();
        }
        cb();
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoggedIn]);

    const NewsContextData = {
        news,
        loading,
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
        setFirstLoad,
        setLoading,
        bookmarkLoading,
        resetNewsState
    };

    return <NewsContext.Provider value={NewsContextData}>{props.children}</NewsContext.Provider>
}