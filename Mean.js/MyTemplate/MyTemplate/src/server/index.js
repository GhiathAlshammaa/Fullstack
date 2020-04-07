/* Import section */
var express = require ('express');
var app = express();
var bodyParser = require('body-parser');

// Data Storage Section
var users = [];

// CORS Section
app.use(bodyParser.json());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
})

// Routers Section
var auth = express.Router();

// Api's logic
auth.post('/register', (req, res) => {
    users.push(req.body);
})

// Binding the logic with router
app.use('/auth', auth);

// Server Port
app.listen(3000);