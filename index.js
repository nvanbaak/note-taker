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

app.get("/api/notes/:id", function (req, res) {
    
    // Get the id that was passed
    let id = req.params.id;
    console.log(id);

    // Read the database
    let notesDB = [];
    notesDB = readDB();
    console.log(notesDB);
    console.log(notesDB.length);

    // Search the databse for an article with that title
    for (let i = 0; i < notesDB.length; i++) {
        // If we get a match, send it off
        if (notesDB[i].title == id) {
            return res.send(notesDB[i])
        }
    }

    // If we don't get a match, send an error message
    res.send("Sorry, that note doesn't exist");
});

app.get("/api/notes", function(req, res) {
    res.sendFile(dbPath);
})

app.get("*", function (req, res) {
    res.sendFile(__dirname + "/public/index.html");
});


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

function readDB() {
    return JSON.parse(fs.readFileSync(dbPath,"utf8",err=>{if (err) throw err}));
}





