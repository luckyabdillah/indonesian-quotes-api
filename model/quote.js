const mongoose = require('mongoose');

const Quote = mongoose.model('Quote', new mongoose.Schema({
    // id: {
    //     type: Number,
    //     required: true,
    // },
    quote: {
        type: String,
        required: true,
    },
    source: {
        type: String,
        required: true,
        default: "Unknown",
    },
    description: {
        type: String,
        default: null,
    },
    category: {
        type: String,
        default: null,
    }
}, { versionKey: false }));

module.exports = Quote