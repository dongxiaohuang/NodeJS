const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const dboper = require('./dboper');

const url = 'mongodb://localhost:27017/conFusion'; // conFusion database server

MongoClient.connect(url, (err, database) => {
  assert.equal(err, null);

  console.log('Connected correctly to server');
  const db = database.db('conFusion');

  dboper.insertDocument(db, {"name" : "apple", "description" : " a fruit"},
    'dishes', (result) => {
      console.log("Insert Document: \n", result.ops);

      dboper.findAllDocuments(db, 'dishes', (docs) => {
        console.log("Found Documents: \n", docs);

        dboper.updateDocument(db, {"name" : "apple"},
          {"description" : " I have a pen, I have an apple, I have an apple pen!"},'dishes',
          (result) => {
            console.log("Updated Document: \n", result.result);

            dboper.findAllDocuments(db, 'dishes', (docs) => {
              console.log("Found Updated Documents: \n", docs);

              db.dropCollection('dishes', (result) => {
                console.log("Dropped Collection: ", result);

                database.close();
              });
            });
          });
      });
    });

});
