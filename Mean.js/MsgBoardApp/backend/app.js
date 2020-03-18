const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const postsRoutes = require("./routes/posts");
const userRoutes = require("./routes/user");

const app = express();

mongoose.connect("mongodb://admin:" + process.env.MONGO_ALTAS_PW + "@ds135335.mlab.com:35335/notes", { useNewUrlParser: true, useUnifiedTopology: true, 'useCreateIndex': true, 'useFindAndModify': false })
    .then(() => {
        console.log('connected to database!');
    })
    .catch(() => {
        console.log('Connection failed!');
    })

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/images', express.static(path.join('backend/images')));


app.use((req, res, next) => {

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PATCH, PUT, DELETE, OPTIONS"
    );
    next();
});

app.use("/api/posts", postsRoutes);
app.use("/api/user", userRoutes);

// to make the code global 
module.exports = app;