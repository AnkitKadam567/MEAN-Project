
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const userRoutes = require("./routes/user")
const postRoutes = require("./routes/posts");

const mongoose = require('mongoose')
const path = require("path")

mongoose.connect("mongodb+srv://Ankit:"+ 
                  process.env.MONGO_ATLAS_PW +
                  "@cluster0-gvqem.mongodb.net/MeanFS?retryWrites=true&w=majority", { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true })
    .then(
        () => console.log("Connection successfull")
    )
    .catch(
        (error) => console.log("Some error occured while connecting to database--------------- " + process.env.ATLAS_MONGO_PSWD)
    )

app.use(bodyParser.json());

app.use(bodyParser.urlencoded())

app.use("/images",express.static(path.join("backend/images")))

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin,X-Requested-Width,Content-Type,Access,authorization");
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
    next()
}
)

app.use("/api/post/",postRoutes);
app.use("/api/user/",userRoutes);

module.exports = app;
