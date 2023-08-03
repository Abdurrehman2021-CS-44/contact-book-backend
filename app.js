const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

mongoose.connect("mongodb://127.0.0.1:27017/contactsDB")
.then(()=>{
    console.log("Database connected");
})
.catch((err)=>{
    console.log(err);
});

const contactSchema = new mongoose.Schema({
    fName: String,
    lName: String,
    email: String,
    phoneNum: String,
    address: String
});

const Contact = mongoose.model("Contact", contactSchema);

app.get("/contacts", (req, res) => {
    res.json({name: "Abdurrehman Bin Faheem"})
});

app.listen(5000, () => {
    console.log("Server is running on port 5000.");
})