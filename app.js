const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/contacts", (req, res) => {
    res.json({name: "Abdurrehman Bin Faheem"})
});

app.listen(3000, () => {
    console.log("Server is running on port 3000.");
})