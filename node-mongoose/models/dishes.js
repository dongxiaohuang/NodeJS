const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dishSchema = new Schema({
    name : {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    }
},{
    timestamps: true // add addtime and modified time for each document
// optional parameters
});

var Dishes = mongoose.model('Dish', dishSchema);// model name is single but it will automatically transformated to plural by mongoose

module.exports = Dishes;
