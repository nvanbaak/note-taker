// Express boilerplate
const express = require('express');
const app = express();
const PORT = process.env.PORT || 9164;
const path = require("path");
const fs = require("fs");
const { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } = require('constants');

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// static assets
app.use(express.static('public'))


// Routes
const router = require("express").Router();

// GET route for note editor page
router.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname + "/public/notes.html"))
});

// GET route for note data
router.get("/api/notes", (req, res) => {
    let db = JSON.parse(fs.readFileSync("db/db.json", "utf8", (err, data) => {
        if (err) throw err;
    }));
    res.json(db);
})

// POST route for adding a new note to the DB
router.post("/api/notes",(req,res) => {

    // Load db
    let db = JSON.parse(fs.readFileSync("db/db.json", "utf8", (err, data) => {
        if (err) throw err;
    }));

    // Build new note
    let newNote = {
        id: db[db.length-1].id + 1, // that is, one more than the last note
        title: req.body.title,
        text: req.body.text        
    }

    // Push new note to db
    db.push(newNote);

    // Store db
    fs.writeFileSync("db/db.json", JSON.stringify(db), "utf8", (err, data) => {
        if (err) throw err;
    })

    // End connection
    res.status(200).end();
})

// DELETE route for a note with a given id
router.delete("/api/notes/:id", (req, res)=> {

    // First, load up the database
    let db = JSON.parse(fs.readFileSync("db/db.json", "utf8", (err, data) => {
        if (err) throw err;
    }));

    // Then run through it checking for the id to kill
    let targetIndex;
    for (let i = 0; i < db.length; i++) {
        if (db[i].id == req.params.id) {
            targetIndex = i;
        }
    }

    // Now remove it
    db.splice(targetIndex,1);

    // Then put the db back where we found it
    fs.writeFileSync("db/db.json", JSON.stringify(db), "utf8", (err, data) => {
        if (err) throw err;
    })

    res.status(200).send(req.params.id);
})

router.get("*", (req, res) => {
    res.sendFile(path.join(__dirname + "/public/index.html"));
});



app.use(router);

// Database here if you're using one

// Listener function
app.listen(PORT, function() {
    console.log('Listening on PORT ' + PORT);
});