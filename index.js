// This file handles the server and routing

// Dependencies
const express = require('express');
const fs = require("fs")

// ======================================
//          EXPRESS BOILERPLATE
// ======================================

const app = express();
const PORT = process.env.PORT || 9164;

// Gives us more options for POST requests
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Listener function
app.listen(PORT, function() {
    console.log('Listening on http://localhost:' + PORT);
});


// =======================================
//               Routing
// =======================================

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/public/index.html");
});


app.get("/notes", function (req, res) {
    res.sendFile(__dirname + "/public/notes.html");
});

app.get("/api/notes", function(req, res) {
    res.sendFile(__dirname + "/public/db.json");
})

app.get("*", function (req, res) {
    res.sendFile(__dirname + "/public/index.html");
});


// ===============================
//        JSON READ / WRITE
// ===============================

// The notes database is an array of objects each with a title key and a content key

// Defines path to notes
const dbPath = __dirname + "/public/db.json";

// create database reference
let notesDB = []

// If the notes db doesn't exist, we make it
if (!fs.existsSync(dbPath)) {
    notesDB = [{
        title:"Welcome!",
        content:"Check out the readme for information on app functionality1"
    }];

    storeDB();
}

// This function stores the database by writing it to db.json
function storeDB() {
    fs.writeFile(dbPath,JSON.stringify(notesDB),"utf8",err=>{if (err) throw err});
}







