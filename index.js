// This file handles the server and routing

// Dependencies
const express = require('express');
const fs = require("fs")

// Define path to notes
const dbPath = __dirname + "/public/db.json";

// ======================================
//          EXPRESS BOILERPLATE
// ======================================

const app = express();
const PORT = process.env.PORT || 9164;

// Gives us more options for POST requests
app.use(express.urlencoded({ extended: true })); // application/x-www-form-urlencoded
app.use(express.json()); // application/json

// Listener function
app.listen(PORT, function() {
    console.log('Listening on http://localhost:' + PORT);
});


// =======================================
//               Routing
// =======================================

// GET

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/public/index.html");
});

app.get("/notes", function (req, res) {
    res.sendFile(__dirname + "/public/notes.html");
});

app.get("/api/notes/:id", function (req, res) {
    
    // Get the id that was passed
    let id = req.params.id;
    console.log(id);

    // Read the database
    let notesDB = readDB();

    // Search the databse for an article with that title
    for (let i = 0; i < notesDB.length; i++) {
        // If we get a match, send it off
        if (notesDB[i].title == id) {
            return res.json(notesDB[i])
        }
    }

    // If we don't get a match, send an error message
    res.send("Sorry, that note doesn't exist");
});

app.get("/api/notes", function(req, res) {
    res.json(dbPath);
})

app.get("*", function (req, res) {
    res.sendFile(__dirname + "/public/index.html");
});

// POST

app.post("/api/notes", function (req, res) {

    // Make an object using the data sent
    let newNote = {
        title:req.body.title,
        content:req.title.content
    }

    // Load the database
    let db = readDB();

    // Push to database
    db.push(newNote);

    res.send("POST request received!")
});

// DELETE

app.delete("/api/notes/:id", function (req, res) {

    // Get id
    let target = req.params.id;

    // Load the database
    let db = readDB();

    // Run through the database
    for (i in db) {
        // if the note title matches the target
        if (db[i].title === target) {
            // splice it out of the database
            db.splice(i, 1, "");

            // save the database
            storeDB(db);

            // And exit the function
            return res.send(`Deleted '${target}' from database!`)
        }
    }
})


// ===============================
//        JSON READ / WRITE
// ===============================

// The notes database is an array of objects each with a title key and a content key

// If the notes db doesn't exist, we make it
if (!fs.existsSync(dbPath)) {
    let notesDB = [{
        title:"Welcome!",
        content:"Check out the readme for information on app functionality1"
    }];

    storeDB(notesDB);
}

// This function stores the database by writing it to db.json
function storeDB(dbref) {
    fs.writeFile(dbPath,JSON.stringify(dbref),"utf8",err=>{if (err) throw err});
}

// This function reads the database, then returns the information
function readDB() {
    return JSON.parse(fs.readFileSync(dbPath,"utf8",err=>{if (err) throw err}));
}





