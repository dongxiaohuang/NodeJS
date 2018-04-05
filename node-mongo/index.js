const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const url = 'mongodb://localhost:27017/conFusion'; // conFusion database server

MongoClient.connect(url, (err, database) => {
  assert.equal(err, null);

  console.log('Connected correctly to server');
  const db = database.db('conFusion');
  const collection = db.collection("dishes");
  collection.insertOne({
      "name": "Uthappizza",
      "description": "test"
    },
    (err, result) => {
      assert.equal(err, null);
      console.log('After Insert: \n');
      console.log(result.ops);

      collection.find({}).toArray((err, docs) => {
        assert.equal(err, null);
        console.log(docs);

        db.dropCollection('dishes', (err, result) =>{
          assert.equal(err, null);
          database.close(); // you cannot use db.close
        }
      );
      });
    }
  );
});
