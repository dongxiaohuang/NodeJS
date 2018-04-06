const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const Dishes = require('./models/dishes');

const url = 'mongodb://localhost:27017/conFusion';
const connect = mongoose.connect(url);

connect.then(() => {
    const db = mongoose.connection;
    //Mongoose creates a default connection when you call mongoose.connect().
    //You can access the default connection using mongoose.connection.
    console.log('Connected correctly to server');

    Dishes.create({
            name: 'Uthappiz2za',
            description: 'test'
        })
        .then((dish) => {
            console.log(dish);

            return Dishes.findByIdAndUpdate(dish._id, {
                    $set: {
                        description: "new test"
                    }
                }, {
                    new: true  //return a updated data in promise
                })
                .exec();
        })
        .then((dish) => {
            console.log(dish);

            return db.collection('dishes').drop();
        })
        .then(() => {
            return db.close();
        })
        .catch((err) => {
            console.log(err);
        });

});
