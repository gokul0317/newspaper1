const mongoose = require("mongoose");

const News = require("../models/news");

const saveNews = (bookMark) => {
    const { source, author, title, url, urlToImage, content, user } = bookMark;
    const newNews = new News({
        _id: new mongoose.Types.ObjectId,
        title,
        author,
        source,
        url,
        urlToImage,
        content,
        user
    });
    return newNews.save();
}


const getAllNews = (user) => {
    return News.find({ user }).populate("user", "email").select("-__v");
}


module.exports = {
    saveNews,
    getAllNews
}

