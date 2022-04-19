require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const uri = process.env.DATABASE_URI;
const cors = require("cors");
app.use(cors());
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', "*");
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    // Pass to next layer of middleware
    next();
});
mongoose.connect(uri)
    .then(() => console.log('Connection to DB successful'))
    .catch((err) => console.error(err, 'Error'));
mongoose.Promise = global.Promise;
mongoose.pluralize(null);


const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser')
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", async (req, res) => {
    res.send("hello");
})

app.use("/user", require("./routes/user"));
app.use("/project", require("./routes/project"));
app.use("/api", require("./routes/api"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, (e) => {
    console.log("Server Stated at http://localhost:" + PORT);
});