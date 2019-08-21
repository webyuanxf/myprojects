const addRouter = require("./routes/user");
const express = require("express");
const bodyParser = require("body-parser");
var app = express();
app.listen(3000);
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(express.static("public"));

app.use("/user", addRouter);