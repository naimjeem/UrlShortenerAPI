const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const urlSchema = new Schema({
    originalUrl: String,
    shortUrl: String
}, {
    timestamps: true
});

const ModelClass = mongoose.model('shortUrl', urlSchema);

module.exports = ModelClass;