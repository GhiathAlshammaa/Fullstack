/* Import section */
var express = require ('express');
var app = express();
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
var cors = require('cors');

/* Data Storage Section */
var users = [{firstName: 'a', email: 'a', password: 'a', id: 0}];

/* CORS Section */
app.use(bodyParser.json());
app.use(cors());

/* Routers Section */
var auth = express.Router();
var api = express.Router();


/* REST Api logic */
// Users
api.get('/users/me', checkAuth, (req,res) => {
    // console.log(users[req.user.id]);
    res.json(users[req.user.id]);
})

api.post('/users/me', checkAuth, (req,res) => {
    res.json(users[req.user]);
    var user = users[req.user];

    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;

    res.json(user);
})

// Authorization (LogIn)
auth.post('/login', (req, res) => {
    var user = users.find(user => user.email == req.body.email);
    if(!user)  
        sendAuthError(res);

    if(user.password == req.body.password )
        sendToken(user, res);
    else
        sendAuthError(res);

})
// Authentication (Register)
auth.post('/register', (req, res) => {
    // bring the index of user
    var index = users.push(req.body) -1; // because "user.push" return index and the Array begins from Zero as well

    var user = users[index];
    user.id = index;

    sendToken(user, res);
})

function sendToken (user, res){
    var token = jwt.sign(user, '123');
    // the token should to put it in an object before send it.
    res.json({firstName: user.firstName ,token : token});
}

function sendAuthError(res) {
    return res.json({success: false, message: 'Email or Password incoreect'});;
}

function checkAuth(req, res, next){
    if(!req.header('authorization'))
        return res.status(401).send({message: 'Unauthorized requested, Missing authentication header'});

    try {
        var token = req.header('authorization').split(' ')[1];
        var payload = jwt.decode(token, '123');
    } catch(error) {
        if(!payload)
        return res.status(401).send({message: 'Unauthorized requested, authentication header invalid'});
    }
    req.user = payload;
    next();
}

/* Binding the logic with router */
app.use('/api', api);
app.use('/auth', auth);

/* Server Port */
app.listen(3000);