var express = require('express');
var app = express();

var messages = [{text: 'First Text' , owner: 'Maher'}, {text: 'Second Text', owner: 'Hamdo'}];

app.get('/messages',(req, res) => {
    res.json(messages);
});

app.listen(1234);