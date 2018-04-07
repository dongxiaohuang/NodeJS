const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// will add the Currency type to the Mongoose Schema types
require('mongoose-currency').loadType(mongoose);
var Currency = mongoose.Types.Currency;

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
    image: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    label: {
        type: String,
        default: ''
    },
    price: {
        type: Currency,
        required: true,
        min: 0
    },
    featured:{
        type: Boolean,
        required: false
    }
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
