const mongoose = require('mongoose');
const Schema = mongoose.Schema;

require('mongoose-currency').loadType(mongoose);
var Currency = mongoose.Types.Currency;
/*
{
      "name": "Weekend Grand Buffet",
      "image": "images/buffet.png",
      "label": "New",
      "price": "19.99",
      "description": "Featuring . . .",
      "featured": false
}
*/
const promotionSchema = new Schema({
    "name": {
        type: String,
        required: true
    },
    "image": {
        type: String,
        required: true
    },
    "label": {
        type: String,
        default: ""
    },
    "price": {
        type: Currency,
        min: 1,
        required: true
    },
    "description": {
        type: String,
        required: true
    },
    "featured": {
        type: Boolean,
        required: false
    }
}, {
    timestamps: true
});

var Promotions = mongoose.model('Promotion', promotionSchema);

module.exports = Promotions;
