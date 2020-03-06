const express = require('express');
const app = express();

const { mongoose } = require('./database/mongoose');

const bodyParser = require('body-parser');

// Load in the mongoose models
const { List, Task } = require('./database/models');

// Load middleware
app.use(bodyParser.json());

/* ROUTE HANDLERS*/

/* LIST ROUTES 

/** 
 * GET /lists
 * Purpose: Get all lists
*/
app.get('/lists', (req, res) => {
    // We want to return an array of all the lists in the database
    List.find({}).then((lists) => {
        res.send(lists);
    }).catch((e) => {
        res.send(e);
    })
});

/** 
 * POST /lists
 * Purpose: Create a list
*/
app.post('/lists', (req, res) => {
    // We want to create a new list and return the new list document back to the user (which includes the id)
    // The list info (fields) will be passed in via the JSON request body
    let title = req.body.title;
    let newList = new List({
        title
    });
    newList = new List({
        title
    });
    newList.save().then((listDoc) => {
        // the full list document is returned (incl. id)
        res.send(listDoc);
    })
});

/** 
 * PATCH /lists/:id
 * Purpose: Update a speified list
*/
app.patch('/lists/:id', (req, res) => {
    // we want to update the specified list (list document with id in the URL) with the new values specified in the JSON body of the request
    List.findOneAndUpdate({ _id: req.params.id }, {
        $set: req.body
    }).then(() => {
        res.sendStatus(200);
    });
});

/** 
 * DELETE /lists/:id
 * Purpose: Delete a list
*/
app.delete('/lists/:id', (req, res) => {
    // we want to delete the specified list (document with id in the URL)
    List.findByIdAndDelete({
        _id: req.params.id
    }).then((removeListDoc) => {
        res.send(removeListDoc);
    })
})

app.listen(3000, () => {
    console.log("Server is Listing on Port 3000");
})