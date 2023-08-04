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
    console.log("I am in");
    Contact.find({})
    .then((contacts)=>{
        res.json({data: contacts})
    })
    .catch((err)=>{
        res.json({message: err});
    });
})
.post((req, res) => {
    const newContact = req.body;
    console.log(newContact);
    const contact = new Contact(newContact);
    contact.save()
    .then(()=>{
        res.json("Data has been added to the database.");
    })
    .catch((err)=>{
        res.json({message: err});
    });
})
.delete((req, res)=>{
    Contact.deleteOne({_id: req.body.id})
    .then(()=>{
        res.json({message: "Data has been deleted."})
    })
    .catch((err)=>{
        res.json({message: err})
    });
})
.put((req, res)=>{
    console.log(req.body);
    Contact.replaceOne({_id: req.body.id}, {...req.body.update})
    .then(()=>{
        res.json({message: "Data has been updated."})
    })
    .catch((err)=>{
        res.json({message: err})
    });
});

app.listen(5000, () => {
    console.log("Server is running on port 5000.");
})