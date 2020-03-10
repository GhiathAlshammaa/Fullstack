const express = require('express');
const app = express();

const { mongoose } = require('./database/mongoose');

const bodyParser = require('body-parser');

// Load in the mongoose models
const { Task } = require('./database/models');

// Load middleware
app.use(bodyParser.json());

// CORS HEADERS MIDDLEWARE
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    // allow preflight
    if (req.method === 'OPTIONS') {
        res.send(200);
    } else {
        next();
    }
});

/* ROUTE HANDLERS
   LIST ROUTES */

/** 
 * GET /list
 * Purpose: Get all list
*/
app.get('/list', (req, res) => {
    // We want to return an array of all the list in the database
    Task.find({}).then((tasks) => {
        res.send(tasks);
    }).catch((e) => {
        res.send(e);
    })
});

/** 
 * POST /list
 * Purpose: Create a task
*/
app.post('/list', (req, res) => {
    // We want to create a new task and return the new task document back to the user (which includes the id)
    // The task info (fields) will be passed in via the JSON request body
    let title = req.body.title;
    let status = false;
    let newTask = new Task({
        title,
        status
    });
    newTask = new Task({
        title,
        status
    });
    newTask.save().then((taskDoc) => {
        // the full task document is returned (incl. id)
        res.send(taskDoc);
    })
});

/** 
 * PATCH /list/:id
 * Purpose: Update a speified task
*/
app.patch('/list/:id', (req, res) => {
    // we want to update the specified task (task document with id in the URL) with the new values specified in the JSON body of the request
    Task.findOneAndUpdate({ _id: req.params.id }, { $set: { status: req.body.task.status } }, { new: true }, function (err, obj) {
        if (err) {
            console.log("Something wrong when updating data!");
        }
    }).then(() => {
        res.send({ message: 'Updated successfully.' });
    });
});

/** 
 * DELETE /list/:id
 * Purpose: Delete a task
*/
app.delete('/list/:id', (req, res) => {
    // we want to delete the specified task (document with id in the URL)
    Task.findByIdAndDelete({
        _id: req.params.id
    }).then((removeListDoc) => {
        res.send(removeListDoc);
    })
})

app.listen(3000, () => {
    console.log("Server is Listing on Port 3000");
})