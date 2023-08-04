const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(express.json())
app.use(cors());
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

app.route("/contacts")
.get((req, res) => {
    Contact.find({})
    .then((contacts)=>{
        res.json({data: contacts})
    })
})
.post((req, res) => {
    const newContact = req.body;
    console.log(newContact);
    const contact = new Contact(newContact);
    contact.save()
    .then(()=>{
        console.log("Data has been added to the database.");
    })
    .catch((err)=>{
        console.log(err);
    })
    res.json({isSuccess: true});
});

app.listen(5000, () => {
    console.log("Server is running on port 5000.");
})