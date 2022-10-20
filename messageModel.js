const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    message: {
        type: Object,
    },

}, { timestamps: true });

module.exports = mongoose.model('Message', MessageSchema);
