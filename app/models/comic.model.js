const mongoose = require('mongoose');
const Schema = mongoose.Schema
const ComicSchema = new Schema({
    serieTitle: String,
    issueNumber: String,
    publisher: String,
}, {
    timestamps: true
});

module.exports = mongoose.model('Comic', ComicSchema);
