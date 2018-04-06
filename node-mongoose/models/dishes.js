const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    rating: {
        type: Number,
        max: 5,
        min: 1,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    comment: {
        type: String
    }
}, {
    timestamps: true
});
const dishSchema = new Schema({
    name : {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    comments: [commentSchema]// an array of type of commentSchema
},{
    timestamps: true // add addtime and modified time for each document
// optional parameters
});

var Dishes = mongoose.model('Dish', dishSchema);// model name is single but it will automatically transformated to plural by mongoose

module.exports = Dishes;
