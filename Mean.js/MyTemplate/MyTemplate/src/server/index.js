/* Import section */
var express = require ('express');
var app = express();
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');

/* Data Storage Section */
var users = [{firstName: 'a', email: 'a', password: 'a', id: 0}];

/* CORS Section */
app.use(bodyParser.json());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
})

/* Routers Section */
var auth = express.Router();


/* REST Api logic */
// Authorization (LogIn)
auth.post('/login', (req, res) => {
    var user = users.find(user => user.email == req.body.email);
    console.log(req.body);
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

/* Binding the logic with router */
app.use('/auth', auth);

/* Server Port */
app.listen(3000);