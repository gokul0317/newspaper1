const mongoose = require("mongoose");

const Bookmark = require("../models/bookmarks");

const saveBookMark = (bookMark) => {
    const { source, author, title, url, urlToImage, content, user } = bookMark;
    const newBookmark = new Bookmark({
        _id: new mongoose.Types.ObjectId,
        title,
        author,
        source,
        url,
        urlToImage,
        content,
        user
    });
    return newBookmark.save();
}


const getAllBookMark = (user) => {
    return Bookmark.find({ user }).populate("user", "email").select("-__v");
}

const removeBookMarkById = (bookmarkId) => {
    return Bookmark.findByIdAndRemove(bookmarkId);
}

module.exports = {
    saveBookMark,
    getAllBookMark,
    removeBookMarkById
}

