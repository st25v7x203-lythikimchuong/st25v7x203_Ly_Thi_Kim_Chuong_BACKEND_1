
const express = require("express");

const app = express();

app.get("/", (req, res) => {
    res.json({ message: "Welcome to Contactbook application." });
});

module.exports = app;
