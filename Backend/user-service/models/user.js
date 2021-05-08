const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 2
    },
    surname: {
        type: String,
        required: true,
        min:2
    },
    email: {
        type: String,
        unique: true
    },
    username: {
        type: String,
        required: true,
        min: 5
    },
    password: {
        type: String,
        required: true
    },
    signupDate: {
        type: Date,
        default: Date.now(),
        required: true
    },
    profiles: {
        type: [Object],
        default: []
    },
    recents: {
        type: [Object],
        default: [],
        required: true
    },
    liked: {
        type: [Number],
        default: [],
        required: true
    },
    disliked: {
        type: [Number],
        default: [],
        required: true
    },
    watchlist: {
        type: [Object],
        default: [],
        required: true
    },
    confirmed: {
        type: Boolean,
        default: false,
        required: true
    }
}, 
    {
    timestamps: true
    }
);

const User = mongoose.model('User', userSchema);

module.exports = User;