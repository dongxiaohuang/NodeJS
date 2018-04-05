const assert = require('assert');

exports.insertDocument = (db, document, collection, callback) => {
  const coll = db.collection(collection);
  coll.insert(document, (err, result) => {
    assert.equal(err, null);
    console.log("Inserted " + result.result.n +
    " documents into collection: " + collection
  );
    callback(result);
  });
};


exports.findAllDocuments = (db, collection, callback) => {
  const coll = db.collection(collection);
  coll.find({}).toArray((err, docs) => {
    assert.equal(err, null);
    callback(docs);
  });
};


exports.removeDocument = (db, document, collection, callback) => {
  const coll = db.collection(collection);
  coll.deleteOne(document, (err, result) =>{
    assert.equal(err, null);
    console.log("Removed the document ", document);// note it is `,`
    callback(result);
  });
};

exports.updateDocument = (db, filter, update, collection, callback) => {
  const coll = db.collection(collection);
  //The $set operator replaces the value of a field with the specified value.
  coll.updateOne(filter, { $set: update}, null, (err, result) => {
    assert.equal(err, null);
    console.log("Updated the document with", update);
    callback(result);
  });
}
