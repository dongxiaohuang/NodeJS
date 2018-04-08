const mongoose = require('mongoose');
const Schema = mongoose.Schema;
/*
{
      "name": "Peter Pan",
      "image": "images/alberto.png",
      "designation": "Chief Epicurious Officer",
      "abbr": "CEO",
      "description": "Our CEO, Peter, . . .",
      "featured": false
}
*/
const leaderSchema = new Schema({
    "name": {
        type: String,
        required: true
    },
    "image": {
        type: String,
        required: true
    },
    "designation": {
        type: String,
        required: true
    },
    "abbr":{
        type: String,
        required: true
    },
    "description":{
        type: String,
        required: true
    },
    "featured":{
        type: Boolean,
        required:false
    }
});

var leaders = mongoose.model('leader', leaderSchema);

module.exports = leaders;
