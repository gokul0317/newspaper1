const mongoose = require("mongoose");

const News = require("../models/news");

const saveNews = (bookMark) => {
    const { source, author, title, url, urlToImage, content, user, description } = bookMark;
    const newNews = new News({
        _id: new mongoose.Types.ObjectId,
        title,
        author,
        source,
        url,
        urlToImage,
        content,
        user,
        description
    });
    return newNews.save();
}

const updateExtraFields = (value, id) => {
    return News.findByIdAndUpdate(id, { ...value });
}


const getAllNews = () => {
    return News.find().sort({ publishedAt: 1 }).populate("user", "email").select("-__v");
}


module.exports = {
    saveNews,
    getAllNews,
    updateExtraFields
}

