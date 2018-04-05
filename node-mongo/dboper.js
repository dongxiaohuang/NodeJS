const assert = require('assert');

exports.insertDocument = (db, document, collection, callback) => {
  const coll = db.collection(collection);
  return coll.insert(document);
};


exports.findAllDocuments = (db, collection, callback) => {
  const coll = db.collection(collection);
  return coll.find({}).toArray();
};


exports.removeDocument = (db, document, collection, callback) => {
  const coll = db.collection(collection);
  return coll.deleteOne(document);
};

exports.updateDocument = (db, filter, update, collection, callback) => {
  const coll = db.collection(collection);
  //The $set operator replaces the value of a field with the specified value.
  return coll.updateOne(filter, { $set: update}, null);
}
