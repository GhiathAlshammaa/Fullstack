const express = require('express');
const app = express();


/* ROUTE HANDLERS*/

/* LIST ROUTES 

/** 
 * GET /lists
 * Purpose: Get all lists
*/
app.get('/lists', (req, res) => {
    // We want to return an array of all the lists in the database
})

/** 
 * POST /lists
 * Purpose: Create a list
*/
app.post('/lists', (req, res) => {
    // We want to create a new list and return the new list document back to the user (which includes the id)
})

app.listen(3000, () => {
    console.log("Server is Listing on Port 3000");
})