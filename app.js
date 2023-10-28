const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const ejsMate = require("ejs-mate");


const MONGO_URL = "mongodb://127.0.0.1:27017/romi";


main().then(() => {
    console.log("connected to DB")
}).catch((err) => {
    console.log(err);
});

async function main() {
    await mongoose.connect(MONGO_URL);
};

app.set("view engine", "ejs");
app.set("romies", path.join(__dirname, "romies"));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname, "/public")));

app.get("/", (req, res) => {
    res.send("Hi, I am root");
});

// Index Route
app.get("/romi", (req, res) => {
    res.render("romies/index.ejs");
});

// Dashboard Route
app.get("/dashboard", (req, res) => {
    res.render("romies/dash.ejs");
});

// Earn Route
app.get("/earn", (req, res) => {
    res.render("romies/earn.ejs");
});

app.listen(8080, () => {
    console.log("server is listening to port 8080")
});