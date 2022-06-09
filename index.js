const express = require("express");
const app = express();
const PORT = 5000;
const path = require("path");
const mysql = require("mysql");
const dotenv = require("dotenv");
const cookie = require("cookie-parser");
dotenv.config({
  path: "./.env",
});

const db = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE,
});

const publicDirectory = path.join(__dirname, "./public");
app.use(express.static(publicDirectory));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookie());
db.connect((error) => {
  if (error) {
    console.log(error);
  } else {
    console.log("mySQL running...");
  }
});

app.use("/", require("./routes/pages"));
app.use("/auth", require("./routes/auth"));
app.listen(PORT, () => {
  console.log("server running on port " + PORT);
});
