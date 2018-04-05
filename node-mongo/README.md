Node and MongoDB Part 1

Objectives and Outcomes

In this exercise you will install the Node MongoDB driver module and configure your Node application to communicate with the MongoDB server. At the end of this exercise, you will be able to:

Install and use the Node MongoDB driver
Interact with the MongoDB database from a Node application
Installing the Node MongoDB Driver Module

Create a new folder named node-mongo and move into the folder.
At the prompt, type the following to initialize a package.json file in the node-mongo folder:

`npm init`
Accept the standard defaults suggested until you end up with a package.json file containing the following:

```
{
  "name": "node-mongo",
  "version": "1.0.0",
  "description": "Node MongoDB Example",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "node index"
  },
  "author": "Jogesh Muppala",
  "license": "ISC"
}
```
Install the Node MongoDB driver and the Assert module by typing the following at the prompt:

```
     npm install mongodb --save
     npm install assert --save
```
A Simple Node-MongoDB Application

Create a new file named index.js and add the following code to it:

```
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

```
Make sure that your MongoDB server is up and running
Type the following at the prompt to start the server and see the result.

```
npm start
```
Add a .gitignore file with the contents "node_modules" in the project folder.
Initialize the Git repository, check in all the files and do a Git commit with the message "Node MongoDB Example 1".
Conclusions

In this exercise you installed the Node MongoDB driver and used it to communicate with the MongoDB server from a Node application.
