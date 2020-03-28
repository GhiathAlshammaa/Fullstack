require('dotenv').config();

const users = require('./users');
const contacts = require('./contacts');

// const mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true, useUnifiedTopology: true});

const MongoClient = require('mongodb').MongoClient;
const bcrypt = require('bcrypt');

function seedCollection(collectionName, initialRecords) {
    MongoClient.connect(process.env.DB_CONN, (err, db) => {
        console.log('connected to mongodb...');

        const collection = db.collection(collectionName);

        collection.remove(); // left the Schema and remove the content

        initialRecords.forEach((item) => {
            if (item.password) {
                item.password = bcrypt.hashSync(item.password, 10);
            }
        });

        collection.insertMany(initialRecords, (err, result) => {
            console.log(`${result.insertedCount} records inserted`);
            console.log('closing connection...');
            db.close();
            console.log('done');
        });
    });
}

seedCollection("users", users);
seedCollection("contacts", contacts);