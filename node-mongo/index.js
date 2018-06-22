const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const dboper = require('./dboper');

const url = 'mongodb://localhost:27017/conFusion'; // conFusion database server

MongoClient.connect(url)
  .then((mongodb) => {

    console.log('Connected correctly to server');
    const db = mongodb.db('conFusion');

    return dboper.insertDocument(db, {
          "name": "apple",
          "description": " a fruit"
        },
        'dishes')
      .then((result) => {
        console.log("Insert Document: \n", result.ops);

        return dboper.findAllDocuments(db, 'dishes');
      })
      .then((docs) => {
        console.log("Found Documents: \n", docs);

        return dboper.updateDocument(db, {
          "name": "apple"
        }, {
          "description": " I have a pen, I have an apple, I have an apple pen!"
        }, 'dishes')
      })
      .then((result) => {
        console.log("Updated Document: \n", result.result);

        return dboper.findAllDocuments(db, 'dishes')
      })
      .then((docs) => {
        console.log("Found Updated Documents: \n", docs);

        return db.dropCollection('dishes') // should return a promise
      })
      .then((result) => {
        console.log("Dropped Collection: ", result);

        return mongodb.close();
      })
      .catch((err) => {
        console.log(err)
      });
  })
  .catch((err) => console.log(err));
