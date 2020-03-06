// This file'll handle connection logic to the MongoDB

const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://admin:A113355@ds235169.mlab.com:35169/todolist2020').then(() => {
    console.log('Connection to database sucessfully');
}).catch((e) => {
    console.log("Error while attempting to conect to Database");
    console.log(e);
})

// To prevent deprectation warnings (From Database)
// mongoose.set('userCreateIndex', true);
// mongoose.set('userFindAndModify', false);

module.exports = {
    mongoose
};