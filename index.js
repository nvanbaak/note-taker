// This file handles the server and routing

// Express boilerplate
const express = require('express');

const app = express();
const PORT = 9164;

// Gives us more options for POST requests
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Listener function
app.listen(PORT, function() {
    console.log('Listening on http://localhost:' + PORT);
});


app.get("/", function (req, res) {
    res.sendFile(__dirname + "/public/index.html");
});

app.get("/notes", function (req, res) {
    res.sendFile(__dirname + "/public/notes.html");
});













