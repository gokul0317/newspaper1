const mongoose = require('mongoose');

const newsSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    source: {
        id: String,
        name: String
    },
    author: { type: String, required: true },
    description: { type: String, required: true },
    title: { type: String, required: true },
    url: { type: String },
    urlToImage: { type: String },
    content: { type: String, required: true },
    publishedAt: {
        type: Date,
        default: Date.now
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

module.exports = mongoose.model('News', newsSchema);
